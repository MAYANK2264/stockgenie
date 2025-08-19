from fastapi import APIRouter, HTTPException
from pydantic import BaseModel

router = APIRouter()

class Settings(BaseModel):
    alpacaApiKey: str
    alpacaSecretKey: str
    openRouterApiKey: str
    maxTradesPerDay: int
    minConfidence: int
    stopLossPercent: float
    enableNotifications: bool
    enableAutoTrading: bool
    paperTrading: bool

@router.post("/save")
async def save_settings(settings: Settings):
    # In a real application, you would save these settings to a database
    # or a configuration file associated with the user.
    # For this example, we'll just print them to the console.
    print("Received settings:", settings.dict())
    # You might want to add logic here to update environment variables or
    # reinitialize services based on the new settings.
    return {"message": "Settings saved successfully"}