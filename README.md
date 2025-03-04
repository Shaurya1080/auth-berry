
# Authentication Demo Project

## Project Overview

This is a complete authentication demo project with a real Express.js backend. It demonstrates a full authentication flow including user registration, login, and protected routes.

## Features

- User registration with secure password hashing
- User login with JWT token authentication
- Protected routes and API endpoints
- Responsive design with smooth animations
- Dashboard with user information

## Technology Stack

### Frontend
- Vite
- TypeScript
- React
- React Router
- shadcn-ui components
- Tailwind CSS
- Framer Motion for animations

### Backend
- Express.js
- JWT authentication
- bcryptjs for password hashing
- CORS for cross-origin requests

## Getting Started

### Local Development

To run this project locally:

```sh
# Step 1: Clone the repository
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory
cd <YOUR_PROJECT_NAME>

# Step 3: Install dependencies
npm install

# Step 4: Create an .env file from example
cp .env.example .env
# Edit the .env file to set your JWT_SECRET

# Step 5: Start the development server
npm run dev
```

This will start both the React frontend and Express backend concurrently.

## Deploying to Render

This project is configured for easy deployment to Render:

1. Create a new Web Service on Render
2. Link your repository
3. Set the following configuration:
   - **Build Command**: `npm run build`
   - **Start Command**: `node server.js`
   - **Environment Variables**:
     - `PORT`: 10000 (or your preferred port)
     - `JWT_SECRET`: your-secret-key (use a strong random string)
     - `NODE_ENV`: production

Render will automatically build and deploy your application.

## Project Structure

- `/src` - Frontend React application
- `/server` - Express.js backend API
- `/dist` - Built frontend (generated during build)

## API Endpoints

- `POST /api/register` - Register a new user
- `POST /api/login` - Authenticate a user
- `GET /api/users/me` - Get authenticated user data (requires authentication)
