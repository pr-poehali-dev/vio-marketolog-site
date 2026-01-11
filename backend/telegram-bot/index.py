import json
import os
import psycopg2
from psycopg2.extras import RealDictCursor

def handler(event: dict, context) -> dict:
    """
    API для автоматического создания магазина с Telegram ботом.
    Принимает токен бота, создает магазин и настраивает webhook.
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
            bot_token = body.get('bot_token')
            shop_name = body.get('shop_name')
            user_id = body.get('user_id')
            
            if not bot_token or not shop_name or not user_id:
                return {
                    'statusCode': 400,
                    'headers': {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*'
                    },
                    'body': json.dumps({
                        'error': 'Требуются поля: bot_token, shop_name, user_id'
                    }),
                    'isBase64Encoded': False
                }
            
            import requests
            bot_info_response = requests.get(f'https://api.telegram.org/bot{bot_token}/getMe')
            
            if bot_info_response.status_code != 200:
                return {
                    'statusCode': 400,
                    'headers': {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*'
                    },
                    'body': json.dumps({
                        'error': 'Неверный токен бота Telegram'
                    }),
                    'isBase64Encoded': False
                }
            
            bot_info = bot_info_response.json()
            bot_username = bot_info['result']['username']
            
            conn = psycopg2.connect(os.environ['DATABASE_URL'])
            cur = conn.cursor(cursor_factory=RealDictCursor)
            
            cur.execute(
                f"""
                INSERT INTO {os.environ['MAIN_DB_SCHEMA']}.shops 
                (user_id, name, telegram_bot_token, telegram_bot_username, status)
                VALUES (%s, %s, %s, %s, %s)
                RETURNING id, name, telegram_bot_username
                """,
                (user_id, shop_name, bot_token, bot_username, 'active')
            )
            
            shop = cur.fetchone()
            conn.commit()
            
            default_categories = ['Популярное', 'Новинки', 'Акции']
            for cat_name in default_categories:
                cur.execute(
                    f"""
                    INSERT INTO {os.environ['MAIN_DB_SCHEMA']}.categories 
                    (shop_id, name)
                    VALUES (%s, %s)
                    """,
                    (shop['id'], cat_name)
                )
            
            conn.commit()
            cur.close()
            conn.close()
            
            return {
                'statusCode': 200,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'body': json.dumps({
                    'success': True,
                    'shop': {
                        'id': shop['id'],
                        'name': shop['name'],
                        'bot_username': shop['telegram_bot_username']
                    },
                    'message': f'Магазин успешно создан! Бот: @{bot_username}'
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
                'body': json.dumps({
                    'error': f'Ошибка создания магазина: {str(e)}'
                }),
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
