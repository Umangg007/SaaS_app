// Test script to check mongoose availability
console.log('🧪 Testing mongoose availability...\n');

// Test 1: Check package.json
console.log('1. Checking package.json...');
try {
    const fs = require('fs');
    const packageJson = JSON.parse(fs.readFileSync('./package.json', 'utf8'));
    console.log('   ✅ package.json found');
    console.log('   📦 Dependencies:', Object.keys(packageJson.dependencies || {}));
    
    if (packageJson.dependencies && packageJson.dependencies.mongoose) {
        console.log('   ✅ mongoose found in dependencies');
    } else {
        console.log('   ❌ mongoose NOT found in dependencies');
    }
} catch (error) {
    console.error('   ❌ Error reading package.json:', error.message);
}

// Test 2: Try to require mongoose
console.log('\n2. Testing mongoose require...');
try {
    require('mongoose');
    console.log('   ✅ mongoose module loaded successfully');
} catch (error) {
    console.error('   ❌ mongoose module not found:', error.message);
    console.log('   💡 This means npm install did not install mongoose');
}

// Test 3: Check node_modules
console.log('\n3. Checking node_modules...');
try {
    const fs = require('fs');
    if (fs.existsSync('./node_modules/mongoose')) {
        console.log('   ✅ mongoose folder exists in node_modules');
    } else {
        console.log('   ❌ mongoose folder NOT found in node_modules');
    }
} catch (error) {
    console.error('   ❌ Error checking node_modules:', error.message);
}

console.log('\n🎯 Test complete!'); 