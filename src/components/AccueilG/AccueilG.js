import React, { useState, useEffect } from 'react';
import { Button, Box, Typography, Grid, Card, CardContent, Divider } from '@mui/material';
import IndiceVar from '../ListeIndiceVar/ListeIndiceVar';
import ListeUser from '../ListeUser.js/ListeUser';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import ShowChartIcon from '@mui/icons-material/ShowChart';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import PortfolioManager from '../PORTFOLIO/PORTFOLIO';
import PortfolioPopup from '../PortefolioPopUp/PortefolioPopUp';
import { useNavigate } from 'react-router-dom';
import MarketDataList from '../MarketDataList/MarketDataList';
import Accueil from '../Accueil/Accueil';
import News from '../CompanyDetailsAfter/CompanyDetailsAfter';
import axios from 'axios';

const AccueilG = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [portfolios, setPortfolios] = useState([]); // State to store portfolio data
  const navigate = useNavigate();

  const handleOpenPopup = () => {
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };

  const handleSavePortfolio = async (portfolioName) => {
    // Logic for saving portfolio
  };

  const handleNavigation = (path) => {
    navigate(path); // Use navigate to change the route
  };

  const [portefeuilles, setPortefeuilles] = useState([]);

  useEffect(() => {
    const fetchPortefeuilles = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`http://127.0.0.1:5000/users/portfolios`, {
          headers: {
            Authorization: `Bearer ${token}`,  // Pass the token in the Authorization header
          },
        });

        // Update the state with the fetched portfolios
        setPortefeuilles(response.data.portfolios);
      } catch (error) {
        console.error('Error fetching portfolios:', error);
      }
    };

    fetchPortefeuilles();
  }, []);

  return (
    <Grid container spacing={4} sx={{ padding: 2 }}>
      {/* Left Column */}
      <Grid item xs={12} md={8}>
        <Typography variant="h6" sx={{ mb: 2 }}>
          Valeurs aux plus fortes variations de vos listes
        </Typography>
        <Divider sx={{ my: 2 }} />
        <IndiceVar />
        <Typography variant="h6" sx={{ mb: 0 }}>
          Vos listes
        </Typography>
        <ListeUser />
      </Grid>

      {/* Right Column */}
      <Grid item xs={12} md={4}>
        {/* Portfolio Card */}
        <Card variant="outlined" sx={{ width: '80%', mb: 4, p: 2, borderRadius: 3 }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Vos portefeuilles
            </Typography>

            {/* Display fetched portfolios */}
            {portefeuilles.length > 0 ? (
              portefeuilles.map((portfolio, index) => (
                <Typography key={index} variant="body1" gutterBottom>
                  {portfolio.name} {/* Assuming each portfolio has a 'name' field */}
                </Typography>
              ))
            ) : (
              <Typography variant="body2" gutterBottom>
                Aucun portefeuille disponible.
              </Typography>
            )}

            <PortfolioManager portfolios={portefeuilles} />
          </CardContent>
        </Card>

        {/* Market Trends Card */}
        <Card variant="outlined" sx={{ width: '80%', mb: 4, p: 2, borderRadius: 2 }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Tendances du marché
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Button
                  variant="outlined"
                  fullWidth
                  startIcon={<TrendingUpIcon style={{ color: 'green' }} />}
                  onClick={() => handleNavigation('/indices-boursiers')}
                  sx={{
                    borderRadius: '10px',
                    borderColor: 'lightgray',
                    fontSize: '0.75rem',
                    textTransform: 'none',
                  }}
                >
                  Indices boursiers
                </Button>
              </Grid>
              <Grid item xs={6}>
                <Button
                  variant="outlined"
                  fullWidth
                  startIcon={<ShowChartIcon style={{ color: 'blue' }} />}
                  onClick={() => handleNavigation('/valeurs-les-plus-actives')}
                  sx={{
                    borderRadius: '10px',
                    borderColor: 'lightgray',
                    fontSize: '0.75rem',
                    textTransform: 'none',
                  }}
                >
                  Valeurs actives
                </Button>
              </Grid>
              <Grid item xs={6}>
                <Button
                  variant="outlined"
                  fullWidth
                  startIcon={<ArrowUpwardIcon style={{ color: 'green' }} />}
                  onClick={() => handleNavigation('/actions-en-hausse')}
                  sx={{
                    borderRadius: '10px',
                    borderColor: 'lightgray',
                    fontSize: '0.75rem',
                    textTransform: 'none',
                  }}
                >
                  Actions en hausse
                </Button>
              </Grid>
              <Grid item xs={6}>
                <Button
                  variant="outlined"
                  fullWidth
                  startIcon={<ArrowDownwardIcon style={{ color: 'red' }} />}
                  onClick={() => handleNavigation('/actions-en-baisse')}
                  sx={{
                    borderRadius: '10px',
                    borderColor: 'lightgray',
                    fontSize: '0.75rem',
                    textTransform: 'none',
                  }}
                >
                  Actions en baisse
                </Button>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Grid>

      {/* Portfolio Popup */}
      <PortfolioPopup open={isPopupOpen} onClose={handleClosePopup} onSave={handleSavePortfolio} />

      <MarketDataList />

      <Grid>
        <News />
      </Grid>
    </Grid>
  );
};

export default AccueilG;
