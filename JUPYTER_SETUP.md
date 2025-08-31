# 🚀 **Running AI Realtor Assistant in Jupyter Notebook/Lab**

## 📋 **Prerequisites**

1. **Jupyter Notebook/Lab installed**
   ```bash
   pip install jupyter jupyterlab
   ```

2. **Required Python packages**
   ```bash
   pip install flask flask-cors openai python-dotenv
   ```

3. **OpenAI API key** (optional, for AI features)
   - Get one at: https://platform.openai.com/api-keys
   - The system works without it using fallback parsing

## 🎯 **Quick Start in Jupyter**

### **Step 1: Open Jupyter**
```bash
# Start Jupyter Notebook
jupyter notebook

# OR start Jupyter Lab
jupyter lab
```

### **Step 2: Navigate to the backend folder**
Open the `backend/` folder in Jupyter and create a new notebook.

### **Step 3: Copy and run this code in cells**

#### **Cell 1: Import and Setup**
```python
# Import the backend module
from jupyter_backend import *

print("✅ Backend loaded successfully!")
```

#### **Cell 2: Test Components**
```python
# Test all components
test_components()
```

#### **Cell 3: Start the Server**
```python
# Start the Flask server
start_server()
```

## 🔧 **Alternative: Run Everything in One Notebook**

Create a new notebook and copy this complete code:

```python
# Cell 1: Install dependencies (run once)
!pip install flask flask-cors openai python-dotenv

# Cell 2: Import libraries
import json
import os
import openai
from flask import Flask, request, jsonify
from flask_cors import CORS
import random
from typing import Dict, Any, Optional

# Cell 3: Configuration
class Config:
    SECRET_KEY = 'dev-secret-key-change-in-production'
    DEBUG = True
    OPENAI_API_KEY = 'your-openai-api-key-here'  # Replace with your key
    OPENAI_MODEL = 'gpt-3.5-turbo'
    API_PREFIX = '/api'
    MAX_SEARCH_RESULTS = 50
    PORT = 5001

# Set your OpenAI API key here
if Config.OPENAI_API_KEY != 'your-openai-api-key-here':
    openai.api_key = Config.OPENAI_API_KEY
    print("✅ OpenAI API key configured")
else:
    print("⚠️  Please set your OpenAI API key in the Config class above")

# Cell 4: Database and AI Filter classes
# (Copy the Database and AIFilter classes from jupyter_backend.py)

# Cell 5: Flask App
# (Copy the Flask app code from jupyter_backend.py)

# Cell 6: Initialize and Test
db = Database()
ai_filter = AIFilter()
test_components()

# Cell 7: Start Server
start_server()
```

## 🌐 **API Endpoints Available**

Once the server is running, these endpoints will be available:

- **Home**: `http://localhost:5001/`
- **All Listings**: `http://localhost:5001/api/listings`
- **Search**: `http://localhost:5001/api/search` (POST)
- **Stats**: `http://localhost:5001/api/stats`
- **Featured**: `http://localhost:5001/api/featured`

## 🧪 **Testing the API**

### **Test in Jupyter**
```python
import requests

# Test home endpoint
response = requests.get('http://localhost:5001/')
print(response.json())

# Test search
search_data = {"query": "affordable condos in Halifax"}
response = requests.post('http://localhost:5001/api/search', json=search_data)
print(response.json())
```

### **Test with curl**
```bash
# Home endpoint
curl http://localhost:5001/

# Search
curl -X POST http://localhost:5001/api/search \
  -H "Content-Type: application/json" \
  -d '{"query": "affordable condos in Halifax"}'

# Stats
curl http://localhost:5001/api/stats
```

## 📱 **Connect Frontend**

1. **Update frontend config** in `frontend/src/config.js`:
   ```javascript
   export const API_BASE_URL = 'http://localhost:5001';
   ```

2. **Start frontend**:
   ```bash
   cd frontend
   npm start
   ```

3. **Test complete application** in your browser

## 🎯 **Natural Language Search Examples**

Try these queries in the frontend:

- "affordable condos in Halifax under $500k"
- "family homes with 4+ bedrooms"
- "waterfront properties near the ocean"
- "investment properties for rent"
- "new construction homes"
- "land for building dream home"

## 🔧 **Troubleshooting**

### **Port Already in Use**
If port 5001 is busy, change it in the Config class:
```python
PORT = 5002  # or any available port
```

### **Database Not Loading**
Check that the JSON files exist in the `database/` folder:
- `properties_extended.json` (120+ properties)
- `properties.json` (20 properties)

### **OpenAI API Issues**
The system works without OpenAI using fallback parsing. If you want AI features:
1. Get an API key from OpenAI
2. Replace `'your-openai-api-key-here'` with your actual key
3. Restart the server

### **CORS Issues**
The Flask app includes CORS support. If you still have issues:
```python
# Add more specific CORS origins
CORS(app, origins=['http://localhost:3000', 'http://localhost:5173'])
```

## 🚀 **Production Deployment**

For production use:
1. Set `DEBUG = False`
2. Use a production WSGI server (Gunicorn, uWSGI)
3. Set proper environment variables
4. Use HTTPS
5. Implement proper authentication

## 📚 **Next Steps**

1. **Customize the database** with your own properties
2. **Add more AI features** like property recommendations
3. **Implement user accounts** and favorites
4. **Add image upload** functionality
5. **Integrate with real estate APIs** for live data

## 🆘 **Need Help?**

- Check the console output for error messages
- Verify all dependencies are installed
- Ensure the database files are in the correct location
- Test individual components before starting the server
