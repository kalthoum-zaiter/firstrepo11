import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Grid,
  Divider,
  Tabs,
  Tab,
  AppBar,
  Toolbar,
} from '@mui/material';
import axios from 'axios';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import io from 'socket.io-client';

const socket = io('http://localhost:5000'); // Remplacez par l'URL de votre backend Flask si nécessaire

const StockHeader = () => {
  const { tickerName } = useParams();
  const [stockData, setStockData] = useState(null);
  const [simulatedPrice, setSimulatedPrice] = useState(null);
  const [flashColor, setFlashColor] = useState(null); // État pour suivre la couleur de clignotement
  const location = useLocation();
  const navigate = useNavigate();

  const tabs = [
    { label: 'Overview', path: `/overview/${tickerName}` },
    { label: 'Financials', path: `/financials/${tickerName}` },
    { label: 'Technicals', path: `/technicals/${tickerName}` },
    { label: 'Forecast', path: `/forecast/${tickerName}` },
  ];

  const fetchStockData = async (ticker) => {
    try {
      const response = await axios.get('http://localhost:5000/get_stock_data', {
        params: { ticker },
      });
      setStockData(response.data);
    } catch (error) {
      console.error('Erreur lors de la récupération des données du stock :', error);
    }
  };

  const startSimulation = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/start_simulation?ticker=${tickerName.toUpperCase()}`
      );
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error);
      }
    } catch (error) {
      console.error('Erreur lors du démarrage de la simulation :', error);
    }
  };

  const stopSimulation = async () => {
    try {
      await fetch('http://localhost:5000/stop_simulation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ticker: tickerName.toUpperCase() }),
      });
    } catch (error) {
      console.error('Erreur lors de l’arrêt de la simulation :', error);
    }
  };

  useEffect(() => {
    fetchStockData(tickerName);

    if (tickerName) {
      startSimulation();

      socket.on('real_time_price', (data) => {
        if (data.ticker === tickerName.toUpperCase()) {
          const newPrice = data.price;
          if (simulatedPrice !== null) {
            setFlashColor(newPrice > simulatedPrice ? 'green' : 'red');
            setTimeout(() => setFlashColor(null), 1000); // Réinitialiser après l'animation
          }
          setSimulatedPrice(newPrice);
        }
      });

      return () => {
        socket.off('real_time_price');
        stopSimulation();
      };
    }
  }, [tickerName, simulatedPrice]);

  const safeToFixed = (num, decimals = 2) =>
    num !== undefined && num !== null ? num.toFixed(decimals) : 'N/A';

  if (!stockData) {
    return <Typography>Erreur lors du chargement des données du stock</Typography>;
  }

  const previousClose = stockData.previous_close;
  const priceChange =
    simulatedPrice !== null ? simulatedPrice - previousClose : 0;
  const percentageChange =
    simulatedPrice !== null ? (priceChange / previousClose) * 100 : 0;
  const changeColor = priceChange >= 0 ? 'green' : 'red';

  return (
    <Box sx={{ width: '90%', margin: 'auto' }}>
      <Grid container alignItems="center" justifyContent="space-between">
        <Grid item>
          <Typography variant="h4" sx={{ color: '#333' }}>
            {stockData.company_name || tickerName}
          </Typography>
        </Grid>
      </Grid>

      <Divider sx={{ my: 1 }} />
      <Box
        sx={{
          width: '100%',
          maxWidth: '400px',
          marginLeft: -5,
          animation: flashColor
            ? `${flashColor === 'green' ? 'flashGreen' : 'flashRed'} 1s ease-in-out`
            : 'none',
        }}
      >
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
          <Typography
            variant="h4"
            sx={{ fontWeight: 'bold', color: '#333', marginRight: 6 }}
          >
            {simulatedPrice ? `${simulatedPrice}$` : 'Loading...'}
          </Typography>

          <Typography
            variant="h6"
            sx={{
              color: changeColor,
              fontWeight: 'bold',
              mr: 1,
            }}
          >
            {priceChange >= 0 ? '+' : ''}
            {safeToFixed(priceChange)}
          </Typography>

          <Typography
            variant="h6"
            sx={{
              color: changeColor,
              fontWeight: 'bold',
            }}
          >
            ({priceChange >= 0 ? '+' : ''}
            {safeToFixed(percentageChange)}%)
          </Typography>
        </Box>
      </Box>

      <AppBar position="static" color="default" sx={{ marginBottom: '16px' }}>
        <Toolbar>
          <Tabs
            value={location.pathname.toLowerCase()}
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

      {/* Définition des animations dans le style JSX */}
      <style>
        {`
          @keyframes flashGreen {
            0% { background-color: rgba(0, 255, 0, 0.3); }
            100% { background-color: transparent; }
          }

          @keyframes flashRed {
            0% { background-color: rgba(255, 0, 0, 0.3); }
            100% { background-color: transparent; }
          }
        `}
      </style>
    </Box>
  );
};

export default StockHeader;
