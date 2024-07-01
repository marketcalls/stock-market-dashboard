import React, { useState, useEffect } from 'react';
import Plot from 'react-plotly.js';
import { AlertCircle, TrendingUp, TrendingDown, Activity } from 'lucide-react';

const Card = ({ children, className }) => (
  <div className={`bg-gray-800 border border-gray-700 rounded-lg p-4 ${className}`}>
    {children}
  </div>
);

const Alert = ({ children, className }) => (
  <div className={`bg-red-900 border border-red-700 text-white p-4 rounded-lg ${className}`}>
    {children}
  </div>
);

const IndexCard = ({ title, value, change, Icon }) => (
  <Card className="bg-gray-800 border-gray-700">
    <div className="flex flex-row items-center justify-between space-y-0 pb-2">
      <h3 className="text-sm font-medium text-gray-300">{title}</h3>
      <Icon className={`h-4 w-4 ${change >= 0 ? 'text-green-400' : 'text-red-400'}`} />
    </div>
    <div>
      <div className="text-2xl font-bold text-white">{value.toLocaleString()}</div>
      <p className={`text-xs ${change >= 0 ? 'text-green-400' : 'text-red-400'}`}>
        {change >= 0 ? '+' : ''}{change}% from previous close
      </p>
    </div>
  </Card>
);

const StockMarketDashboard = () => {
  const [showAlert, setShowAlert] = useState(true);
  const [stockData, setStockData] = useState({
    SP500: { value: 0, change: 0 },
    NASDAQ: { value: 0, change: 0 },
    DOW: { value: 0, change: 0 }
  });
  const [historicalData, setHistoricalData] = useState({
    datetime: [],
    open: [],
    high: [],
    low: [],
    close: []
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/stock-data');
        const data = await response.json();
        setStockData(data.current);
        setHistoricalData(data.historical);
      } catch (error) {
        console.error('Error fetching stock data:', error);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 300000); // Fetch data every 5 minutes

    return () => clearInterval(interval);
  }, []);

  const plotData = [{
    x: historicalData.datetime,
    close: historicalData.close,
    high: historicalData.high,
    low: historicalData.low,
    open: historicalData.open,
    type: 'candlestick',
    xaxis: 'x',
    yaxis: 'y'
  }];

  const layout = {
    title: 'S&P 500 (5-Minute Intervals)',
    dragmode: 'zoom',
    showlegend: false,
    xaxis: {
      rangeslider: { visible: false },
      title: 'Time',
      gridcolor: '#444',
    },
    yaxis: {
      title: 'Price',
      gridcolor: '#444',
    },
    paper_bgcolor: 'rgba(0,0,0,0)',
    plot_bgcolor: 'rgba(0,0,0,0)',
    font: { color: '#888' },
  };

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Stock Market Dashboard</h1>
      
      {showAlert && (
        <Alert className="mb-8">
          <AlertCircle className="h-4 w-4 inline mr-2" />
          <span className="font-bold">Market Volatility Warning</span>
          <p>High market volatility detected. Monitor closely and prepare for potential interventions.</p>
        </Alert>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
        <IndexCard title="S&P 500" value={stockData.SP500.value} change={stockData.SP500.change} Icon={TrendingUp} />
        <IndexCard title="NASDAQ" value={stockData.NASDAQ.value} change={stockData.NASDAQ.change} Icon={TrendingDown} />
        <IndexCard title="Dow Jones" value={stockData.DOW.value} change={stockData.DOW.change} Icon={Activity} />
      </div>

      <Card className="bg-gray-900 border-gray-800">
        <Plot
          data={plotData}
          layout={layout}
          style={{ width: '100%', height: '500px' }}
          config={{ responsive: true }}
        />
      </Card>
    </div>
  );
};

export default StockMarketDashboard;