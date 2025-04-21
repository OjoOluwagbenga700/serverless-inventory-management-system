resource "aws_dynamodb_table" "inventory_table" {
  name           = var.dynamodb_table_name
  billing_mode   = "PAY_PER_REQUEST"
  hash_key       = "itemId"
  
  attribute {
    name = "itemId"
    type = "S"
  }
}