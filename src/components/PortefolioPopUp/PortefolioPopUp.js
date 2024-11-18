import React, { useState } from 'react';
import axios from 'axios';
import { Box, Button, TextField, Typography, Modal, Card, CardContent } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const PortfolioPopup = ({ open, onClose, onSave }) => {
  const [portfolioName, setPortfolioName] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSave = async () => {
    if (portfolioName.trim()) {
      try {
        // Make the API call to save the portfolio
        const token = localStorage.getItem('token'); // Retrieve the JWT token from localStorage
        const response = await axios.post('http://127.0.0.1:5000/portfolios', 
          { name: portfolioName }, // Send the portfolio name in the request body
          {
            headers: {
              Authorization: `Bearer ${token}`, // Pass JWT token in the Authorization header
            },
          }
        );

        // On successful response, reset state and close modal
        if (response.status === 201) {
          setPortfolioName('');
          setError('');
          onSave(); // Trigger any callback after successful save
          onClose(); // Close the modal
          navigate('/portefeuilles'); // Navigate to the portfolios page
        }
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
              autoComplete="off"

            />
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
              <Button variant="outlined" onClick={onClose}>
                Annuler
              </Button>
              <Button
                variant="contained"
                disabled={!portfolioName.trim()} // Disable the button if the portfolio name is empty
                onClick={handleSave} // Trigger the save function when the button is clicked
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
