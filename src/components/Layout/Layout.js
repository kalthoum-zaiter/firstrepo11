import React, { useState, useEffect } from 'react';
import { ThemeProvider, useTheme } from '@mui/material/styles';
import {
  AppBar, Box, Toolbar, MenuItem, Button, IconButton, TextField, InputAdornment,
  Typography, Avatar, Menu, MenuItem as DropdownMenuItem
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import Sidebar from '../SideBar/SideBar';
import PageStocks  from '../PageStocks/PageStocks'; // Import the StockDetails component

const drawerWidth = 240;

export default function Layout({ children, showSidebar, showAppBar, isAuthenticated, user }) {
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState(''); // Add state for search input
  const navigate = useNavigate();

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
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
              <TextField
                variant="outlined"
                placeholder="Search Stocks & Crypto"
                sx={{ flex: 1, bgcolor: 'background.paper', borderRadius: 1, width: 400 }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                }}
                value={searchQuery} // Bind the input value to the state
                onChange={(e) => setSearchQuery(e.target.value)} // Update the search query
              />
              <Box sx={{ flexGrow: 1 }} />
              {isAuthenticated && user ? (
                <>
                  <Typography variant="h6" sx={{ marginRight: 2 }}>{user.name}</Typography>
                  <IconButton
                    edge="end"
                    aria-label="account of current user"
                    aria-controls="primary-search-account-menu"
                    aria-haspopup="true"
                    onClick={handleProfileMenuOpen}
                    color="inherit"
                  >
                    <Avatar alt={user.name} src={user.avatarUrl || ''} />
                  </IconButton>
                  <Menu
                    anchorEl={anchorEl}
                    anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                    keepMounted
                    transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                    open={Boolean(anchorEl)}
                    onClose={handleMenuClose}
                  >
                    <DropdownMenuItem onClick={() => navigate('/profile')}>Profile</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => {
                      handleMenuClose();
                      // Add your logout logic here
                    }}>Logout</DropdownMenuItem>
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
            p: 3,
            bgcolor: 'white',
            width: `calc(100% - ${showSidebar ? (sidebarOpen ? drawerWidth : 0) : 0}px)`,
            marginLeft: `${showSidebar ? (sidebarOpen ? drawerWidth : 0) : 0}px`,
            transition: theme.transitions.create(['margin', 'width'], {
              easing: theme.transitions.easing.sharp,
              duration: theme.transitions.duration.leavingScreen,
            }),
            marginTop: showAppBar ? '64px' : '0px',
            minHeight: '100vh',
          }}
        >
          {/* Render the StockDetails component and pass the search query */}
          <PageStocks query={searchQuery} />
          {children}
        </Box>
      </Box>
    </ThemeProvider>
  );
}
