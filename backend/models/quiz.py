from bson import ObjectId
from datetime import datetime

class Quiz:
    collection_name = 'quizzes'
    
    @staticmethod
    def create_schema():
        return {
            'title': str,
            'description': str,
            'category': str,
            'questions': list,
            'time_limit': int,
            'passing_score': int,
            'created_at': datetime,
            'updated_at': datetime
        }
    
    @staticmethod
    def to_dict(quiz):
        quiz['_id'] = str(quiz['_id'])
        return quiz
