# 🚀 Netlify Deployment Guide for AI Realtor Assistant

## 📋 **Prerequisites**
- ✅ Frontend code is ready and tested
- ✅ Backend is running on port 5004
- ✅ Netlify account (efop77392@gmail.com)
- ✅ Git repository connected

## 🔧 **Step 1: Update Backend URL**

**IMPORTANT**: Before deploying, you need to update the backend URL in your configuration.

### **Option A: Update netlify.toml (Recommended)**
Edit `frontend/netlify.toml` and change:
```toml
REACT_APP_API_URL = "http://localhost:5004"
```
to your actual backend URL:
```toml
REACT_APP_API_URL = "https://your-jupyterhub-server.com:5004"
# OR if running locally in Jupyter Lab:
REACT_APP_API_URL = "http://localhost:5004"
```

### **Option B: Set Environment Variable in Netlify Dashboard**
1. Go to your Netlify site dashboard
2. Navigate to **Site settings** → **Environment variables**
3. Add: `REACT_APP_API_URL` = `https://your-backend-url.com:5004`

## 🚀 **Step 2: Deploy to Netlify**

### **Method 1: Netlify CLI (Recommended)**
```bash
# Navigate to frontend directory
cd frontend

# Build the project
npm run build

# Deploy to Netlify
netlify deploy --prod --dir=build
```

### **Method 2: Netlify Dashboard**
1. Go to [netlify.com](https://netlify.com)
2. Click **"New site from Git"**
3. Connect your repository
4. Set build command: `npm run build`
5. Set publish directory: `build`
6. Click **"Deploy site"**

## ⚙️ **Step 3: Configure Environment Variables**

In your Netlify dashboard, add these environment variables:

| Variable | Value | Description |
|----------|-------|-------------|
| `REACT_APP_API_URL` | `https://your-backend-url.com:5004` | **REQUIRED** - Your backend server URL |
| `REACT_APP_ENVIRONMENT` | `production` | Production environment flag |
| `REACT_APP_ENABLE_ANALYTICS` | `true` | Enable analytics |
| `REACT_APP_ENABLE_CACHING` | `true` | Enable caching |

## 🔗 **Step 4: Connect Frontend to Backend**

### **If Backend is Running Locally (Jupyter Lab)**
1. **Frontend URL**: `https://your-netlify-app.netlify.app`
2. **Backend URL**: `http://localhost:5004`
3. **Issue**: CORS error (localhost can't access Netlify)

**Solution**: Update your backend CORS configuration in Jupyter Lab:
```python
# In your Jupyter Lab notebook, update CORS origins:
CORS(app, origins=[
    'https://your-netlify-app.netlify.app',  # Your Netlify URL
    'https://*.netlify.app',                 # All Netlify subdomains
    'http://localhost:3000',                 # Local development
])
```

### **If Backend is Deployed on JupyterHub**
1. **Frontend URL**: `https://your-netlify-app.netlify.app`
2. **Backend URL**: `https://your-jupyterhub-server.com:5004`
3. **Update**: `REACT_APP_API_URL` in Netlify environment variables

## 🧪 **Step 5: Test Your Deployment**

### **Test Backend Connection**
1. Open your Netlify app
2. Open browser console (F12)
3. Check for any CORS or connection errors
4. Try searching for properties

### **Common Issues & Solutions**

#### **Issue 1: CORS Error**
```
Access to fetch at 'http://localhost:5004' from origin 'https://your-app.netlify.app' has been blocked by CORS policy
```

**Solution**: Update backend CORS configuration (see Step 4)

#### **Issue 2: Backend Not Found**
```
Failed to fetch: net::ERR_CONNECTION_REFUSED
```

**Solution**: 
- Ensure backend is running on port 5004
- Check if port is accessible from outside
- Update `REACT_APP_API_URL` to correct URL

#### **Issue 3: Environment Variables Not Working**
```
REACT_APP_API_URL is undefined
```

**Solution**:
- Rebuild and redeploy after setting environment variables
- Check variable names (must start with `REACT_APP_`)
- Clear browser cache

## 📱 **Step 6: Production Optimization**

### **Performance Settings**
Your `netlify.toml` already includes:
- ✅ Static asset caching (1 year)
- ✅ Security headers
- ✅ SPA routing redirects
- ✅ Compression headers

### **Monitoring**
1. **Netlify Analytics**: View site performance
2. **Error Tracking**: Monitor for API failures
3. **Performance**: Check Core Web Vitals

## 🔄 **Step 7: Continuous Deployment**

### **Automatic Deploys**
1. Connect your Git repository
2. Netlify will auto-deploy on every push
3. Preview deployments for pull requests

### **Manual Deployments**
```bash
# Deploy specific branch
netlify deploy --branch=feature-branch

# Deploy with specific environment
netlify deploy --prod --dir=build --context=production
```

## 🚨 **Troubleshooting Checklist**

- [ ] Backend is running and accessible on port 5004
- [ ] CORS configuration includes Netlify URL
- [ ] Environment variables are set correctly
- [ ] Frontend builds without errors
- [ ] No console errors in browser
- [ ] API endpoints respond correctly
- [ ] Search functionality works
- [ ] Property listings display properly

## 📞 **Need Help?**

### **Check Logs**
1. **Netlify Build Logs**: Site dashboard → Deploys → View build log
2. **Browser Console**: F12 → Console tab
3. **Network Tab**: F12 → Network tab → Check API calls

### **Common Commands**
```bash
# Check Netlify status
netlify status

# View recent deployments
netlify list

# Open site
netlify open

# Check environment variables
netlify env:list
```

## 🎯 **Next Steps After Deployment**

1. **Test all features** on the live site
2. **Monitor performance** using Netlify analytics
3. **Set up custom domain** if needed
4. **Configure monitoring** for backend availability
5. **Set up alerts** for deployment failures

---

**🎉 Congratulations! Your AI Realtor Assistant is now live on Netlify!**

**Remember**: Update the `REACT_APP_API_URL` to point to your actual backend server before deploying.
