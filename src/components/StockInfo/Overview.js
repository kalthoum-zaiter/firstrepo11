import React, { useEffect, useState } from 'react';
import { Box, Typography, Grid,  Table, TableBody, TableCell, TableContainer, TableRow, Paper } from '@mui/material';

import axios from 'axios';
import { useParams } from 'react-router-dom';

const SymbolInfo = () => {
  const { tickerName } = useParams(); // Extract ticker from URL
  const [stockData, setStockData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStockData = async (ticker) => {
      try {
        const response = await axios.get('http://localhost:5000/get_stock_data', { params: { ticker } });
        setStockData(response.data);
        setLoading(false); // Set loading to false once data is fetched
      } catch (error) {
        console.error('Failed to fetch stock data:', error);
        setLoading(false); // Ensure loading stops even if there's an error
      }
    };

    if (tickerName) {
      fetchStockData(tickerName);
    }
  }, [tickerName]);

  if (loading) {
    return <Typography>Loading...</Typography>;
  }

  if (!stockData || stockData.error) {
    return <Typography>Error fetching stock data</Typography>;
  }

  // Vérification des valeurs nulles ou indéfinies avant d'utiliser toFixed
  const safeToFixed = (num, decimals = 2) => (num !== undefined && num !== null ? num.toFixed(decimals) : 'N/A');

  const previousClose = safeToFixed(stockData.previous_close);
  const dayRange = safeToFixed(stockData.day_range);
  const yearRangeLow = safeToFixed(stockData.year_range_low);
  const yearRangeHigh = safeToFixed(stockData.year_range_high);
  const marketCap = stockData.market_cap !== null && stockData.market_cap !== undefined ? `${(stockData.market_cap / 1e12).toFixed(2)}T USD` : 'N/A';
  const avgVolume = stockData.avg_volume !== null && stockData.avg_volume !== undefined ? `${(stockData.avg_volume / 1e6).toFixed(2)}M` : 'N/A';
  const peRatio = safeToFixed(stockData.pe_ratio);
  const dividendYield = stockData.dividend_yield !== null && stockData.dividend_yield !== undefined ? `${(stockData.dividend_yield * 100).toFixed(2)}%` : 'N/A';
  const primaryExchange = stockData.primary_exchange || 'No Exchange Information';

  const stockInfo = [
    { label: 'Previous Close', value: `$${previousClose}` },
    { label: 'Day Range', value: `${dayRange}` },
    { label: 'Year Range', value: `$${yearRangeLow} - $${yearRangeHigh}` },
    { label: 'Market Cap', value: `${marketCap}` },
    { label: 'Avg Volume', value: `${avgVolume}` },
    { label: 'P/E Ratio', value: `${peRatio}` },
    { label: 'Dividend Yield', value: `${dividendYield}` },
    { label: 'Primary Exchange', value: `${primaryExchange}` }
  ];

  return (
    <Box sx={{ width: '90%', margin: 'auto', mt: 4 }}>
        

      <Grid container spacing={2}>
        <Grid item xs={4}>
          <TableContainer component={Paper} elevation={1} sx={{ border: '1px solid #ddd' }}>
            <Table aria-label="stock data" size="small">
              <TableBody>
                {stockInfo.map((row) => (
                  <TableRow key={row.label}>
                    <TableCell component="th" scope="row" sx={{ fontWeight: 'bold', color: '#333', padding: '12px' }}>
                      {row.label}
                    </TableCell>
                    <TableCell align="right" sx={{ color: '#333', padding: '8px' }}>
                      {row.value}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    </Box>
  );
};

export default SymbolInfo;
