from bson import ObjectId
from datetime import datetime

class Tutorial:
    collection_name = 'tutorials'
    
    @staticmethod
    def create_schema():
        return {
            'title': str,
            'description': str,
            'video_url': str,
            'thumbnail': str,
            'duration': str,
            'category': str,
            'difficulty': str,
            'created_at': datetime,
            'updated_at': datetime
        }
    
    @staticmethod
    def to_dict(tutorial):
        tutorial['_id'] = str(tutorial['_id'])
        return tutorial
