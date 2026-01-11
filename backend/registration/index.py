import json
import os
import psycopg2
from psycopg2.extras import RealDictCursor
from datetime import datetime, timedelta

def handler(event: dict, context) -> dict:
    """
    API для регистрации новых пользователей с модерацией.
    POST - создание заявки, GET - список заявок, PUT - модерация.
    """
    method = event.get('httpMethod', 'POST')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, GET, PUT, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Max-Age': '86400'
            },
            'body': '',
            'isBase64Encoded': False
        }
    
    conn = psycopg2.connect(os.environ['DATABASE_URL'])
    cur = conn.cursor(cursor_factory=RealDictCursor)
    
    try:
        if method == 'POST':
            body = json.loads(event.get('body', '{}'))
            
            full_name = body.get('full_name')
            inn = body.get('inn')
            phone = body.get('phone')
            telegram_username = body.get('telegram_username')
            email = body.get('email')
            
            if not all([full_name, inn, phone, telegram_username, email]):
                return {
                    'statusCode': 400,
                    'headers': {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*'
                    },
                    'body': json.dumps({
                        'error': 'Все поля обязательны для заполнения'
                    }),
                    'isBase64Encoded': False
                }
            
            cur.execute(
                f"""
                INSERT INTO {os.environ['MAIN_DB_SCHEMA']}.registration_requests 
                (full_name, inn, phone, telegram_username, email, status)
                VALUES (%s, %s, %s, %s, %s, %s)
                RETURNING id
                """,
                (full_name, inn, phone, telegram_username, email, 'pending')
            )
            
            request_id = cur.fetchone()['id']
            conn.commit()
            
            cur.execute(
                f"SELECT value FROM {os.environ['MAIN_DB_SCHEMA']}.admin_settings WHERE key = 'moderation_email'"
            )
            admin_email_setting = cur.fetchone()
            admin_email = admin_email_setting['value']['email'] if admin_email_setting else 'admin@vio-marketolog.ru'
            
            email_body = f"""
Новая заявка на регистрацию магазина VIO marketolog

ID заявки: {request_id}
ФИО: {full_name}
ИНН: {inn}
Телефон: {phone}
Telegram: @{telegram_username}
Email: {email}

Проверьте данные и одобрите заявку в админ-панели.
            """
            
            return {
                'statusCode': 200,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'body': json.dumps({
                    'success': True,
                    'request_id': request_id,
                    'message': 'Заявка отправлена на модерацию. Ожидайте подтверждения в Telegram.'
                }),
                'isBase64Encoded': False
            }
        
        elif method == 'GET':
            params = event.get('queryStringParameters', {}) or {}
            status_filter = params.get('status', 'all')
            
            if status_filter == 'all':
                cur.execute(
                    f"SELECT * FROM {os.environ['MAIN_DB_SCHEMA']}.registration_requests ORDER BY created_at DESC"
                )
            else:
                cur.execute(
                    f"SELECT * FROM {os.environ['MAIN_DB_SCHEMA']}.registration_requests WHERE status = %s ORDER BY created_at DESC",
                    (status_filter,)
                )
            
            requests = cur.fetchall()
            
            return {
                'statusCode': 200,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'body': json.dumps({'requests': requests}, default=str),
                'isBase64Encoded': False
            }
        
        elif method == 'PUT':
            body = json.loads(event.get('body', '{}'))
            request_id = body.get('request_id')
            action = body.get('action')
            admin_notes = body.get('admin_notes', '')
            
            if not request_id or action not in ['approve', 'reject']:
                return {
                    'statusCode': 400,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps({'error': 'Требуется request_id и action (approve/reject)'}),
                    'isBase64Encoded': False
                }
            
            cur.execute(f"SELECT * FROM {os.environ['MAIN_DB_SCHEMA']}.registration_requests WHERE id = %s", (request_id,))
            request = cur.fetchone()
            
            if not request:
                return {
                    'statusCode': 404,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps({'error': 'Заявка не найдена'}),
                    'isBase64Encoded': False
                }
            
            if action == 'approve':
                cur.execute(f"SELECT value FROM {os.environ['MAIN_DB_SCHEMA']}.admin_settings WHERE key = 'trial_period_days'")
                trial_setting = cur.fetchone()
                trial_days = trial_setting['value']['days'] if trial_setting else 30
                trial_expires = datetime.now() + timedelta(days=trial_days)
                
                cur.execute(
                    f"""
                    INSERT INTO {os.environ['MAIN_DB_SCHEMA']}.users 
                    (email, name, full_name, inn, phone, telegram_username, role, moderation_status, subscription_status, trial_expires_at, password_hash)
                    VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
                    RETURNING id
                    """,
                    (request['email'], request['full_name'], request['full_name'], request['inn'], request['phone'], request['telegram_username'], 'user', 'approved', 'trial', trial_expires, 'temp_password')
                )
                user_id = cur.fetchone()['id']
                
                cur.execute(
                    f"UPDATE {os.environ['MAIN_DB_SCHEMA']}.registration_requests SET status = 'approved', admin_notes = %s, reviewed_at = CURRENT_TIMESTAMP WHERE id = %s",
                    (admin_notes, request_id)
                )
                conn.commit()
                
                return {
                    'statusCode': 200,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps({'success': True, 'user_id': user_id, 'message': 'Заявка одобрена'}),
                    'isBase64Encoded': False
                }
            
            elif action == 'reject':
                cur.execute(
                    f"UPDATE {os.environ['MAIN_DB_SCHEMA']}.registration_requests SET status = 'rejected', admin_notes = %s, reviewed_at = CURRENT_TIMESTAMP WHERE id = %s",
                    (admin_notes, request_id)
                )
                conn.commit()
                
                return {
                    'statusCode': 200,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps({'success': True, 'message': 'Заявка отклонена'}),
                    'isBase64Encoded': False
                }
        
    except Exception as e:
        conn.rollback()
        return {
            'statusCode': 500,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': str(e)}),
            'isBase64Encoded': False
        }
    finally:
        cur.close()
        conn.close()
    
    return {
        'statusCode': 405,
        'headers': {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        },
        'body': json.dumps({'error': 'Метод не поддерживается'}),
        'isBase64Encoded': False
    }