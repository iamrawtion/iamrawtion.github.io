@echo off
echo ==========================================
echo   Starting Local Web Server for Blog
echo ==========================================
echo.
echo Starting Python server on port 8000...
echo Visit: http://localhost:8000/blog.html
echo.
echo Press Ctrl+C to stop the server
echo.
python -m http.server 8000
