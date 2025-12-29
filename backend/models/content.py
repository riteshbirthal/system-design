from bson import ObjectId
from datetime import datetime

class Content:
    collection_name = 'content'
    
    @staticmethod
    def create_schema():
        return {
            'title': str,
            'body': str,
            'category': str,
            'tags': list,
            'author': str,
            'read_time': int,
            'created_at': datetime,
            'updated_at': datetime
        }
    
    @staticmethod
    def to_dict(content):
        content['_id'] = str(content['_id'])
        return content
