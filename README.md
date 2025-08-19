TradeGenie / StockGenie
=======================

AI-powered stock analysis and paper trading platform. This monorepo contains a FastAPI backend that serves ML-powered predictions and trading endpoints, and a Next.js frontend that renders dashboards, predictions, and an AI chat assistant.

Demo
- Frontend (static): https://mayank2264.github.io/stockgenie/
- Repository: https://github.com/MAYANK2264/stockgenie

Architecture
- Frontend: Next.js 15, React 19, Tailwind CSS 4, Radix UI
- Backend: FastAPI, scikit-learn, yfinance, Alpaca Trade API
- ML: RandomForest model trained on technical indicators for selected tickers

Repository Layout
```
newtrade/
  backend/           # FastAPI app, ML model training/inference, trading routes
  frontend/          # Next.js app (App Router)
  package.json       # Optional root meta (not used in build)
```

Quick Start
1) Backend (Windows PowerShell)
```
cd backend
python -m venv venv
./venv/Scripts/python -m pip install --upgrade pip
./venv/Scripts/pip install -r requirements.txt

# Optional: set env vars for keys
$env:ALPACA_KEY="<your key>"; $env:ALPACA_SECRET="<your secret>"; $env:OPENROUTER_API_KEY="<optional>"

# Train the model (creates ml/model.pkl)
./venv/Scripts/python ml/train_model.py

# Run API
./venv/Scripts/python -m uvicorn main:app --host 0.0.0.0 --port 8000 --reload
```

2) Frontend
```
cd frontend
npm ci
npm run dev
# open http://localhost:3000 (or shown port)
```

Environment Variables (Backend)
- `ALPACA_KEY` – Alpaca API key
- `ALPACA_SECRET` – Alpaca API secret
- `OPENROUTER_API_KEY` – API key for AI suggestions (optional)

Key Endpoints (Backend)
- `GET /health` – service status
- `GET /api/ml/predictions` – all stock predictions
- `GET /api/ml/predictions/{symbol}` – single stock prediction
- `GET /api/ml/signals` – high-confidence signals
- `GET /api/ml/model/info` – model metadata
- `POST /api/ml/suggest` – AI chat suggestion (freeform prompt)
- `GET /api/trade/account` – Alpaca paper account
- `GET /api/trade/positions` – positions
- `POST /api/trade/trade` – execute trade from signal
- `GET /api/trade/orders` – recent orders
- `GET /api/trade/trades` – local trade log (CSV)

ML Model
- Algorithm: RandomForestClassifier
- Features: RSI, MACD, SMAs, EMAs, Bollinger Bands, volume ratios and derived features
- Labels: {-1: Sell, 0: Hold, 1: Buy} based on future return threshold

Static Frontend Deployment (GitHub Pages)
- The frontend is configured for `output: 'export'` with `basePath='/stockgenie'` in production.
- Exported static site is pushed to `gh-pages` branch and published via GitHub Pages.
- API calls from the static site require a publicly reachable backend; otherwise, those UI actions will be read-only or fallback.

Documentation
- See `docs/overview.md` (project overview and tech choices)
- See `docs/backend.md` (running backend, env vars, model training)
- See `docs/frontend.md` (running frontend, env vars, static export)
- See `docs/api.md` (API reference)
- See `docs/deployment.md` (GitHub Pages and backend hosting)
- See `docs/troubleshooting.md` (common issues on Windows / CI)

Disclaimer
This project is for educational purposes. It is not financial advice. Use paper trading only.


