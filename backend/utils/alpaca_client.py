from alpaca.trading.client import TradingClient
from alpaca.data.historical import StockHistoricalDataClient
from alpaca.data.requests import StockBarsRequest
from alpaca.data.timeframe import TimeFrame
from datetime import datetime
from dotenv import load_dotenv
import os

# Load environment variables
load_dotenv()

def get_trading_client():
    """Initialize and return Alpaca trading client."""
    api_key = os.getenv('ALPACA_KEY')
    api_secret = os.getenv('ALPACA_SECRET')
    
    if not api_key or not api_secret:
        raise ValueError("Alpaca API credentials not found in environment variables")
    
    return TradingClient(
        api_key,
        api_secret,
        paper=True  # Use paper trading
    )

def get_data_client():
    """Initialize and return Alpaca data client for historical data."""
    api_key = os.getenv('ALPACA_KEY')
    api_secret = os.getenv('ALPACA_SECRET')
    
    if not api_key or not api_secret:
        raise ValueError("Alpaca API credentials not found in environment variables")
    
    return StockHistoricalDataClient(api_key, api_secret)

def get_historical_bars(symbols, start_date, end_date, timeframe=TimeFrame.Hour):
    """Get historical bar data for specified symbols."""
    client = get_data_client()
    
    request = StockBarsRequest(
        symbol_or_symbols=symbols,
        timeframe=timeframe,
        start=start_date,
        end=end_date
    )
    
    return client.get_stock_bars(request)

def get_account_info():
    """Get paper trading account information."""
    client = get_trading_client()
    return client.get_account()

def submit_order(symbol, qty, side, type='market', time_in_force='gtc'):
    """Submit a trading order."""
    client = get_trading_client()
    return client.submit_order(
        symbol=symbol,
        qty=qty,
        side=side,
        type=type,
        time_in_force=time_in_force
    )

def get_positions():
    """Get current positions."""
    client = get_trading_client()
    return client.get_all_positions()

def get_orders(status=None, limit=100):
    """Get orders with optional status filter."""
    client = get_trading_client()
    return client.get_orders(status=status, limit=limit)