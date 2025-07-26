# Sassinator Backend 🚀

This is the backend server for the Sassinator SaaS Validator App. It handles API requests from the frontend and communicates with OpenAI to provide dynamic AI-powered responses.

## 📁 File Structure

```
backend/
├── server.js          # Main Express server
├── package.json       # Node.js dependencies
├── env.txt           # Environment variables (rename to .env)
└── README.md         # This file
```

## 🛠️ Setup Instructions

### Step 1: Install Node.js
Make sure you have Node.js installed on your computer.
- Download from: https://nodejs.org/
- Recommended version: 16.x or higher

### Step 2: Navigate to Backend Folder
Open your terminal/command prompt and navigate to the backend folder:
```bash
cd backend
```

### Step 3: Install Dependencies
Run this command to install all required packages:
```bash
npm install
```

### Step 4: Set Up Environment Variables
1. Rename `env.txt` to `.env`
2. The file should contain:
```
COHERE_API_KEY=your_cohere_api_key_here
PORT=5000
```

### Step 5: Start the Server
Run this command to start the backend server:
```bash
npm start
```

You should see:
```
🚀 Sassinator Backend running on port 5000
📡 API available at http://localhost:5000
🧪 Test endpoint: http://localhost:5000/api/test
✅ Ready to validate SaaS ideas!
```

## 🧪 Testing the Backend

### Test if Server is Running
Open your browser and go to:
```
http://localhost:5000/api/test
```

You should see:
```json
{
  "message": "Sassinator Backend is running! 🚀",
  "status": "success",
  "timestamp": "2024-01-01T12:00:00.000Z"
}
```

### Test the Validation API
You can test the main API endpoint using tools like Postman or curl:

**Using curl:**
```bash
curl -X POST http://localhost:5000/api/validate \
  -H "Content-Type: application/json" \
  -d '{
    "idea": "A food delivery app for college students",
    "tone": "fun"
  }'
```

## 🔧 API Endpoints

### POST /api/validate
Validates a SaaS idea using AI.

**Request Body:**
```json
{
  "idea": "Your SaaS idea description",
  "tone": "fun" // or "professional"
}
```

**Response:**
```json
{
  "success": true,
  "result": "AI-generated analysis...",
  "resultType": "success", // or "warning" or "error"
  "tone": "fun",
  "idea": "Your idea",
  "timestamp": "2024-01-01T12:00:00.000Z"
}
```

### GET /api/test
Simple test endpoint to check if server is running.

## 🚨 Troubleshooting

### Port Already in Use
If you get an error that port 5000 is already in use:
1. Change the PORT in your `.env` file to another number (e.g., 3001)
2. Restart the server

### Module Not Found Errors
If you get module not found errors:
1. Make sure you're in the backend folder
2. Run `npm install` again
3. Check if `node_modules` folder exists

### API Key Issues
If you get authentication errors:
1. Check if your `.env` file exists and has the correct API key
2. Make sure the API key is valid and has credits
3. Check the console for detailed error messages

## 📚 Learning Resources

- **Express.js**: https://expressjs.com/
- **Node.js**: https://nodejs.org/
- **OpenAI API**: https://platform.openai.com/docs
- **CORS**: https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS

## 🔄 Development Mode

For development with auto-restart on file changes:
```bash
npm run dev
```

This requires nodemon to be installed globally:
```bash
npm install -g nodemon
```

## 🎯 Next Steps

1. Start the backend server
2. Update your frontend to use the backend API
3. Test the complete application
4. Deploy to a hosting service (Heroku, Vercel, etc.)

## 📞 Support

If you encounter any issues:
1. Check the console for error messages
2. Verify all files are in the correct locations
3. Make sure all dependencies are installed
4. Check if the API key is valid

Happy coding! 🎉 