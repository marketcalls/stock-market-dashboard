from flask import Flask, jsonify
import yfinance as yf
from datetime import datetime, timedelta
import pytz
import pandas as pd

app = Flask(__name__)

def get_last_valid_business_day():
    today = datetime.now(pytz.timezone('US/Eastern'))
    offset = max(1, (today.weekday() + 6) % 7 - 3)
    last_business_day = today - timedelta(days=offset)
    return last_business_day.replace(hour=0, minute=0, second=0, microsecond=0)

def get_current_price(ticker):
    try:
        return ticker.info.get('regularMarketPrice') or ticker.history(period="1d")['Close'].iloc[-1]
    except Exception as e:
        print(f"Error getting current price: {e}")
        return None

def get_previous_close(ticker):
    try:
        return ticker.info.get('previousClose') or ticker.history(period="2d")['Close'].iloc[-2]
    except Exception as e:
        print(f"Error getting previous close: {e}")
        return None

def get_historical_data(ticker, start_date, end_date):
    try:
        data = ticker.history(start=start_date, end=end_date, interval='5m')
        if data.empty:
            print(f"No data available for the specified date range. Fetching last available data.")
            data = ticker.history(period="1d", interval='5m')
        
        return {
            'datetime': data.index.strftime('%Y-%m-%d %H:%M:%S').tolist(),
            'open': data['Open'].tolist(),
            'high': data['High'].tolist(),
            'low': data['Low'].tolist(),
            'close': data['Close'].tolist()
        }
    except Exception as e:
        print(f"Error fetching historical data: {e}")
        return {
            'datetime': [],
            'open': [],
            'high': [],
            'low': [],
            'close': []
        }

@app.route('/api/stock-data')
def get_stock_data():
    symbols = {
        'SP500': '^GSPC',
        'NASDAQ': '^IXIC',
        'DOW': '^DJI'
    }
    
    end_date = datetime.now(pytz.timezone('US/Eastern'))
    start_date = get_last_valid_business_day()
    
    current_data = {}
    historical_data = {}

    for name, symbol in symbols.items():
        try:
            ticker = yf.Ticker(symbol)
            
            # Fetch current data
            current_price = get_current_price(ticker)
            previous_close = get_previous_close(ticker)
            
            if current_price is not None and previous_close is not None:
                percent_change = ((current_price - previous_close) / previous_close) * 100
                
                current_data[name] = {
                    'value': round(current_price, 2),
                    'change': round(percent_change, 2)
                }
            else:
                current_data[name] = {'value': 'N/A', 'change': 'N/A'}

            # Fetch historical data for S&P 500 only
            if name == 'SP500':
                historical_data = get_historical_data(ticker, start_date, end_date)
        except Exception as e:
            print(f"Error processing {name}: {e}")
            current_data[name] = {'value': 'Error', 'change': 'Error'}

    return jsonify({
        'current': current_data,
        'historical': historical_data
    })

if __name__ == '__main__':
    app.run(debug=True)