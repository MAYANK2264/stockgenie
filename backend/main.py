from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from routes import ml, trade
from dotenv import load_dotenv
import os

# Load environment variables
load_dotenv()

# Initialize FastAPI app
app = FastAPI(
    title="TradeGenie API",
    description="AI-powered stock analysis and paper trading platform",
    version="1.0.0"
)

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(ml.router, prefix="/api/ml", tags=["ML Predictions"])
app.include_router(trade.router, prefix="/api/trade", tags=["Paper Trading"])

# Health check endpoint
@app.get("/health")
async def health_check():
    return {"status": "healthy", "message": "TradeGenie API is running"}

# Verify API keys on startup
@app.on_event("startup")
async def startup_event():
    required_env_vars = [
        'ALPACA_KEY',
        'ALPACA_SECRET',
        'OPENROUTER_API_KEY'
    ]
    
    missing_vars = [var for var in required_env_vars if not os.getenv(var)]
    
    if missing_vars:
        print(f"Warning: Missing environment variables: {', '.join(missing_vars)}")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)