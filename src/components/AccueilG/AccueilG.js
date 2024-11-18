import React, { useState, useEffect } from 'react';
import { Button, Box, Typography, Grid, Card, CardContent, Snackbar, Divider } from '@mui/material';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import ShowChartIcon from '@mui/icons-material/ShowChart';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import PortfolioPopup from '../PortefolioPopUp/PortefolioPopUp';
import { useNavigate } from 'react-router-dom';
import News from '../CompanyDetailsAfter/CompanyDetailsAfter';
import helloword from '../AccueilG/helloword.png';
import axios from 'axios';

const AccueilG = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [portefeuilles, setPortefeuilles] = useState([]);
  const [error, setError] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  const handleOpenPopup = () => setIsPopupOpen(true);
  const handleClosePopup = () => setIsPopupOpen(false);

  const handleSavePortfolio = async (portfolioName) => {
    // Logic for saving portfolio
  };

  const handleNavigation = (path) => navigate(path);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
      const fetchPortefeuilles = async () => {
        try {
          const response = await axios.get(`http://127.0.0.1:5000/users/portfolios`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          setPortefeuilles(response.data.portfolios);
        } catch (error) {
          setError(true);
          console.error('Erreur lors de la récupération des portefeuilles :', error);
        }
      };
      fetchPortefeuilles();
    }
  }, []);

  return (
    <Box sx={{ padding: 3, backgroundColor: '#f4f6f8', minHeight: '100vh' }}>
      <Grid container spacing={4}>
        {/* Logo Image */}
        <Grid item xs={12}>
          <Box>
            <img src={helloword} alt="Logo StockInsight" style={{ width: '100%', height: 'auto', cursor: 'pointer', borderRadius: '8px' }} />
          </Box>
        </Grid>

        {/* News and Portfolios */}
        <Grid item xs={12} md={8}>
          <News />
        </Grid>

        <Grid item xs={12} md={4}>
          {/* Portfolio Card */}
          <Card variant="outlined" sx={{ width: '90%', mb: 4, borderRadius: 3, boxShadow: 2, border: '1px solid #e0e0e0' }}>
            <CardContent>
              <Typography variant="h5" gutterBottom fontWeight="bold" color="primary">
                Vos portefeuilles
              </Typography>
              <Divider sx={{ mb: 2 }} />
              {isAuthenticated ? (
                portefeuilles.length > 0 ? (
                  portefeuilles.map((portfolio, index) => (
                    <Typography key={index} variant="body1" color="textSecondary" gutterBottom>
                      {portfolio.name}
                    </Typography>
                  ))
                ) : (
                  <Typography variant="body2" color="textSecondary" gutterBottom>
                    Créez un portefeuille pour visualiser vos investissements en un seul endroit.
                  </Typography>
                )
              ) : (
                <Button variant="contained" color="primary" onClick={() => handleNavigation('/signin')}>
                  Sign In
                </Button>
              )}
              {isAuthenticated && (
                <Button variant="contained" color="primary" sx={{ mt: 2 }} onClick={handleOpenPopup}>
                  + Nouveau Portefeuille
                </Button>
              )}
            </CardContent>
          </Card>

          {/* Market Trends Card */}
          <Card variant="outlined" sx={{ width: '90%', mb: 4, p: 2, borderRadius: 3, boxShadow: 2, border: '1px solid #e0e0e0' }}>
            <CardContent>
              <Typography variant="h5" gutterBottom fontWeight="bold" color="secondary">
                Tendances du marché
              </Typography>
              <Divider sx={{ mb: 2 }} />
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Button
                    variant="outlined"
                    fullWidth
                    startIcon={<TrendingUpIcon aria-label="Indices boursiers" style={{ color: 'green' }} />}
                    onClick={() => handleNavigation('/indices-boursiers')}
                    sx={{
                      borderRadius: '10px',
                      borderColor: 'lightgray',
                      fontSize: '0.85rem',
                      textTransform: 'none',
                      color: '#333',
                      '&:hover': { borderColor: '#999' },
                    }}
                  >
                    Indices boursiers
                  </Button>
                </Grid>
                <Grid item xs={6}>
                  <Button
                    variant="outlined"
                    fullWidth
                    startIcon={<ShowChartIcon aria-label="Valeurs actives" style={{ color: 'blue' }} />}
                    onClick={() => handleNavigation('/valeurs-les-plus-actives')}
                    sx={{
                      borderRadius: '10px',
                      borderColor: 'lightgray',
                      fontSize: '0.85rem',
                      textTransform: 'none',
                      color: '#333',
                      '&:hover': { borderColor: '#999' },
                    }}
                  >
                    Valeurs actives
                  </Button>
                </Grid>
                <Grid item xs={6}>
                  <Button
                    variant="outlined"
                    fullWidth
                    startIcon={<ArrowUpwardIcon aria-label="Actions en hausse" style={{ color: 'green' }} />}
                    onClick={() => handleNavigation('/actions-en-hausse')}
                    sx={{
                      borderRadius: '10px',
                      borderColor: 'lightgray',
                      fontSize: '0.85rem',
                      textTransform: 'none',
                      color: '#333',
                      '&:hover': { borderColor: '#999' },
                    }}
                  >
                    Actions en hausse
                  </Button>
                </Grid>
                <Grid item xs={6}>
                  <Button
                    variant="outlined"
                    fullWidth
                    startIcon={<ArrowDownwardIcon aria-label="Actions en baisse" style={{ color: 'red' }} />}
                    onClick={() => handleNavigation('/actions-en-baisse')}
                    sx={{
                      borderRadius: '10px',
                      borderColor: 'lightgray',
                      fontSize: '0.85rem',
                      textTransform: 'none',
                      color: '#333',
                      '&:hover': { borderColor: '#999' },
                    }}
                  >
                    Actions en baisse
                  </Button>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Portfolio Popup and Error Snackbar */}
      <PortfolioPopup open={isPopupOpen} onClose={handleClosePopup} onSave={handleSavePortfolio} />
      <Snackbar
        open={error}
        autoHideDuration={6000}
        onClose={() => setError(false)}
        message="Erreur lors de la récupération des portefeuilles."
      />
    </Box>
  );
};

export default AccueilG;
