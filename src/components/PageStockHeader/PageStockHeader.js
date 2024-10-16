import React, { useEffect, useState } from 'react';
import { Box, Typography, Grid, Button, Divider, Tab, Tabs, AppBar, Toolbar, Table, TableBody, TableCell, TableContainer, TableRow, Paper } from '@mui/material';
import { Line } from 'react-chartjs-2';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import News from '../CompanyDetailsAfter/CompanyDetailsAfter';
import TickerInfo from '../APropos/APropos';
import { useNavigate, useLocation } from 'react-router-dom';
import io from 'socket.io-client';  // Importing socket.io-client

import AddIcon from '@mui/icons-material/Add';

const  StockHeader = () => {
  const { tickerName } = useParams();
  const [stockData, setStockData] = useState(null);
  const [currentPrice, setCurrentPrice] = useState(null); 
  const [isIndex, setIsIndex] = useState(false);  // New state to detect if the search is for an index
  const location = useLocation();
  const navigate = useNavigate();

  const tabs = [
    { label: 'Overview', path: `/overview/${tickerName}` },  // Use string template literals
    { label: 'Financials', path: `/financials/${tickerName}` },
    { label: 'Technicals', path: `/technicals/${tickerName}` },
    { label: 'Forecast', path: `/forecast/${tickerName}` },
  ];
  
  const currentTab = location.pathname;

  const fetchStockData = async (ticker) => {
    try {
      const response = await axios.get('http://localhost:5000/get_stock_data', { params: { ticker } });
      setStockData(response.data);
      setCurrentPrice(response.data.price);
      
      // Check if it's an index by using some logic or flag from the API response
      setIsIndex(response.data.is_index || false);  // Assuming your API sets a flag for indices
    } catch (error) {
      console.error('Failed to fetch stock data:', error);
    }
  };

  useEffect(() => {
    fetchStockData(tickerName);

    const socket = io('http://localhost:5000');
    socket.on('price_update', data => {
      if (data.price !== currentPrice) {
        setCurrentPrice(data.price);
      }
    });

    return () => {
      socket.off('price_update');
      socket.disconnect();
    };
  }, [tickerName, currentPrice]);

  if (!stockData) {
    return <Typography>Error fetching stock data</Typography>;
  }

  const safeToFixed = (num, decimals = 2) => (num !== undefined && num !== null ? num.toFixed(decimals) : 'N/A');

  const previousClose = stockData.previous_close;
  const priceChange = currentPrice - previousClose;
  const percentageChange = (priceChange / previousClose) * 100;



  const changeColor = priceChange >= 0 ? 'green' : 'red';
  
  const formatCompanyName = (name) => {
    if (!name) return '';
    const cleanedName = name.replace(/corporation/i, '').trim();
    return cleanedName.charAt(0).toUpperCase() + cleanedName.slice(1).toLowerCase();
  };


  return (
    <Box sx={{ width: '90%', margin: 'auto'}}>
    <Grid container alignItems="center" justifyContent="space-between">
      <Grid item>
        <Typography variant="h4" sx={{ color: '#333' }}>
          {stockData.company_name || tickerName}
        </Typography>
      </Grid>

      <Grid item>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          sx={{
            textTransform: 'none',
            borderRadius: '30px',
            marginRight: 1,
            backgroundColor: '#f5f5f5',
            color: '#000',
            boxShadow: '0 1px 3px rgba(0, 0, 0, 0.12)',
            fontSize: '1.2rem',
            padding: '10px 10px',
            '&:hover': {
              backgroundColor: '#e0e0e0',
            },
          }}
          onClick={() => navigate('/WatchList')}
        >
          Suivre
        </Button>
      </Grid>
    </Grid>

    <Divider sx={{ my: 1 }} />
    <Box sx={{ width: '100%', maxWidth: '400px' ,marginLeft: -5 }}>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '8px 16px',
          borderRadius: '8px',
          mb: 1,
          width: '100%',
        }}
      >
        <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#333', marginRight :6, mr:3}}>
          {safeToFixed(currentPrice)} $
        </Typography>

        <Typography
          variant="h6"
          sx={{
            color: changeColor,
            fontWeight: 'bold',
            mr: 1,
          }}
        >
          {priceChange >= 0 ? '+' : ''}{safeToFixed(priceChange)}
        </Typography>

        <Typography
          variant="h6"
          sx={{
            color: changeColor,
            fontWeight: 'bold',
          }}
        >
          ({priceChange >= 0 ? '+' : ''}{safeToFixed(percentageChange)}%)
        </Typography>
      </Box>

      <Box
        sx={{
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          marginLeft: -5 ,mb:2
        }}
      >
        <Typography variant="body2" sx={{ color: '#666', textAlign: 'center' }}>
          After Hours: {stockData.after_hours_price ? (
            <span style={{ color: stockData.after_hours_change >= 0 ? 'green' : 'red' }}>
              ${safeToFixed(stockData.after_hours_price)} ({stockData.after_hours_change >= 0 ? '+' : ''}{safeToFixed(stockData.after_hours_change)}%)
            </span>
          ) : (
            <span>No After Hours Data</span>
          )}
        </Typography>
      </Box>
    </Box>

    <AppBar position="static" color="default" sx={{ marginBottom: '16px' }}>
      <Toolbar>
        <Tabs
          value={currentTab.toLowerCase()}
          onChange={(event, newValue) => navigate(newValue)}
          indicatorColor="primary"
          textColor="primary"
        >
          {tabs.map((tab) => (
            <Tab key={tab.label} label={tab.label} value={tab.path.toLowerCase()} />
          ))}
        </Tabs>
      </Toolbar>
    </AppBar>
    </Box>

  );
};

export default StockHeader;
