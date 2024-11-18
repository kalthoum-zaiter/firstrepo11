import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Box,
  Button,
  TextField,
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  List,
  ListItem,
  Paper,
  IconButton,
  InputAdornment,
  Menu,
  MenuItem,
  Alert,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import SearchIcon from '@mui/icons-material/Search';
import StockInvestment from '../SuiviInvestissement/SuiviInvestissment';

const PortfolioManagement = () => {
  const [portfolios, setPortfolios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedPortfolio, setSelectedPortfolio] = useState(null);
  const [open, setOpen] = useState(false);
  const [investmentSearch, setInvestmentSearch] = useState('');
  const [quantity, setQuantity] = useState('');
  const [purchaseDate, setPurchaseDate] = useState('');
  const [purchasePrice, setPurchasePrice] = useState('');
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isStockSelected, setIsStockSelected] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [investmentAdded, setInvestmentAdded] = useState(false);
  const [investmentData, setInvestmentData] = useState(null); // State for storing investment data

  const maxVisiblePortfolios = 5;

  useEffect(() => {
    const fetchPortfolios = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://127.0.0.1:5000/users/portfolios', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setPortfolios(response.data.portfolios);
        setLoading(false);
      } catch (err) {
        console.error('Failed to fetch portfolios.', err);
        setLoading(false);
      }
    };
    fetchPortfolios();
  }, []);

  const handleOpenDialog = () => setOpen(true);
  const handleCloseDialog = () => {
    setOpen(false);
    setInvestmentSearch('');
    setQuantity('');
    setPurchaseDate('');
    setPurchasePrice('');
    setIsStockSelected(false);
  };

  const fetchStockSuggestions = async (query) => {
    try {
      const response = await axios.get(`http://localhost:5000/api/stocks?q=${query}`);
      if (response.data) {
        setFilteredSuggestions(response.data);
        setShowSuggestions(true);
      } else {
        setFilteredSuggestions([]);
      }
    } catch (error) {
      console.error('Error fetching stock data:', error);
    }
  };

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setInvestmentSearch(value);

    if (value) {
      fetchStockSuggestions(value);
    } else {
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (stock) => {
    setInvestmentSearch(stock.ticker);
    setShowSuggestions(false);
    setIsStockSelected(true);
    setPurchasePrice(''); // Clear purchase price when selecting a new stock
  };

  const handleAddInvestment = () => {
    const newInvestment = {
      ticker: investmentSearch,
      quantity,
      date: purchaseDate,
      total_price: purchasePrice,
    };
    setInvestmentData(newInvestment); // Store investment data
    setInvestmentAdded(true); // Set investment as added
    handleCloseDialog();
  };

  const handleMoreClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  // Function to calculate price from the backend
  const calculatePrice = async () => {
    if (!investmentSearch || !quantity || !purchaseDate) return;

    try {
      const response = await axios.post('http://localhost:5000/api/calculate_price', {
        ticker: investmentSearch,
        quantity: quantity,
        date: purchaseDate,
      });
      setPurchasePrice(response.data.total_price); // Update purchase price
    } catch (error) {
      console.error("Error calculating price:", error);
      setPurchasePrice(''); // Clear price if there's an error
    }
  };

  // Use effect to trigger price calculation when quantity, purchaseDate, and investmentSearch are set
  useEffect(() => {
    calculatePrice();
  }, [investmentSearch, quantity, purchaseDate]);

  return (
    <Box sx={{ padding: 2, backgroundColor: '#f8f9fa', minHeight: '100vh' }}>
      
      {/* Portfolios Row with conditional dropdown */}
      <Box
        sx={{
          display: 'flex',
          gap: 1,
          padding: 2,
          backgroundColor: '#f0f0f0',
          justifyContent: 'flex-start',
          borderRadius: 1,
          boxShadow: 1,
          mb: 4,
        }}
      >
        {portfolios.slice(0, maxVisiblePortfolios).map((portfolio) => (
          <Button
            key={portfolio.id}
            onClick={() => setSelectedPortfolio(portfolio)}
            variant="outlined"
            sx={{
              padding: '8px 16px',
              backgroundColor: 'white',
              color: '#333',
              borderColor: 'lightgray',
              textTransform: 'none',
              '&:hover': { backgroundColor: '#e0e0e0' },
              minWidth: '120px',
            }}
          >
            {portfolio.name}
          </Button>
        ))}

        {portfolios.length > maxVisiblePortfolios && (
          <>
            <Button
              variant="outlined"
              onClick={handleMoreClick}
              sx={{
                padding: '8px 16px',
                backgroundColor: 'white',
                color: '#333',
                borderColor: 'lightgray',
                textTransform: 'none',
                '&:hover': { backgroundColor: '#e0e0e0' },
                minWidth: '120px',
              }}
            >
              Autres
            </Button>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
              PaperProps={{ style: { maxHeight: 300, width: '200px' } }}
            >
              {portfolios.slice(maxVisiblePortfolios).map((portfolio) => (
                <MenuItem
                  key={portfolio.id}
                  onClick={() => {
                    setSelectedPortfolio(portfolio);
                    handleMenuClose();
                  }}
                >
                  {portfolio.name}
                </MenuItem>
              ))}
            </Menu>
          </>
        )}
      </Box>

      {/* Conditional Portfolio Display */}
      {!investmentAdded ? (
        <Box
          sx={{
            textAlign: 'center',
            padding: 3,
            backgroundColor: '#ffffff',
            borderRadius: 2,
            boxShadow: 1,
            mb: 4,
          }}
        >
          <Typography variant="h4" gutterBottom>
            {selectedPortfolio ? selectedPortfolio.name : "Portefeuille vide"}
          </Typography>
          <Typography variant="body1" color="textSecondary">
            Ajoutez des investissements pour consulter leurs performances et suivre vos revenus
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={handleOpenDialog}
            sx={{ mt: 2, padding: '12px 24px', fontSize: '16px', textTransform: 'none' }}
            startIcon={<SearchIcon />}
          >
            Ajouter des investissements
          </Button>
        </Box>
      ) : (
        <Box sx={{ textAlign: 'center', padding: 3, backgroundColor: '#ffffff', borderRadius: 2, boxShadow: 1 }}>
          <StockInvestment data={investmentData} />
        </Box>
      )}

      {/* Dialog for Adding Investment */}
      <Dialog open={open} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle>
          Ajouter à {selectedPortfolio?.name}
          <IconButton
            aria-label="close"
            onClick={handleCloseDialog}
            sx={{ position: 'absolute', right: 8, top: 8 }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers>
          <TextField
            variant="outlined"
            placeholder="Saisir le nom ou le symbole d'un investissement"
            fullWidth
            margin="dense"
            autoComplete="off"
            value={investmentSearch}
            onChange={handleSearchChange}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />

          {showSuggestions && filteredSuggestions.length > 0 && (
            <Paper sx={{ position: 'absolute', width: '100%', zIndex: 10, maxHeight: 200, overflowY: 'auto' }}>
              <List>
                {filteredSuggestions.map((suggestion) => (
                  <ListItem
                    key={suggestion.ticker}
                    button
                    onClick={() => handleSuggestionClick(suggestion)}
                  >
                    {suggestion.ticker} - {suggestion.name}
                  </ListItem>
                ))}
              </List>
            </Paper>
          )}

          {isStockSelected && (
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}>
              <TextField
                label="Quantité"
                type="number"
                fullWidth
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                autoComplete="off"
              />
              <TextField
                label="Date d'achat"
                type="date"
                fullWidth
                InputLabelProps={{ shrink: true }}
                value={purchaseDate}
                onChange={(e) => setPurchaseDate(e.target.value)}
                autoComplete="off"
              />
              <TextField
                label="Prix d'achat"
                type="number"
                fullWidth
                value={purchasePrice}
                InputProps={{
                  readOnly: true,
                }}
              />
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="secondary">
            Annuler
          </Button>
          <Button onClick={handleAddInvestment} variant="contained" color="primary">
            Enregistrer
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default PortfolioManagement;
