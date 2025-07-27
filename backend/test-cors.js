// Simple test server with CORS
const express = require('express');
const cors = require('cors');

const app = express();

// Very permissive CORS
app.use(cors({
    origin: true,
    credentials: false
}));

app.use(express.json());

// Health check
app.get('/', (req, res) => {
    res.json({
        message: 'CORS Test Server Running!',
        status: 'success',
        timestamp: new Date().toISOString()
    });
});

// Test login endpoint
app.post('/api/login', (req, res) => {
    console.log('Login attempt:', req.body);
    res.json({
        success: true,
        message: 'Login successful (test)',
        userId: 'test-user-' + Date.now()
    });
});

// Test CORS preflight
app.options('*', cors());

const PORT = process.env.PORT || 5000;

console.log('🚀 Starting CORS test server...');
console.log(`📊 Port: ${PORT}`);

app.listen(PORT, () => {
    console.log(`✅ CORS test server running on port ${PORT}`);
    console.log(`🌐 Test URL: http://localhost:${PORT}/`);
}); 