resource "aws_s3_bucket" "assets" {
  bucket = "${var.project_name}-${var.environment}-assets-${data.aws_caller_identity.current.account_id}"

  tags = {
    Name        = "AssetsBucket"
    Environment = var.environment
  }
}

data "aws_caller_identity" "current" {}
