# 🚀 **AI Realtor Assistant - Jupyter Lab Setup Guide**

## 🎯 **What You'll Get**

- **120+ diverse properties** (houses, condos, land) with realistic data
- **AI-powered search** using natural language queries
- **Complete Flask API** with all endpoints
- **Enhanced frontend** deployed on Netlify
- **Fallback parsing** if OpenAI API key not set

## 📋 **Prerequisites**

### **1. Install Jupyter Lab**
```bash
pip install jupyterlab
```

### **2. Install Required Python Packages**
```bash
pip install flask flask-cors openai python-dotenv requests
```

### **3. Get OpenAI API Key (Optional)**
- Visit: https://platform.openai.com/api-keys
- Create a new API key
- The system works without it using fallback parsing

## 🚀 **Quick Start in Jupyter Lab**

### **Step 1: Start Jupyter Lab**
```bash
jupyter lab
```

### **Step 2: Navigate to Backend Folder**
Open the `backend/` folder in Jupyter Lab and create a new notebook.

### **Step 3: Run the Setup Script**
Copy and paste this into your first cell:

```python
# Load the complete backend
exec(open('jupyter_lab_setup.py').read())

print("✅ Backend loaded successfully!")
```

### **Step 4: Test Components**
Run this in the next cell:

```python
# Test all components
test_components()
```

### **Step 5: Start the Server**
Run this in the next cell:

```python
# Start the Flask server
start_server()
```

## 🔧 **Complete Step-by-Step Setup**

### **Cell 1: Install Dependencies (Run Once)**
```python
!pip install flask flask-cors openai python-dotenv requests
```

### **Cell 2: Load Backend**
```python
# Load the complete backend system
exec(open('jupyter_lab_setup.py').read())

print("✅ AI Realtor Assistant Backend loaded!")
```

### **Cell 3: Check Configuration**
```python
# Show current configuration
show_config()
```

### **Cell 4: Test Components**
```python
# Test database and AI filter
test_components()
```

### **Cell 5: Start Server**
```python
# Start the Flask API server
start_server()
```

### **Cell 6: Test API (After Server Starts)**
```python
# Test the running API
test_api()
```

## 🌐 **API Endpoints Available**

Once the server is running, these endpoints will be available:

- **Home**: `http://localhost:5001/`
- **All Listings**: `http://localhost:5001/api/listings`
- **Search**: `http://localhost:5001/api/search` (POST)
- **Stats**: `http://localhost:5001/api/stats`
- **Featured**: `http://localhost:5001/api/featured`
- **Health Check**: `http://localhost:5001/api/health`

## 🧪 **Testing the System**

### **Test Natural Language Search**
```python
import requests

# Test search with natural language
search_queries = [
    "affordable condos in Halifax under $500k",
    "family homes with 4+ bedrooms",
    "waterfront properties near the ocean",
    "land for building dream home"
]

for query in search_queries:
    response = requests.post('http://localhost:5001/api/search', 
                           json={"query": query})
    if response.status_code == 200:
        data = response.json()
        count = data.get('data', {}).get('count', 0)
        filters = data.get('data', {}).get('filters', {})
        print(f"✅ '{query}': {count} results, filters: {filters}")
    else:
        print(f"❌ '{query}' failed: {response.status_code}")
```

### **Test Database Statistics**
```python
# Get database stats
response = requests.get('http://localhost:5001/api/stats')
if response.status_code == 200:
    data = response.json()
    stats = data.get('data', {})
    print(f"📊 Total properties: {stats.get('total', 0)}")
    print(f"🏠 Houses: {stats.get('types', {}).get('house', 0)}")
    print(f"🏢 Condos: {stats.get('types', {}).get('condo', 0)}")
    print(f"🌲 Land: {stats.get('types', {}).get('land', 0)}")
```

## 📱 **Connect to Your Netlify Frontend**

### **1. Update Frontend Configuration**
Your frontend is already deployed at: **https://ai-realtor-assistant.netlify.app**

To connect it to your Jupyter Lab backend:

1. **Option A: Update Netlify Environment Variables**
   - Go to Netlify dashboard
   - Navigate to Site settings → Environment variables
   - Add: `REACT_APP_API_URL` = `http://localhost:5001`
   - Redeploy

2. **Option B: Update Frontend Code**
   - Clone your frontend repository
   - Update `src/config.js`:
   ```javascript
   export const API_BASE_URL = 'http://localhost:5001';
   ```
   - Redeploy to Netlify

