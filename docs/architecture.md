# ORBIT Architecture

## Overview
ORBIT uses a serverless architecture on AWS.

## Components

### Frontend
- **Next.js**: Hosted on Vercel or AWS Amplify (or S3+CloudFront).
- **State**: React Context for global state (User, Theme).
- **API Client**: Axios or Fetch wrapper to communicate with API Gateway.

### Backend
- **API Gateway**: HTTP API acting as the entry point.
- **Lambda**: Node.js functions for business logic.
  - `getTasks`, `createTask`, `updateTask`
  - `getNotes`, `createNote`, `searchNotes`
- **DynamoDB**: NoSQL database.
  - Single-table design or separate tables (we chose separate for simplicity).

### AI Integration
- **Client-side**: TensorFlow.js for immediate feedback (e.g., keyword extraction).
- **Server-side**: OpenAI API (via Lambda) for complex summarization and Q&A.
