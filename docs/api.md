API Reference
=============

Base URL
- Local: `http://localhost:8000`

Health
- `GET /health` → `{ status, message }`

ML
- `GET /api/ml/predictions` → `Array<{ symbol, signal, confidence, timestamp, current_price, volume, rsi, macd }>`
- `GET /api/ml/predictions/{symbol}` → `{ ... }`
- `GET /api/ml/signals?confidence_threshold=70` → filtered predictions
- `GET /api/ml/model/info` → `{ stocks: string[], model_type, last_updated }`
- `POST /api/ml/suggest` → `{ suggestion }`
  - Body: `{ prompt: string }`

Trading (Alpaca paper)
- `GET /api/trade/account` → account summary
- `GET /api/trade/positions` → open positions
- `POST /api/trade/trade` → executes buy/sell based on signal
  - Body: `{ symbol: string, signal: 'Buy'|'Sell'|'Hold', confidence?: number }`
- `GET /api/trade/orders?status=all&limit=50` → recent orders
- `GET /api/trade/trades?limit=50` → CSV-backed local trade log

Errors
- Standard JSON error via FastAPI: `{ detail: string }`


