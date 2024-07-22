import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Grid, Paper, Typography, Box, CircularProgress } from '@mui/material';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import axios from 'axios';
import CompanyInfo from '../teststockinfo/teststockinfo';
import RSIChart from '../ChartRsi/ChartRsi';

const data = [
  { name: 'Mar 1', Price: 200, AI: 50 },
  { name: 'Apr 1', Price: 210, AI: 70 },
  { name: 'May 1', Price: 215, AI: 75 },
  { name: 'Jun 1', Price: 225, AI: 60 },
  { name: 'Jul 1', Price: 228, AI: 81 }
];

const SymbolInfo = () => {
  const { tickerName } = useParams();
  const [companyName, setCompanyName] = useState('');

  useEffect(() => {
    const apiKey = 'FFTZ06W4JZ6C7ZDS';
    const fetchCompanyName = async () => {
      try {
        const response = await axios.get(`https://www.alphavantage.co/query?function=OVERVIEW&symbol=${tickerName}&apikey=${apiKey}`);
        setCompanyName(response.data.Name);
      } catch (error) {
        console.error('Failed to fetch company name:', error);
      }
    };

    fetchCompanyName();
  }, [tickerName]);

  return (
    <Grid container spacing={0.5} width="100%" height="100%" sx={{display:'flex',justifyContent: 'center',mt:0.25,flexGrow:1,
      overflow:1,scrollbarWidth: 'none',
      '&::-webkit-scrollbar': {
          width: '0',
        }}}   >
      <Grid item xs={12}>
        <Typography variant="h4" gutterBottom>
          {companyName} ({tickerName})- Statistics & Alternative Data 2024
        </Typography>
      </Grid>
      <Grid item xs={12} md={8} height="90%">
        <Paper sx={{ p: 2, borderRadius: '4px' ,
    overflow:1,scrollbarWidth: 'none',
    '&::-webkit-scrollbar': {
        width: '0',
      }}}> {/* Set overflow to visible to ensure no hidden content */}
          <Typography variant="h6">
            {tickerName} vs. AI Score (Last 150 days)
          </Typography>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="Price" stroke="#8884d8" activeDot={{ r: 8 }} />
              <Line type="monotone" dataKey="AI" stroke="#82ca9d" />
            </LineChart>
          </ResponsiveContainer>
        </Paper>
      </Grid>
      <Grid item xs={12} md={4} height="90%">
        <Paper sx={{ p: 2, borderRadius: '4px', overflow: 'visible' }}> {/* Set overflow to visible */}
          <Typography variant="h6" gutterBottom>
            AI Score
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', p: 1 }}>
            <CircularProgress variant="determinate" value={81} size={100} />
            <Typography variant="subtitle1" sx={{ pl: 2 }}>
              81 (Strong buy)
            </Typography>
          </Box>
        </Paper>
      </Grid>
      <Grid item xs={12} md={7}>
        <Paper sx={{ p: 2, borderRadius: '4px', overflow: 'invisible' }}>
          <RSIChart symbol="NVDA" />
        </Paper>
      </Grid>
      <Grid item xs={12} md={5}>
        <Paper sx={{ p: 2, borderRadius: '4px', overflow: 'invisible' }}>
          <CompanyInfo />
        </Paper>
      </Grid>
    </Grid>
  );
};

export default SymbolInfo;
