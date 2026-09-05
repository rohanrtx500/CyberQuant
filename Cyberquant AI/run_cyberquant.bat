@echo off
echo ==============================================================================
echo                 Starting CyberQuant AI Platform (SIH26105)
echo                     Organization: Aegis FinServe Ltd.
echo ==============================================================================

echo [1/2] Launching Python FastAPI Risk Engine on port 8000...
start "CyberQuant AI Backend (FastAPI)" cmd /k "cd backend && .venv\Scripts\python.exe run_backend.py"

timeout /t 3 /nobreak >nul

echo [2/2] Launching Next.js Enterprise Dashboard on port 3000...
start "CyberQuant AI Frontend (Next.js)" cmd /k "cd frontend && npm run dev"

echo.
echo All services launched!
echo Open your browser at: http://localhost:3000/dashboard
echo API Documentation at: http://localhost:8000/docs
echo ==============================================================================
