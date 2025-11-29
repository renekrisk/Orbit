variable "aws_region" {
  description = "AWS region"
  default     = "us-east-1"
}

variable "project_name" {
  description = "Project name"
  default     = "orbit"
}

variable "environment" {
  description = "Environment (dev, prod)"
  default     = "dev"
}
