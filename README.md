# AWS News Upload App

A simple Next.js app to upload and view news articles with images, using AWS Lambda, DynamoDB, and S3.

## Features

- User authentication (sign up & login)
- Only logged-in users can upload news
- Upload news with title, description, and image
- View all news in a modern, responsive UI

## Prerequisites

- Node.js 16.x or later
- AWS account with:
  - Lambda functions for news and auth
  - DynamoDB table for users/news
  - S3 bucket for images (if storing images as files)
  - API Gateway endpoints for news and auth

## Getting Started

### 1. Clone the repository

```bash
# Clone the repo
git clone <your-repo-url>
cd aws-news-upload-app
```

### 2. Set up environment variables

Copy the example file and fill in your API endpoints:

```bash
cp .env.local.example .env.local
```

Edit `.env.local` and set:

```
NEXT_PUBLIC_API_GATEWAY_ENDPOINT=<your-news-lambda-endpoint>
NEXT_PUBLIC_API_GATEWAY_ENDPOINT_AUTH=<your-auth-lambda-endpoint>
```

### 3. Install dependencies

```bash
npm install
# or
yarn install
# or
pnpm install
```

### 4. Run the app locally

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Visit [http://localhost:3000](http://localhost:3000) to use the app.

## Usage

- **Sign Up:** Create a new account with your email, name, and password.
- **Login:** Log in with your email and password.
- **Upload News:** After logging in, fill the form to upload news with an image.
- **View News:** Go to `/news` to see all news articles.
- **Logout:** Use the logout button to end your session.

## AWS Backend (Required)

- **Auth Lambda:** Handles `/signup` and `/login` (see `auth` Lambda example in this repo).
- **News Lambda:** Handles news upload and fetch (see `create-news` Lambda example in this repo).
- **DynamoDB:** Stores user and news data.
- **S3 (optional):** Stores images if not using base64.
- **API Gateway:** Exposes Lambda endpoints to the app.

## Deployment

- Deploy the frontend to Vercel, Netlify, or your server.
- Deploy AWS backend using AWS Console, SAM, CDK, or Serverless Framework.

## Tech Stack

- Next.js
- Tailwind CSS
- AWS Lambda, API Gateway, DynamoDB, S3

## License

MIT
