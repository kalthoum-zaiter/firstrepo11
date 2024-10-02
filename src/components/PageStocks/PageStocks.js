import React, { useEffect, useState } from 'react';
import { Box, Typography, Grid, Button, Divider, Tab, Tabs, AppBar, Toolbar, Table, TableBody, TableCell, TableContainer, TableRow, Paper } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { Line } from 'react-chartjs-2';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import News from '../CompanyDetailsAfter/CompanyDetailsAfter';
import TickerInfo from '../APropos/APropos';
import { useNavigate, useLocation } from 'react-router-dom';
import io from 'socket.io-client';  // Importing socket.io-client
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Filler
} from 'chart.js';
import AddIcon from '@mui/icons-material/Add';


ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Filler
);

const StockChart = ({ priceHistory }) => {
  const data = {
    labels: priceHistory.map((point) => point.time),
    datasets: [
      {
        label: 'Price',
        data: priceHistory.map((point) => point.price),
        borderColor: '#00bfff',
        backgroundColor: 'rgba(0, 191, 255, 0.1)',
        fill: true,
        tension: 0.4,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      x: {
        display: true,
        title: {
          display: true,
          text: 'Time',
          color: '#888',
        },
      },
      y: {
        display: true,
        title: {
          display: true,
          text: 'Price ($)',
          color: '#888',
        },
      },
    },
  };

  return <Line data={data} options={options} height={200} />;
};

const StockDetails = () => {
  const { tickerName } = useParams();
  const [stockData, setStockData] = useState(null);
  const [currentPrice, setCurrentPrice] = useState(null); 
  const [isIndex, setIsIndex] = useState(false);  // New state to detect if the search is for an index
  const navigate = useNavigate();
  const location = useLocation();

  const tabs = ['Overview', 'Financials', 'Technicals', 'Forecast'];
  const currentTab = location.pathname.split('/')[1] || 'Financials';

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

  // Calculating Price Change and Percentage Change
  const previousClose = stockData.previous_close;
  const priceChange = currentPrice - previousClose;
  const percentageChange = (priceChange / previousClose) * 100;

  const priceHistory = stockData.history || [
    { time: '10:00AM', price: previousClose },
    { time: '1:00PM', price: currentPrice },
    { time: '4:00PM', price: currentPrice - 1 },
    { time: '7:00PM', price: currentPrice - 0.5 }
  ];

  const dayRange = `${safeToFixed(stockData.day_range_low)} - ${safeToFixed(stockData.day_range_high)}`;
  const yearRange = `${safeToFixed(stockData.year_range_low)} - ${safeToFixed(stockData.year_range_high)}`;
  const marketCap = stockData.market_cap ? `${(stockData.market_cap / 1e12).toFixed(2)}T USD` : 'N/A';
  const avgVolume = stockData.avg_volume ? `${(stockData.avg_volume / 1e6).toFixed(2)}M` : 'N/A';
  const peRatio = safeToFixed(stockData.pe_ratio);
  const dividendYield = stockData.dividend_yield ? `${(stockData.dividend_yield * 100).toFixed(2)}%` : 'N/A';
  const primaryExchange = stockData.primary_exchange || 'No Exchange Information';

  const stockInfo = [
    { label: 'Previous Close', value: safeToFixed(previousClose) },
    { label: 'Day Range', value: dayRange },
    { label: 'Year Range', value: yearRange },
    { label: 'Market Cap', value: marketCap },
    { label: 'Avg Volume', value: avgVolume },
    { label: 'P/E Ratio', value: isIndex ? 'N/A' : peRatio },  // Indices typically don't have P/E ratio
    { label: 'Dividend Yield', value: isIndex ? 'N/A' : dividendYield },  // Similar for dividend yield
    { label: 'Primary Exchange', value: primaryExchange }
  ];

  const changeColor = priceChange >= 0 ? 'green' : 'red';  // Dynamically set color based on change

  return (
    <Box sx={{ width: '90%', margin: 'auto', mt: 4 }}>
      <Grid container alignItems="center" justifyContent="space-between">
        <Grid item>
          <Typography variant="h4" sx={{ color: '#333' }}>
            {stockData.company_name || tickerName} {/* Dynamic label */}
          </Typography>
        </Grid>

        <Grid item>
          <Button
            variant="contained"
            startIcon={      <AddIcon />
            }
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
            onClick={() => navigate('/WatchList')} // Navigate to the desired page
          >  Suivre

          </Button>
       
        </Grid>
      </Grid>

      <Divider sx={{ my: 2 }} />

      <Box sx={{ textAlign: 'left', mb: 4 }}>
        <Box
          display="flex"
          alignItems="center"
          sx={{ padding: '12px', borderRadius: '8px' }}
        >
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '8px 16px',
              borderRadius: '8px',
              mr: 2,
            }}
          >
            <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#333' }}>
              {safeToFixed(currentPrice)} $
            </Typography>
          </Box>

          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '8px 10px',
              borderRadius: '8px',
              backgroundColor: '#f5f5f5',
              mr: 2,
            }}
          >
            <Typography variant="h6" sx={{ color: changeColor, fontWeight: 'bold' }}>
              {priceChange >= 0 ? '+' : ''}{safeToFixed(priceChange)}
            </Typography>
          </Box>

          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '8px 16px',
              borderRadius: '8px',
              backgroundColor: '#f5f5f5',
            }}
          >
            <Typography variant="h6" sx={{ color: changeColor, fontWeight: 'bold' }}>
              ({priceChange >= 0 ? '+' : ''}{safeToFixed(percentageChange)}%)
            </Typography>
          </Box>
        </Box>

        <Typography variant="body2" sx={{ mt: 1 }}>
          After Hours: {stockData.after_hours_price ? (
            <span style={{ color: 'red' }}>
              ${safeToFixed(stockData.after_hours_price)} ({safeToFixed(stockData.after_hours_change)}%)
            </span>
          ) : (
            <span>No After Hours Data</span>
          )}
        </Typography>

        <Typography variant="body2" sx={{ color: '#888' }}>
          Data from Yahoo Finance · Disclaimer
        </Typography>
      </Box>

      <AppBar position="static" color="default" sx={{ marginBottom: '16px' }}>
        <Toolbar>
          <Tabs
            value={currentTab.toLowerCase()}
            onChange={(event, newValue) => navigate(`/${newValue.toLowerCase()}`)}
            indicatorColor="primary"
            textColor="primary"
          >
            {tabs.map((tab) => (
              <Tab key={tab} label={tab} value={tab.toLowerCase()} />
            ))}
          </Tabs>
        </Toolbar>
      </AppBar>

      <Divider sx={{ my: 2 }} />

      <Grid container spacing={2}>
        <Grid item xs={8}>
          <Box sx={{ height: '300px', textAlign: 'center' }}>
            <Typography variant="body1" sx={{ mb: 1, color: '#555' }}>
              Prev Close ${safeToFixed(previousClose)}
            </Typography>
            <StockChart priceHistory={priceHistory} />
          </Box>
        </Grid>

        <Grid item xs={4}>
          <TableContainer component={Paper} elevation={1} sx={{ border: '1px solid #ddd' }}>
            <Table aria-label="stock data" size="small">
              <TableBody>
                {stockInfo.map((row) => (
                  <TableRow key={row.label}>
                    <TableCell component="th" scope="row" sx={{  color: '#333', padding: '10px' }}>
                      {row.label}
                    </TableCell>
                    <TableCell align="right" sx={{fontWeight: 'bold', color: '#333', padding: '12px' }}>
                      {row.value}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>

        <Grid item xs={8}>
          <News symbol={tickerName}/>
        </Grid>
        <Grid item xs={4}>
          <TickerInfo symbol={tickerName} />
        </Grid>
      </Grid>
   
    </Box>
  );
};

export default StockDetails;
