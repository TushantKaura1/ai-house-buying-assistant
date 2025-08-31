#!/usr/bin/env python3
"""
Startup script for AI Realtor Assistant Backend
"""

import os
import sys
import subprocess

def check_dependencies():
    """Check if required dependencies are installed"""
    try:
        import flask
        import openai
        print("✅ All dependencies are installed")
        return True
    except ImportError as e:
        print(f"❌ Missing dependency: {e}")
        print("Please run: pip install -r requirements.txt")
        return False

def setup_environment():
    """Setup environment variables"""
    # Set default values
    if not os.environ.get('OPENAI_API_KEY'):
        print("⚠️  Warning: OPENAI_API_KEY not set")
        print("   AI features will use fallback parsing")
        print("   Set OPENAI_API_KEY environment variable for full AI functionality")
    
    if not os.environ.get('FLASK_ENV'):
        os.environ['FLASK_ENV'] = 'development'
        print("ℹ️  Set FLASK_ENV=development")
    
    if not os.environ.get('SECRET_KEY'):
        os.environ['SECRET_KEY'] = 'dev-secret-key-change-in-production'
        print("ℹ️  Set default SECRET_KEY")

def main():
    """Main startup function"""
    print("🚀 Starting AI Realtor Assistant Backend...")
    print("=" * 50)
    
    # Check dependencies
    if not check_dependencies():
        sys.exit(1)
    
    # Setup environment
    setup_environment()
    
    print("\n📋 Configuration:")
    print(f"   FLASK_ENV: {os.environ.get('FLASK_ENV', 'not set')}")
    print(f"   OPENAI_API_KEY: {'✅ Set' if os.environ.get('OPENAI_API_KEY') else '❌ Not set'}")
    print(f"   Database: database/listings.db")
    print(f"   API Prefix: /api")
    
    print("\n🌐 Starting Flask server...")
    print("   Backend will be available at: http://localhost:5000")
    print("   API endpoints at: http://localhost:5000/api")
    print("\n   Press Ctrl+C to stop the server")
    print("=" * 50)
    
    # Start Flask app
    try:
        from app import app
        app.run(
            host='0.0.0.0',
            port=5000,
            debug=True
        )
    except KeyboardInterrupt:
        print("\n\n👋 Server stopped by user")
    except Exception as e:
        print(f"\n❌ Error starting server: {e}")
        sys.exit(1)

if __name__ == '__main__':
    main()
