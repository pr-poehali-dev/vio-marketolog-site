import json
import os
import psycopg2
from psycopg2.extras import RealDictCursor

def handler(event: dict, context) -> dict:
    """
    API для управления настройками админа.
    Позволяет редактировать тарифы, кнопки, реквизиты оплаты.
    """
    method = event.get('httpMethod', 'GET')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, PUT, POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Max-Age': '86400'
            },
            'body': '',
            'isBase64Encoded': False
        }
    
    conn = psycopg2.connect(os.environ['DATABASE_URL'])
    cur = conn.cursor(cursor_factory=RealDictCursor)
    
    try:
        if method == 'GET':
            params = event.get('queryStringParameters', {}) or {}
            setting_type = params.get('type', 'all')
            
            if setting_type == 'plans':
                cur.execute(
                    f"SELECT * FROM {os.environ['MAIN_DB_SCHEMA']}.plans ORDER BY price"
                )
                plans = cur.fetchall()
                
                return {
                    'statusCode': 200,
                    'headers': {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*'
                    },
                    'body': json.dumps({'plans': plans}, default=str),
                    'isBase64Encoded': False
                }
            
            elif setting_type == 'settings':
                cur.execute(
                    f"SELECT * FROM {os.environ['MAIN_DB_SCHEMA']}.admin_settings"
                )
                settings = cur.fetchall()
                
                return {
                    'statusCode': 200,
                    'headers': {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*'
                    },
                    'body': json.dumps({'settings': settings}, default=str),
                    'isBase64Encoded': False
                }
            
            else:
                cur.execute(f"SELECT * FROM {os.environ['MAIN_DB_SCHEMA']}.plans ORDER BY price")
                plans = cur.fetchall()
                cur.execute(f"SELECT * FROM {os.environ['MAIN_DB_SCHEMA']}.admin_settings")
                settings = cur.fetchall()
                
                return {
                    'statusCode': 200,
                    'headers': {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*'
                    },
                    'body': json.dumps({'plans': plans, 'settings': settings}, default=str),
                    'isBase64Encoded': False
                }
        
        elif method == 'PUT':
            body = json.loads(event.get('body', '{}'))
            update_type = body.get('type')
            
            if update_type == 'plan':
                cur.execute(
                    f"""
                    UPDATE {os.environ['MAIN_DB_SCHEMA']}.plans
                    SET name = %s, price = %s, description = %s, features = %s, 
                        max_products = %s, max_shops = %s, is_active = %s, updated_at = CURRENT_TIMESTAMP
                    WHERE id = %s
                    RETURNING *
                    """,
                    (
                        body.get('name'),
                        body.get('price'),
                        body.get('description'),
                        json.dumps(body.get('features', [])),
                        body.get('max_products'),
                        body.get('max_shops'),
                        body.get('is_active', True),
                        body.get('id')
                    )
                )
                
                plan = cur.fetchone()
                conn.commit()
                
                return {
                    'statusCode': 200,
                    'headers': {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*'
                    },
                    'body': json.dumps({'plan': plan}, default=str),
                    'isBase64Encoded': False
                }
            
            elif update_type == 'setting':
                setting_key = body.get('key')
                setting_value = body.get('value')
                
                cur.execute(
                    f"""
                    UPDATE {os.environ['MAIN_DB_SCHEMA']}.admin_settings
                    SET value = %s, updated_at = CURRENT_TIMESTAMP
                    WHERE key = %s
                    RETURNING *
                    """,
                    (json.dumps(setting_value), setting_key)
                )
                
                setting = cur.fetchone()
                conn.commit()
                
                return {
                    'statusCode': 200,
                    'headers': {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*'
                    },
                    'body': json.dumps({'setting': setting}, default=str),
                    'isBase64Encoded': False
                }
        
        elif method == 'POST':
            body = json.loads(event.get('body', '{}'))
            
            cur.execute(
                f"""
                INSERT INTO {os.environ['MAIN_DB_SCHEMA']}.plans 
                (name, price, description, features, max_products, max_shops, is_active)
                VALUES (%s, %s, %s, %s, %s, %s, %s)
                RETURNING *
                """,
                (
                    body.get('name'),
                    body.get('price'),
                    body.get('description'),
                    json.dumps(body.get('features', [])),
                    body.get('max_products'),
                    body.get('max_shops'),
                    body.get('is_active', True)
                )
            )
            
            plan = cur.fetchone()
            conn.commit()
            
            return {
                'statusCode': 201,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'body': json.dumps({'plan': plan}, default=str),
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
