#!/bin/bash

echo "🚀 Sassinator Deployment Script"
echo "================================"

# Check if git is initialized
if [ ! -d ".git" ]; then
    echo "❌ Git repository not found. Please initialize git first:"
    echo "   git init"
    echo "   git add ."
    echo "   git commit -m 'Initial commit'"
    echo "   git remote add origin <your-github-repo-url>"
    echo "   git push -u origin main"
    exit 1
fi

# Check if all required files exist
echo "📋 Checking required files..."

required_files=(
    "backend/server.js"
    "backend/package.json"
    "backend/models.js"
    "index.html"
    "login.html"
    "register.html"
    "config.js"
    "render.yaml"
)

for file in "${required_files[@]}"; do
    if [ ! -f "$file" ]; then
        echo "❌ Missing required file: $file"
        exit 1
    fi
done

echo "✅ All required files found!"

# Check if backend dependencies are installed
if [ ! -d "backend/node_modules" ]; then
    echo "📦 Installing backend dependencies..."
    cd backend && npm install && cd ..
fi

# Check if root dependencies are installed
if [ ! -d "node_modules" ]; then
    echo "📦 Installing root dependencies..."
    npm install
fi

echo ""
echo "🎯 Next Steps:"
echo "=============="
echo ""
echo "1. Push your code to GitHub:"
echo "   git add ."
echo "   git commit -m 'Prepare for deployment'"
echo "   git push"
echo ""
echo "2. Set up MongoDB Atlas:"
echo "   - Go to https://www.mongodb.com/atlas"
echo "   - Create a free cluster"
echo "   - Get your connection string"
echo ""
echo "3. Deploy on Render:"
echo "   - Go to https://dashboard.render.com"
echo "   - Create a new Web Service for backend"
echo "   - Create a new Static Site for frontend"
echo "   - Follow the detailed instructions in DEPLOYMENT.md"
echo ""
echo "4. Set environment variables in Render:"
echo "   - NODE_ENV=production"
echo "   - MONGODB_URI=your_mongodb_connection_string"
echo "   - COHERE_API_KEY=your_cohere_api_key"
echo ""
echo "📖 For detailed instructions, see DEPLOYMENT.md"
echo ""
echo "Good luck with your deployment! 🚀" 