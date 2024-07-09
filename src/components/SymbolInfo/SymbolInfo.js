import React from 'react';
import { Grid, Paper, Typography, Box, CircularProgress } from '@mui/material';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useParams } from 'react-router-dom';
import CompanyInfo from '../teststockinfo/teststockinfo';
const SymbolInfo = () => {
  // Simulated data pour le graphique

  const { symbol } = useParams();
  return (
    <Grid container spacing={2} sx={{ p: 2 }}>
      <Grid item xs={12} md={8}>
        <Paper sx={{ p: 2, background: 'white', borderRadius: '0px' }}>
          <Typography variant="h6" color="#fff">
           {symbol}  vs. AI Score (Last 150 days)
          </Typography>
          <ResponsiveContainer width="100%" height={300}>
                
          </ResponsiveContainer>
        </Paper>
      </Grid>
      <Grid item xs={12} md={4}>
        <Paper sx={{ p: 19, background:'White', borderRadius: '0px' }}>
          <Typography variant="h6" color="#fff" gutterBottom>
            AI Score
          </Typography>
        
        </Paper>
      </Grid>
      <Grid item xs={12} md={7}>
        <Paper sx={{ p:10, background: 'white', borderRadius: '0px' }}>

        </Paper>
      </Grid>
      <Grid item xs={12} md={5}>
        <Paper sx={{ p:10, background: 'white', borderRadius: '0px' }}>
        <CompanyInfo></CompanyInfo>
        </Paper>
      </Grid>

      
    </Grid>
  );
};

export default SymbolInfo;
