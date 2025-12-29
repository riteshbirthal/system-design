from bson import ObjectId
from datetime import datetime

class Assignment:
    collection_name = 'assignments'
    
    @staticmethod
    def create_schema():
        return {
            'title': str,
            'description': str,
            'requirements': list,
            'difficulty': str,
            'category': str,
            'deadline': datetime,
            'max_score': int,
            'created_at': datetime,
            'updated_at': datetime
        }
    
    @staticmethod
    def to_dict(assignment):
        assignment['_id'] = str(assignment['_id'])
        return assignment
