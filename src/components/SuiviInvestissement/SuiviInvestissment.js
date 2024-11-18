import React from 'react';
import { Box, Typography, Paper, Grid, Divider, Chip } from '@mui/material';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const StockInvestment = ({ data }) => {
  // Sample chart data for illustration
  const chartData = [
    { date: '5 Nov', value: 5000 },
    { date: '6 Nov', value: 5100 },
    { date: '7 Nov', value: 5439.41 },
    { date: '8 Nov', value: 5500 },
    { date: '9 Nov', value: 5600 },
    { date: '10 Nov', value: 5580 },
    { date: '11 Nov', value: 5460.52 },
  ];

  return (
    <Box sx={{ padding: 3, backgroundColor: '#f9f9f9', borderRadius: 2 }}>
      {/* Portfolio Value and Performance Summary */}
      <Paper elevation={3} sx={{ padding: 2, mb: 3 }}>
        <Typography variant="h4" align="center">
          {data?.total_price.toFixed(2)} TND
        </Typography>
        <Typography variant="body2" align="center" color="textSecondary">
          {new Date(data?.date).toLocaleDateString()} - TND
        </Typography>
        <Grid container justifyContent="center" alignItems="center" spacing={2} sx={{ mt: 1 }}>
          <Grid item>
            <Chip label="+10.75%" color="success" />
          </Grid>
          <Grid item>
            <Typography color="textSecondary">+529.81 TND</Typography>
          </Grid>
        </Grid>
      </Paper>

      {/* Line Chart for Portfolio Performance */}
      <Paper elevation={3} sx={{ padding: 2, mb: 3 }}>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="value" stroke="#8884d8" activeDot={{ r: 8 }} />
          </LineChart>
        </ResponsiveContainer>
      </Paper>

      {/* Performance Details */}
      <Paper elevation={3} sx={{ padding: 2 }}>
        <Typography variant="h6" gutterBottom>
          Performances
        </Typography>
        <Divider />
        <Box sx={{ mt: 2 }}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Typography variant="body2" color="textSecondary">
                Gain du Jour
              </Typography>
              <Typography variant="h6" color="error">
                -89.092 din <br /> -1.61%
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body2" color="textSecondary">
                Gain Total
              </Typography>
              <Typography variant="h6" color="success">
                +469.892 din <br /> +9.42%
              </Typography>
            </Grid>
          </Grid>

          <Divider sx={{ my: 2 }} />

          {/* Investment Stats */}
          <Box>
            <Typography variant="body2" color="textSecondary">
              100% actions
            </Typography>
            <Typography variant="body2" color="textSecondary">
              0% d'investissements dans des entreprises leaders pour l'environnement
            </Typography>
            <Typography variant="body2" color="textSecondary">
              100% de grandes entreprises
            </Typography>
            <Typography variant="body2" color="textSecondary">
              100% investissements à faibles dividendes
            </Typography>
            <Typography variant="body2" color="textSecondary">
              100% investissements au ratio cours/bénéfices élevé
            </Typography>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
};

export default StockInvestment;
