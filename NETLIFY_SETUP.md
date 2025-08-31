# 🚀 Netlify Setup Guide for AI House Buying Assistant

## 🔑 Setting Up ChatGPT API Key

To enable ChatGPT integration in your AI House Buying Assistant, follow these steps:

### 1. Get Your OpenAI API Key

1. Visit [OpenAI Platform](https://platform.openai.com/)
2. Sign in or create an account
3. Go to API Keys section
4. Create a new API key
5. Copy the key (it starts with `sk-`)

### 2. Add API Key to Netlify

1. **Go to Netlify Dashboard**: https://app.netlify.com/
2. **Select your site**: `ai-realtor-assistant`
3. **Navigate to**: Site settings > Environment variables
4. **Click**: "Add a variable"
5. **Set the following**:
   - **Key**: `OPENAI_API_KEY`
   - **Value**: Your actual OpenAI API key (e.g., `sk-proj-...`)
6. **Click**: "Save"

### 3. Redeploy Your Site

After adding the environment variable, redeploy:

```bash
cd frontend
npm run build
netlify deploy --prod --dir=build
```

### 4. Test ChatGPT Integration

Visit your live site and try these searches:
- "affordable condos in Halifax under $500,000"
- "luxury homes with ocean views"
- "family properties near good schools"

## 🔒 Security Notes

- ✅ **API key is secure**: Stored in Netlify environment variables
- ✅ **Never exposed**: Not visible in frontend code
- ✅ **Server-side only**: Used only by Netlify Functions
- ✅ **Environment-specific**: Can be different for production/staging

## 🐛 Troubleshooting

### If ChatGPT doesn't work:

1. **Check API Key**: Ensure it's correctly set in Netlify
2. **Check Function Logs**: Go to Functions tab in Netlify dashboard
3. **Verify Deployment**: Ensure latest version is deployed
4. **Test API Key**: Verify it works with OpenAI directly

### Common Issues:

- **"API key not configured"**: Add OPENAI_API_KEY to Netlify
- **"Rate limit exceeded"**: Check your OpenAI usage
- **"Function timeout"**: Increase timeout in Netlify settings

## 📱 Your Live Application

**Production URL**: https://ai-realtor-assistant.netlify.app  
**GitHub Repo**: https://github.com/TushantKaura1/ai-house-buying-assistant

## 🎯 What Happens Next

1. User types a natural language query
2. Query is sent to Netlify Function
3. Function calls ChatGPT API with your key
4. AI analyzes the query and returns structured filters
5. Properties are filtered based on AI understanding
6. Results are displayed with AI explanations

---

**Need help?** Check the function logs in your Netlify dashboard or create an issue on GitHub.
