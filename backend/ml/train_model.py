import yfinance as yf
import pandas as pd
import numpy as np
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split
from sklearn.metrics import classification_report
import joblib
from datetime import datetime, timedelta

# Stock symbols to track
STOCKS = ['AAPL', 'MSFT', 'TSLA', 'AMZN', 'GOOGL', 'NVDA', 'META', 'NFLX', 'AMD', 'BABA']

def calculate_technical_indicators(df):
    """Calculate technical indicators for feature engineering."""
    # RSI
    delta = df['Close'].diff()
    gain = (delta.where(delta > 0, 0)).rolling(window=14).mean()
    loss = (-delta.where(delta < 0, 0)).rolling(window=14).mean()
    rs = gain / loss
    df['RSI'] = 100 - (100 / (1 + rs))
    
    # Moving averages
    df['SMA_20'] = df['Close'].rolling(window=20).mean()
    df['SMA_50'] = df['Close'].rolling(window=50).mean()
    df['EMA_20'] = df['Close'].ewm(span=20).mean()
    
    # MACD
    exp1 = df['Close'].ewm(span=12, adjust=False).mean()
    exp2 = df['Close'].ewm(span=26, adjust=False).mean()
    df['MACD'] = exp1 - exp2
    df['Signal_Line'] = df['MACD'].ewm(span=9, adjust=False).mean()
    
    # Bollinger Bands
    df['BB_middle'] = df['Close'].rolling(window=20).mean()
    df['BB_upper'] = df['BB_middle'] + 2 * df['Close'].rolling(window=20).std()
    df['BB_lower'] = df['BB_middle'] - 2 * df['Close'].rolling(window=20).std()
    
    # Volume indicators
    df['Volume_SMA'] = df['Volume'].rolling(window=20).mean()
    df['Volume_Ratio'] = df['Volume'] / df['Volume_SMA']
    
    return df

def create_labels(df, threshold=0.02):
    """Create labels based on future price movements.
    Buy (1) if price increases by threshold%
    Sell (-1) if price decreases by threshold%
    Hold (0) otherwise
    """
    future_returns = df['Close'].pct_change(periods=5).shift(-5)  # 5-day future returns
    df['Label'] = 0  # Hold by default
    df.loc[future_returns > threshold, 'Label'] = 1  # Buy
    df.loc[future_returns < -threshold, 'Label'] = -1  # Sell
    return df

def prepare_features(df):
    """Prepare feature matrix for ML model."""
    features = [
        'RSI', 'SMA_20', 'SMA_50', 'EMA_20', 'MACD', 'Signal_Line',
        'BB_middle', 'BB_upper', 'BB_lower', 'Volume_Ratio'
    ]
    
    # Add price-based features
    df['Price_to_SMA20'] = df['Close'] / df['SMA_20']
    df['Price_to_SMA50'] = df['Close'] / df['SMA_50']
    features.extend(['Price_to_SMA20', 'Price_to_SMA50'])
    
    # Normalize features
    for feature in features:
        df[feature] = (df[feature] - df[feature].mean()) / df[feature].std()
    
    return df[features].fillna(0)

def train_model():
    """Train ML model on historical data and save it."""
    all_features = []
    all_labels = []
    
    end_date = datetime.now()
    start_date = end_date - timedelta(days=180)  # 6 months of data
    
    for symbol in STOCKS:
        print(f"Processing {symbol}...")
        # Download historical data
        df = yf.download(symbol, start=start_date, end=end_date)
        
        # Calculate indicators and create labels
        df = calculate_technical_indicators(df)
        df = create_labels(df)
        
        # Prepare features
        X = prepare_features(df)
        y = df['Label']
        
        # Remove rows with NaN values
        valid_idx = ~(X.isna().any(axis=1) | y.isna())
        X = X[valid_idx]
        y = y[valid_idx]
        
        all_features.append(X)
        all_labels.append(y)
    
    # Combine data from all stocks
    X = pd.concat(all_features)
    y = pd.concat(all_labels)
    
    # Split data
    X_train, X_test, y_train, y_test = train_test_split(
        X, y, test_size=0.2, random_state=42
    )
    
    # Train Random Forest model
    model = RandomForestClassifier(
        n_estimators=100,
        max_depth=10,
        random_state=42
    )
    model.fit(X_train, y_train)
    
    # Evaluate model
    y_pred = model.predict(X_test)
    print("\nModel Performance:")
    print(classification_report(y_test, y_pred, target_names=['Sell', 'Hold', 'Buy']))
    
    # Save model
    joblib.dump(model, 'model.pkl')
    print("\nModel saved as model.pkl")

if __name__ == '__main__':
    train_model()