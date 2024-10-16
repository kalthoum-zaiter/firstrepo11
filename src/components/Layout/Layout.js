import React, { useState, useEffect } from 'react';
import { ThemeProvider, useTheme } from '@mui/material/styles';
import {
  AppBar, Box, Toolbar, IconButton, TextField, InputAdornment, Button, Avatar, Typography, List, ListItem, Paper, Menu, MenuItem
} from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom'; // Import useLocation for current route
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import Sidebar from '../SideBar/SideBar';

const drawerWidth = 240;

export default function Layout({ children, showSidebar, showAppBar }) {
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = useState(null);  // For menu
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false); // For showing the dropdown
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const location = useLocation(); // Hook to get the current route

 

  useEffect(() => {
    // Retrieve user data from localStorage
    const userData = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    if (token && userData) {
      // If token and user data are present, parse and set the user state
      setUser(JSON.parse(userData));
    }
  }, []);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  // Function to handle logout
  const handleLogout = () => {
    // Remove token and user data from localStorage
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  
    // Update user state to null
    setUser(null);
  
    // Close the profile menu
    handleMenuClose();
  
    // Redirect to login page
    navigate('/signin');
  };
  
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  // Function to handle search
  const handleSearch = (event) => {
    if (event.key === 'Enter' && searchQuery) {
      navigate(`/overview/${searchQuery}`);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: 'flex', width: '100%', minHeight: '100vh', bgcolor: 'white' }}>
        {showAppBar && (
          <AppBar position="fixed" sx={{
            zIndex: theme.zIndex.drawer + 1,
            width: `calc(100% - ${showSidebar ? (sidebarOpen ? drawerWidth : 0) : 0}px)`,
            marginLeft: `${showSidebar ? (sidebarOpen ? drawerWidth : 0) : 0}px`,
            transition: theme.transitions.create(['margin', 'width'], {
              easing: theme.transitions.easing.sharp,
              duration: theme.transitions.duration.leavingScreen,
            }),
          }}>
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
              {/* Show Search TextField only if not on the signin page */}
              {location.pathname !== '/signin' && (
                <Box sx={{ position: 'relative', width: 400 }}>
                  <TextField
                    variant="outlined"
                    placeholder="Search Stocks "
                    sx={{ width: '100%', bgcolor: 'background.paper', borderRadius: 1 }}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <SearchIcon />
                        </InputAdornment>
                      ),
                    }}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                   /*  onFocus={() => setShowSuggestions(true)}*/ // Show suggestions on focus
                    onBlur={() => setTimeout(() => setShowSuggestions(false), 200)} // Hide suggestions on blur
                  />
                  {/* Suggestion Dropdown */}
                  {showSuggestions && (
                    <Paper sx={{
                      position: 'absolute',
                      width: '100%',
                      maxHeight: 200,
                      overflowY: 'auto',
                      zIndex: 10,
                    }}>
                   
                    </Paper>
                  )}
                </Box>
              )}
              <Box sx={{ flexGrow: 1 }} />
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
                    <MenuItem onClick={handleLogout}>Se Déconnecter</MenuItem>
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
        {showSidebar && <Sidebar open={sidebarOpen} onClose={toggleSidebar} />}
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 10,
            bgcolor: 'white',
            width: `calc(100% - ${showSidebar ? (sidebarOpen ? drawerWidth : 0) : 0}px)`,
            marginLeft: `${showSidebar ? (sidebarOpen ? drawerWidth : 0) : 0}px`,
            transition: theme.transitions.create(['margin', 'width'], {
              easing: theme.transitions.easing.sharp,
              duration: theme.transitions.duration.leavingScreen,
            }),
            marginTop: showAppBar ? '50px' : '0px',
            minHeight: '100vh',
          }}
        >
          
          {children}
        </Box>
      </Box>
    </ThemeProvider>
  );
}
