import React from 'react';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu'; // Icon for toggling
import { Box, Typography } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import QueryStatsIcon from '@mui/icons-material/QueryStats';
import ChatIcon from '@mui/icons-material/Chat';
import NewspaperIcon from '@mui/icons-material/Newspaper';
import GroupIcon from '@mui/icons-material/Group';
import FacebookIcon from '@mui/icons-material/Facebook';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import EmailIcon from '@mui/icons-material/Email';
import PublicIcon from '@mui/icons-material/Public';

const drawerWidth = 240;
const collapsedWidth = 70;

const Sidebar = ({ open, onClose, toggleSidebar }) => {
  const icons = [
    <HomeIcon color="primary" />,
    <QueryStatsIcon color="primary" />,
    <ChatIcon color="primary" />,
    <NewspaperIcon color="primary" />,
    <EmailIcon color="primary" />,
    <GroupIcon color="primary" />,
    <FacebookIcon color="primary" />,
    <MusicNoteIcon color="primary" />,
    <EmailIcon color="primary" />,
    <PublicIcon color="primary" />
  ];

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
          overflowX: 'hidden', // Prevent horizontal scrollbar
        },
      }}
    >
      <Box sx={{ padding: 1, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Typography variant="h6" sx={{ color: 'white' }}></Typography>
        <IconButton onClick={toggleSidebar}>
          <MenuIcon color="inherit" />
        </IconButton>
      </Box>
      <List>
        {['Top Stocks', 'Data Bits', 'Reddit Mentions', 'News Mentions', '4chan Mentions', 'Instagram Followers', 'Facebook Followers', 'TikTok Followers', 'Threads Followers', 'Webpage Traffic'].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon sx={{ justifyContent: 'center', minWidth: 'auto' }}>
                {icons[index]}
              </ListItemIcon>
              <ListItemText primary={text} sx={{ display: open ? 'block' : 'none' }} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};

export default Sidebar;
