# 🏠 AI House Buying Assistant

An intelligent real estate search platform powered by ChatGPT that helps users find their dream properties using natural language queries.

## ✨ Features

- **🤖 AI-Powered Search**: Natural language property search using ChatGPT
- **🏘️ Smart Filtering**: Intelligent property matching based on user preferences
- **📱 Responsive Design**: Beautiful, mobile-first interface
- **🔍 Advanced Filters**: Property type, location, price, features, and categories
- **💡 Smart Suggestions**: AI-generated search suggestions and explanations
- **⚡ Instant Results**: Fast, local filtering with ChatGPT enhancement
- **🌐 Netlify Hosted**: Deployed and ready to use

## 🚀 Live Demo

**Visit the live application**: [https://ai-realtor-assistant.netlify.app](https://ai-realtor-assistant.netlify.app)

## 🛠️ Technology Stack

- **Frontend**: React 18 + TailwindCSS
- **AI Integration**: ChatGPT API via Netlify Functions
- **Deployment**: Netlify
- **Data**: Local JSON database with 20+ properties
- **Search**: Smart filtering with natural language processing

## 📋 Prerequisites

- Node.js 16+ 
- npm or yarn
- Netlify account (for deployment)
- OpenAI API key (for ChatGPT integration)

## 🚀 Quick Start

### 1. Clone the Repository

```bash
git clone https://github.com/TushantKaura1/ai-house-buying-assistant.git
cd ai-house-buying-assistant
```

### 2. Install Dependencies

```bash
cd frontend
npm install
```

### 3. Set Up ChatGPT API Key

1. Get your OpenAI API key from [OpenAI Platform](https://platform.openai.com/)
2. Add it to your Netlify environment variables:
   - Go to your Netlify dashboard
   - Navigate to Site settings > Environment variables
   - Add `OPENAI_API_KEY` with your actual API key

### 4. Run Locally

```bash
npm start
```

Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### 5. Build for Production

```bash
npm run build
```

## 🌐 Deployment

### Netlify (Recommended)

1. **Connect to Git**: Connect your GitHub repository to Netlify
2. **Build Settings**:
   - Build command: `npm run build`
   - Publish directory: `build`
3. **Environment Variables**: Add `OPENAI_API_KEY`
4. **Deploy**: Your app will automatically deploy on every push

### Manual Deployment

```bash
npm run build
netlify deploy --prod --dir=build
```

## 🔧 Configuration

### Environment Variables

- `OPENAI_API_KEY`: Your OpenAI API key for ChatGPT integration
- `REACT_APP_ENVIRONMENT`: Set to 'production' for production builds

### Customization

- **Properties**: Edit `frontend/src/data/properties_enhanced.json`
- **Styling**: Modify `frontend/tailwind.config.js`
- **AI Prompts**: Update `frontend/netlify/functions/chatgpt-search.js`

## 📊 Project Structure

```
ai-house-buying-assistant/
├── frontend/                 # React frontend application
│   ├── src/
│   │   ├── components/      # Reusable UI components
│   │   ├── pages/          # Application pages
│   │   ├── services/       # Business logic and API calls
│   │   ├── utils/          # Utility functions
│   │   └── data/           # Property database
│   ├── netlify/
│   │   └── functions/      # Serverless functions
│   ├── public/             # Static assets
│   └── package.json        # Dependencies and scripts
├── database/                # Property data files
├── docs/                    # Documentation
└── README.md               # This file
```

## 🎯 How It Works

### 1. User Input
Users type natural language queries like:
- "affordable condos in Halifax under $500,000"
- "houses with 3+ bedrooms near the ocean"
- "luxury homes in downtown area"

### 2. AI Processing
- Query is sent to ChatGPT via Netlify Functions
- AI analyzes the query and extracts filters
- Returns structured data with explanations

### 3. Smart Filtering
- Properties are filtered based on AI-extracted criteria
- Results are ranked by relevance
- Fallback to local filtering if AI is unavailable

### 4. Results Display
- Filtered properties are displayed with AI insights
- Users can see AI's understanding of their query
- Additional search suggestions are provided

## 🔍 Search Examples

Try these natural language searches:

- **Price-based**: "properties under $300k"
- **Location-specific**: "homes in Bedford suburbs"
- **Feature-focused**: "waterfront properties with ocean views"
- **Category-based**: "luxury condos in downtown Halifax"
- **Investment**: "properties with rental income potential"
- **Family-friendly**: "homes near good schools"

## 🎨 Customization

### Adding New Properties

Edit `frontend/src/data/properties_enhanced.json`:

```json
{
  "id": 21,
  "title": "Your Property Title",
  "type": "house",
  "price": 500000,
  "location": "Halifax",
  "bedrooms": 3,
  "bathrooms": 2,
  "features": ["modern", "family_friendly"],
  "category": "family"
}
```

### Modifying AI Prompts

Update the system prompt in `frontend/netlify/functions/chatgpt-search.js` to change how ChatGPT interprets queries.

## 🚧 Development

### Available Scripts

- `npm start` - Start development server
- `npm run build` - Build for production
- `npm test` - Run tests
- `npm run eject` - Eject from Create React App

### Code Style

- ESLint configuration included
- Prettier formatting
- Component-based architecture
- Service layer for business logic

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- OpenAI for ChatGPT API
- Netlify for hosting and serverless functions
- React and TailwindCSS communities
- Unsplash for property images

## 📞 Support

If you have any questions or need help:

- **GitHub Issues**: [Create an issue](https://github.com/TushantKaura1/ai-house-buying-assistant/issues)
- **Email**: [Your email here]
- **Documentation**: Check the docs folder for detailed guides

## 🔮 Future Enhancements

- [ ] User accounts and favorites
- [ ] Advanced filtering options
- [ ] Property comparison tools
- [ ] Map integration
- [ ] Virtual tours
- [ ] Mortgage calculator
- [ ] Market analytics
- [ ] Multi-language support

---

**Built with ❤️ by Tushant Kaura**

*Making house hunting intelligent and effortless*
