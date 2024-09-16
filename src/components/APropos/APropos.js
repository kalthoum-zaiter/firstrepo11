import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Typography, Paper, CircularProgress, Divider, Link } from '@mui/material';

const TickerInfo = ({ symbol }) => {
  const [stockData, setStockData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStockInfo = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/ticker', {
          params: { ticker: symbol },
        });
        setStockData(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchStockInfo();
  }, [symbol]);

  if (error) return <Typography color="error">Error: {error}</Typography>;

  return (
    stockData && (
      <Paper elevation={3} sx={{ padding: 3, marginTop: 2 }}>
        <Typography variant="h5" gutterBottom>
          À propos 
        </Typography>

        <Divider sx={{ my: 2 }} />

        <Box sx={{ maxHeight: '120px', overflow: 'hidden', textOverflow: 'ellipsis', display: '-webkit-box', WebkitLineClamp: 5, WebkitBoxOrient: 'vertical' }}>
          <Typography variant="body1" gutterBottom>
            {stockData.description}
          </Typography>
        </Box>


        <Link href={`/stock/${symbol}/details`} sx={{ cursor: 'pointer' }}>
          Show More
        </Link>

        <Divider sx={{ my: 2 }} />

        <Typography variant="body2" gutterBottom>
          <strong>CEO:</strong> {stockData.ceo}
        </Typography>

        <Divider sx={{ my: 2 }} />

        <Typography variant="body2" gutterBottom>
          <strong>Founded:</strong> {stockData.founded}
        </Typography>

        <Divider sx={{ my: 2 }} />

        <Typography variant="body2" gutterBottom>
          <strong>Sector:</strong> {stockData.sector}
        </Typography>

        <Divider sx={{ my: 2 }} />

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
