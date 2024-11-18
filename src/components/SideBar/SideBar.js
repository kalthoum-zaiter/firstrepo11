import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { Box, Divider } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import NewspaperIcon from '@mui/icons-material/Newspaper';
import SettingsIcon from '@mui/icons-material/Settings';
import StockInSGHT from '../Layout/StockInSGHT.png'; // Your logo image

const drawerWidth = 240;

const Sidebar = ({ open, onClose }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const sections = [
    { title: 'Main', items: [{ text: 'Accueil', icon: <HomeIcon /> }] },
    { title: 'Portfolios & Lists', items: [{ text: 'Portefeuilles', icon: <NewspaperIcon /> }] },
    { title: 'Settings', items: [{ text: 'Paramètres', icon: <SettingsIcon /> }] },
  ];

  const handleNavigate = (text) => {
    const pathSegment = text.replace(/[^A-Z0-9]+/gi, '').toLowerCase();
    navigate(`/${pathSegment}`);
  };

  return (
    <Drawer
      variant="temporary" // Change to temporary to overlay sidebar
      open={open}
      onClose={onClose}
      sx={{
        width: drawerWidth,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
          color: 'white',
          overflowX: 'hidden',
          backgroundColor: 'primary.main',
        },
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', p: 2 }}>
        <img src={StockInSGHT} alt="Logo" style={{ width: '150px', height: 'auto' }} />
      </Box>
      <List>
        {sections.map((section, index) => (
          <React.Fragment key={index}>
            {index !== 0 && <Divider sx={{ backgroundColor: 'white', marginY: 2 }} />}
            {section.items.map(({ text, icon }) => (
              <ListItem key={text} disablePadding>
                <ListItemButton
                  onClick={() => handleNavigate(text)}
                  sx={{
                    color: location.pathname.includes(text.replace(/[^A-Z0-9]+/gi, '').toLowerCase()) ? '#ddd' : '#aaa',
                    '&:hover': { backgroundColor: '#444' },
                    '& .MuiListItemIcon-root': {
                      color: location.pathname.includes(text.replace(/[^A-Z0-9]+/gi, '').toLowerCase()) ? '#ddd' : '#aaa',
                    },
                  }}
                >
                  <ListItemIcon sx={{ justifyContent: 'center', minWidth: 'auto' }}>
                    {icon}
                  </ListItemIcon>
                  <ListItemText primary={text} />
                </ListItemButton>
              </ListItem>
            ))}
          </React.Fragment>
        ))}
      </List>
    </Drawer>
  );
};

export default Sidebar;
