import React, { useState, useEffect } from 'react';
import { ThemeProvider, useTheme } from '@mui/material/styles';
import {
  AppBar, Box, Toolbar, IconButton, TextField, InputAdornment, Button, Avatar, Typography, List, ListItem, Paper, Menu, MenuItem
} from '@mui/material';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import Sidebar from '../SideBar/SideBar';
import StockInSGHT from '../Layout/StockInSGHT.png'; // Your logo image

const Layout = ({ children, showSidebar, showAppBar }) => {
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = useState(null);  // For menu
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false); // For showing the dropdown
  const [filteredSuggestions, setFilteredSuggestions] = useState([]); // List of suggestions
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const location = useLocation(); // Hook to get the current route

  useEffect(() => {
    const userData = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    if (token && userData) {
      setUser(JSON.parse(userData));
    }
    
    // Add an event listener to update user data upon login
    const handleStorageChange = () => {
      const updatedUserData = localStorage.getItem('user');
      if (updatedUserData) {
        setUser(JSON.parse(updatedUserData));
      }
    };

    window.addEventListener('storage', handleStorageChange);
    
    // Cleanup listener on component unmount
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    handleMenuClose();
    navigate('/signin');
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const fetchStockData = async (query) => {
    try {
      const response = await fetch(`http://localhost:5000/api/stocks?q=${query}`);
      const data = await response.json();
      if (data.error) {
        setFilteredSuggestions([]); // Clear suggestions on error
      } else {
        setFilteredSuggestions(data); // Populate suggestions with valid data
      }
    } catch (error) {
    }
  };

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchQuery(value);

    if (value) {
      fetchStockData(value); // Fetch stock suggestions
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false); // Hide suggestions if input is empty
    }
  };

  const handleSearch = (event) => {
    if (event.key === 'Enter' && searchQuery) {
      const selectedStock = filteredSuggestions.find(stock =>
        stock.ticker.toLowerCase() === searchQuery.toLowerCase() ||
        stock.name.toLowerCase().includes(searchQuery.toLowerCase())
      );

      if (selectedStock) {
        setShowSuggestions(false); // Hide suggestions on enter press
        navigate(`/overview/${selectedStock.ticker}`); // Navigate to overview page
      } else {
        alert('No matching stock found');
      }
    }
  };

  const handleSuggestionClick = (ticker) => {
    setShowSuggestions(false); // Hide suggestions after clicking
    navigate(`/overview/${ticker}`); // Navigate to the selected company's overview page
  };

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: 'flex', width: '100%', minHeight: '100vh', bgcolor: 'white' }}>
        {showAppBar && (
          <AppBar position="fixed" sx={{ zIndex: theme.zIndex.drawer + 1 }}>
            <Toolbar>
              {showSidebar && (
                <IconButton
                  size="large"
                  edge="start"
                  color="inherit"
                  aria-label="open drawer"
                  onClick={toggleSidebar}
                  sx={{ mr: 2 }}
                >
                  <MenuIcon />
                </IconButton>
              )}

              {/* Logo */}
              <Box>
                <Link to="/accueil">
                  <img src={StockInSGHT} alt="StockInsight Logo" style={{ width: '200px', height: 'auto', cursor: 'pointer' }} />
                </Link>
              </Box>

              {/* Search Bar */}
              {location.pathname !== '/signin' && (
                <Box sx={{ position: 'relative', width: 400, ml: 3 }}>
                  <TextField
                    variant="outlined"
                    placeholder="Search Stocks or Companies"
                    sx={{ width: '100%', bgcolor: 'background.paper', borderRadius: 1 }}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <SearchIcon />
                        </InputAdornment>
                      ),
                    }}
                    value={searchQuery}
                    onChange={handleSearchChange}
                    onKeyDown={handleSearch}
                    onFocus={() => setShowSuggestions(true)}
                    onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                    autoComplete="off"
                  />

                  {showSuggestions && filteredSuggestions.length > 0 && (
                    <Paper sx={{
                      position: 'absolute',
                      width: '100%',
                      maxHeight: 200,
                      overflowY: 'auto',
                      zIndex: 10,
                    }}>
                      <List>
                        {filteredSuggestions.map((suggestion) => (
                          <ListItem
                            key={suggestion.ticker}
                            button
                            onClick={() => handleSuggestionClick(suggestion.ticker)}
                          >
                            {suggestion.ticker} - {suggestion.name}
                          </ListItem>
                        ))}
                      </List>
                    </Paper>
                  )}
                </Box>
              )}

              <Box sx={{ flexGrow: 1 }} />

              {/* User Profile */}
              {user ? (
                <>
                  <Typography variant="h6" sx={{ marginRight: 2 }}>{user.name}</Typography>
                  <IconButton onClick={handleProfileMenuOpen}>
                    <Avatar alt={user.name} src={user.avatarUrl || ''} />
                  </IconButton>
                  <Menu
                    anchorEl={anchorEl}
                    keepMounted
                    open={Boolean(anchorEl)}
                    onClose={handleMenuClose}
                  >
                    <MenuItem onClick={handleLogout}>Log Out</MenuItem>
                  </Menu>
                </>
              ) : (
                <>
                  <Button color="inherit" onClick={() => navigate('/signin')} variant="text">Sign In</Button>
                  <Button color="inherit" onClick={() => navigate('/register')}>Sign Up</Button>
                </>
              )}
            </Toolbar>
          </AppBar>
        )}

        {/* Sidebar */}
        {showSidebar && <Sidebar open={sidebarOpen} onClose={toggleSidebar} />}

        {/* Main Content Area */}
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 10,
            bgcolor: 'white',
            minHeight: '100vh',
            marginTop: showAppBar ? '50px' : '0px',
          }}
        >
          {children}
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default Layout;
