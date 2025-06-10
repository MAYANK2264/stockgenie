import yfinance as yf
import pandas as pd
import numpy as np
import joblib
from datetime import datetime, timedelta
from train_model import calculate_technical_indicators, prepare_features

class StockPredictor:
    def __init__(self, model_path='model.pkl'):
        """Initialize predictor with trained model."""
        self.model = joblib.load(model_path)
        self.stocks = ['AAPL', 'MSFT', 'TSLA', 'AMZN', 'GOOGL', 'NVDA', 'META', 'NFLX', 'AMD', 'BABA']
        
    def get_live_data(self, symbol, lookback_days=60):
        """Fetch recent stock data for prediction."""
        end_date = datetime.now()
        start_date = end_date - timedelta(days=lookback_days)
        
        df = yf.download(symbol, start=start_date, end=end_date, interval='15m')
        if df.empty:
            raise ValueError(f"No data available for {symbol}")
        return df
    
    def predict_single_stock(self, symbol):
        """Make prediction for a single stock."""
        try:
            # Get recent data
            df = self.get_live_data(symbol)
            
            # Calculate indicators
            df = calculate_technical_indicators(df)
            
            # Prepare features for the latest data point
            X = prepare_features(df).iloc[-1:]
            
            # Make prediction
            prediction = self.model.predict(X)[0]
            probabilities = self.model.predict_proba(X)[0]
            
            # Map prediction to signal
            signal_map = {-1: 'Sell', 0: 'Hold', 1: 'Buy'}
            signal = signal_map[prediction]
            
            # Get confidence score
            confidence = max(probabilities) * 100
            
            return {
                'symbol': symbol,
                'signal': signal,
                'confidence': round(confidence, 2),
                'timestamp': datetime.now().isoformat(),
                'current_price': df['Close'].iloc[-1],
                'volume': df['Volume'].iloc[-1],
                'rsi': df['RSI'].iloc[-1],
                'macd': df['MACD'].iloc[-1]
            }
            
        except Exception as e:
            print(f"Error predicting {symbol}: {str(e)}")
            return None
    
    def predict_all_stocks(self):
        """Make predictions for all stocks."""
        predictions = []
        for symbol in self.stocks:
            pred = self.predict_single_stock(symbol)
            if pred:
                predictions.append(pred)
        return predictions

    def get_high_confidence_signals(self, confidence_threshold=70):
        """Get only high-confidence predictions."""
        all_predictions = self.predict_all_stocks()
        return [pred for pred in all_predictions 
                if pred and pred['confidence'] >= confidence_threshold]

if __name__ == '__main__':
    # Test predictor
    predictor = StockPredictor()
    signals = predictor.get_high_confidence_signals()
    for signal in signals:
        print(f"{signal['symbol']}: {signal['signal']} (Confidence: {signal['confidence']}%)")