import React, { useState } from 'react';
import { ThemeProvider, useTheme } from '@mui/material/styles';
import {
  AppBar, Box, Toolbar, MenuItem, Button, Link, IconButton, Menu, TextField, InputAdornment,
  Paper, Grid, Typography
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Sidebar from '../SideBar/SideBar'; // Verify this path is correct

const drawerWidth = 240;
const pages = ['Datasets', 'Top Stocks', 'Stock Alerts', 'AI Stock Picks']; // Define the pages for navigation

export default function Layout({ children, showSidebar, showAppBar, isAuthenticated }) {
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(true); // Default to true to be open initially
  const [userName, setUserName] = useState('John Doe'); // Replace with actual user name state
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
      <Box sx={{ display: 'flex', width: '100%' , backgroundColor: '#F0F0F2' ,overflow:1}}>
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
              <Box   sx={{ marginLeft:21}}>
              <TextField
                variant="outlined"
                placeholder="Search Stocks & Crypto"
                sx={{ flex: 1, bgcolor: 'background.paper', borderRadius: 1 ,width:400 }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                }}
              />
              </Box>
              {pages.map((page) => (
                <MenuItem 
                  key={page}
                  sx={{ color: 'white', marginLeft: 2 }}
                  onClick={() => navigate(`/${page.replace(/\s+/g, '').toLowerCase()}`)}
                >
                  {page}
                </MenuItem >
              ))}
              <Box sx={{ flexGrow: 1 }} />
              {isAuthenticated ? (
                <>
                  <Typography variant="h6" sx={{ marginRight: 2 }}>{userName}</Typography>
                  <IconButton
                    edge="end"
                    aria-label="account of current user"
                    aria-controls="primary-search-account-menu"
                    aria-haspopup="true"
                    onClick={handleProfileMenuOpen}
                    color="inherit"
                  >
                    <AccountCircle />
                  </IconButton>
                </>
              ) : (
                <>
                  <Button color="neutral" onClick={() => navigate('/signin')} variant="soft">Sign In</Button>
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
            width: `calc(100% - ${sidebarOpen ? drawerWidth : -1000}px)`, // Adjust width dynamically
            marginLeft: `${sidebarOpen ? drawerWidth : -150}px`, // Adjust marginLeft dynamically
            transition: theme.transitions.create(['margin', 'width'], {
              easing: theme.transitions.easing.sharp,
              duration: theme.transitions.duration.leavingScreen,
            }),
            marginTop: showAppBar ? '64px' : '0px'
          }}
        >
     <Grid container spacing={0} width="100%" height="100%">
         <Grid item xs={12} sx={{ marginLeft: -10}}>
           <Box sx={{ display: 'flex',height:"100vh",
    overflow:1,scrollbarWidth: 'none',
    '&::-webkit-scrollbar': {
        width: '0',backgroundColor:'white'
      } }}>{children}</Box>
           
         </Grid>
    </Grid>
  
        
        </Box>
      </Box>
    </ThemeProvider>
  );
}
