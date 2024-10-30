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
import EmailIcon from '@mui/icons-material/Email';
import SettingsIcon from '@mui/icons-material/Settings';

const drawerWidth = 240;
const collapsedWidth = 70;

const Sidebar = ({ open, onClose }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const sections = [
    {
      title: 'Main',
      items: [{ text: 'Accueil', icon: <HomeIcon /> }],
    },
    {
      title: 'Portfolios & Lists',
      items: [
        { text: 'Portefeuilles', icon: <NewspaperIcon /> },
      ],
    },
    {
      title: 'Settings',
      items: [{ text: 'Paramètres', icon: <SettingsIcon /> }],
    },
  ];

  const handleNavigate = (text) => {
    const pathSegment = text.replace(/[^A-Z0-9]+/gi, '').toLowerCase();
    navigate(`/${pathSegment}`);
  };

  return (
    <Drawer
      variant="persistent"
      open={open}
      onClose={onClose}
      sx={{
        width: open ? drawerWidth : collapsedWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: open ? drawerWidth : collapsedWidth,
          boxSizing: 'border-box',
          color: 'white',
          overflowX: 'hidden',
          backgroundColor: 'primary.main'
 
        },
      }}
    >
      <Box sx={{ padding: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
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
                    color: location.pathname.includes(text.replace(/[^A-Z0-9]+/gi, '').toLowerCase()) ? '#ddd' : '#aaa', // Light gray active color
                    '&:hover': {
                      backgroundColor: '#444', // Slightly lighter gray on hover
                    },
                    '& .MuiListItemIcon-root': {
                      color: location.pathname.includes(text.replace(/[^A-Z0-9]+/gi, '').toLowerCase()) ? '#ddd' : '#aaa', // Icons follow active color
                    },
                  }}
                >
                  <ListItemIcon sx={{ justifyContent: 'center', minWidth: 'auto' }}>
                    {icon}
                  </ListItemIcon>
                  <ListItemText primary={text} sx={{ display: open ? 'block' : 'none' }} />
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
