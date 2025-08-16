@echo off
echo Starting backend...
start /B cmd /c "cd backend-bytte-operaciones && npm start"

echo Starting frontend...
start /B cmd /c "cd frontend-bytte-operaciones && npm start"

echo Both processes are running. Close this window to stop them.
