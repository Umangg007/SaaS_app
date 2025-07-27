// Import required modules
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const { User, History } = require('./models');

// Create Express app
const app = express();

// Middleware
app.use(cors({
    origin: [
        'https://saas-app-rwda.onrender.com',
        'http://localhost:3000',
        'http://localhost:5000',
        'http://127.0.0.1:5500'
    ],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json()); // Parse JSON requests

// Connect to MongoDB
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/sassinator';

// MongoDB connection with better error handling
mongoose.connect(MONGODB_URI)
.then(() => {
    console.log('✅ MongoDB connected successfully!');
    console.log('📊 Database:', MONGODB_URI.split('/').pop());
})
.catch(err => {
    console.error('❌ MongoDB connection error:', err.message);
    console.log('⚠️  Application will continue without database connection');
    console.log('💡 Make sure to set MONGODB_URI environment variable');
});

// Health check route for Render
app.get('/', (req, res) => {
    res.json({ 
        message: 'Sassinator Backend is running! 🚀',
        status: 'success',
        timestamp: new Date().toISOString(),
        environment: process.env.NODE_ENV || 'development',
        port: process.env.PORT || 5000
    });
});

// Test route to check if server is running
app.get('/api/test', (req, res) => {
    res.json({ 
        message: 'Sassinator Backend is running! 🚀',
        status: 'success',
        timestamp: new Date().toISOString()
    });
});

// Main API endpoint for idea validation
app.post('/api/validate', async (req, res) => {
    try {
        const { idea, tone } = req.body;
        
        // Validate input
        if (!idea || !tone) {
            return res.status(400).json({ 
                error: 'Missing required fields: idea and tone' 
            });
        }
        // Additional validation: idea must be at least 10 characters and not just gibberish
        const isInvalid = idea.trim().length < 10 || /^(?:[a-zA-Z0-9\s]){0,10}$/.test(idea.trim());
        if (isInvalid) {
            const funMsg = `😅 Bhai, idea toh likh! Thoda detail mein bata, warna AI bhi confuse ho jayega! (Kam se kam 10 characters likh, aur kuch interesting bata!)`;
            const proMsg = `⚠️ Please provide a more detailed and meaningful idea description (at least 10 characters). The AI needs enough information to give you a useful response.`;
            return res.status(400).json({
                error: tone === 'fun' ? funMsg : proMsg
            });
        }

        // Create prompt based on tone
        const prompt = tone === 'fun'
            ? `In 10-15 lines, give a fun, emoji-filled, and honest review of this SaaS idea: "${idea}".
- Start with a catchy one-line summary and a rating out of 10 (with emoji).
- List one key strength and one key weakness.
- Give 2-3 actionable next steps for the user.
- Suggest a creative way to validate the idea.
- Mention one thing to avoid or watch out for.
- End with a witty, encouraging line.
- Use emojis throughout, but keep it concise and impactful. No unnecessary fluff!`
            : `In 10-15 lines, give a concise, professional, and honest review of this SaaS idea: "${idea}".
- Start with a one-line summary and a rating out of 10.
- List one key strength and one key weakness.
- Give 2-3 actionable next steps for the user.
- Suggest a practical way to validate the idea.
- Mention one risk or challenge to consider.
- End with a clear, motivating line.
- Be clear, actionable, and to the point. No unnecessary fluff!`;

        // Call Cohere API
        const COHERE_API_KEY = process.env.COHERE_API_KEY || 'dggRhTkg6pXWoIpQuU5wnGtDXG3bw2KqHd4rsExn';
        const cohereResponse = await fetch('https://api.cohere.ai/v1/generate', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${COHERE_API_KEY}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                model: 'command',
                prompt: prompt,
                max_tokens: 800,
                temperature: 0.7,
                k: 0,
                stop_sequences: [],
                return_likelihoods: 'NONE'
            })
        });

        // Check if Cohere request was successful
        if (!cohereResponse.ok) {
            const errorData = await cohereResponse.json();
            console.error('Cohere API Error:', errorData);
            return res.status(500).json({ 
                error: 'Failed to get AI response',
                details: errorData
            });
        }

        // Parse Cohere response
        const cohereData = await cohereResponse.json();
        const aiResponse = cohereData.generations[0].text;

        // Determine result type based on response content
        const resultType = determineResultType(aiResponse);

        // Send response back to frontend
        res.json({
            success: true,
            result: aiResponse,
            resultType: resultType,
            tone: tone,
            idea: idea,
            timestamp: new Date().toISOString()
        });

    } catch (error) {
        console.error('❌ Validation error:', error);
        res.status(500).json({ 
            error: 'Failed to validate idea',
            message: error.message
        });
    }
});

// User registration endpoint
app.post('/api/signup', async (req, res) => {
  console.log('👤 Signup request:', req.body);
  const { username, email, password } = req.body;
  
  if (!username || !email || !password) {
    return res.status(400).json({ error: 'Username, email, and password are required' });
  }
  
  try {
    // Check if user already exists
    const existingUser = await User.findOne({ 
      $or: [{ username }, { email }] 
    });
    
    if (existingUser) {
      return res.status(400).json({ 
        error: existingUser.username === username ? 'Username already taken' : 'Email already registered' 
      });
    }
    
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    
    // Create new user
    const user = new User({
      username,
      email,
      password_hash: hashedPassword
    });
    
    await user.save();
    
    console.log('✅ User registered successfully:', username);
    res.json({ 
      success: true, 
      message: 'User registered successfully',
      userId: user._id
    });
    
  } catch (error) {
    console.error('❌ Signup error:', error);
    res.status(500).json({ error: 'Failed to register user' });
  }
});

