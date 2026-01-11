import json
import os
import psycopg2
from psycopg2.extras import RealDictCursor

def handler(event: dict, context) -> dict:
    """
    API для управления товарами магазина.
    Поддерживает CRUD операции для товаров, включая цифровые.
    """
    method = event.get('httpMethod', 'GET')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
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
            shop_id = params.get('shop_id')
            
            if not shop_id:
                cur.execute(
                    f"SELECT * FROM {os.environ['MAIN_DB_SCHEMA']}.products ORDER BY created_at DESC"
                )
            else:
                cur.execute(
                    f"SELECT * FROM {os.environ['MAIN_DB_SCHEMA']}.products WHERE shop_id = %s ORDER BY created_at DESC",
                    (shop_id,)
                )
            
            products = cur.fetchall()
            
            return {
                'statusCode': 200,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'body': json.dumps({'products': products}, default=str),
                'isBase64Encoded': False
            }
        
        elif method == 'POST':
            body = json.loads(event.get('body', '{}'))
            
            cur.execute(
                f"""
                INSERT INTO {os.environ['MAIN_DB_SCHEMA']}.products 
                (shop_id, category_id, name, description, price, stock, type, digital_content, images, status)
                VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
                RETURNING *
                """,
                (
                    body.get('shop_id'),
                    body.get('category_id'),
                    body.get('name'),
                    body.get('description'),
                    body.get('price'),
                    body.get('stock', 0),
                    body.get('type', 'physical'),
                    body.get('digital_content'),
                    json.dumps(body.get('images', [])),
                    body.get('status', 'active')
                )
            )
            
            product = cur.fetchone()
            conn.commit()
            
            return {
                'statusCode': 201,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'body': json.dumps({'product': product}, default=str),
                'isBase64Encoded': False
            }
        
        elif method == 'PUT':
            body = json.loads(event.get('body', '{}'))
            product_id = body.get('id')
            
            cur.execute(
                f"""
                UPDATE {os.environ['MAIN_DB_SCHEMA']}.products
                SET name = %s, description = %s, price = %s, stock = %s, 
                    type = %s, digital_content = %s, images = %s, status = %s, updated_at = CURRENT_TIMESTAMP
                WHERE id = %s
                RETURNING *
                """,
                (
                    body.get('name'),
                    body.get('description'),
                    body.get('price'),
                    body.get('stock', 0),
                    body.get('type', 'physical'),
                    body.get('digital_content'),
                    json.dumps(body.get('images', [])),
                    body.get('status', 'active'),
                    product_id
                )
            )
            
            product = cur.fetchone()
            conn.commit()
            
            return {
                'statusCode': 200,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'body': json.dumps({'product': product}, default=str),
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
