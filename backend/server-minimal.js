// Minimal server for debugging Render deployment
const express = require('express');
const app = express();

// Basic middleware
app.use(express.json());

// Health check
app.get('/', (req, res) => {
    res.json({
        message: 'Sassinator Backend is running! 🚀',
        status: 'success',
        timestamp: new Date().toISOString(),
        environment: process.env.NODE_ENV || 'development',
        port: process.env.PORT || 5000
    });
});

// Test endpoint
app.get('/api/test', (req, res) => {
    res.json({
        message: 'API is working!',
        status: 'success'
    });
});

// Start server
const PORT = process.env.PORT || 5000;

console.log('🚀 Starting minimal Sassinator Backend...');
console.log(`📊 Environment: ${process.env.NODE_ENV || 'development'}`);
console.log(`🔧 Port: ${PORT}`);

app.listen(PORT, () => {
    console.log(`✅ Server running on port ${PORT}`);
    console.log(`🌐 Health check: http://localhost:${PORT}/`);
    console.log(`🧪 Test endpoint: http://localhost:${PORT}/api/test`);
}); 