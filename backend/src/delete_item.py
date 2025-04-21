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
        # Get itemId from query parameters
        query_params = event.get('queryStringParameters', {})
        item_id = query_params.get('itemId')
        
        if not item_id:
            return {
                'statusCode': 400,
                'headers': get_headers(),
                'body': json.dumps({'message': 'itemId is required'})
            }
        
        # Check if item exists and get it before deletion
        response = table.get_item(Key={'itemId': item_id})
        if 'Item' not in response:
            return {
                'statusCode': 404,
                'headers': get_headers(),
                'body': json.dumps({'message': 'Item not found'})
            }
        
        # Store item for response
        deleted_item = response['Item']
        
        # Delete item
        table.delete_item(Key={'itemId': item_id})
        
        return {
            'statusCode': 200,
            'headers': get_headers(),
            'body': json.dumps({
                'message': 'Item deleted successfully',
                'item': deleted_item
            }, cls=DecimalEncoder)  # Use custom encoder for response
        }
        
    except Exception as e:
        print(f"Error: {str(e)}")
        return {
            'statusCode': 500,
            'headers': get_headers(),
            'body': json.dumps({
                'message': 'Failed to delete item',
                'error': str(e)
            })
        }

def get_headers():
    return {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type'
    }
