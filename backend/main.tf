
# DynamoDB table module for storing inventory items
module "dynamodb" {
  source              = "./terraform/modules/dynamodb"
  dynamodb_table_name = var.dynamodb_table_name
}

# Lambda functions module for inventory management
module "lambda" {
  source              = "./terraform/modules/lambda"
  lambda_role_arn     = module.iam.lambda_role_arn
  dynamodb_table_name = var.dynamodb_table_name

  # Ensure IAM roles are created before Lambda
  depends_on = [module.iam]
}

# IAM module for managing service roles and policies
module "iam" {
  source              = "./terraform/modules/iam"
  region              = var.region
  dynamodb_table_name = var.dynamodb_table_name

  # Ensure S3 and DynamoDB resources exist before creating IAM policies
  depends_on = [module.dynamodb]
}

# API Gateway module for exposing Lambda functions
module "api_gateway" {
  source                          = "./terraform/modules/api_gateway"
  inventory_functions_invoke_arns = module.lambda.inventory_functions_invoke_arns
  inventory_functions_names       = module.lambda.inventory_functions_names

  # Ensure Lambda functions exist before creating API Gateway
  depends_on = [module.lambda]
}
