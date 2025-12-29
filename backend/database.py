from motor.motor_asyncio import AsyncIOMotorClient
from config import Config

class Database:
    client: AsyncIOMotorClient = None
    db = None

db = Database()

async def connect_to_mongo():
    db.client = AsyncIOMotorClient(Config.MONGO_URI)
    db.db = db.client[Config.DATABASE_NAME]
    print("Connected to MongoDB")

async def close_mongo_connection():
    if db.client:
        db.client.close()
        print("MongoDB connection closed")

def get_database():
    return db.db
