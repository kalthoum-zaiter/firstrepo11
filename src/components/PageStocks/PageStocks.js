import React, { useEffect, useState, Suspense, lazy } from 'react';
import { Box, Grid, Table, TableBody, TableCell, TableContainer, TableRow, Paper, CircularProgress } from '@mui/material';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import io from 'socket.io-client';  // Importing socket.io-client

// Utilisation de React.lazy pour le chargement dynamique des composants
const PageStockHeader = lazy(() => import('../PageStockHeader/PageStockHeader'));
const PageStockChart = lazy(() => import('../PageStockChart/PageStockChart'));
const News = lazy(() => import('../CompanyDetailsAfter/CompanyDetailsAfter'));
const TickerInfo = lazy(() => import('../APropos/APropos'));

const StockDetails = () => {
  const { tickerName } = useParams(); // Récupère le nom du ticker depuis l'URL
  const [stockData, setStockData] = useState(null);
  const [currentPrice, setCurrentPrice] = useState(null); 
  const [isIndex, setIsIndex] = useState(false);  // État pour détecter si c'est un indice
  const [isLoading, setIsLoading] = useState(true); // Pour gérer le chargement global

  // Fonction pour récupérer les données d'un stock depuis l'API
  const fetchStockData = async (ticker) => {
    try {
      const response = await axios.get('http://localhost:5000/get_stock_data', { params: { ticker } });
      setStockData(response.data);
      setCurrentPrice(response.data.price);
      setIsIndex(response.data.is_index || false);  // Détecte si c'est un indice
    } catch (error) {
      // Suppression des messages d'erreur visibles
    } finally {
      setIsLoading(false);  // Fin du chargement des données de l'API
    }
  };

  useEffect(() => {
    fetchStockData(tickerName);

    // Configuration du socket pour la mise à jour en temps réel du prix
    const socket = io('http://localhost:5000');
    socket.on('price_update', data => {
      if (data.price !== currentPrice) {
        setCurrentPrice(data.price);
      }
    });

    return () => {
      socket.off('price_update');
      socket.disconnect(); // Déconnexion propre du socket
    };
  }, [tickerName, currentPrice]);

  // Gestion du chargement global
  if (isLoading || !stockData) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress /> {/* Affichage du loader global */}
      </Box>
    );
  }

  // Fonctions pour traiter les données des actions
  const safeToFixed = (num, decimals = 2) => (num !== undefined && num !== null ? num.toFixed(decimals) : 'N/A');
  const previousClose = stockData.previous_close;
  const priceChange = currentPrice - previousClose;
  const percentageChange = (priceChange / previousClose) * 100;

  // Préparation des informations affichées
  const dayRange = `${safeToFixed(stockData.day_range_low)} - ${safeToFixed(stockData.day_range_high)}`;
  const yearRange = `${safeToFixed(stockData.year_range_low)} - ${safeToFixed(stockData.year_range_high)}`;
  const marketCap = stockData.market_cap ? `${(stockData.market_cap / 1e12).toFixed(2)}T USD` : 'N/A';
  const avgVolume = stockData.avg_volume ? `${(stockData.avg_volume / 1e6).toFixed(2)}M` : 'N/A';
  const peRatio = safeToFixed(stockData.pe_ratio);
  const dividendYield = stockData.dividend_yield ? `${(stockData.dividend_yield * 100).toFixed(2)}%` : 'N/A';
  const primaryExchange = stockData.primary_exchange || 'No Exchange Information';

  // Informations à afficher dans le tableau
  const stockInfo = [
    { label: 'Previous Close', value: safeToFixed(previousClose) },
    { label: 'Day Range', value: dayRange },
    { label: 'Year Range', value: yearRange },
    { label: 'Market Cap', value: marketCap },
    { label: 'Avg Volume', value: avgVolume },
    { label: 'P/E Ratio', value: isIndex ? 'N/A' : peRatio },  // Les indices n'ont généralement pas de P/E ratio
    { label: 'Dividend Yield', value: isIndex ? 'N/A' : dividendYield },  // Idem pour le rendement
    { label: 'Primary Exchange', value: primaryExchange }
  ];

  return (
    <Suspense fallback={<Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}><CircularProgress /></Box>}>
      <Box sx={{ width: '90%', margin: 'auto'}}>
        <Grid container spacing={2}>
          {/* En-tête de la page avec le symbole */}
          <Grid item xs={12}>
            <PageStockHeader />
          </Grid>

          {/* Graphique des stocks */}
          <Grid item xs={8}>
            <Box sx={{ height: '300px', textAlign: 'center' }}>
              <PageStockChart symbol={tickerName} />
            </Box>
          </Grid>

          {/* Tableau des informations */}
          <Grid item xs={4}>
            <TableContainer component={Paper} elevation={1} sx={{ border: '1px solid #ddd' }}>
              <Table aria-label="stock data" size="small">
                <TableBody>
                  {stockInfo.map((row) => (
                    <TableRow key={row.label}>
                      <TableCell component="th" scope="row" sx={{ color: '#333', padding: '10px' }}>
                        {row.label}
                      </TableCell>
                      <TableCell align="right" sx={{ fontWeight: 'bold', color: '#333', padding: '12px' }}>
                        {row.value}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>

          {/* Nouvelles sur les actions */}
          <Grid item xs={8}>
            <News symbol={tickerName} />
          </Grid>

          {/* Informations supplémentaires sur le ticker */}
          <Grid item xs={4}>
            <TickerInfo symbol={tickerName} />
          </Grid>
        </Grid>
      </Box>
    </Suspense>
  );
};

export default StockDetails;
