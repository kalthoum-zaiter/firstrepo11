import React, { useState } from 'react';
import { Button, Box, Typography, Grid, Card, CardContent, Divider, Modal, TextField } from '@mui/material';
import IndiceVar from '../ListeIndiceVar/ListeIndiceVar';
import ListeUser from '../ListeUser.js/ListeUser';

// Popup Component
const PortfolioPopup = ({ open, onClose, onSave }) => {
  const [portfolioName, setPortfolioName] = useState('');

  const handleSave = () => {
    if (portfolioName.trim()) {
      onSave(portfolioName);
      setPortfolioName('');
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
        }}
      >
        <Card sx={{ minWidth: 300, p: 3 }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Créer un portefeuille
            </Typography>
            <TextField
              fullWidth
              label="Nom du portefeuille"
              value={portfolioName}
              onChange={(e) => setPortfolioName(e.target.value)}
              sx={{ mb: 2 }}
            />
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
              <Button variant="outlined" onClick={onClose}>
                Annuler
              </Button>
              <Button variant="contained" onClick={handleSave} disabled={!portfolioName.trim()}>
                Enregistrer
              </Button>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Modal>
  );
};

// AccueilG Component
const AccueilG = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const handleOpenPopup = () => {
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };

  const handleSavePortfolio = (portfolioName) => {
    console.log('Nom du portefeuille:', portfolioName);
    setIsPopupOpen(false);
    // Logique à ajouter pour gérer le portefeuille créé
  };

  return (
    <Grid container spacing={4} sx={{ padding: 2 }}>
      {/* Colonne de gauche */}
      <Grid item xs={12} md={8}>
      <Typography variant="h6" sx={{ mb: 2 }}>
            Valeurs aux plus fortes variations de vos listes
          </Typography>
          <Divider sx={{ my: 2 }} />

          
        <IndiceVar />
         <Typography variant="h6" sx={{ mb: 0}}>
            Vos listes
          </Typography>
        <ListeUser />
      </Grid>

      {/* Colonne de droite */}
      <Grid item xs={12} md={4}>
        {/* Carte du portefeuille */}
        <Card variant="outlined" sx={{ boxShadow: 3, width: '80%', mb: 4, p: 2, borderRadius: 2 }}>
          <CardContent>
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              Vos portefeuilles
            </Typography>
            <Typography variant="h4" fontWeight="bold" gutterBottom>
              0,000 din
            </Typography>
            <Button
              variant="contained"
              size="medium"
              sx={{ mt: 2, width: '100%' }}
              onClick={handleOpenPopup}
            >
              + Nouveau portefeuille
            </Button>
          </CardContent>
        </Card>
      </Grid>

      {/* Popup du portefeuille */}
      <PortfolioPopup open={isPopupOpen} onClose={handleClosePopup} onSave={handleSavePortfolio} />
    </Grid>
  );
};

export default AccueilG;
