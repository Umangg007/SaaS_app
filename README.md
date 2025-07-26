# Sassinator - SaaS Idea Validator

A modern web application that helps entrepreneurs validate their SaaS ideas using AI-powered analysis.

## Features

- 🤖 **AI-Powered Analysis**: Uses Cohere AI to provide intelligent feedback on SaaS ideas
- 🎨 **Modern UI**: Beautiful neumorphic design with dark/light mode
- 👤 **User Authentication**: Secure registration and login system
- 📊 **Search History**: Track and review your previous idea validations
- 📱 **Responsive Design**: Works perfectly on desktop and mobile devices
- 🌙 **Dark Mode**: Toggle between light and dark themes

## Tech Stack

- **Frontend**: HTML5, CSS3, JavaScript (Vanilla)
- **Backend**: Node.js, Express.js
- **Database**: MongoDB with Mongoose ODM
- **AI**: Cohere API for idea analysis
- **Deployment**: Render (Backend + Static Site)

## Quick Start

### Local Development

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd SAAS
   ```

2. **Install dependencies**
   ```bash
   npm install
   cd backend && npm install && cd ..
   ```

3. **Set up environment variables**
   - Copy `backend/env.example` to `backend/.env`
   - Add your MongoDB URI and Cohere API key

4. **Start the backend server**
   ```bash
   cd backend
   npm start
   ```

5. **Open the frontend**
   - Open `index.html` in your browser
   - Or serve it using a local server

### Deployment

For detailed deployment instructions, see [DEPLOYMENT.md](./DEPLOYMENT.md)

**Quick deployment steps:**
1. Push your code to GitHub
2. Set up MongoDB Atlas
3. Deploy backend and frontend on Render
4. Configure environment variables

## Project Structure

```
SAAS/
├── backend/                 # Node.js backend
│   ├── server.js           # Express server
│   ├── models.js           # MongoDB models
│   ├── package.json        # Backend dependencies
│   └── env.example         # Environment variables template
├── index.html              # Main application page
├── login.html              # Login page
├── register.html           # Registration page
├── config.js               # Environment configuration
├── render.yaml             # Render deployment config
├── deploy.sh               # Deployment helper script
├── DEPLOYMENT.md           # Detailed deployment guide
└── README.md               # This file
```

## API Endpoints

- `POST /api/signup` - User registration
- `POST /api/login` - User authentication
- `POST /api/validate` - Idea validation
- `GET /api/history/:userId` - User search history
- `POST /api/forgot-password` - Password reset request
- `POST /api/reset-password` - Password reset
- `GET /api/check-username/:username` - Username availability

## Environment Variables

### Backend (.env)
- `MONGODB_URI` - MongoDB connection string
- `COHERE_API_KEY` - Cohere AI API key
- `PORT` - Server port (default: 5000)
- `NODE_ENV` - Environment (development/production)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

MIT License - see LICENSE file for details

## Support

If you encounter any issues:
1. Check the deployment guide in `DEPLOYMENT.md`
2. Review the logs in your Render dashboard
3. Ensure all environment variables are configured correctly

---

Built with ❤️ for entrepreneurs and startup enthusiasts! 