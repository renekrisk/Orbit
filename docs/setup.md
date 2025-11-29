# ORBIT Setup Guide

## Prerequisites
- Node.js 20+
- npm
- AWS CLI configured (for infrastructure deployment)
- Terraform (for infrastructure)

## Quick Start

### 1. Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

The frontend will be available at `http://localhost:3000`.

### 2. Backend Setup
```bash
cd backend
npm install
npm run build
```

### 3. Infrastructure Deployment (Optional)
```bash
cd infrastructure
terraform init
terraform plan
terraform apply
```

This will create:
- DynamoDB tables (Tasks, Notes, Activity)
- Cognito User Pool
- S3 bucket for assets
- API Gateway

## Environment Variables

Create a `.env.local` file in the `frontend` directory:
```
NEXT_PUBLIC_API_URL=https://your-api-gateway-url
NEXT_PUBLIC_USER_POOL_ID=your-cognito-pool-id
NEXT_PUBLIC_USER_POOL_CLIENT_ID=your-cognito-client-id
```

## Features

- **Landing Page**: Premium design with gradient hero section
- **Tasks**: Create, view, and manage tasks with priorities
- **Notes**: Rich note-taking with AI-powered tag suggestions
- **Command Palette**: Press `Cmd+K` (Mac) or `Ctrl+K` (Windows) to access
- **AI Chat**: Click the sparkle button in the bottom-right corner
- **Dark Mode**: Automatically adapts to system preferences

## Tech Stack

- **Frontend**: Next.js 16, React 19, Tailwind CSS v4, TypeScript
- **Backend**: Node.js, AWS Lambda, DynamoDB
- **AI**: TensorFlow.js, Universal Sentence Encoder
- **Infrastructure**: Terraform, AWS (Cognito, S3, API Gateway)