### **2. Test Complete Application**
1. Keep your Jupyter Lab backend running
2. Open https://ai-realtor-assistant.netlify.app
3. Try natural language searches like:
   - "affordable condos in Halifax"
   - "family homes with large backyards"
   - "waterfront properties"

## 🔧 **Configuration Options**

### **Change Port (if 5001 is busy)**
```python
# In the Config class, change:
PORT = 5002  # or any available port

# Then restart the server
start_server()
```

### **Set OpenAI API Key**
```python
# In the Config class, change:
OPENAI_API_KEY = 'sk-your-actual-api-key-here'

# Then reload the backend
exec(open('jupyter_lab_setup.py').read())
```

### **Customize CORS Origins**
```python
# Add more frontend URLs to CORS
CORS(app, origins=[
    'http://localhost:3000',
    'http://localhost:5173',
    'https://ai-realtor-assistant.netlify.app',
    'https://*.netlify.app',
    'https://your-custom-domain.com'
])
```

## 🎯 **Natural Language Search Examples**

Try these queries in your frontend:

- **"affordable condos in Halifax under $500k"**
- **"family homes with 4+ bedrooms"**
- **"waterfront properties near the ocean"**
- **"investment properties for rent"**
- **"new construction homes"**
- **"land for building dream home"**
- **"luxury penthouses with city views"**
- **"starter homes for first-time buyers"**

## 🔍 **How AI Search Works**

### **With OpenAI API Key:**
1. User types natural language query
2. GPT-3.5 analyzes the query
3. Extracts structured filters (type, price, location, etc.)
4. Searches database with filters
5. Returns relevant results

### **Without OpenAI API Key (Fallback):**
1. User types natural language query
2. Regex patterns extract basic filters
3. Searches database with extracted filters
4. Returns relevant results

## 🚨 **Troubleshooting**

### **Port Already in Use**
```python
# Change port in Config class
PORT = 5002
# Then restart
start_server()
```

### **Database Not Loading**
- Check that `database/properties_extended.json` exists
- Verify file permissions
- Check console for error messages

### **CORS Issues**
- Ensure your frontend URL is in the CORS origins list
- Check browser console for CORS errors
- Verify the backend is running on the correct port

### **OpenAI API Issues**
- Verify your API key is correct
- Check OpenAI account for usage limits
- The system works with fallback parsing without the key

### **Frontend Not Connecting**
- Verify backend is running on the correct port
- Check frontend configuration
- Test API endpoints directly with curl or requests

## 📊 **Database Information**

Your system includes:
- **120+ properties** across Nova Scotia
- **Multiple property types**: Houses, Condos, Land
- **Realistic data**: Prices, locations, features, conditions
- **Diverse locations**: Halifax, Bedford, Dartmouth, Eastern Shore, etc.
- **Price ranges**: $110K - $4.3M
- **Property features**: Bedrooms, bathrooms, square footage, lot size

## 🚀 **Next Steps**

### **1. Customize the Database**
- Add your own properties
- Modify locations and price ranges
- Add custom features and amenities

### **2. Enhance AI Features**
- Train custom models
- Add property recommendations
- Implement user preferences

### **3. Add More Endpoints**
- User authentication
- Favorites system
- Property comparisons
- Contact forms

### **4. Production Deployment**
- Use production WSGI server (Gunicorn)
- Set up proper environment variables
- Implement HTTPS and security
- Add monitoring and logging

## 🆘 **Need Help?**

### **Check Console Output**
- Look for error messages in Jupyter cells
- Check Flask server logs
- Verify all dependencies are installed

### **Test Individual Components**
```python
# Test database only
print(f"Database properties: {len(db.properties)}")

# Test AI filter only
filters = ai_filter.parse_query("affordable condos")
print(f"Parsed filters: {filters}")

# Test search only
results = db.search_listings({"type": "condo", "max_price": 500000})
print(f"Search results: {len(results)}")
```

### **Common Issues & Solutions**
- **Module not found**: Run `pip install` commands first
- **Port busy**: Change port number in Config
- **Database empty**: Check file paths and permissions
- **API not responding**: Ensure server is running with `start_server()`

## 🎉 **Success!**

Once everything is working:
1. ✅ Backend running on Jupyter Lab
2. ✅ 120+ properties loaded
3. ✅ AI search working (OpenAI or fallback)
4. ✅ Frontend connected and working
5. ✅ Natural language search functional

Your AI Realtor Assistant is now fully operational! 🏠✨
