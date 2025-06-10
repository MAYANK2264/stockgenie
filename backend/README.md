# TradeGenie Backend

AI-powered stock analysis and automated paper trading platform using FastAPI, scikit-learn, and Alpaca Trade API.

## Features

- ML-based stock predictions for 10 popular stocks
- Technical indicator calculations (RSI, MACD, SMA, EMA, Bollinger Bands)
- Automated paper trading via Alpaca API
- Real-time market data using yfinance
- AI-generated trading suggestions using OpenRouter/Grok API
- Trade logging and performance tracking

## Setup

1. Create a virtual environment:
```bash
python -m venv venv
source venv/bin/activate  # On Windows: .\venv\Scripts\activate
```

2. Install dependencies:
```bash
pip install -r requirements.txt
```

3. Copy `.env.example` to `.env` and fill in your API keys:
```bash
cp .env.example .env
```

4. Train the ML model:
```bash
python ml/train_model.py
```

5. Start the FastAPI server:
```bash
uvicorn main:app --reload
```

The API will be available at `http://localhost:8000`

## API Endpoints

### ML Predictions
- `GET /api/ml/predictions` - Get predictions for all stocks
- `GET /api/ml/predictions/{symbol}` - Get prediction for specific stock
- `GET /api/ml/signals` - Get high confidence trading signals
- `GET /api/ml/model/info` - Get model information

### Paper Trading
- `GET /api/trade/account` - Get account information
- `GET /api/trade/positions` - Get current positions
- `POST /api/trade/trade` - Execute a trade
- `GET /api/trade/trades` - Get trade history
- `GET /api/trade/orders` - Get order history

## Project Structure

```
backend/
├── ml/
│   ├── train_model.py    # ML model training
│   └── predict.py        # Live predictions
├── routes/
│   ├── ml.py            # ML-related endpoints
│   └── trade.py         # Trading endpoints
├── utils/
│   └── ai_suggestions.py # AI text generation
├── main.py              # FastAPI application
├── requirements.txt     # Python dependencies
└── .env                 # Environment variables
```

## Environment Variables

- `ALPACA_KEY` - Alpaca API key
- `ALPACA_SECRET` - Alpaca API secret
- `OPENROUTER_API_KEY` - OpenRouter API key for AI suggestions

## Model Details

- Algorithm: Random Forest Classifier
- Features: Technical indicators (RSI, MACD, SMA, etc.)
- Training data: 6 months of historical data
- Prediction classes: Buy, Sell, Hold
- Confidence threshold: 70%

## Trading Logic

- Buy 1 share when model predicts "Buy" with high confidence
- Sell entire position when model predicts "Sell" with high confidence
- All trades are logged to `trade_log.csv`
- Paper trading only (no real money involved)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request