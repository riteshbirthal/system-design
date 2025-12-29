from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager
from database import connect_to_mongo, close_mongo_connection
from routes.tutorials import router as tutorials_router
from routes.content import router as content_router
from routes.assignments import router as assignments_router
from routes.quizzes import router as quizzes_router
from routes.course import router as course_router

@asynccontextmanager
async def lifespan(app: FastAPI):
    await connect_to_mongo()
    yield
    await close_mongo_connection()

app = FastAPI(
    title="System Design Platform API",
    description="API for system design learning platform",
    version="1.0.0",
    lifespan=lifespan
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(tutorials_router, prefix="/api/tutorials", tags=["Tutorials"])
app.include_router(content_router, prefix="/api/content", tags=["Content"])
app.include_router(assignments_router, prefix="/api/assignments", tags=["Assignments"])
app.include_router(quizzes_router, prefix="/api/quizzes", tags=["Quizzes"])
app.include_router(course_router, prefix="/api/course", tags=["Course"])

@app.get("/api/health")
async def health_check():
    return {"status": "healthy"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("app:app", host="0.0.0.0", port=8000, reload=True)
