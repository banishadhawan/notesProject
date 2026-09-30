# MERN Notes Application

A full-stack Notes Application built using the MERN stack. Users can securely register, log in, and manage their personal notes with authentication and authorization.

## Live Demo

**Frontend:** https://notes-project-dun.vercel.app/

**Backend:** https://notes-backend-ym33.onrender.com

## Features

* User registration and login
* JWT-based authentication
* Protected routes and authorization
* Create, read, update, and delete notes
* Users can manage their own notes
* Redis integration using Upstash
* MongoDB Atlas for database storage
* RESTful API
* Responsive user interface
* Production deployment using Vercel and Render

## Tech Stack

### Frontend

* React.js
* Vite
* JavaScript
* HTML
* CSS

### Backend

* Node.js
* Express.js
* REST API
* JWT Authentication

### Database & Services

* MongoDB Atlas
* Upstash Redis

### Deployment

* Vercel — Frontend
* Render — Backend

## Project Structure

```text
notesProject/
├── frontend/
│   ├── src/
│   ├── public/
│   └── package.json
│
├── backend/
│   ├── src/
│   ├── package.json
│   └── .env
│
├── .gitignore
└── README.md
```

## Environment Variables

### Backend

Create a `.env` file inside the `backend` folder:

```env
MONGO_URI=your_mongodb_connection_string
UPSTASH_REDIS_REST_URL=your_upstash_redis_url
UPSTASH_REDIS_REST_TOKEN=your_upstash_redis_token
JWT_SECRET=your_jwt_secret
PORT=5001
FRONTEND_URL=http://localhost:5173
```

### Frontend

Create a `.env` file inside the `frontend` folder:

```env
VITE_API_URL=http://localhost:5001
```

For production, configure the frontend environment variable with your deployed Render backend URL.

**Note:** Never commit `.env` files or secret credentials to GitHub.

## Run Locally

### 1. Clone the repository

```bash
git clone https://github.com/banishadhawan/notesProject.git
cd notesProject
```

### 2. Install backend dependencies

```bash
cd backend
npm install
```

### 3. Start the backend

```bash
npm run dev
```

### 4. Install frontend dependencies

Open another terminal:

```bash
cd frontend
npm install
```

### 5. Start the frontend

```bash
npm run dev
```

The application will be available locally at:

```text
http://localhost:5173
```

## Deployment

The application is deployed using:

* **Frontend:** Vercel
* **Backend:** Render
* **Database:** MongoDB Atlas
* **Redis:** Upstash

The frontend communicates with the deployed Express.js backend through the configured `VITE_API_URL`, and CORS is configured to allow the production frontend.

## Author

**Banisha Dhawan**

GitHub: https://github.com/banishadhawan
