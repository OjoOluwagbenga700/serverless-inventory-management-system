output "inventory_table_name" {
  value = aws_dynamodb_table.inventory_table.name
  
}

output "inventory_table_arn" {
  value = aws_dynamodb_table.inventory_table.arn
  
}