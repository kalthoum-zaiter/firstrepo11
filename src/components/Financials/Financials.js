import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Container,
  Typography,
  TextField,
  Button,
  Grid,
  Box,
  Paper
} from '@mui/material';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import PageStockHeader from '../PageStockHeader/PageStockHeader';
// Register necessary components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const FinancialPage = () => {
  const [ticker, setTicker] = useState('AAPL');
  const [financialData, setFinancialData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchFinancialData = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await axios.get('http://localhost:5000/api/financials', {
        params: { ticker: ticker }
      });
      setFinancialData(response.data);
    } catch (err) {
      setError('Failed to fetch financial data.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFinancialData();
  }, [ticker]);

  const chartData = {
    labels: ['Market Cap', 'PE Ratio', 'Dividend Yield'],
    datasets: [
      {
        label: ticker,
        data: [
          financialData?.marketCap,
          financialData?.trailingPE,
          financialData?.dividendYield,
        ].map(value => (value !== 'N/A' ? value : 0)), // Convert N/A to 0 for chart
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
      },
    ],
  };

  return (
    <Container>
      <Box>
   <PageStockHeader></PageStockHeader>
        </Box>
      <Typography variant="h4" gutterBottom>
        Financial Data for {ticker}
      </Typography>
      <TextField
        label="Ticker"
        variant="outlined"
        value={ticker}
        onChange={(e) => setTicker(e.target.value)}
        style={{ marginBottom: '20px' }}
      />
      <Button variant="contained" color="primary" onClick={fetchFinancialData}>
        Fetch Data
      </Button>
      
      {loading && <Typography>Loading...</Typography>}
      {error && <Typography color="error">{error}</Typography>}
      {financialData && (
        <Grid container spacing={3} style={{ marginTop: '20px' }}>
          <Grid item xs={12}>
            <Paper style={{ padding: '20px' }}>
              <Typography variant="h6">Financial Metrics</Typography>
              <Typography>Market Cap: {financialData.marketCap}</Typography>
              <Typography>PE Ratio: {financialData.trailingPE}</Typography>
              <Typography>Dividend Yield: {financialData.dividendYield}</Typography>
            </Paper>
          </Grid>
          <Grid item xs={12}>
            <Bar data={chartData} />
          </Grid>
        </Grid>
      )}
    </Container>
  );
};

export default FinancialPage;
