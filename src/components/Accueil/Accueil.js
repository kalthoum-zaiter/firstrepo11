import React from 'react';
import { Button, ButtonGroup, Box, Typography, Grid, Card, CardContent } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import IndicesBoursiers from '../IndiceBoursier/IndiceBoursier'; 

const MarketTrends = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Function to change the URL route without full page reload
  const handleNavigation = (path) => {
    navigate(path);  // This changes the URL while staying on the same page
  };

  // Determine the content to render based on the current path
  const renderContent = () => {
    switch (location.pathname) {
      case '/indices-boursiers':
        return <IndicesBoursiers />;
      case '/valeurs-les-plus-actives':
        return <div>Valeurs les plus actives content</div>; // Replace with actual component
      case '/actions-en-hausse':
        return <div>Actions en hausse content</div>; // Replace with actual component
      case '/actions-en-baisse':
        return <div>Actions en baisse content</div>; // Replace with actual component
      default:
        return <div>Default content or landing content</div>; // Content for root or default case
    }
  };

  return (
    <Box sx={{ padding: 2, height: '100vh' }}>
      <Typography variant="h4" sx={{ mb: 2 }}>
        Découvrez les tendances du marché
      </Typography>

      <Grid container spacing={2}>
        {/* Left Column - Stock List (3/4 of the screen) */}
        <Grid item xs={12} md={9}>
          {/* Button Group for Navigation */}
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <ButtonGroup aria-label="button group with spacing">
              <Button
                sx={{ mr: 3, borderRadius: '250px' }}
                onClick={() => handleNavigation('/indices-boursiers')}
              >
                Indices boursiers
              </Button>
              <Button
                sx={{ mr: 3, borderRadius: '250px' }}
                onClick={() => handleNavigation('/valeurs-les-plus-actives')}
              >
                Valeurs les plus actives
              </Button>
              <Button
                sx={{ mr: 3, borderRadius: '50px' }}
                onClick={() => handleNavigation('/actions-en-hausse')}
              >
                Actions en hausse
              </Button>
              <Button
                sx={{ mr: 3, borderRadius: '50px' }}
                onClick={() => handleNavigation('/actions-en-baisse')}
              >
                Actions en baisse
              </Button>
            </ButtonGroup>

            <Button variant="outlined" sx={{ ml: 3 }}>
              Partager
            </Button>
          </Box>

          {/* Dynamically Render Content Based on the URL */}
          {renderContent()}
        </Grid>

        {/* Right Column - Portfolio and Market Trends (1/4 of the screen) */}
        <Grid item xs={12} md={3}>
          <Card
            variant="outlined"
            sx={{
              boxShadow: 'lg',
              width: '100%',
              maxWidth: '100%',
              overflow: 'auto',
            }}
          >
            <CardContent>
              <Typography variant="h6" fontWeight="bold">
                {/* Additional content can go here */}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default MarketTrends;
