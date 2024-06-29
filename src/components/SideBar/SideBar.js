import React from 'react';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { Box } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import QueryStatsIcon from '@mui/icons-material/QueryStats';
import ChatIcon from '@mui/icons-material/Chat';
import NewspaperIcon from '@mui/icons-material/Newspaper';
import GroupIcon from '@mui/icons-material/Group';
import FacebookIcon from '@mui/icons-material/Facebook';
import MusicNoteIcon from '@mui/icons-material/MusicNote';  // Using MusicNoteIcon as a replacement for TikTok
import EmailIcon from '@mui/icons-material/Email';
import PublicIcon from '@mui/icons-material/Public';
import trade from './ASSETS/trade.jpg';

const drawerWidth = 240;

const Sidebar = ({ open, onClose }) => {
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
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
          backgroundColor: 'primary.main',
          color: 'white'
        },
      }}
    >
     
      <List>
        {['Top Stocks', 'Data Bits', 'Reddit Mentions', 'News Mentions', '4chan Mentions', 'Instagram Followers', 'Facebook Followers', 'TikTok Followers', 'Threads Followers', 'Webpage Traffic'].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemText primary={text} sx={{ display: open ? 'block' : 'none', flexGrow: 1 }} />
              <ListItemIcon sx={{ justifyContent: 'flex-end', color: 'white' }}>
                {icons[index]}
              </ListItemIcon>
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};

export default Sidebar;
