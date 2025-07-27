// Simple test script to verify deployment configuration
console.log('🧪 Testing Sassinator Backend Configuration...\n');

// Test 1: Check if all required modules can be loaded
console.log('1. Testing module imports...');
try {
    require('express');
    console.log('   ✅ Express loaded');
    
    require('cors');
    console.log('   ✅ CORS loaded');
    
    require('dotenv');
    console.log('   ✅ dotenv loaded');
    
    require('node-fetch');
    console.log('   ✅ node-fetch loaded');
    
    require('mongoose');
    console.log('   ✅ Mongoose loaded');
    
    require('bcryptjs');
    console.log('   ✅ bcryptjs loaded');
    
    console.log('   ✅ All modules loaded successfully!\n');
} catch (error) {
    console.error('   ❌ Module import failed:', error.message);
    process.exit(1);
}

// Test 2: Check environment variables
console.log('2. Testing environment variables...');
require('dotenv').config();

const envVars = {
    'NODE_ENV': process.env.NODE_ENV || 'development',
    'PORT': process.env.PORT || '5000',
    'MONGODB_URI': process.env.MONGODB_URI ? 'Set' : 'Not set',
    'COHERE_API_KEY': process.env.COHERE_API_KEY ? 'Set' : 'Not set (using fallback)'
};

Object.entries(envVars).forEach(([key, value]) => {
    console.log(`   ${key}: ${value}`);
});

console.log('   ✅ Environment check complete!\n');

// Test 3: Check if server.js can be required
console.log('3. Testing server.js...');
try {
    // Just test if the file can be parsed without errors
    require('./server.js');
    console.log('   ✅ server.js can be loaded');
} catch (error) {
    console.error('   ❌ server.js failed to load:', error.message);
    process.exit(1);
}

console.log('\n🎉 All tests passed! Your backend is ready for deployment.');
console.log('\n📋 Next steps:');
console.log('   1. Push these changes to GitHub');
console.log('   2. Redeploy on Render');
console.log('   3. Check the logs for any remaining issues'); 