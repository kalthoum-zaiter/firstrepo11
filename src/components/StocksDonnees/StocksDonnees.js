import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Typography, Paper, CircularProgress } from '@mui/material';

const TickerInfo = ({ symbol }) => {
  const [stockData, setStockData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStockInfo = async () => {
      try {
        // Make the request to the Flask backend
        const response = await axios.get('http://localhost:5000/api/ticker', {
          params: { ticker: symbol },
        });
        setStockData(response.data);
      } catch (err) {
        setError(err.message);  // Handle the error
      } finally {
        setLoading(false);  // Stop the loading indicator
      }
    };

    fetchStockInfo();
  }, [symbol]);  // Fetch new data whenever the 'symbol' prop changes

  if (loading) return <CircularProgress />;  // Show loading spinner
  if (error) return <Typography color="error">Error: {error}</Typography>;  // Display error if any

  return (
    stockData && (
      <Paper elevation={3} sx={{ padding: 3, marginTop: 2 }}>
        <Typography variant="h5" gutterBottom>
          {stockData.name} ({stockData.ticker})
        </Typography>
        <Typography variant="body1" gutterBottom>
          {stockData.description}
        </Typography>
        <Typography variant="body2" gutterBottom>
          <strong>CEO:</strong> {stockData.ceo}
        </Typography>
        <Typography variant="body2" gutterBottom>
          <strong>Founded:</strong> {stockData.founded}
        </Typography>
        <Typography variant="body2" gutterBottom>
          <strong>Sector:</strong> {stockData.sector}
        </Typography>
        <Typography variant="body2" gutterBottom>
          <a href={stockData.website} target="_blank" rel="noopener noreferrer">
            Visit Website
          </a>
        </Typography>
      </Paper>
    )
  );
};

export default TickerInfo;
