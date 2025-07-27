// Configuration for different environments
const config = {
    // Development environment
    development: {
        apiUrl: 'http://localhost:5000'
    },
    // Production environment (Render)
    production: {
        apiUrl: 'https://your-actual-backend-url.onrender.com'
    }
};

// Get current environment
const environment = window.location.hostname === 'localhost' ? 'development' : 'production';

// Export the appropriate configuration
window.API_CONFIG = config[environment]; 