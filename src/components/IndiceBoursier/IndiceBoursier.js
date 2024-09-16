// IndicesBoursiers.js
import React from 'react';
import { Box, Typography, List, ListItem, ListItemText } from '@mui/material';

// Tableau d'indices boursiers
const indicesData = [
  { category: 'Indices Nationaux', indices: ['CAC 40', 'DAX', 'FTSE 100'] },
  { category: 'Indices Internationaux', indices: ['Dow Jones', 'Nasdaq', 'S&P 500'] },
  { category: 'Indices Sectoriels', indices: ['Nasdaq Biotech', 'S&P Energy', 'FTSE Tech'] },
];

const IndicesBoursiers = () => {
  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h5" sx={{ mb: 2 }}>
        Indices Boursiers
      </Typography>
      
      {/* Parcourir les catégories d'indices */}
      {indicesData.map((section, index) => (
        <Box key={index} sx={{ mb: 3 }}>
          <Typography variant="h6" sx={{ mb: 1 }}>
            {section.category}
          </Typography>

          {/* Liste des indices dans chaque catégorie */}
          <List>
            {section.indices.map((indice, idx) => (
              <ListItem key={idx}>
                <ListItemText primary={indice} />
              </ListItem>
            ))}
          </List>
        </Box>
      ))}
    </Box>
  );
};

export default IndicesBoursiers;
