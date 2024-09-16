import React, { useState } from 'react';

const StockPrediction = () => {
  const [symbol, setSymbol] = useState('');
  const [predictionResult, setPredictionResult] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/predict', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ symbol }),
      });

      if (response.ok) {
        const result = await response.json();
        setPredictionResult(result);
        setError(null);
      } else {
        const errorData = await response.json();
        setError(errorData.error || 'An error occurred');
        setPredictionResult(null);
      }
    } catch (err) {
      setError('Failed to fetch data. Please try again.');
      setPredictionResult(null);
    }
  };

  return (
    <div>
      <h1>Stock Price Prediction</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Enter Stock Symbol:
          <input
            type="text"
            value={symbol}
            onChange={(e) => setSymbol(e.target.value)}
          />
        </label>
        <button type="submit">Get Prediction</button>
      </form>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {predictionResult && (
        <div>
          <h2>Prediction Results:</h2>
          <p>Last Trading Day Price: {predictionResult["Last Trading Day Price"]}</p>
          <p>Last Trading Day Date: {predictionResult["Last Trading Day Date"]}</p>
          <p>Prediction for Tomorrow: {predictionResult["Prediction for Tomorrow"]}</p>
          <p>Difference Percentage: {predictionResult["Difference Percentage"]}</p>
        </div>
      )}
    </div>
  );
};

export default StockPrediction;
