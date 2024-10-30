import React, { useState, useEffect } from 'react';
import { Card, CardContent, Typography, Grid, Divider } from '@mui/material';
import axios from 'axios';

const StockWidget = ({ symbol }) => {
  const [stockData, setStockData] = useState({
    price: '',
    yearRange: '',
    targetPrice: '',
    volume: '',
    marketCap: '',
    dividendYield: '',
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`https://api.example.com/stock/${symbol}`);
        setStockData({
          price: response.data.price,
          yearRange: `${response.data.low} - ${response.data.high}`,
          targetPrice: response.data.targetPrice,
          volume: response.data.volume.toLocaleString(),
          marketCap: response.data.marketCap,
          dividendYield: response.data.dividendYield + '%',
        });
      } catch (error) {
      }
    };
    fetchData();
  }, [symbol]);

  return (
    <Grid container sx={{ maxWidth: 345, margin: 'auto', mt: 5 }}>
      <Grid item>
        <Typography variant="h5" component="div" sx={{ fontWeight: 'bold', mb: 2 }}>
          {symbol} - Stock Data
        </Typography>
        
        <Typography variant="subtitle1" gutterBottom component="div">
          Price: ${stockData.price}
        </Typography>
        <Divider />
        
        <Typography variant="subtitle1" gutterBottom component="div" sx={{ mt: 2 }}>
          Year Range: {stockData.yearRange}
        </Typography>
        <Divider />
        
        <Typography variant="subtitle1" gutterBottom component="div" sx={{ mt: 2 }}>
          Target Price: ${stockData.targetPrice}
        </Typography>
        <Divider />
        
        <Typography variant="subtitle1" gutterBottom component="div" sx={{ mt: 2 }}>
          Volume: {stockData.volume}
        </Typography>
        <Divider />
        
        <Typography variant="subtitle1" gutterBottom component="div" sx={{ mt: 2 }}>
          Market Cap: ${stockData.marketCap}B
        </Typography>
        <Divider />
        
        <Typography variant="subtitle1" gutterBottom component="div" sx={{ mt: 2 }}>
          Dividend Yield: {stockData.dividendYield}
        </Typography>
      </Grid>
    </Grid >
  );
};

export default StockWidget;
