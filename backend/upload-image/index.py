import json
import os
import boto3
import base64
from datetime import datetime

def handler(event: dict, context) -> dict:
    """
    API для загрузки изображений в S3.
    Принимает base64 изображение и загружает в хранилище.
    """
    method = event.get('httpMethod', 'POST')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Max-Age': '86400'
            },
            'body': '',
            'isBase64Encoded': False
        }
    
    if method == 'POST':
        try:
            body = json.loads(event.get('body', '{}'))
            
            image_base64 = body.get('image')
            image_type = body.get('type', 'product')
            filename = body.get('filename', f'{datetime.now().timestamp()}.jpg')
            
            if not image_base64:
                return {
                    'statusCode': 400,
                    'headers': {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*'
                    },
                    'body': json.dumps({'error': 'Требуется поле image (base64)'}),
                    'isBase64Encoded': False
                }
            
            image_data = base64.b64decode(image_base64)
            
            s3 = boto3.client('s3',
                endpoint_url='https://bucket.poehali.dev',
                aws_access_key_id=os.environ['AWS_ACCESS_KEY_ID'],
                aws_secret_access_key=os.environ['AWS_SECRET_ACCESS_KEY']
            )
            
            key = f'{image_type}/{filename}'
            
            content_type = 'image/jpeg'
            if filename.endswith('.png'):
                content_type = 'image/png'
            elif filename.endswith('.gif'):
                content_type = 'image/gif'
            
            s3.put_object(
                Bucket='files',
                Key=key,
                Body=image_data,
                ContentType=content_type
            )
            
            cdn_url = f"https://cdn.poehali.dev/projects/{os.environ['AWS_ACCESS_KEY_ID']}/bucket/{key}"
            
            return {
                'statusCode': 200,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'body': json.dumps({
                    'success': True,
                    'url': cdn_url,
                    'key': key
                }),
                'isBase64Encoded': False
            }
            
        except Exception as e:
            return {
                'statusCode': 500,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'body': json.dumps({'error': f'Ошибка загрузки: {str(e)}'}),
                'isBase64Encoded': False
            }
    
    return {
        'statusCode': 405,
        'headers': {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        },
        'body': json.dumps({'error': 'Метод не поддерживается'}),
        'isBase64Encoded': False
    }
