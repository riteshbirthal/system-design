from fastapi import APIRouter, HTTPException
from bson import ObjectId
from datetime import datetime, timezone
from typing import List, Optional
from pydantic import BaseModel
from database import get_database

router = APIRouter()

class AssignmentCreate(BaseModel):
    title: str
    description: str
    requirements: List[str]
    difficulty: str
    category: str
    max_score: int = 100

class SubmissionCreate(BaseModel):
    content: str
    user_id: str

def serialize_doc(doc: dict) -> dict:
    doc["_id"] = str(doc["_id"])
    return doc

@router.get("/")
async def get_assignments():
    db = get_database()
    assignments = await db.assignments.find().to_list(100)
    return [serialize_doc(a) for a in assignments]

@router.get("/{id}")
async def get_assignment(id: str):
    db = get_database()
    assignment = await db.assignments.find_one({"_id": ObjectId(id)})
    if not assignment:
        raise HTTPException(status_code=404, detail="Assignment not found")
    return serialize_doc(assignment)

@router.post("/", status_code=201)
async def create_assignment(assignment: AssignmentCreate):
    db = get_database()
    data = assignment.model_dump()
    data["created_at"] = datetime.now(timezone.utc)
    data["updated_at"] = datetime.now(timezone.utc)
    result = await db.assignments.insert_one(data)
    data["_id"] = str(result.inserted_id)
    return data

@router.put("/{id}")
async def update_assignment(id: str, assignment: AssignmentCreate):
    db = get_database()
    data = assignment.model_dump()
    data["updated_at"] = datetime.now(timezone.utc)
    await db.assignments.update_one({"_id": ObjectId(id)}, {"$set": data})
    updated = await db.assignments.find_one({"_id": ObjectId(id)})
    return serialize_doc(updated)

@router.delete("/{id}")
async def delete_assignment(id: str):
    db = get_database()
    await db.assignments.delete_one({"_id": ObjectId(id)})
    return {"message": "Assignment deleted"}

@router.post("/{id}/submit", status_code=201)
async def submit_assignment(id: str, submission: SubmissionCreate):
    db = get_database()
    assignment = await db.assignments.find_one({"_id": ObjectId(id)})
    if not assignment:
        raise HTTPException(status_code=404, detail="Assignment not found")
    
    data = submission.model_dump()
    data["assignment_id"] = id
    data["submitted_at"] = datetime.now(timezone.utc)
    data["status"] = "submitted"
    result = await db.submissions.insert_one(data)
    data["_id"] = str(result.inserted_id)
    return data

@router.get("/{id}/submissions")
async def get_submissions(id: str):
    db = get_database()
    submissions = await db.submissions.find({"assignment_id": id}).to_list(100)
    return [serialize_doc(s) for s in submissions]

@router.get("/week/{week}")
async def get_by_week(week: int):
    db = get_database()
    assignments = await db.assignments.find({"week": week}).sort("day", 1).to_list(100)
    return [serialize_doc(a) for a in assignments]

@router.get("/week/{week}/day/{day}")
async def get_by_week_day(week: int, day: int):
    db = get_database()
    assignments = await db.assignments.find({"week": week, "day": day}).to_list(100)
    return [serialize_doc(a) for a in assignments]

@router.get("/week/{week}/project")
async def get_weekly_project(week: int):
    db = get_database()
    project = await db.assignments.find_one({"week": week, "is_weekly_project": True})
    if not project:
        raise HTTPException(status_code=404, detail="Weekly project not found")
    return serialize_doc(project)
