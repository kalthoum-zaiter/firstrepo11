import React, { useState } from 'react';
import { ThemeProvider, useTheme } from '@mui/material/styles';
import {
  AppBar, Box, Toolbar, MenuItem, Button, IconButton, TextField, InputAdornment,
  Typography
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Sidebar from '../SideBar/SideBar'; // Assurez-vous que ce chemin est correct

const drawerWidth = 240;
const pages = ['Datasets', 'Top Stocks', 'Stock Alerts', 'AI Stock Picks']; // Définissez les pages pour la navigation

export default function Layout({ children, showSidebar, showAppBar, isAuthenticated }) {
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(true); // Défini à true pour être ouvert initialement
  const [userName, setUserName] = useState('John Doe'); // Remplacer par l'état réel du nom d'utilisateur
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
      <Box sx={{ display: 'flex', width: '100%', backgroundColor: '#F0F0F2', overflow: 'auto' }}>
        {showAppBar && (
          <AppBar position="fixed" sx={{
            zIndex: theme.zIndex.drawer + 1,
            width: `calc(100% - ${showSidebar && sidebarOpen ? drawerWidth : 0}px)`,
            marginLeft: `${showSidebar && sidebarOpen ? drawerWidth : 0}px`,
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
              />
              {pages.map((page) => (
                <MenuItem
                  key={page}
                  sx={{ color: 'white', marginLeft: 2 }}
                  onClick={() => navigate(`/${page.replace(/\s+/g, '').toLowerCase()}`)}
                >
                  {page}
                </MenuItem>
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
    width: `calc(100% - ${showSidebar && sidebarOpen ? drawerWidth : 0}px)`,
    marginLeft: `${showSidebar && sidebarOpen ? drawerWidth : 0}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginTop: showAppBar ? '64px' : '0px',
  }}
>
  {/* Removed the fixed height and adjusted marginLeft, removed overflow: 'auto' */}
  <Box sx={{ display: 'flex', overflow: 'auto' }}>{children}
    
  </Box>
</Box>

      </Box>
    </ThemeProvider>
  );
}
