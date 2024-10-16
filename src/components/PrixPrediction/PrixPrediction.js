import React, { useState, useEffect } from 'react';
import { Box, Typography, CircularProgress, Grid, Paper } from '@mui/material';
import { useParams } from 'react-router-dom';
import PageStockHeader from '../PageStockHeader/PageStockHeader';

const StockPrediction = () => {
  const [predictionResult, setPredictionResult] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const { tickerName } = useParams();  // Get ticker symbol from URL

  useEffect(() => {
    if (tickerName) {
      fetchPrediction(tickerName);  // Automatically fetch prediction when the tickerName is available
    }
  }, [tickerName]);

  const fetchPrediction = async (symbol) => {
    setLoading(true);  // Start loading state
    try {
      const response = await fetch('http://localhost:5000/predictSentiment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ symbol }),  // Send ticker symbol in the request body
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
    } finally {
      setLoading(false);  // End loading state
    }
  };

  return (
    <Box sx={{ width: '90%', margin: 'auto', mt: 4 }}>
      <Grid container spacing={2}>
        {/* Stock Header */}
        <Grid item xs={12}>
          <PageStockHeader />
        </Grid>
        <Grid item xs={8}></Grid>

        {/* Prediction Result */}
        <Grid item xs={4}>
          <Paper elevation={3} sx={{ padding: 4, textAlign: 'center' }}>
            {loading && <CircularProgress />} {/* Affiche le spinner lors du chargement */}
            
            {!loading && predictionResult && (
              <Box>
                <Typography variant="h6">Prix Cible</Typography>
                <Typography variant="body1" sx={{ mt: 2 }}>
                  Prédiction : {predictionResult.prediction}
                </Typography>
              </Box>
            )}

            {!loading && error && (
              <Typography color="error">{error}</Typography>
            )}
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default StockPrediction;
