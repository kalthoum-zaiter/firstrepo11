import React, { useEffect, useState } from 'react';
import { Grid, Typography, Divider, CircularProgress } from '@mui/material';
import axios from 'axios';

const CompanyInfo = ({ ticker }) => {
  // État pour stocker les données de l'entreprise
  const [companyData, setCompanyData] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`https://altindex.com/ticker/${ticker}`);
        setCompanyData(response.data);
      } catch (error) {
        console.error('Error fetching company data:', error);
      }
      setLoading(false);
    };
    fetchData();
  }, [ticker]);

  if (loading) {
    return (
      <Grid container justifyContent="center" alignItems="center" style={{ height: '100vh' }}>
        <CircularProgress />
      </Grid>
    );
  }

  if (!companyData) {
    return <Typography variant="h6" textAlign="center">No data available</Typography>;
  }

  return (
    <Grid container sx={{ maxWidth: 345, margin: 'auto', mt: 5 }}>
      <Grid item>
        <Typography variant="h5" component="div" sx={{ fontWeight: 'bold', mb: 2 }}>
          about {companyData.name}
        </Typography>

        <Typography variant="subtitle1" gutterBottom component="div">
          Price: ${companyData.price}
        </Typography>
        <Divider />

        <Typography variant="subtitle1" gutterBottom component="div" sx={{ mt: 2 }}>
          Year Range: {companyData.yearRange}
        </Typography>
        <Divider />

        <Typography variant="subtitle1" gutterBottom component="div" sx={{ mt: 2 }}>
          Target Price: ${companyData.targetPrice}
        </Typography>
        <Divider />

        <Typography variant="subtitle1" gutterBottom component="div" sx={{ mt: 2 }}>
          Volume: {companyData.volume}
        </Typography>
        <Divider />

        <Typography variant="subtitle1" gutterBottom component="div" sx={{ mt: 2 }}>
          Market Cap: ${companyData.marketCap}B
        </Typography>
        <Divider />

        <Typography variant="subtitle1" gutterBottom component="div" sx={{ mt: 2 }}>
          Dividend Yield: {companyData.dividendYield}
        </Typography>
      </Grid>
    </Grid>
  );
};

export default CompanyInfo;
