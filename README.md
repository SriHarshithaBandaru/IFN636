# Personal Workout Tracker

A full-stack CRUD application built with the MERN stack (MongoDB, Express.js, React.js, Node.js) that allows users to track their personal workouts.

## Project Overview

This application extends a starter authentication project with full CRUD (Create, Read, Update, Delete) operations for workout management. Users can register, log in, and manage their personal workout logs with details like exercise name, category, duration, sets, reps, weight, and calories burned.

**Public URL:** http://3.107.212.191 (Frontend)
**Public URL:** http://3.107.212.191/api (Backend API)

## Project Setup Instructions

### Prerequisites

- Node.js (v18 or higher)
- MongoDB (local or MongoDB Atlas)
- npm (Node Package Manager)
- Git

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/SriHarshithaBandaru/IFN636.git
   cd IFN636
   ```

2. **Set up backend environment variables:**
   Create a `.env` file in the `backend/` directory:
   ```
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   PORT=5001
   ```

3. **Install dependencies:**
   ```bash
   # Install backend dependencies
   cd backend && npm install

   # Install frontend dependencies
   cd ../frontend && npm install
   ```

4. **Run the application:**
   ```bash
   # From root directory - runs both backend and frontend
   npm run dev

   # Or run separately:
   # Backend: cd backend && npm run dev
   # Frontend: cd frontend && npm start
   ```

5. **Access the application:**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5001

### Test Credentials

- **Email:** test@example.com
- **Password:** password123

(Or register a new account through the application)

## Features

### Authentication & Authorization
- User registration with name, email, and password
- Secure login with JWT token-based authentication
- Password hashing with bcrypt
- Protected routes requiring valid JWT tokens
- User profile management (name, email, university, address)

### Workout CRUD Operations
- **Create:** Log new workouts with exercise name, category, duration, sets, reps, weight, calories, notes, and date
- **Read:** View all personal workouts sorted by date (newest first)
- **Update:** Edit existing workout entries
- **Delete:** Remove workout entries with confirmation

### Workout Categories
- Cardio, Strength, Flexibility, Balance, HIIT, Other

## Tech Stack

| Layer      | Technology                    |
|------------|-------------------------------|
| Frontend   | React.js 18, Tailwind CSS     |
| Backend    | Node.js, Express.js           |
| Database   | MongoDB with Mongoose ODM     |
| Auth       | JWT, bcrypt                   |
| Testing    | Mocha, Chai, chai-http        |
| CI/CD      | GitHub Actions                |
| Deployment | AWS EC2, PM2                  |

## API Endpoints

### Authentication
| Method | Endpoint             | Description         | Auth Required |
|--------|----------------------|---------------------|---------------|
| POST   | /api/auth/register   | Register new user   | No            |
| POST   | /api/auth/login      | Login user          | No            |
| GET    | /api/auth/profile    | Get user profile    | Yes           |
| PUT    | /api/auth/profile    | Update user profile | Yes           |

### Workouts
| Method | Endpoint            | Description          | Auth Required |
|--------|---------------------|----------------------|---------------|
| GET    | /api/workouts       | Get all workouts     | Yes           |
| GET    | /api/workouts/:id   | Get single workout   | Yes           |
| POST   | /api/workouts       | Create new workout   | Yes           |
| PUT    | /api/workouts/:id   | Update a workout     | Yes           |
| DELETE | /api/workouts/:id   | Delete a workout     | Yes           |

## Project Structure

```
IFN636/
├── .github/workflows/ci.yml    # CI/CD Pipeline
├── backend/
│   ├── config/db.js             # MongoDB connection
│   ├── controllers/
│   │   ├── authController.js    # Auth logic
│   │   └── workoutController.js # Workout CRUD logic
│   ├── middleware/
│   │   └── authMiddleware.js    # JWT verification
│   ├── models/
│   │   ├── User.js              # User schema
│   │   └── Workout.js           # Workout schema
│   ├── routes/
│   │   ├── authRoutes.js        # Auth endpoints
│   │   └── workoutRoutes.js     # Workout endpoints
│   ├── test/
│   │   ├── auth.test.js         # Auth API tests
│   │   └── workout.test.js      # Workout API tests
│   └── server.js                # Express server entry
├── frontend/
│   └── src/
│       ├── components/
│       │   ├── Navbar.jsx
│       │   ├── WorkoutForm.jsx
│       │   └── WorkoutList.jsx
│       ├── context/AuthContext.js
│       ├── pages/
│       │   ├── Login.jsx
│       │   ├── Register.jsx
│       │   ├── Profile.jsx
│       │   └── Workouts.jsx
│       └── App.js
├── package.json
└── README.md
```

## Git Branching Strategy

- `main` - Production-ready code
- `feature/backend-workout-crud` - Backend workout model, controller, and routes
- `feature/frontend-workout-ui` - Frontend workout components and pages
- `feature/cicd-pipeline` - CI/CD workflow configuration
- `feature/testing` - Backend API test suite

## CI/CD Pipeline

The project uses GitHub Actions for continuous integration and deployment:

1. **Test Job:** Runs on every push and pull request to main
   - Installs backend and frontend dependencies
   - Runs backend API tests (Mocha/Chai)
   - Runs frontend tests

2. **Deploy Job:** Runs after successful tests on main branch push
   - SSH into EC2 instance
   - Pulls latest code
   - Installs dependencies
   - Builds frontend
   - Restarts application via PM2

## Author

**Sri Harshitha Bandaru**
IFN636 - Software Life Cycle Management
Queensland University of Technology (QUT)
