from fastapi import APIRouter, HTTPException
from database import get_database

router = APIRouter()

COURSE_STRUCTURE = {
    "title": "System Design Mastery Course",
    "description": "A comprehensive 12-week course covering High-Level Design (HLD) and Low-Level Design (LLD) concepts",
    "duration_weeks": 12,
    "days_per_week": 5,
    "daily_hours": "2-3",
    "weeks": [
        {
            "week": 1,
            "title": "Introduction to System Design & Requirements Engineering",
            "phase": "Fundamentals",
            "days": [
                {"day": 1, "topic": "What is System Design?"},
                {"day": 2, "topic": "Functional & Non-Functional Requirements"},
                {"day": 3, "topic": "Scalability Fundamentals"},
                {"day": 4, "topic": "Back-of-Envelope Estimation"},
                {"day": 5, "topic": "System Design Process & Framework"}
            ]
        },
        {
            "week": 2,
            "title": "Networking Fundamentals & Communication Protocols",
            "phase": "Fundamentals",
            "days": [
                {"day": 1, "topic": "DNS & Domain Resolution"},
                {"day": 2, "topic": "HTTP/HTTPS Protocols"},
                {"day": 3, "topic": "TCP vs UDP"},
                {"day": 4, "topic": "REST API Design"},
                {"day": 5, "topic": "GraphQL, gRPC & WebSockets"}
            ]
        },
        {
            "week": 3,
            "title": "Database Systems & Data Management",
            "phase": "Core Components",
            "days": [
                {"day": 1, "topic": "SQL Databases"},
                {"day": 2, "topic": "NoSQL Databases"},
                {"day": 3, "topic": "Indexing & Query Optimization"},
                {"day": 4, "topic": "ACID & Transactions"},
                {"day": 5, "topic": "Database Replication"}
            ]
        },
        {
            "week": 4,
            "title": "Caching Strategies & Performance Optimization",
            "phase": "Core Components",
            "days": [
                {"day": 1, "topic": "Caching Fundamentals"},
                {"day": 2, "topic": "Cache Eviction Policies"},
                {"day": 3, "topic": "Distributed Caching"},
                {"day": 4, "topic": "CDN & Edge Caching"},
                {"day": 5, "topic": "Performance Optimization"}
            ]
        },
        {
            "week": 5,
            "title": "Load Balancing & Message Queues",
            "phase": "Core Components",
            "days": [
                {"day": 1, "topic": "Load Balancing Fundamentals"},
                {"day": 2, "topic": "Load Balancing Algorithms"},
                {"day": 3, "topic": "Message Queue Fundamentals"},
                {"day": 4, "topic": "Message Queue Technologies"},
                {"day": 5, "topic": "Event-Driven Architecture"}
            ]
        },
        {
            "week": 6,
            "title": "CAP Theorem & Consistency Patterns",
            "phase": "Distributed Systems",
            "days": [
                {"day": 1, "topic": "CAP Theorem"},
                {"day": 2, "topic": "Consistency Models"},
                {"day": 3, "topic": "Distributed Consensus"},
                {"day": 4, "topic": "Distributed Transactions"},
                {"day": 5, "topic": "Conflict Resolution"}
            ]
        },
        {
            "week": 7,
            "title": "Data Partitioning & Replication Strategies",
            "phase": "Distributed Systems",
            "days": [
                {"day": 1, "topic": "Data Partitioning Basics"},
                {"day": 2, "topic": "Sharding Strategies"},
                {"day": 3, "topic": "Partition Management"},
                {"day": 4, "topic": "Global Data Distribution"},
                {"day": 5, "topic": "Data Migration Strategies"}
            ]
        },
        {
            "week": 8,
            "title": "Microservices Architecture & Service Mesh",
            "phase": "Architecture Patterns",
            "days": [
                {"day": 1, "topic": "Microservices Fundamentals"},
                {"day": 2, "topic": "Service Discovery"},
                {"day": 3, "topic": "API Gateway"},
                {"day": 4, "topic": "Service Mesh"},
                {"day": 5, "topic": "Microservices Patterns"}
            ]
        },
        {
            "week": 9,
            "title": "API Design & Communication Patterns",
            "phase": "Architecture Patterns",
            "days": [
                {"day": 1, "topic": "API Design Best Practices"},
                {"day": 2, "topic": "API Security"},
                {"day": 3, "topic": "Inter-Service Communication"},
                {"day": 4, "topic": "API Versioning & Documentation"},
                {"day": 5, "topic": "API Performance"}
            ]
        },
        {
            "week": 10,
            "title": "Object-Oriented Design & SOLID Principles",
            "phase": "Low-Level Design",
            "days": [
                {"day": 1, "topic": "OOP Fundamentals"},
                {"day": 2, "topic": "SOLID Principles - Part 1"},
                {"day": 3, "topic": "SOLID Principles - Part 2"},
                {"day": 4, "topic": "SOLID Principles - Part 3"},
                {"day": 5, "topic": "Clean Code & Refactoring"}
            ]
        },
        {
            "week": 11,
            "title": "Design Patterns & UML Diagrams",
            "phase": "Low-Level Design",
            "days": [
                {"day": 1, "topic": "Creational Patterns"},
                {"day": 2, "topic": "Structural Patterns"},
                {"day": 3, "topic": "Behavioral Patterns"},
                {"day": 4, "topic": "UML Diagrams"},
                {"day": 5, "topic": "Architecture Documentation"}
            ]
        },
        {
            "week": 12,
            "title": "Real-World System Design Problems",
            "phase": "Case Studies",
            "days": [
                {"day": 1, "topic": "Design Twitter/X"},
                {"day": 2, "topic": "Design YouTube/Netflix"},
                {"day": 3, "topic": "Design Uber/Lyft"},
                {"day": 4, "topic": "Design WhatsApp"},
                {"day": 5, "topic": "Design Google Search"}
            ]
        }
    ]
}

