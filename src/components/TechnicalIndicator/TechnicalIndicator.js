import React from 'react';
import { Grid, Paper, Typography, Box } from '@mui/material';

const TechnicalDetails = () => {
  return (
    <Grid container spacing={2} sx={{ padding: 2, overflow: 'hidden' }}>
      <Grid item xs={12} md={8}>
        <Paper sx={{ padding: 2, display: 'flex', flexDirection: 'column', minHeight: '80vh' }}>
          <Typography variant="h6" gutterBottom></Typography>
          <Box sx={{ flexGrow: 1, backgroundColor: '#f4f4f4', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          </Box>
        </Paper>
      </Grid>

      <Grid item xs={12} md={4} >
        <Paper sx={{ padding: 2, minHeight: '80vh' }}>
          <Typography variant="h6" gutterBottom>Technical Indicators</Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            <Typography>RSI (14): </Typography>
            <Typography>STOCH (9,6): </Typography>
            <Typography>STOCHRSI (14): </Typography>
            <Typography>MACD (12,26): </Typography>
            <Typography>CCI (14): </Typography>
            <Typography>ATR (14): </Typography>
            <Typography>ROC: </Typography>
          </Box>
        </Paper>
      </Grid>

      <Grid item xs={12} md={4} sx={{ mt: 2 }}>
        <Paper sx={{ padding: 2, minHeight: '35vh', overflow: 'auto' }}>
          <Typography variant="h6" gutterBottom>Moving Averages</Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            <Typography>SMA (5): </Typography>
            <Typography>SMA (10): </Typography>
            <Typography>SMA (20): </Typography>
            <Typography>SMA (50): </Typography>
            <Typography>SMA (100): </Typography>
            <Typography>SMA (200): </Typography>
          </Box>
        </Paper>
      </Grid>
    </Grid>
  );
}

export default TechnicalDetails;
