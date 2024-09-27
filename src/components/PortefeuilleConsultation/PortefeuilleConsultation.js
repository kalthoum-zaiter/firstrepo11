import React, { useState } from 'react';
import { Button, Box, Tabs, Tab, Typography, Card, CardContent } from '@mui/material';

// A component to show the portfolio details
const PortfolioDetails = ({ portfolio }) => {
  return (
    <Card sx={{ minWidth: 275, marginTop: 2 }}>
      <CardContent>
        <Typography variant="h5" component="div">
          {portfolio.name}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          Dernière mise à jour: {portfolio.date}
        </Typography>
        <Typography variant="body2">
          Montant total: {portfolio.amount} TND
        </Typography>
      </CardContent>
    </Card>
  );
};

const  PortfeuilleConsultation = () => {
  const [portfolios, setPortfolios] = useState([
    { id: 1, name: 'AA', date: '20 Sept 2024', amount: '0.00' },
  ]);
  const [selectedPortfolio, setSelectedPortfolio] = useState(0);

  const addNewPortfolio = () => {
    const newPortfolio = {
      id: portfolios.length + 1,
      name: `Portfolio ${portfolios.length + 1}`,
      date: new Date().toLocaleDateString(),
      amount: '0.00',
    };
    setPortfolios([...portfolios, newPortfolio]);
  };

  return (
    <Box sx={{ width: '100%', padding: 2 }}>
      {/* Tab Navigation for Portfolio Selection */}
      <Tabs
        value={selectedPortfolio}
        onChange={(event, newValue) => setSelectedPortfolio(newValue)}
        aria-label="portfolio tabs"
        variant="scrollable"
        scrollButtons="auto"
      >
        {portfolios.map((portfolio, index) => (
          <Tab key={portfolio.id} label={portfolio.name} />
        ))}
      </Tabs>

      {/* Button to add a new portfolio */}
      <Button
        variant="contained"
        color="primary"
        onClick={addNewPortfolio}
        sx={{ marginTop: 2 }}
      >
        Ajouter un nouveau portefeuille
      </Button>

      {/* Display the selected portfolio details */}
      {portfolios[selectedPortfolio] && (
        <PortfolioDetails portfolio={portfolios[selectedPortfolio]} />
      )}
    </Box>
  );
};

export default PortfeuilleConsultation;
