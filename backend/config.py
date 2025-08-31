import os
from dotenv import load_dotenv

load_dotenv()

class Config:
    """Configuration class for the Flask application"""
    
    # Flask settings
    SECRET_KEY = os.environ.get('SECRET_KEY') or 'dev-secret-key-change-in-production'
    DEBUG = os.environ.get('FLASK_ENV') == 'development'
    
    # OpenAI settings
    OPENAI_API_KEY = os.environ.get('OPENAI_API_KEY')
    OPENAI_MODEL = os.environ.get('OPENAI_MODEL') or 'gpt-3.5-turbo'
    
    # Database settings
    DATABASE_PATH = os.environ.get('DATABASE_PATH') or 'database/listings.db'
    
    # CORS settings
    CORS_ORIGINS = [
        'http://localhost:3000',  # React dev server
        'http://localhost:5173',  # Vite dev server
        'https://your-netlify-app.netlify.app',  # Update with your Netlify URL
        'https://*.netlify.app'  # Allow all Netlify subdomains
    ]
    
    # API settings
    API_PREFIX = '/api'
    MAX_SEARCH_RESULTS = 50
