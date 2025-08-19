Overview
========

TradeGenie/StockGenie is an AI-assisted trading playground:
- Backend (FastAPI) exposes ML predictions and paper-trading endpoints
- Frontend (Next.js) renders dashboards, market views, and an AI chat

Why these technologies
- FastAPI: modern Python web framework, async I/O, type hints
- scikit-learn: fast prototyping of classical ML models (RandomForest)
- yfinance: convenient historical/interval market data
- Alpaca: paper trading with simple API
- Next.js + React + Tailwind: productive DX for dashboards and data UIs

Non-goals
- Not production-grade risk management
- Not high-frequency trading

Data flow
1. Model is trained with technical indicators on historical prices, saved to `ml/model.pkl`
2. Live predictions fetch recent bars, compute indicators, prepare features, and infer a signal
3. Frontend pulls predictions and renders signals; user can trigger trades (paper) via Alpaca


