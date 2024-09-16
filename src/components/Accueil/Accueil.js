import React, { useState } from 'react';
import { Button, ButtonGroup, Box, Typography, Grid, Card, Chip, CardContent } from '@mui/material';
import IndicesBoursiers from '../IndiceBoursier/IndiceBoursier';

const MarketTrends = () => {
  const [selectedContent, setSelectedContent] = useState(null);

  // Function to change the displayed content
  const handleContentChange = (content) => {
    setSelectedContent(content);
  };

  return (
    <Box sx={{ padding: 2, height: '100vh' }}>
      <Typography variant="h4" sx={{ mb: 2 }}>
      Découvrez les tendances du marché
      </Typography>

      <Grid container spacing={2}>
        {/* Left Column - Stock List (3/4 of the screen) */}
        <Grid item xs={12} md={9}>
          {/* Bottom section - More Navigation */}
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <ButtonGroup aria-label="button group with spacing">
              <Button sx={{ mr: 3, borderRadius: '250px' }} onClick={() => handleContentChange('indices')}>
                Indices boursiers
              </Button>
              <Button sx={{ mr: 3, borderRadius: '250px' }} onClick={() => handleContentChange('valeursActives')}>
                Valeurs les plus actives
              </Button>
              <Button sx={{ mr: 3, borderRadius: '50px' }} onClick={() => handleContentChange('actionsHausse')}>
                Actions en hausse
              </Button>
              <Button sx={{ mr: 3, borderRadius: '50px' }} onClick={() => handleContentChange('actionsBaisse')}>
                Actions en baisse
              </Button>
            </ButtonGroup>

            <Button variant="outlined" sx={{ ml: 3 }}>
              Partager
            </Button>
          </Box>

          {/* Dynamically display content based on selected button */}
          {selectedContent === 'indices' && <IndicesBoursiers />}

      
        </Grid>

        {/* Right Column - Portfolio and Market Trends (1/4 of the screen) */}
        <Grid item xs={12} md={3} >
        

          {/* Market Trends Card */}
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
                
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default MarketTrends;
