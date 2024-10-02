import React, { useState } from 'react';
import { Box, Button, TextField, Typography, Modal, Card, CardContent } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';

const ListPopup = ({ open, onClose, onSave }) => {
  const [listName, setListName] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSave = async () => {
    if (listName.trim()) {
      try {
        await onSave(listName);
        setListName(''); // Reset list name
        setError(''); // Clear error if any
      } catch (err) {
        setError('Une erreur s\'est produite lors de l\'ajout de la liste.');
      }
    } else {
      setError('Le nom de la liste est requis.');
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
              Créer une liste
            </Typography>
            {error && (
              <Typography color="error" variant="body2">
                {error}
              </Typography>
            )}
            <TextField
              fullWidth
              label="Nom de la liste"
              value={listName}
              onChange={(e) => setListName(e.target.value)}
              sx={{ mb: 2 }}
            />
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
              <Button variant="outlined" onClick={onClose}>
                Annuler
              </Button>
              <Button
                variant="contained"
                disabled={!listName.trim()} // Disable the button if the list name is empty
                onClick={() => {
                  handleSave(); // Trigger the save action
                  navigate('/listes'); // Navigate to lists page after saving
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

export default ListPopup;
