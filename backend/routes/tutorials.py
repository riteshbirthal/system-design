from fastapi import APIRouter, HTTPException
from bson import ObjectId
from datetime import datetime, timezone
from typing import List, Optional
from pydantic import BaseModel, Field
from database import get_database

router = APIRouter()

class TutorialCreate(BaseModel):
    title: str
    description: str
    video_url: str
    thumbnail: Optional[str] = ""
    duration: str
    category: str
    difficulty: str

class TutorialResponse(BaseModel):
    id: str = Field(alias="_id")
    title: str
    description: str
    video_url: str
    thumbnail: Optional[str] = ""
    duration: str
    category: str
    difficulty: str
    created_at: Optional[datetime] = None
    updated_at: Optional[datetime] = None

    class Config:
        populate_by_name = True

def serialize_tutorial(tutorial: dict) -> dict:
    tutorial["_id"] = str(tutorial["_id"])
    return tutorial

@router.get("/")
async def get_tutorials():
    db = get_database()
    tutorials = await db.tutorials.find().to_list(100)
    return [serialize_tutorial(t) for t in tutorials]

@router.get("/{id}")
async def get_tutorial(id: str):
    db = get_database()
    tutorial = await db.tutorials.find_one({"_id": ObjectId(id)})
    if not tutorial:
        raise HTTPException(status_code=404, detail="Tutorial not found")
    return serialize_tutorial(tutorial)

@router.post("/", status_code=201)
async def create_tutorial(tutorial: TutorialCreate):
    db = get_database()
    data = tutorial.model_dump()
    data["created_at"] = datetime.now(timezone.utc)
    data["updated_at"] = datetime.now(timezone.utc)
    result = await db.tutorials.insert_one(data)
    data["_id"] = str(result.inserted_id)
    return data

@router.put("/{id}")
async def update_tutorial(id: str, tutorial: TutorialCreate):
    db = get_database()
    data = tutorial.model_dump()
    data["updated_at"] = datetime.now(timezone.utc)
    await db.tutorials.update_one({"_id": ObjectId(id)}, {"$set": data})
    updated = await db.tutorials.find_one({"_id": ObjectId(id)})
    return serialize_tutorial(updated)

@router.delete("/{id}")
async def delete_tutorial(id: str):
    db = get_database()
    await db.tutorials.delete_one({"_id": ObjectId(id)})
    return {"message": "Tutorial deleted"}

@router.get("/category/{category}")
async def get_by_category(category: str):
    db = get_database()
    tutorials = await db.tutorials.find({"category": category}).to_list(100)
    return [serialize_tutorial(t) for t in tutorials]

@router.get("/week/{week}")
async def get_by_week(week: int):
    db = get_database()
    tutorials = await db.tutorials.find({"week": week}).sort("day", 1).to_list(100)
    return [serialize_tutorial(t) for t in tutorials]

@router.get("/week/{week}/day/{day}")
async def get_by_week_day(week: int, day: int):
    db = get_database()
    tutorials = await db.tutorials.find({"week": week, "day": day}).to_list(100)
    return [serialize_tutorial(t) for t in tutorials]
