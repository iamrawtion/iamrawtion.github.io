#!/bin/bash

echo "=========================================="
echo "  Starting Local Web Server for Blog"
echo "=========================================="
echo ""
echo "Choose a server option:"
echo ""
echo "1. Python 3 (Recommended)"
echo "2. Python 2"
echo "3. PHP"
echo "4. Node.js (requires npx)"
echo ""
read -p "Enter your choice (1-4): " choice

PORT=8000

case $choice in
    1)
        echo ""
        echo "Starting Python 3 server on port $PORT..."
        echo "Visit: http://localhost:$PORT/blog.html"
        echo ""
        echo "Press Ctrl+C to stop the server"
        echo ""
        python3 -m http.server $PORT
        ;;
    2)
        echo ""
        echo "Starting Python 2 server on port $PORT..."
        echo "Visit: http://localhost:$PORT/blog.html"
        echo ""
        echo "Press Ctrl+C to stop the server"
        echo ""
        python -m SimpleHTTPServer $PORT
        ;;
    3)
        echo ""
        echo "Starting PHP server on port $PORT..."
        echo "Visit: http://localhost:$PORT/blog.html"
        echo ""
        echo "Press Ctrl+C to stop the server"
        echo ""
        php -S localhost:$PORT
        ;;
    4)
        echo ""
        echo "Starting Node.js server..."
        echo "Visit: http://localhost:8080/blog.html (or the port shown below)"
        echo ""
        echo "Press Ctrl+C to stop the server"
        echo ""
        npx serve
        ;;
    *)
        echo "Invalid choice. Defaulting to Python 3..."
        echo ""
        echo "Visit: http://localhost:$PORT/blog.html"
        echo ""
        python3 -m http.server $PORT
        ;;
esac
