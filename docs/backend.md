Backend
=======

Stack
- FastAPI, Uvicorn
- scikit-learn, pandas, numpy, yfinance, joblib
- Alpaca Trade API (paper)

Setup
```
cd backend
python -m venv venv
./venv/Scripts/python -m pip install --upgrade pip
./venv/Scripts/pip install -r requirements.txt
```

Environment
```
# PowerShell example
$env:ALPACA_KEY="..."
$env:ALPACA_SECRET="..."
$env:OPENROUTER_API_KEY="..."  # optional
```

Train model
```
./venv/Scripts/python ml/train_model.py
```

Run
```
./venv/Scripts/python -m uvicorn main:app --host 0.0.0.0 --port 8000 --reload
```

Endpoints
- Health: `GET /health`
- Predictions: `GET /api/ml/predictions`, `GET /api/ml/predictions/{symbol}`
- Signals: `GET /api/ml/signals`
- Model info: `GET /api/ml/model/info`
- AI Suggest: `POST /api/ml/suggest` with `{ prompt: string }`
- Trading: `GET /api/trade/account`, `GET /api/trade/positions`, `POST /api/trade/trade`, `GET /api/trade/orders`, `GET /api/trade/trades`

Notes
- `predict.py` lazy-loads the model to allow API to boot without `model.pkl`
- `ai_suggestions.py` gracefully degrades if `OPENROUTER_API_KEY` is missing


