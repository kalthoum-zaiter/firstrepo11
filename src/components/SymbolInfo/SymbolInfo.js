import React from 'react';
import { Grid, Paper, Typography, Box, CircularProgress } from '@mui/material';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const SymbolInfo = () => {
  // Simulated data pour le graphique
  const data = [
    { name: 'Feb', AI: 40, Price: 3 },
    { name: 'Mar', AI: 45, Price: 3.5 },
    { name: 'Apr', AI: 70, Price: 4 },
    { name: 'May', AI: 75, Price: 4.2 },
    { name: 'Jun', AI: 81, Price: 4.22 }
  ];

  return (
    <Grid container spacing={2} sx={{ p: 2 }}>
      <Grid item xs={12} md={8}>
        <Paper sx={{ p: 2, background: 'white', borderRadius: '0px' }}>
          <Typography variant="h6" color="#fff">
            WULF Stock Price vs. AI Score (Last 150 days)
          </Typography>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" stroke="#ddd" />
              <YAxis yAxisId="left" stroke="#8884d8" />
              <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
              <Tooltip />
              <Legend />
              <Line yAxisId="left" type="monotone" dataKey="Price" stroke="#8884d8" activeDot={{ r: 8 }} />
              <Line yAxisId="right" type="monotone" dataKey="AI" stroke="#82ca9d" />
            </LineChart>
          </ResponsiveContainer>
        </Paper>
      </Grid>
      <Grid item xs={12} md={4}>
        <Paper sx={{ p: 2, background:'White', borderRadius: '10px' }}>
          <Typography variant="h6" color="#fff" gutterBottom>
            AI Score
          </Typography>
          <Box display="flex" alignItems="center" justifyContent="center">
            <CircularProgress variant="determinate" value={81} size={100} thickness={4} />
            <Box
              top={0}
              left={0}
              bottom={0}
              right={0}
              position="absolute"
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <Typography variant="h5" component="div" color="white">
                81
              </Typography>
            </Box>
          </Box>
          <Typography variant="subtitle1" sx={{ pt: 2 }} color="#ddd">
            Strong Buy
          </Typography>
        </Paper>
      </Grid>
      {/* Ajoutez des grilles supplémentaires pour d'autres métriques ici */}
    </Grid>
  );
};

export default SymbolInfo;
