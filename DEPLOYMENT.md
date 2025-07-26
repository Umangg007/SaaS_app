# Deploying Sassinator on Render

This guide will help you deploy your Sassinator SaaS Validator application on Render.

## Prerequisites

1. **GitHub Account**: Make sure your code is pushed to a GitHub repository
2. **Render Account**: Sign up at [render.com](https://render.com)
3. **MongoDB Atlas Account**: For the database (free tier available)
4. **Cohere API Key**: For AI-powered idea validation

## Step 1: Set up MongoDB Atlas

1. Go to [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Create a free account and cluster
3. Create a database user with read/write permissions
4. Get your connection string (it will look like: `mongodb+srv://username:password@cluster.mongodb.net/sassinator`)

## Step 2: Prepare Your Repository

Your repository should have this structure:
```
SAAS/
├── backend/
│   ├── server.js
│   ├── models.js
│   ├── package.json
│   └── package-lock.json
├── index.html
├── login.html
├── register.html
├── config.js
├── render.yaml
└── DEPLOYMENT.md
```

## Step 3: Deploy Backend on Render

1. **Go to Render Dashboard**
   - Visit [dashboard.render.com](https://dashboard.render.com)
   - Click "New +" and select "Web Service"

2. **Connect Repository**
   - Connect your GitHub account
   - Select your Sassinator repository

3. **Configure Backend Service**
   - **Name**: `sassinator-backend`
   - **Environment**: `Node`
   - **Build Command**: `cd backend && npm install`
   - **Start Command**: `cd backend && npm start`
   - **Plan**: Free

4. **Add Environment Variables**
   - Click "Environment" tab
   - Add these variables:
     - `NODE_ENV`: `production`
     - `MONGODB_URI`: Your MongoDB Atlas connection string
     - `COHERE_API_KEY`: Your Cohere API key
     - `PORT`: `10000`

5. **Deploy**
   - Click "Create Web Service"
   - Wait for deployment to complete
   - Note your backend URL (e.g., `https://sassinator-backend.onrender.com`)

## Step 4: Deploy Frontend on Render

1. **Create Another Web Service**
   - Click "New +" and select "Static Site"

2. **Configure Frontend Service**
   - **Name**: `sassinator-frontend`
   - **Build Command**: `echo "No build needed"`
   - **Publish Directory**: `.` (root directory)
   - **Plan**: Free

3. **Deploy**
   - Click "Create Static Site"
   - Wait for deployment to complete
   - Your frontend will be available at the provided URL

## Step 5: Update Configuration

1. **Update config.js**
   - Replace the production API URL with your actual backend URL:
   ```javascript
   production: {
       apiUrl: 'https://your-backend-url.onrender.com'
   }
   ```

2. **Redeploy Frontend**
   - Push the changes to GitHub
   - Render will automatically redeploy

## Step 6: Test Your Deployment

1. Visit your frontend URL
2. Try registering a new account
3. Test the idea validation feature
4. Check that history is being saved

## Environment Variables Reference

### Backend Environment Variables:
- `NODE_ENV`: Set to `production`
- `MONGODB_URI`: MongoDB connection string
- `COHERE_API_KEY`: Your Cohere API key
- `PORT`: Port number (Render will set this automatically)

## Troubleshooting

### Common Issues:

1. **Backend not connecting to database**
   - Check your MongoDB Atlas connection string
   - Ensure your IP is whitelisted in MongoDB Atlas
   - Verify database user credentials

2. **Frontend can't reach backend**
   - Check the API URL in `config.js`
   - Ensure CORS is properly configured
   - Verify backend is deployed and running

3. **API calls failing**
   - Check browser console for errors
   - Verify environment variables are set correctly
   - Check Render logs for backend errors

### Checking Logs:
- Go to your Render dashboard
- Click on your service
- Go to "Logs" tab to see deployment and runtime logs

## Security Notes

1. **Never commit API keys to Git**
   - Use environment variables for all sensitive data
   - Keep your `.env` files in `.gitignore`

2. **MongoDB Security**
   - Use strong passwords for database users
   - Enable network access controls in MongoDB Atlas
   - Consider using VPC peering for production

3. **HTTPS**
   - Render provides free SSL certificates
   - All traffic is automatically encrypted

## Cost Optimization

- **Free Tier Limits**: 
  - Backend: 750 hours/month
  - Static sites: Unlimited
  - Database: 512MB storage

- **Scaling**: Upgrade to paid plans when needed

## Support

If you encounter issues:
1. Check Render's documentation
2. Review the logs in your Render dashboard
3. Ensure all environment variables are set correctly
4. Verify your MongoDB Atlas configuration

Your Sassinator app should now be live and accessible from anywhere! 🚀 