@echo off
echo ============================================
echo   Personal Workout Tracker - Local Setup
echo ============================================
echo.

echo [1/4] Copying .env file...
copy backend\.env.example backend\.env
echo Done.

echo.
echo [2/4] Installing backend dependencies...
cd backend
call npm install
cd ..

echo.
echo [3/4] Installing frontend dependencies...
cd frontend
call npm install
cd ..

echo.
echo [4/4] Starting the app...
echo.
echo  Backend:  http://localhost:5001
echo  Frontend: http://localhost:3000
echo.
echo  Login with: test@example.com / password123
echo.
call npm run dev
