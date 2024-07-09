import React, { useState, useEffect } from 'react';

function StockTrend({ symbol }) {
  const [trendData, setTrendData] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:5000/stock_trend/${symbol}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setTrendData(data);
      } catch (error) {
        setError('Failed to fetch data: ' + error.message);
      }
    };

    fetchData();
  }, [symbol]); // Dependency array, refetch if symbol changes

  return (
    <div>
      {error && <p>{error}</p>}
      {trendData ? (
        <div>
          <p>RSI: {trendData.RSI}</p>
          <p>Trend: {trendData.Trend}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default StockTrend;
