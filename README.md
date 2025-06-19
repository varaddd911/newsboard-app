# AWS News Upload Application

A Next.js application for uploading and viewing news articles using AWS services.

## Features

- Upload news articles with images to AWS
- View all news articles in a responsive grid layout
- Serverless architecture using AWS Lambda and API Gateway
- Modern UI with Tailwind CSS

## Getting Started

### Prerequisites

- Node.js 16.x or later
- An AWS account with appropriate permissions
- API Gateway endpoints for uploading and fetching news

### Environment Setup

1. Clone the repository
2. Copy the example environment file and update with your AWS endpoints:

```bash
cp .env.local.example .env.local
```

3. Update the `.env.local` file with your actual API Gateway endpoints:

```
NEXT_PUBLIC_API_GATEWAY_ENDPOINT=your-api-gateway-endpoint-for-uploading
NEXT_PUBLIC_API_GATEWAY_GET_NEWS_ENDPOINT=your-api-gateway-endpoint-for-getting-news
```

### Installation

```bash
npm install
# or
yarn install
# or
pnpm install
```

### Running the Application

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the upload form.
Visit [http://localhost:3000/news](http://localhost:3000/news) to see the news feed.

## AWS Infrastructure

This application expects the following AWS resources:

- API Gateway with endpoints for:
  - POST /news - For uploading news articles
  - GET /news - For retrieving news articles
- AWS Lambda functions to process requests
- Amazon S3 bucket to store images
- DynamoDB table to store news metadata

## Deployment

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new) from the creators of Next.js.

For the AWS backend, consider using AWS CDK, SAM, or CloudFormation to deploy the required resources.

## Built With

- [Next.js](https://nextjs.org/) - React framework
- [Tailwind CSS](https://tailwindcss.com/) - CSS framework
- [AWS API Gateway](https://aws.amazon.com/api-gateway/) - RESTful API
- [AWS Lambda](https://aws.amazon.com/lambda/) - Serverless functions