@router.get("/")
async def get_course_overview():
    return COURSE_STRUCTURE

@router.get("/week/{week}")
async def get_week_overview(week: int):
    db = get_database()
    
    if week < 1 or week > 12:
        raise HTTPException(status_code=404, detail="Week not found")
    
    week_info = COURSE_STRUCTURE["weeks"][week - 1]
    
    tutorials = await db.tutorials.find({"week": week}).sort("day", 1).to_list(100)
    content = await db.content.find({"week": week}).sort("day", 1).to_list(100)
    assignments = await db.assignments.find({"week": week}).sort("day", 1).to_list(100)
    quizzes = await db.quizzes.find({"week": week}).sort("day", 1).to_list(100)
    
    def serialize(doc):
        doc["_id"] = str(doc["_id"])
        return doc
    
    return {
        "week_info": week_info,
        "tutorials": [serialize(t) for t in tutorials],
        "content": [serialize(c) for c in content],
        "assignments": [serialize(a) for a in assignments],
        "quizzes": [serialize(q) for q in quizzes]
    }

@router.get("/week/{week}/day/{day}")
async def get_day_content(week: int, day: int):
    db = get_database()
    
    if week < 1 or week > 12 or day < 1 or day > 5:
        raise HTTPException(status_code=404, detail="Invalid week or day")
    
    week_info = COURSE_STRUCTURE["weeks"][week - 1]
    day_info = week_info["days"][day - 1]
    
    tutorials = await db.tutorials.find({"week": week, "day": day}).to_list(100)
    content = await db.content.find({"week": week, "day": day}).to_list(100)
    assignments = await db.assignments.find({"week": week, "day": day}).to_list(100)
    quizzes = await db.quizzes.find({"week": week, "day": day}).to_list(100)
    
    def serialize(doc):
        doc["_id"] = str(doc["_id"])
        return doc
    
    return {
        "week": week,
        "day": day,
        "topic": day_info["topic"],
        "tutorials": [serialize(t) for t in tutorials],
        "content": [serialize(c) for c in content],
        "assignments": [serialize(a) for a in assignments],
        "quizzes": [serialize(q) for q in quizzes]
    }
