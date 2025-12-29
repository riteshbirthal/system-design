from fastapi import APIRouter, HTTPException, Query
from bson import ObjectId
from datetime import datetime, timezone
from typing import List, Optional
from pydantic import BaseModel
from database import get_database

router = APIRouter()

class ContentCreate(BaseModel):
    title: str
    body: str
    category: str
    tags: Optional[List[str]] = []
    author: str
    read_time: int

def serialize_content(content: dict) -> dict:
    content["_id"] = str(content["_id"])
    return content

@router.get("/")
async def get_all_content():
    db = get_database()
    contents = await db.content.find().to_list(100)
    return [serialize_content(c) for c in contents]

@router.get("/search")
async def search_content(q: str = Query(...)):
    db = get_database()
    contents = await db.content.find({
        "$or": [
            {"title": {"$regex": q, "$options": "i"}},
            {"body": {"$regex": q, "$options": "i"}}
        ]
    }).to_list(100)
    return [serialize_content(c) for c in contents]

@router.get("/category/{category}")
async def get_by_category(category: str):
    db = get_database()
    contents = await db.content.find({"category": category}).to_list(100)
    return [serialize_content(c) for c in contents]

@router.get("/week/{week}")
async def get_by_week(week: int):
    db = get_database()
    contents = await db.content.find({"week": week}).sort("day", 1).to_list(100)
    return [serialize_content(c) for c in contents]

@router.get("/week/{week}/day/{day}")
async def get_by_week_day(week: int, day: int):
    db = get_database()
    contents = await db.content.find({"week": week, "day": day}).to_list(100)
    return [serialize_content(c) for c in contents]

@router.get("/{id}")
async def get_content(id: str):
    db = get_database()
    content = await db.content.find_one({"_id": ObjectId(id)})
    if not content:
        raise HTTPException(status_code=404, detail="Content not found")
    return serialize_content(content)

@router.post("/", status_code=201)
async def create_content(content: ContentCreate):
    db = get_database()
    data = content.model_dump()
    data["created_at"] = datetime.now(timezone.utc)
    data["updated_at"] = datetime.now(timezone.utc)
    result = await db.content.insert_one(data)
    data["_id"] = str(result.inserted_id)
    return data

@router.put("/{id}")
async def update_content(id: str, content: ContentCreate):
    db = get_database()
    data = content.model_dump()
    data["updated_at"] = datetime.now(timezone.utc)
    await db.content.update_one({"_id": ObjectId(id)}, {"$set": data})
    updated = await db.content.find_one({"_id": ObjectId(id)})
    return serialize_content(updated)

@router.delete("/{id}")
async def delete_content(id: str):
    db = get_database()
    await db.content.delete_one({"_id": ObjectId(id)})
    return {"message": "Content deleted"}
