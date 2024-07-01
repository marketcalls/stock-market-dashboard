# Stock Market Dashboard

## Overview

The Stock Market Dashboard is a web application that provides real-time and historical stock market data visualization. It features a candlestick chart for the S&P 500 index and displays current values for S&P 500, NASDAQ, and Dow Jones indices.

## Features

- Real-time stock market data for S&P 500, NASDAQ, and Dow Jones
- 5-minute interval candlestick chart for S&P 500
- Responsive design with a dark theme for easy viewing
- Robust error handling for API and data availability issues

## Tech Stack

- Frontend: React.js, Plotly.js
- Backend: Flask (Python)
- Data Source: yfinance API

## Prerequisites

- Node.js (v14 or later)
- Python (v3.7 or later)
- pip (Python package manager)
- Git

## Installation

1. Clone the repository:
   ```
   git clone https://github.com/marketcalls/stock-market-dashboard
   ```

2. Navigate to the project directory:
   ```
   cd stock-market-dashboard
   ```

### Backend Setup

3. Navigate to the backend directory:
   ```
   cd backend
   ```

4. Create a virtual environment:
   ```
   python -m venv venv
   ```

5. Activate the virtual environment:
   - On Windows:
     ```
     venv\Scripts\activate
     ```
   - On macOS and Linux:
     ```
     source venv/bin/activate
     ```

6. Install the required Python packages:
   ```
   pip install flask yfinance pytz
   ```

7. Start the Flask server:
   ```
   python app.py
   ```

### Frontend Setup

8. Open a new terminal window and navigate to the frontend directory:
   ```
   cd ../frontend
   ```

9. Install the required npm packages:
   ```
   npm install
   ```

10. Start the React development server:
    ```
    npm start
    ```

## Usage

After starting both the backend and frontend servers, open your web browser and go to `http://localhost:3000` to view the Stock Market Dashboard.

The dashboard will automatically update every 5 minutes with the latest data. The candlestick chart shows the S&P 500 index performance for the last trading day, with each candle representing a 5-minute interval.

[The rest of the README content remains the same...]

## Project Structure

```
stock-market-dashboard/
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   └── StockMarketDashboard.js
│   │   ├── App.js
│   │   └── index.js
│   ├── package.json
│   └── README.md
│
├── backend/
│   ├── app.py
│   ├── requirements.txt
│   └── README.md
│
└── README.md
```

## Future Enhancements

- Implement data caching to reduce API calls
- Add user customization options (e.g., selecting different indices or time frames)
- Integrate additional technical indicators
- Implement real-time updates using WebSocket
- Add authentication for personalized features
- Optimize performance and implement comprehensive error handling

## Contributing

Contributions to improve the Stock Market Dashboard are welcome. Please feel free to submit a Pull Request.

## License

This project is open source and available under the [MIT License](LICENSE).

## Acknowledgments

- Data provided by [Yahoo Finance](https://finance.yahoo.com/) through the yfinance API
- Created using Create React App and Flask