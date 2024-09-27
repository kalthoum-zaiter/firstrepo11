import React, { useState, useEffect } from 'react';
import { Box, Typography, Grid, Chip } from '@mui/material';
import axios from 'axios';

const MarketDataList = () => {
  const [marketData, setMarketData] = useState([]);

  useEffect(() => {
    // Fetch market data from Flask API
    const fetchMarketData = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:5000/api/marketdata'); // Replace with your Flask server address if needed
        setMarketData(response.data);
      } catch (error) {
        console.error('Error fetching market data:', error);
      }
    };

    fetchMarketData();
  }, []);

  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h5" sx={{ mb: 2 }}>
        Valeurs aux plus fortes variations de vos listes
      </Typography>
      <Grid container spacing={2}>
        {marketData.map((item, index) => (
          <Grid item xs={12} key={index}>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                borderBottom: '1px solid #e0e0e0',
                paddingBottom: '10px',
                marginBottom: '10px',
              }}
            >
              <Chip label={item.type} />
              <Typography variant="body1">{item.name}</Typography>
              <Typography variant="body1">{item.price.toFixed(2)} $</Typography>
              <Typography variant="body1" color={item.change > 0 ? 'green' : 'red'}>
                {item.change > 0 ? '+' : ''}{item.change.toFixed(2)} $
              </Typography>
              <Typography variant="body1" color={item.percentage > 0 ? 'green' : 'red'}>
                {item.percentage > 0 ? '↑' : '↓'} {item.percentage.toFixed(2)}%
              </Typography>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default MarketDataList;
