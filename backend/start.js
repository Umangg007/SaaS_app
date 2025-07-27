#!/usr/bin/env node

// Simple startup script for Render deployment
console.log('🚀 Starting Sassinator Backend...');

// Check if we're in production
const isProduction = process.env.NODE_ENV === 'production';
console.log(`🌍 Environment: ${isProduction ? 'production' : 'development'}`);

// Check required environment variables
const requiredEnvVars = ['PORT'];
const missingVars = requiredEnvVars.filter(varName => !process.env[varName]);

if (missingVars.length > 0) {
    console.log(`⚠️  Missing environment variables: ${missingVars.join(', ')}`);
    console.log('💡 Setting default values...');
}

// Set default values
if (!process.env.PORT) {
    process.env.PORT = 5000;
    console.log(`🔧 Set PORT to default: ${process.env.PORT}`);
}

// Log environment info
console.log(`📊 PORT: ${process.env.PORT}`);
console.log(`🔗 MONGODB_URI: ${process.env.MONGODB_URI ? 'Set' : 'Not set (will use localhost)'}`);
console.log(`🔑 COHERE_API_KEY: ${process.env.COHERE_API_KEY ? 'Set' : 'Not set (will use fallback)'}`);

// Start the server
try {
    require('./server.js');
    console.log('✅ Server started successfully!');
} catch (error) {
    console.error('❌ Failed to start server:', error.message);
    console.error('📋 Full error:', error);
    process.exit(1);
} 