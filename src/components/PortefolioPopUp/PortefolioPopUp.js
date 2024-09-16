import React, { useState } from 'react';
import { Box, Button, TextField, Typography, Modal, Card, CardContent } from '@mui/material';

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

export default PortfolioPopup;
