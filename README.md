# AI Realtor Assistant Website

A full-stack real estate application with AI-powered natural language search capabilities.

## 🏗️ Project Structure

```
AI Realtor Porject/
├── frontend/                 # React + TailwindCSS frontend
│   ├── src/
│   ├── public/
│   └── package.json
├── backend/                  # Flask API backend
│   ├── app.py
│   ├── database.py
│   ├── ai_filter.py
│   └── requirements.txt
├── database/                 # Mock database files
│   └── listings.db
└── README.md
```

## 🚀 Features

- **Property Listings**: Browse houses, condos, and land
- **AI Search**: Natural language queries (e.g., "affordable condos in Halifax under $500,000")
- **Smart Filtering**: AI-powered query interpretation and database filtering
- **Responsive Design**: Modern UI with TailwindCSS
- **RESTful API**: Flask backend with search endpoints

## 🛠️ Tech Stack

- **Frontend**: React 18, TailwindCSS, Axios
- **Backend**: Flask, SQLite, OpenAI GPT API
- **Deployment**: Netlify (frontend), JupyterHub (backend)

## 📋 Prerequisites

- Node.js 18+ and npm
- Python 3.8+
- OpenAI API key (for AI filtering)

## 🚀 Quick Start

### Backend Setup (JupyterHub)

1. Navigate to backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

3. Set OpenAI API key:
   ```bash
   export OPENAI_API_KEY="your-api-key-here"
   ```

4. Run Flask app:
   ```bash
   python app.py
   ```

Backend will run on `http://localhost:5000`

### Frontend Setup (Netlify)

1. Navigate to frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Update API endpoint in `src/config.js` to point to your backend

4. Build for production:
   ```bash
   npm run build
   ```

5. Deploy to Netlify:
   - Drag `build/` folder to Netlify
   - Or connect GitHub repository for auto-deployment

## 🔧 Configuration

### Backend Configuration

- Update `backend/config.py` with your OpenAI API key
- Modify database path in `backend/database.py` if needed
- Adjust CORS settings in `backend/app.py` for production

### Frontend Configuration

- Update API base URL in `frontend/src/config.js`
- Modify search categories in `frontend/src/components/SearchBar.jsx`
- Customize styling in `frontend/src/index.css`

## 📊 API Endpoints

- `GET /api/listings` - Get all property listings
- `POST /api/search` - Search properties with natural language query

### Search Query Format

```json
{
  "query": "affordable condos in Halifax under $500,000"
}
```

### Response Format

```json
{
  "results": [
    {
      "id": 1,
      "title": "Modern Downtown Condo",
      "description": "Beautiful 2-bedroom condo in the heart of Halifax",
      "type": "condo",
      "price": 450000,
      "location": "Halifax, NS",
      "image_url": "https://example.com/image.jpg",
      "bedrooms": 2,
      "bathrooms": 2,
      "sqft": 1200
    }
  ],
  "total": 1,
  "filters_applied": {
    "type": "condo",
    "location": "Halifax",
    "max_price": 500000
  }
}
```

## 🎯 AI Filtering Examples

- "Show me affordable condos in Halifax under $500,000"
- "Find houses near the ocean"
- "Cheap land near Bedford"
- "Luxury homes in downtown area"
- "Properties with 3+ bedrooms under $800,000"

## 🚀 Deployment

### Backend (JupyterHub)

1. Upload backend files to JupyterHub
2. Install requirements: `pip install -r requirements.txt`
3. Set environment variables
4. Run: `python app.py`

### Frontend (Netlify)

1. Connect GitHub repository or upload build files
2. Set build command: `npm run build`
3. Set publish directory: `build`
4. Deploy!

## 🔒 Environment Variables

### Backend
- `OPENAI_API_KEY`: Your OpenAI API key
- `FLASK_ENV`: Set to 'production' for production deployment

### Frontend
- `REACT_APP_API_URL`: Backend API URL

## 📱 Features

- **Responsive Design**: Works on all devices
- **Real-time Search**: Instant results as you type
- **Advanced Filtering**: AI-powered query interpretation
- **Property Cards**: Beautiful listing displays
- **Category Navigation**: Easy browsing by property type
- **Search History**: Local storage for recent searches

## 🤝 Contributing

1. Fork the repository
2. Create feature branch
3. Commit changes
4. Push to branch
5. Create Pull Request

## 📄 License

MIT License - see LICENSE file for details

## 🆘 Support

For issues and questions:
1. Check existing issues
2. Create new issue with detailed description
3. Include error logs and steps to reproduce

---

**Built with ❤️ using React, Flask, and OpenAI GPT**
