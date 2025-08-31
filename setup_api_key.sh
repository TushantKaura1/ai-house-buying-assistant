#!/bin/bash

echo "🔐 Setting up OpenAI API Key for AI Realtor Assistant"
echo "=================================================="

# Check if .env file exists
if [ -f ".env" ]; then
    echo "⚠️  .env file already exists. Backing up..."
    cp .env .env.backup
fi

# Create .env file
echo "Creating .env file..."
cat > .env << EOF
# AI Realtor Assistant Environment Variables
# Add your actual API key below

# OpenAI API Configuration
OPENAI_API_KEY=your_openai_api_key_here

# Flask Configuration
FLASK_ENV=development
SECRET_KEY=dev-secret-key-change-in-production

# Database Configuration
DATABASE_PATH=database/listings.db
EOF

echo ""
echo "✅ .env file created successfully!"
echo ""
echo "📝 NEXT STEPS:"
echo "1. Edit the .env file and replace 'your_openai_api_key_here' with your actual API key"
echo "2. Run: nano .env  (or use any text editor)"
echo "3. Save the file"
echo "4. Start your backend: cd backend && python start.py"
echo ""
echo "🔒 Security: .env file is already added to .gitignore"
echo "   Your API key will NOT be committed to version control"
echo ""
echo "⚠️  IMPORTANT: If you shared your API key publicly,"
echo "   please revoke it and generate a new one at:"
echo "   https://platform.openai.com/api-keys"
