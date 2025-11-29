resource "aws_dynamodb_table" "tasks" {
  name           = "${var.project_name}-${var.environment}-tasks"
  billing_mode   = "PAY_PER_REQUEST"
  hash_key       = "userId"
  range_key      = "taskId"

  attribute {
    name = "userId"
    type = "S"
  }

  attribute {
    name = "taskId"
    type = "S"
  }

  tags = {
    Name        = "Tasks"
    Environment = var.environment
  }
}

resource "aws_dynamodb_table" "notes" {
  name           = "${var.project_name}-${var.environment}-notes"
  billing_mode   = "PAY_PER_REQUEST"
  hash_key       = "userId"
  range_key      = "noteId"

  attribute {
    name = "userId"
    type = "S"
  }

  attribute {
    name = "noteId"
    type = "S"
  }

  tags = {
    Name        = "Notes"
    Environment = var.environment
  }
}

resource "aws_dynamodb_table" "activity" {
  name           = "${var.project_name}-${var.environment}-activity"
  billing_mode   = "PAY_PER_REQUEST"
  hash_key       = "userId"
  range_key      = "timestamp"

  attribute {
    name = "userId"
    type = "S"
  }

  attribute {
    name = "timestamp"
    type = "S"
  }

  tags = {
    Name        = "Activity"
    Environment = var.environment
  }
}
