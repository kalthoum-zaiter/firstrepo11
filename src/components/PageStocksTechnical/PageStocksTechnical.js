import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper,
  CircularProgress, Typography, Box, Card, CardContent, Grid
} from '@mui/material';
import StockHeader from '../PageStockHeader/PageStockHeader';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

import TrendingUpIcon from '@mui/icons-material/TrendingUp';

// Composant pour la jauge (Gauge chart) avec palette de couleurs adaptée
const GaugeChartComponent = ({ value, title }) => {
  const gaugeData = [
    { name: 'Sell', value: value <= 25 ? value : 25 },
    { name: 'Neutral', value: value > 25 && value <= 75 ? value - 25 : value > 75 ? 50 : 0 },
    { name: 'Buy', value: value > 75 ? value - 75 : 0 },
  ];

  const COLORS = ['#1E88E5', '#64B5F6', '#1565C0']; // Palette de bleu

  return (
    <div style={{ textAlign: 'center' }}>
      <h3>{title}</h3>
      <ResponsiveContainer width="100%" height={250}>
        <PieChart>
          <Pie
            data={gaugeData}
            startAngle={180}
            endAngle={0}
            innerRadius={70}
            outerRadius={100}
            dataKey="value"
            paddingAngle={5}
          >
            {gaugeData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
      <h4>Current Value: {value}%</h4>
    </div>
  );
};

const PageStocksTechnical = () => {
  const [technicalData, setTechnicalData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { tickerName } = useParams();

  const fetchTechnicalData = async (ticker) => {
    try {
      if (!ticker) {
        throw new Error('No ticker provided');
      }

      const response = await axios.get('http://localhost:5000/technical_indicators', {
        params: { ticker },
      });

      setTechnicalData(response.data);
      setError(null);
    } catch (err) {
      console.error('Error fetching technical indicators:', err);
      setError('Failed to fetch technical data.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTechnicalData(tickerName);
  }, [tickerName]);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <CircularProgress size={60} thickness={5} />
      </Box>
    );
  }

  if (error) {
    return (

      
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        
        <Typography color="error" variant="h5" display="flex" alignItems="center">
          {error}
        </Typography>
      </Box>
    );
  }

  if (!technicalData) return <Typography>No technical data available.</Typography>;

  return (
    <Box p={3} sx={{ minHeight: '100vh' }}>
      <StockHeader></StockHeader>
      <Grid container spacing={3}>
        {/* Tableau des oscillateurs */}
       

        <Grid item xs={12} md={6}>
  {/* Première Card: Jauge des Oscillateurs */}
  {technicalData.oscillators && technicalData.oscillators !== 'No data available' && (
    <Card sx={{ backgroundColor: '#e0f7fa', marginTop: '20px' }}>
      <CardContent>
        <GaugeChartComponent
          value={technicalData.oscillators[0]?.value || 50} // Exemple de valeur
          title="Oscillators Indicator"
        />
      </CardContent>
    </Card>
  )}

  {/* Deuxième Card: Vide pour utilisation future */}
  <Card sx={{ backgroundColor: '#f5f5f5', marginTop: '20px' }}>
    <CardContent>
      <Typography variant="h6" align="center">
        Future Indicator
      </Typography>
      <Typography variant="body2" align="center" color="textSecondary">
        Espace réservé pour des informations futures
      </Typography>
    </CardContent>
  </Card>
</Grid>


        {/* Tableau des moyennes mobiles */}
        <Grid item xs={12} md={6}>
          {technicalData.moving_averages && technicalData.moving_averages !== 'No data available' ? (
            <Card sx={{ backgroundColor: '#e8f5e9' , marginTop: '20px'}}>
              <CardContent>
                <Box display="flex" alignItems="center" mb={2}>
                  <Typography variant="h6" fontWeight="medium">Moving Averages</Typography>
                </Box>
                <TableContainer component={Paper}>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell>Value</TableCell>
                        <TableCell>Action</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {technicalData.moving_averages.map((ma) => (
                        <TableRow key={ma.name}>
                          <TableCell>{ma.name}</TableCell>
                          <TableCell>{ma.value}</TableCell>
                          <TableCell>{ma.action}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </CardContent>
            </Card>
          ) : (
            <Typography>No moving averages data available.</Typography>
          )}
        </Grid>

        {/* Tableau des pivots */}
        <Grid item xs={12} md={6} >
          {technicalData.pivots && technicalData.pivots !== 'No data available' ? (
            <Card sx={{ backgroundColor: '#fff3e0' }}>
              <CardContent>
                <Box display="flex" alignItems="center" mb={2}>
                  <Typography variant="h6" fontWeight="medium">Pivots</Typography>
                </Box>
                <TableContainer component={Paper}>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell>Classic</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {technicalData.pivots.map((pivot) => (
                        <TableRow key={pivot.name}>
                          <TableCell>{pivot.name}</TableCell>
                          <TableCell>{pivot.classic}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </CardContent>
            </Card>
          ) : (
            <Typography>No pivot data available.</Typography>
          )}
          
        </Grid>
        <Grid item xs={12} md={6}>
          {technicalData.oscillators && technicalData.oscillators !== 'No data available' ? (
            <Card sx={{ backgroundColor: '#e3f2fd' }}>
              <CardContent>
                <Box display="flex" alignItems="center" mb={5}>
                  <TrendingUpIcon color="primary" sx={{ mr: 1 }} />
                  <Typography variant="h6" fontWeight="medium">Oscillators</Typography>
                </Box>
                <TableContainer component={Paper}>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell>Value</TableCell>
                        <TableCell>Action</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {technicalData.oscillators.map((osc) => (
                        <TableRow key={osc.name}>
                          <TableCell>{osc.name}</TableCell>
                          <TableCell>{osc.value}</TableCell>
                          <TableCell>{osc.action}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </CardContent>
            </Card>
          ) : (
            <Typography>No oscillator data available.</Typography>
          )}
          <Card sx={{ backgroundColor: '#f5f5f5', marginTop: '20px' }}>
    <CardContent>
      <Typography variant="h6" align="center">
        Future Indicator
      </Typography>
      <Typography variant="body2" align="center" color="textSecondary">
        Espace réservé pour des informations futures
      </Typography>
    </CardContent>
  </Card>
        </Grid>
        
        
      </Grid>
    </Box>
  );
};

export default PageStocksTechnical;
