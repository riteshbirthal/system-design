from fastapi import APIRouter, HTTPException
from bson import ObjectId
from datetime import datetime, timezone
from typing import List, Optional, Dict, Any
from pydantic import BaseModel
from database import get_database

router = APIRouter()

class Question(BaseModel):
    id: int
    question: str
    options: List[str]
    correct_answer: str

class QuizCreate(BaseModel):
    title: str
    description: str
    category: str
    questions: List[Question]
    time_limit: int
    passing_score: int = 60

class QuizSubmit(BaseModel):
    answers: Dict[str, str]
    user_id: str

def serialize_doc(doc: dict) -> dict:
    doc["_id"] = str(doc["_id"])
    return doc

@router.get("/")
async def get_quizzes():
    db = get_database()
    quizzes = await db.quizzes.find().to_list(100)
    return [serialize_doc(q) for q in quizzes]

@router.get("/{id}")
async def get_quiz(id: str):
    db = get_database()
    quiz = await db.quizzes.find_one({"_id": ObjectId(id)})
    if not quiz:
        raise HTTPException(status_code=404, detail="Quiz not found")
    return serialize_doc(quiz)

@router.post("/", status_code=201)
async def create_quiz(quiz: QuizCreate):
    db = get_database()
    data = quiz.model_dump()
    data["created_at"] = datetime.now(timezone.utc)
    data["updated_at"] = datetime.now(timezone.utc)
    result = await db.quizzes.insert_one(data)
    data["_id"] = str(result.inserted_id)
    return data

@router.put("/{id}")
async def update_quiz(id: str, quiz: QuizCreate):
    db = get_database()
    data = quiz.model_dump()
    data["updated_at"] = datetime.now(timezone.utc)
    await db.quizzes.update_one({"_id": ObjectId(id)}, {"$set": data})
    updated = await db.quizzes.find_one({"_id": ObjectId(id)})
    return serialize_doc(updated)

@router.delete("/{id}")
async def delete_quiz(id: str):
    db = get_database()
    await db.quizzes.delete_one({"_id": ObjectId(id)})
    return {"message": "Quiz deleted"}

@router.post("/{id}/submit", status_code=201)
async def submit_quiz(id: str, submission: QuizSubmit):
    db = get_database()
    quiz = await db.quizzes.find_one({"_id": ObjectId(id)})
    if not quiz:
        raise HTTPException(status_code=404, detail="Quiz not found")
    
    answers = submission.answers
    score = 0
    total = len(quiz.get("questions", []))
    
    for q in quiz.get("questions", []):
        q_id = str(q.get("id", ""))
        if answers.get(q_id) == q.get("correct_answer"):
            score += 1
    
    percentage = (score / total * 100) if total > 0 else 0
    result = {
        "quiz_id": id,
        "user_id": submission.user_id,
        "answers": answers,
        "score": score,
        "total": total,
        "percentage": percentage,
        "passed": percentage >= quiz.get("passing_score", 60),
        "submitted_at": datetime.now(timezone.utc)
    }
    
    insert_result = await db.quiz_results.insert_one(result)
    result["_id"] = str(insert_result.inserted_id)
    return result

@router.get("/{id}/results")
async def get_quiz_results(id: str):
    db = get_database()
    results = await db.quiz_results.find({"quiz_id": id}).to_list(100)
    return [serialize_doc(r) for r in results]

@router.get("/category/{category}")
async def get_by_category(category: str):
    db = get_database()
    quizzes = await db.quizzes.find({"category": category}).to_list(100)
    return [serialize_doc(q) for q in quizzes]

@router.get("/week/{week}")
async def get_by_week(week: int):
    db = get_database()
    quizzes = await db.quizzes.find({"week": week}).sort("day", 1).to_list(100)
    return [serialize_doc(q) for q in quizzes]

@router.get("/week/{week}/day/{day}")
async def get_by_week_day(week: int, day: int):
    db = get_database()
    quizzes = await db.quizzes.find({"week": week, "day": day}).to_list(100)
    return [serialize_doc(q) for q in quizzes]

@router.get("/week/{week}/weekly")
async def get_weekly_quiz(week: int):
    db = get_database()
    quiz = await db.quizzes.find_one({"week": week, "is_weekly_quiz": True})
    if not quiz:
        raise HTTPException(status_code=404, detail="Weekly quiz not found")
    return serialize_doc(quiz)
