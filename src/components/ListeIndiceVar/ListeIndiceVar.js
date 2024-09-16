import React from 'react';
import { Card, Typography, Box, Grid, Chip, Button, Divider } from '@mui/material';

const StrongestVariations = ({ data }) => {
  // Fonction pour trier les données en fonction de la variation
  const sortedData = data.sort((a, b) => b.variationPercentage - a.variationPercentage);

  return (
    <Box sx={{ mb: 2 }}>
      {sortedData.map((item, index) => (
        <React.Fragment key={index}>
          <Grid container spacing={2} alignItems="center" sx={{ mb: 2 }}>
            <Grid item xs={3}>
              <Chip label={item.type} variant={item.type === 'INDICE' ? 'outlined' : 'filled'} />
            </Grid>
            <Grid item xs={3}>
              <Typography variant="body1">{item.name}</Typography>
            </Grid>
            <Grid item xs={2}>
              <Typography variant="body1">{item.price}</Typography>
            </Grid>
            <Grid item xs={2}>
              <Typography variant="body1" color={item.variation > 0 ? 'green' : 'red'}>
                {item.variation > 0 ? `+${item.variation}` : `${item.variation}`} $
              </Typography>
            </Grid>
            <Grid item xs={2}>
              <Typography variant="body1" color={item.variationPercentage > 0 ? 'green' : 'red'}>
                {item.variationPercentage > 0 ? `↑ ${item.variationPercentage}%` : `↓ ${item.variationPercentage}%`}
              </Typography>
            </Grid>
           
          </Grid>
          {/* Divider between each item */}
          {index < sortedData.length - 1 && <Divider />}
        </React.Fragment>
      ))}
    </Box>
  );
};

// Exemple de données
const sampleData = [
  { type: 'INDICE', name: 'CAC 40', price: '7 435,07', variation: 38.24, variationPercentage: 0.52 },
  { type: 'ACTION', name: 'Nvidia', price: '119,63 $', variation: 2.73, variationPercentage: 2.34 },
  { type: 'INDICE', name: 'Dow Jones Industrial Average', price: '41 021,25', variation: 159.54, variationPercentage: 0.39 },
  { type: 'INDICE', name: 'S&P 500', price: '5 586,38', variation: 32.25, variationPercentage: 0.58 }
];

const IndiceVar = () => {
  return <StrongestVariations data={sampleData} />;
};

export default IndiceVar;
