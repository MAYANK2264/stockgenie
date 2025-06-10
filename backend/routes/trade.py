from fastapi import APIRouter, HTTPException, BackgroundTasks
from typing import List, Dict, Any
from datetime import datetime
import alpaca_trade_api as tradeapi
import os
import json
import csv
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

router = APIRouter()

# Initialize Alpaca API
alpaca = tradeapi.REST(
    os.getenv('ALPACA_KEY'),
    os.getenv('ALPACA_SECRET'),
    'https://paper-api.alpaca.markets',
    api_version='v2'
)

# Trade log path
TRADE_LOG_PATH = 'trade_log.csv'

def log_trade(trade_data: Dict[str, Any]):
    """Log trade to CSV file."""
    fieldnames = ['timestamp', 'symbol', 'action', 'quantity', 'price', 'signal_confidence']
    
    file_exists = os.path.exists(TRADE_LOG_PATH)
    mode = 'a' if file_exists else 'w'
    
    with open(TRADE_LOG_PATH, mode, newline='') as f:
        writer = csv.DictWriter(f, fieldnames=fieldnames)
        if not file_exists:
            writer.writeheader()
        writer.writerow(trade_data)

@router.get("/account")
async def get_account_info():
    """Get paper trading account information."""
    try:
        account = alpaca.get_account()
        return {
            "account_value": float(account.portfolio_value),
            "buying_power": float(account.buying_power),
            "cash": float(account.cash),
            "total_pl": float(account.equity) - float(account.last_equity),
            "day_pl": float(account.equity) - float(account.last_equity),
            "status": account.status
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/positions")
async def get_positions():
    """Get current positions."""
    try:
        positions = alpaca.list_positions()
        return [{
            "symbol": pos.symbol,
            "quantity": int(pos.qty),
            "entry_price": float(pos.avg_entry_price),
            "current_price": float(pos.current_price),
            "market_value": float(pos.market_value),
            "pl": float(pos.unrealized_pl),
            "pl_percent": float(pos.unrealized_plpc)
        } for pos in positions]
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/trade")
async def execute_trade(background_tasks: BackgroundTasks, trade_data: Dict[str, Any]):
    """Execute a trade based on ML signal."""
    try:
        symbol = trade_data['symbol']
        signal = trade_data['signal']
        confidence = trade_data.get('confidence', 0)
        
        # Get current position
        try:
            position = alpaca.get_position(symbol)
            has_position = True
        except:
            has_position = False
        
        # Execute trade based on signal
        if signal == 'Buy' and not has_position:
            # Buy 1 share
            order = alpaca.submit_order(
                symbol=symbol,
                qty=1,
                side='buy',
                type='market',
                time_in_force='gtc'
            )
            
            # Log trade
            trade_log = {
                'timestamp': datetime.now().isoformat(),
                'symbol': symbol,
                'action': 'buy',
                'quantity': 1,
                'price': float(order.filled_avg_price) if order.filled_avg_price else None,
                'signal_confidence': confidence
            }
            background_tasks.add_task(log_trade, trade_log)
            
            return {"message": f"Buy order executed for {symbol}", "order_id": order.id}
            
        elif signal == 'Sell' and has_position:
            # Sell entire position
            order = alpaca.submit_order(
                symbol=symbol,
                qty=position.qty,
                side='sell',
                type='market',
                time_in_force='gtc'
            )
            
            # Log trade
            trade_log = {
                'timestamp': datetime.now().isoformat(),
                'symbol': symbol,
                'action': 'sell',
                'quantity': int(position.qty),
                'price': float(order.filled_avg_price) if order.filled_avg_price else None,
                'signal_confidence': confidence
            }
            background_tasks.add_task(log_trade, trade_log)
            
            return {"message": f"Sell order executed for {symbol}", "order_id": order.id}
            
        return {"message": f"No trade executed for {symbol} (Signal: {signal})"}
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/trades")
async def get_trade_history(limit: int = 50):
    """Get recent trade history."""
    try:
        trades = []
        if os.path.exists(TRADE_LOG_PATH):
            with open(TRADE_LOG_PATH, 'r') as f:
                reader = csv.DictReader(f)
                trades = list(reader)[-limit:]
        return trades
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/orders")
async def get_orders(status: str = 'all', limit: int = 50):
    """Get recent orders."""
    try:
        if status == 'all':
            orders = alpaca.list_orders(limit=limit)
        else:
            orders = alpaca.list_orders(status=status, limit=limit)
            
        return [{
            "id": order.id,
            "symbol": order.symbol,
            "side": order.side,
            "qty": float(order.qty),
            "filled_qty": float(order.filled_qty),
            "type": order.type,
            "status": order.status,
            "submitted_at": order.submitted_at.isoformat(),
            "filled_at": order.filled_at.isoformat() if order.filled_at else None,
            "filled_avg_price": float(order.filled_avg_price) if order.filled_avg_price else None
        } for order in orders]
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))