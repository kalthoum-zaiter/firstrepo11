import React from 'react';
import { Button, Box, Typography, Chip, Grid } from '@mui/material';
import ListAltIcon from '@mui/icons-material/ListAlt'; // Icône pour les listes
import AddIcon from '@mui/icons-material/Add'; // Icône pour ajouter une liste

const UserLists = ({ lists }) => {
  return (
    <Box sx={{ padding: 2 }}>
  

      <Grid container spacing={2}>
        {lists.map((list, index) => (
          <Grid item key={index}>
            <Chip
              label={
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <ListAltIcon sx={{ marginRight: '5px' }} />
                  {list.name}
                  <Typography variant="body2" sx={{ marginLeft: '5px' }}>
                    {list.count}
                  </Typography>
                </Box>
              }
              variant="outlined"
              sx={{
                borderRadius: '25px',
                padding: '10px 15px',
                fontSize: '16px',
              }}
            />
          </Grid>
        ))}

        {/* Ajouter nouvelle liste */}
        <Grid item>
          <Button
            startIcon={<AddIcon />}
            sx={{
              textTransform: 'none',
              fontWeight: 'bold',
              color: 'blue',
              fontSize: '16px',
            }}
          >
            Nouvelle liste
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

// Exemple de données
const sampleLists = [
  { name: 'Ma liste', count: 3 },
  { name: 'AA', count: 1 },
];

const ListeUser = () => {
  return <UserLists lists={sampleLists} />;
};

export default ListeUser;
