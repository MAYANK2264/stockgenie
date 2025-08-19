import os
import json
import httpx
from typing import List, Dict, Any
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

class AISuggestionGenerator:
    def __init__(self):
        self.api_key = os.getenv('OPENROUTER_API_KEY')
        self.api_url = 'https://openrouter.ai/api/v1/chat/completions'
        
    async def generate_suggestion(self, prediction_data: Dict[str, Any]) -> str:
        """Generate a human-readable trading suggestion based on ML predictions."""
        try:
            # Format prediction data
            symbol = prediction_data['symbol']
            signal = prediction_data['signal']
            confidence = prediction_data['confidence']
            rsi = prediction_data.get('rsi', 0)
            macd = prediction_data.get('macd', 0)
            
            # Create prompt
            prompt = f"""Based on technical analysis for {symbol}:
            - Trading Signal: {signal}
            - Confidence: {confidence}%
            - RSI: {rsi:.2f}
            - MACD: {macd:.2f}
            
            Generate a brief, professional trading suggestion explaining why this signal was generated.
            Focus on the technical indicators and their implications.
            Keep the response under 50 words."""
            
            # Prepare API request
            headers = {
                'Authorization': f'Bearer {self.api_key}',
                'Content-Type': 'application/json'
            }
            
            data = {
                'model': 'grok-1',  # or any other supported model
                'messages': [
                    {'role': 'system', 'content': 'You are a professional trading analyst providing brief, technical analysis-based suggestions.'},
                    {'role': 'user', 'content': prompt}
                ]
            }
            
            # Make API call
            async with httpx.AsyncClient() as client:
                response = await client.post(
                    self.api_url,
                    headers=headers,
                    json=data,
                    timeout=30.0
                )
                
                if response.status_code == 200:
                    result = response.json()
                    suggestion = result['choices'][0]['message']['content'].strip()
                    return suggestion
                else:
                    return f"AI suggestion unavailable (Signal: {signal}, Confidence: {confidence}%)"
                    
        except Exception as e:
            print(f"Error generating AI suggestion: {str(e)}")
            return f"Technical analysis suggests a {signal.lower()} signal for {symbol} with {confidence}% confidence."
    
    async def generate_freeform(self, prompt: str) -> str:
        """Generate a freeform response from OpenRouter based on a user prompt."""
        try:
            headers = {
                'Authorization': f'Bearer {self.api_key}' if self.api_key else '',
                'Content-Type': 'application/json'
            }
            data = {
                'model': 'grok-1',
                'messages': [
                    {'role': 'system', 'content': 'You are a helpful trading assistant.'},
                    {'role': 'user', 'content': prompt}
                ]
            }
            async with httpx.AsyncClient() as client:
                response = await client.post(
                    self.api_url,
                    headers=headers,
                    json=data,
                    timeout=30.0
                )
                if response.status_code == 200:
                    result = response.json()
                    return result['choices'][0]['message']['content'].strip()
                return 'AI suggestion unavailable at the moment.'
        except Exception as e:
            print(f"Error generating freeform suggestion: {str(e)}")
            return 'Unable to generate a response right now.'
    
    async def generate_market_summary(self, predictions: List[Dict[str, Any]]) -> str:
        """Generate a brief market summary based on all predictions."""
        # Precompute simple fallback stats to avoid NameError in exception path
        num_predictions = len(predictions) if predictions else 0
        buy_signals = sum(1 for p in predictions if p.get('signal') == 'Buy') if predictions else 0
        sell_signals = sum(1 for p in predictions if p.get('signal') == 'Sell') if predictions else 0
        avg_confidence = (
            sum(p.get('confidence', 0) for p in predictions) / num_predictions
            if num_predictions > 0 else 0
        )
        try:
            prompt = f"""Based on ML analysis of {num_predictions} stocks:
            - Buy Signals: {buy_signals}
            - Sell Signals: {sell_signals}
            - Average Confidence: {avg_confidence:.2f}%
            
            Generate a brief (2-3 sentences) market summary describing the current trading environment.
            Focus on the overall market sentiment and potential opportunities."""
            headers = {
                'Authorization': f'Bearer {self.api_key}' if self.api_key else '',
                'Content-Type': 'application/json'
            }
            data = {
                'model': 'grok-1',
                'messages': [
                    {'role': 'system', 'content': 'You are a professional market analyst providing concise market summaries.'},
                    {'role': 'user', 'content': prompt}
                ]
            }
            async with httpx.AsyncClient() as client:
                response = await client.post(
                    self.api_url,
                    headers=headers,
                    json=data,
                    timeout=30.0
                )
                if response.status_code == 200:
                    result = response.json()
                    return result['choices'][0]['message']['content'].strip()
                return f"Market shows {buy_signals} buy and {sell_signals} sell signals with {avg_confidence:.2f}% average confidence."
        except Exception as e:
            print(f"Error generating market summary: {str(e)}")
            return f"Analysis shows {buy_signals} buy and {sell_signals} sell signals across monitored stocks."