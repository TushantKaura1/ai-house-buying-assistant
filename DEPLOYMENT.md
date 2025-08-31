# 🚀 AI Realtor Assistant - Deployment Guide

This guide will help you deploy the AI Realtor Assistant application to both JupyterHub (backend) and Netlify (frontend).

## 📋 Prerequisites

- **Backend**: Python 3.8+, pip, access to JupyterHub server
- **Frontend**: Node.js 18+, npm, Git repository
- **OpenAI API**: Valid OpenAI API key for AI features

## 🔧 Backend Deployment (JupyterHub)

### 1. Prepare Backend Files

Ensure you have these files in your `backend/` directory:
- `app.py` - Main Flask application
- `database.py` - Database management
- `ai_filter.py` - AI filtering logic
- `config.py` - Configuration settings
- `requirements.txt` - Python dependencies
- `start.py` - Startup script

### 2. Upload to JupyterHub

1. **Upload Files**: Upload the entire `backend/` folder to your JupyterHub server
2. **Open Terminal**: In JupyterHub, open a new terminal
3. **Navigate**: `cd` to your backend directory

### 3. Install Dependencies

```bash
# Install Python dependencies
pip install -r requirements.txt

# Verify installation
python -c "import flask, openai; print('Dependencies installed successfully')"
```

### 4. Set Environment Variables

```bash
# Set your OpenAI API key
export OPENAI_API_KEY="your-actual-api-key-here"

# Set Flask environment
export FLASK_ENV="production"

# Set secret key (change this in production)
export SECRET_KEY="your-secure-secret-key-here"
```

### 5. Start the Backend

```bash
# Option 1: Use the startup script
python start.py

# Option 2: Start directly
python app.py
```

### 6. Verify Backend is Running

- Backend should be accessible at your JupyterHub server URL
- Test the health endpoint: `GET /`
- Test the API: `GET /api/listings`

### 7. Configure CORS (Important!)

Update `backend/config.py` with your frontend URLs:

```python
CORS_ORIGINS = [
    'http://localhost:3000',  # Local development
    'https://your-netlify-app.netlify.app',  # Your Netlify URL
    'https://*.netlify.app'  # Allow all Netlify subdomains
]
```

## 🌐 Frontend Deployment (Netlify)

### 1. Prepare Frontend Files

Ensure you have these files in your `frontend/` directory:
- All React components and pages
- `package.json` with dependencies
- `tailwind.config.js` for styling
- `netlify.toml` for deployment configuration

### 2. Update API Configuration

Update `frontend/src/config.js` with your backend URL:

```javascript
api: {
  baseURL: process.env.REACT_APP_API_URL || 'https://your-jupyterhub-server.com',
  // ... other config
}
```

### 3. Deploy to Netlify

#### Option A: Drag & Drop (Quick)

1. **Build Locally**:
   ```bash
   cd frontend
   npm install
   npm run build
   ```

2. **Upload to Netlify**:
   - Go to [netlify.com](https://netlify.com)
   - Drag the `build/` folder to the deploy area
   - Your site will be live instantly

#### Option B: Git Integration (Recommended)

1. **Push to GitHub**:
   ```bash
   git add .
   git commit -m "Deploy AI Realtor Assistant"
   git push origin main
   ```

2. **Connect to Netlify**:
   - Connect your GitHub repository
   - Set build command: `npm run build`
   - Set publish directory: `build`
   - Deploy!

### 4. Set Environment Variables in Netlify

In your Netlify dashboard, go to **Site settings > Environment variables**:

```
REACT_APP_API_URL = https://your-jupyterhub-server.com
```

### 5. Verify Frontend Deployment

- Your site should be live at `https://your-app-name.netlify.app`
- Test the search functionality
- Verify API calls to your backend

## 🔒 Security Considerations

### Backend Security

1. **API Key Protection**:
   - Never commit API keys to version control
   - Use environment variables
   - Rotate keys regularly

2. **CORS Configuration**:
   - Only allow trusted domains
   - Restrict to your frontend URLs

3. **Rate Limiting** (Optional):
   ```python
   # Add to requirements.txt
   Flask-Limiter==3.3.0
   ```

### Frontend Security

1. **Environment Variables**:
   - Only expose necessary variables
   - Use `REACT_APP_` prefix for public variables

2. **HTTPS**:
   - Netlify provides HTTPS by default
   - Ensure backend also uses HTTPS in production

## 🧪 Testing Your Deployment

### Backend Testing

```bash
# Test health endpoint
curl https://your-backend-url.com/

# Test listings endpoint
curl https://your-backend-url.com/api/listings

# Test search endpoint
curl -X POST https://your-backend-url.com/api/search \
  -H "Content-Type: application/json" \
  -d '{"query": "affordable condos in Halifax"}'
```

### Frontend Testing

1. **Homepage**: Verify search bar and featured properties load
2. **Search**: Test natural language queries
3. **Navigation**: Ensure all routes work correctly
4. **Responsiveness**: Test on mobile and desktop

## 🚨 Troubleshooting

### Common Backend Issues

1. **Import Errors**:
   ```bash
   # Ensure you're in the right directory
   pwd
   ls -la
   
   # Check Python path
   python -c "import sys; print(sys.path)"
   ```

2. **Database Issues**:
   ```bash
   # Check database file exists
   ls -la database/
   
   # Verify permissions
   chmod 644 database/listings.db
   ```

3. **Port Conflicts**:
   ```bash
   # Check if port 5000 is in use
   lsof -i :5000
   
   # Change port in app.py if needed
   ```

### Common Frontend Issues

1. **Build Failures**:
   ```bash
   # Clear cache and reinstall
   rm -rf node_modules package-lock.json
   npm install
   npm run build
   ```

2. **API Connection Issues**:
   - Verify backend URL in config
   - Check CORS settings
   - Test API endpoints directly

3. **Styling Issues**:
   ```bash
   # Rebuild Tailwind CSS
   npx tailwindcss -i ./src/index.css -o ./dist/output.css --watch
   ```

## 📊 Monitoring & Maintenance

### Backend Monitoring

1. **Logs**: Check JupyterHub server logs
2. **Performance**: Monitor API response times
3. **Errors**: Set up error tracking (optional)

### Frontend Monitoring

1. **Netlify Analytics**: Built-in performance monitoring
2. **Error Tracking**: Consider Sentry or similar
3. **Uptime**: Monitor site availability

## 🔄 Updates & Maintenance

### Backend Updates

1. **Code Changes**: Upload new files to JupyterHub
2. **Dependencies**: Update requirements.txt and reinstall
3. **Restart**: Restart the Flask application

### Frontend Updates

1. **Code Changes**: Push to GitHub
2. **Netlify**: Automatically rebuilds and deploys
3. **Environment Variables**: Update in Netlify dashboard

## 📞 Support

If you encounter issues:

1. **Check Logs**: Both frontend and backend
2. **Verify Configuration**: Environment variables and URLs
3. **Test Endpoints**: Use curl or Postman
4. **Check Dependencies**: Ensure all packages are installed

## 🎉 Success!

Once deployed, your AI Realtor Assistant will be:
- **Backend**: Running on JupyterHub with AI-powered search
- **Frontend**: Live on Netlify with beautiful, responsive UI
- **Database**: Populated with 20+ mock real estate listings
- **AI Features**: Natural language search with OpenAI integration

Users can now search for properties using queries like:
- "affordable condos in Halifax under $500,000"
- "houses with 3+ bedrooms near the ocean"
- "cheap land near Bedford"

Happy deploying! 🚀
