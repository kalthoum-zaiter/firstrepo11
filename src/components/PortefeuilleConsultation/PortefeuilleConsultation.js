import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, TextField, CircularProgress } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';

const PortfolioManagement = () => {
  const [portfolios, setPortfolios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(null); // To track the portfolio being edited
  const [editPortfolio, setEditPortfolio] = useState({});
  const [portfolioName, setPortfolioName] = useState('');
  const [error, setError] = useState('');

  // Fetch portfolios when the component mounts
  useEffect(() => {
    const fetchPortfolios = async () => {
      try {
        const token = localStorage.getItem('token'); // Retrieve the JWT token from localStorage
        const response = await axios.get('http://127.0.0.1:5000/users/portfolios', {
          headers: {
            Authorization: `Bearer ${token}`,  // Pass the token in the Authorization header
          },
        });
        setPortfolios(response.data.portfolios); // Set portfolios from the response
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch portfolios.');
        setLoading(false);
      }
    };

    fetchPortfolios();
  }, []);

  // Delete a portfolio
  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://127.0.0.1:5000/portfolios/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,  // Pass the token in the Authorization header
        },
      });
      setPortfolios(portfolios.filter((portfolio) => portfolio.id !== id)); // Update state to remove the deleted portfolio
    } catch (err) {
      setError('Failed to delete portfolio.');
    }
  };

  // Edit a portfolio
  const handleEdit = (portfolio) => {
    setEditing(portfolio.id);
    setEditPortfolio({ ...portfolio });
  };

  // Save the edited portfolio (renamed from handleSave to avoid conflict)
  const handleEditSave = async (id) => {
    try {
      const token = localStorage.getItem('token');
      await axios.put(`http://127.0.0.1:5000/portfolios/${id}`, {
        name: editPortfolio.name,
        stock_symbol: editPortfolio.stock_symbol,
        shares: editPortfolio.shares,
        investment_amount: editPortfolio.investment_amount,
      }, {
        headers: {
          Authorization: `Bearer ${token}`,  // Pass the token in the Authorization header
        },
      });
      // Update the portfolio in the state
      setPortfolios(portfolios.map((portfolio) => (portfolio.id === id ? { ...portfolio, ...editPortfolio } : portfolio)));
      setEditing(null); // Exit editing mode
    } catch (err) {
      setError('Failed to update portfolio.');
    }
  };

  // Save a new portfolio (original handleSave)
  const handleSaveNewPortfolio = async () => {
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

        // On successful response, reset state
        if (response.status === 201) {
          setPortfolioName('');
          setError('');
          setPortfolios([...portfolios, response.data.portfolio]); // Add new portfolio to state
        }
      } catch (err) {
        setError('Une erreur s\'est produite lors de l\'ajout du portefeuille.');
      }
    } else {
      setError('Le nom du portefeuille est requis.');
    }
   };

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h4" gutterBottom>
        Gestion des Portefeuilles
      </Typography>
      {portfolios.length === 0 ? (
        <Typography>Aucun portefeuille disponible.</Typography>
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Nom du portefeuille</TableCell>
                <TableCell>Symbole</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {portfolios.map((portfolio) => (
                <TableRow key={portfolio.id}>
                  <TableCell>
                    {editing === portfolio.id ? (
                      <TextField
                        value={editPortfolio.name}
                        onChange={(e) => setEditPortfolio({ ...editPortfolio, name: e.target.value })}
                        fullWidth
                      />
                    ) : (
                      <Typography>{portfolio.name}</Typography>
                    )}
                  </TableCell>
                  <TableCell>{portfolio.stock_symbol}</TableCell>
                  <TableCell align="right">
                    {editing === portfolio.id ? (
                      <IconButton onClick={() => handleEditSave(portfolio.id)} color="primary">
                        <SaveIcon />
                      </IconButton>
                    ) : (
                      <IconButton onClick={() => handleEdit(portfolio)} color="primary">
                        <EditIcon />
                      </IconButton>
                    )}
                    <IconButton onClick={() => handleDelete(portfolio.id)} color="secondary">
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
};

export default PortfolioManagement;