// User login endpoint
app.post('/api/login', async (req, res) => {
  console.log('🔐 Login request:', req.body);
  const { username, password } = req.body;
  
  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password are required' });
  }
  
  try {
    // Find user by username or email
    const user = await User.findOne({ 
      $or: [{ username }, { email: username }] 
    });
    
    if (!user) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }
    
    // Check password
    const isValidPassword = await bcrypt.compare(password, user.password_hash);
    
    if (!isValidPassword) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }
    
    console.log('✅ Login successful for:', user.username);
    res.json({ 
      success: true, 
      message: 'Login successful',
      userId: user._id,
      username: user.username,
      email: user.email
    });
    
  } catch (error) {
    console.error('❌ Login error:', error);
    res.status(500).json({ error: 'Failed to authenticate user' });
  }
});

// Forgot password endpoint
app.post('/api/forgot-password', async (req, res) => {
  console.log('🔑 Forgot password request:', req.body);
  const { email } = req.body;
  
  if (!email) {
    return res.status(400).json({ error: 'Email is required' });
  }
  
  try {
    const user = await User.findOne({ email });
    
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    // Generate reset token (simple implementation)
    const resetToken = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    const resetTokenExpiry = new Date(Date.now() + 3600000); // 1 hour
    
    user.resetToken = resetToken;
    user.resetTokenExpiry = resetTokenExpiry;
    await user.save();
    
    console.log('✅ Password reset token generated for:', user.username);
    res.json({ 
      success: true, 
      message: 'Password reset instructions sent to your email',
      resetToken: resetToken // Remove this in production
    });
    
  } catch (error) {
    console.error('❌ Forgot password error:', error);
    res.status(500).json({ error: 'Failed to process password reset request' });
  }
});

// Reset password endpoint
app.post('/api/reset-password', async (req, res) => {
  console.log('🔑 Reset password request:', req.body);
  const { resetToken, newPassword } = req.body;
  
  if (!resetToken || !newPassword) {
    return res.status(400).json({ error: 'Reset token and new password are required' });
  }
  
  try {
    const user = await User.findOne({ 
      resetToken: resetToken,
      resetTokenExpiry: { $gt: new Date() }
    });
    
    if (!user) {
      return res.status(400).json({ error: 'Invalid or expired reset token' });
    }
    
    // Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    
    // Update user password and clear reset token
    user.password_hash = hashedPassword;
    user.resetToken = undefined;
    user.resetTokenExpiry = undefined;
    await user.save();
    
    console.log('✅ Password reset successful for:', user.username);
    res.json({ success: true, message: 'Password reset successfully' });
    
  } catch (error) {
    console.error('❌ Reset password error:', error);
    res.status(500).json({ error: 'Failed to reset password' });
  }
});

// Fetch user history endpoint
app.get('/api/history/:userId', async (req, res) => {
  const { userId } = req.params;
  const history = await History.find({ userId }).sort({ timestamp: -1 }).limit(10);
  res.json({ history });
});

// Username availability check endpoint
app.get('/api/check-username/:username', async (req, res) => {
  const { username } = req.params;
  const user = await User.findOne({ username });
  res.json({ available: !user });
});

// Helper function to determine result type
function determineResultType(analysis) {
    const lowerAnalysis = analysis.toLowerCase();
    if (lowerAnalysis.includes('promising') || lowerAnalysis.includes('strong') || lowerAnalysis.includes('excellent') || lowerAnalysis.includes('great')) {
        return 'success';
    } else if (lowerAnalysis.includes('needs work') || lowerAnalysis.includes('potential') || lowerAnalysis.includes('improve') || lowerAnalysis.includes('consider')) {
        return 'warning';
    } else {
        return 'error';
    }
}

// Error handling middleware
app.use((err, req, res, next) => {
    console.error('Unhandled Error:', err);
    res.status(500).json({ 
        error: 'Something went wrong!',
        message: err.message
    });
});

// 404 handler
app.use('*', (req, res) => {
    res.status(404).json({ 
        error: 'Route not found',
        message: 'The requested endpoint does not exist'
    });
});

// Start server with better error handling
const PORT = process.env.PORT || 5000;

console.log('🚀 Starting Sassinator Backend...');
console.log(`📊 Environment: ${process.env.NODE_ENV || 'development'}`);
console.log(`🔧 Port: ${PORT}`);
console.log(`📡 MongoDB URI: ${MONGODB_URI ? 'Set' : 'Not set'}`);

// Improved server startup with error handling
const server = app.listen(PORT, () => {
    console.log(`🚀 Sassinator Backend running on port ${PORT}`);
    console.log(`📡 API available at http://localhost:${PORT}`);
    console.log(`🧪 Test endpoint: http://localhost:${PORT}/api/test`);
    console.log(`✅ Ready to validate SaaS ideas with Cohere AI!`);
    console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
});

// Handle server errors
server.on('error', (error) => {
    if (error.code === 'EADDRINUSE') {
        console.error(`❌ Port ${PORT} is already in use`);
    } else {
        console.error('❌ Server error:', error);
    }
    process.exit(1);
});

// Graceful shutdown
process.on('SIGTERM', () => {
    console.log('🛑 SIGTERM received, shutting down gracefully');
    server.close(() => {
        console.log('✅ Server closed');
        process.exit(0);
    });
});

// Handle uncaught exceptions
process.on('uncaughtException', (error) => {
    console.error('❌ Uncaught Exception:', error);
    process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
    console.error('❌ Unhandled Rejection at:', promise, 'reason:', reason);
    process.exit(1);
}); 