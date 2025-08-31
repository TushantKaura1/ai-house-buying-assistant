#!/bin/bash

echo "🚀 Starting AI Realtor Assistant Frontend..."
echo "=========================================="

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 18+ first."
    exit 1
fi

# Check Node.js version
NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
    echo "❌ Node.js version 18+ is required. Current version: $(node -v)"
    exit 1
fi

echo "✅ Node.js version: $(node -v)"

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed. Please install npm first."
    exit 1
fi

echo "✅ npm version: $(npm -v)"

# Install dependencies if node_modules doesn't exist
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
    if [ $? -ne 0 ]; then
        echo "❌ Failed to install dependencies"
        exit 1
    fi
    echo "✅ Dependencies installed successfully"
else
    echo "✅ Dependencies already installed"
fi

# Check if backend URL is configured
if [ -z "$REACT_APP_API_URL" ]; then
    echo "⚠️  Warning: REACT_APP_API_URL not set"
    echo "   Frontend will try to connect to http://localhost:5000"
    echo "   Make sure your backend is running on that port"
    echo "   Or set REACT_APP_API_URL environment variable"
fi

echo ""
echo "🌐 Starting development server..."
echo "   Frontend will be available at: http://localhost:3000"
echo "   Make sure your backend is running at: http://localhost:5000"
echo ""
echo "   Press Ctrl+C to stop the server"
echo "=========================================="

# Start the development server
npm start
