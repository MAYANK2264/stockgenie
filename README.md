# StockGenie - AI-Powered Trading Companion

A modern, AI-driven trading platform built with Next.js, React, and Python.

## 🚀 Live Demo

Visit the live application: [https://mayank2264.github.io/stockgenie](https://mayank2264.github.io/stockgenie)

## 🏗️ Project Structure

```
newtrade/
├── frontend/          # Next.js React application
├── backend/           # Python Flask API
├── docs/             # Documentation
└── .github/          # GitHub Actions workflows
```

## 🛠️ Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript, Tailwind CSS
- **Backend**: Python Flask, Machine Learning models
- **Deployment**: GitHub Pages (Frontend), Python hosting (Backend)

## 🚀 Quick Start

### Frontend Development

```bash
cd frontend
npm install
npm run dev
```

### Backend Development

```bash
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
python main.py
```

## 📦 Building for Production

```bash
cd frontend
npm run build
```

The built files will be in `frontend/out/` directory.

## 🌐 Deployment

This project automatically deploys to GitHub Pages using GitHub Actions. Every push to the `main` branch triggers a new deployment.

### Manual Deployment

1. Go to Actions tab in your GitHub repository
2. Select "Deploy to GitHub Pages" workflow
3. Click "Run workflow"

## 🔧 Configuration

- **Base Path**: `/stockgenie` (for GitHub Pages)
- **Static Export**: Enabled for GitHub Pages compatibility
- **CSP Headers**: Configured to prevent security issues

## 📚 Documentation

- [Deployment Guide](DEPLOYMENT.md)
- [API Documentation](docs/api.md)
- [Backend Guide](docs/backend.md)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📄 License

This project is licensed under the MIT License.
