import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { Box, Typography, Divider } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import QueryStatsIcon from '@mui/icons-material/QueryStats';
import ChatIcon from '@mui/icons-material/Chat';
import NewspaperIcon from '@mui/icons-material/Newspaper';
import GroupIcon from '@mui/icons-material/Group';
import FacebookIcon from '@mui/icons-material/Facebook';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import EmailIcon from '@mui/icons-material/Email';
import PublicIcon from '@mui/icons-material/Public';
import SettingsIcon from '@mui/icons-material/Settings';

const drawerWidth = 240;
const collapsedWidth = 70;

const Sidebar = ({ open, onClose }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const sections = [
    {
      title: 'Main',
      items: [
        { text: 'Accueil', icon: <HomeIcon color="primary" /> },
        { text: 'Tendances du marché', icon: <QueryStatsIcon color="primary" /> },
      ],
    },
    {
      title: 'Portfolios & Lists',
      items: [
        { text: 'Portefeuilles', icon: <NewspaperIcon color="primary" /> },
        { text: 'Listes', icon: <EmailIcon color="primary" /> },
      ],
    },
    {
      title: 'Settings',
      items: [
        { text: 'Paramètres', icon: <SettingsIcon color="primary" /> },
      ],
    },
  ];

  const handleNavigate = (text) => {
    const pathSegment = text.replace(/[^A-Z0-9]+/ig, '').toLowerCase();
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
          backgroundColor: 'primary.main',
          color: 'white',
          overflowX: 'hidden',
        },
      }}
    >
      <Box sx={{ padding: 1, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
      </Box>
      <List>
        {sections.map((section, index) => (
          <React.Fragment key={index}>
            {index !== 0 && <Divider sx={{ backgroundColor: 'white', marginY: 2 }} />}
            {section.items.map(({ text, icon }) => (
              <ListItem key={text} disablePadding>
                <ListItemButton onClick={() => handleNavigate(text)}>
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
