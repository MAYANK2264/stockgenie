from fastapi import APIRouter, HTTPException
from typing import List, Dict, Any
from datetime import datetime
import sys
import os

# Add ML directory to path
sys.path.append(os.path.join(os.path.dirname(__file__), '../ml'))

from predict import StockPredictor
from utils.ai_suggestions import AISuggestionGenerator

router = APIRouter()
predictor = StockPredictor()
ai = AISuggestionGenerator()

@router.get("/predictions", response_model=List[Dict[str, Any]])
async def get_predictions():
    """Get predictions for all stocks."""
    try:
        predictions = predictor.predict_all_stocks()
        return predictions
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/predictions/{symbol}", response_model=Dict[str, Any])
async def get_stock_prediction(symbol: str):
    """Get prediction for a specific stock."""
    try:
        prediction = predictor.predict_single_stock(symbol)
        if not prediction:
            raise HTTPException(status_code=404, detail=f"No prediction available for {symbol}")
        return prediction
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/signals", response_model=List[Dict[str, Any]])
async def get_high_confidence_signals(confidence_threshold: float = 70):
    """Get high confidence trading signals."""
    try:
        signals = predictor.get_high_confidence_signals(confidence_threshold)
        return signals
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/model/info")
async def get_model_info():
    """Get information about the current model."""
    try:
        return {
            "stocks": predictor.stocks,
            "model_type": "RandomForest",
            "last_updated": datetime.fromtimestamp(
                os.path.getmtime(os.path.join(os.path.dirname(__file__), '../ml/model.pkl'))
            ).isoformat()
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/suggest")
async def generate_suggestion(payload: Dict[str, Any]):
    """Generate a freeform AI suggestion for the chat assistant."""
    try:
        prompt = payload.get("prompt", "").strip()
        if not prompt:
            raise HTTPException(status_code=400, detail="Missing 'prompt' in request body")
        suggestion = await ai.generate_freeform(prompt)
        return {"suggestion": suggestion}
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))