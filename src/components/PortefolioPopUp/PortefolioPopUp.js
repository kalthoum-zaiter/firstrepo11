import React, { useState } from 'react';
import { Box, Button, TextField, Typography, Modal, Card, CardContent } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';

const PortfolioPopup = ({ open, onClose, onSave }) => {
  const [portfolioName, setPortfolioName] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();


  const handleSave = async () => {
    if (portfolioName.trim()) {
      try {
        await onSave(portfolioName);
        setPortfolioName('');
        setError('');
      } catch (err) {
        setError('Une erreur s\'est produite lors de l\'ajout du portefeuille.');
      }
    } else {
      setError('Le nom du portefeuille est requis.');
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
            {error && (
              <Typography color="error" variant="body2">
                {error}
              </Typography>
            )}
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
              <Button
  variant="contained"
  disabled={!portfolioName.trim()} // Disable the button if the portfolio name is empty
  onClick={() => {
    handleSave(); // First, trigger the save action
    navigate('/portefeuilles'); // Then, navigate to the desired page
  }}
>
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
