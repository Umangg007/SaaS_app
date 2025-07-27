// Test MongoDB connection
require('dotenv').config();
const mongoose = require('mongoose');

console.log('🧪 Testing MongoDB connection...\n');

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/sassinator';

console.log('📊 Connection string:', MONGODB_URI.replace(/\/\/.*@/, '//***:***@'));
console.log('🔧 Environment:', process.env.NODE_ENV || 'development');

// Test connection
mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => {
    console.log('✅ MongoDB connected successfully!');
    console.log('📊 Database:', MONGODB_URI.split('/').pop().split('?')[0]);
    console.log('🔗 Connection type:', MONGODB_URI.includes('mongodb+srv') ? 'Atlas Cloud' : 'Local');
    
    // Test creating a collection
    const testSchema = new mongoose.Schema({ test: String });
    const TestModel = mongoose.model('Test', testSchema);
    
    return TestModel.create({ test: 'connection-test' });
})
.then(() => {
    console.log('✅ Database write test successful!');
    return mongoose.connection.close();
})
.then(() => {
    console.log('✅ Connection closed successfully!');
    process.exit(0);
})
.catch(err => {
    console.error('❌ MongoDB connection failed:', err.message);
    console.log('\n🔧 Troubleshooting tips:');
    console.log('1. Check your connection string format');
    console.log('2. Verify username and password');
    console.log('3. Ensure IP is whitelisted in Atlas');
    console.log('4. Check if cluster is running');
    process.exit(1);
}); 