
variable "region" {
  description = "The AWS region to deploy the resources"
  type        = string
  default     = "us-east-1"
}
variable "function_name" {
  description = "The name of the Lambda function"
  type        = string
  default     = "inventory-function"
}



variable "dynamodb_table_name" {
  description = "The name of the DynamoDB table"
  type        = string
  default     = "inventory-table"
}
