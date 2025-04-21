import json
import boto3
import os
from decimal import Decimal

# Custom JSON encoder to handle Decimal types
class DecimalEncoder(json.JSONEncoder):
    def default(self, obj):
        if isinstance(obj, Decimal):
            return float(obj)
        return super(DecimalEncoder, self).default(obj)

def lambda_handler(event, context):
    # Initialize DynamoDB
    dynamodb = boto3.resource('dynamodb')
    table = dynamodb.Table(os.environ.get('DYNAMODB_TABLE'))
    
    try:
        # Check for specific item request
        query_params = event.get('queryStringParameters', {})
        
        if query_params and query_params.get('itemId'):
            # Get specific item
            response = table.get_item(
                Key={'itemId': query_params['itemId']}
            )
            item = response.get('Item')
            
            if not item:
                return {
                    'statusCode': 404,
                    'headers': get_headers(),
                    'body': json.dumps({'message': 'Item not found'})
                }
            
            return {
                'statusCode': 200,
                'headers': get_headers(),
                'body': json.dumps({'item': item}, cls=DecimalEncoder)  # Use custom encoder
            }
        
        # Get all items
        response = table.scan()
        items = response.get('Items', [])
        
        return {
            'statusCode': 200,
            'headers': get_headers(),
            'body': json.dumps({'items': items}, cls=DecimalEncoder)  # Use custom encoder
        }
        
    except Exception as e:
        print(f"Error: {str(e)}")
        return {
            'statusCode': 500,
            'headers': get_headers(),
            'body': json.dumps({
                'message': 'Failed to retrieve items',
                'error': str(e)
            })
        }

def get_headers():
    return {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type'
    }
