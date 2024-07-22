import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
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

const Sidebar = ({ open, onClose }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const path = location.pathname;

  // Extracting tickerName from the path dynamically
  const tickerName = path.match(/\/stock\/([^\/]+)/)?.[1];

  const content = tickerName ? [
    'Overview', 'AI Stock Analysis', 'Price Prediction',  'Sentiment', 'Technical Analysis','Earnings',
    'Congress Trading', 'Insider Transactions', 'Job Posts',
    'Webpage traffic', 'Employee Rating', 'Google Trends', 'Patents',
    'App Downloads', 'Customer reviews', 'Business Outlook', 'Linkedin Employees',
    'Mentions', 'Followers'
  ] : [
    'Top Stocks', 'Data Bits', 'Reddit Mentions', 'News Mentions',
    '4chan Mentions', 'Instagram Followers', 'Facebook Followers', 'TikTok Followers',
    'Threads Followers', 'Webpage Traffic'
  ];

  const icons = [
    <HomeIcon color="primary" />, <QueryStatsIcon color="primary" />, <ChatIcon color="primary" />,
    <NewspaperIcon color="primary" />, <EmailIcon color="primary" />, <GroupIcon color="primary" />,
    <FacebookIcon color="primary" />, <MusicNoteIcon color="primary" />, <EmailIcon color="primary" />,
    <PublicIcon color="primary" />
  ];

  const handleNavigate = (text) => {
    const pathSegment = text.replace(/[^A-Z0-9]+/ig, '').toLowerCase();
    const fullPath = `/stock/${tickerName}/${pathSegment}`;
    navigate(fullPath);
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
          overflowY: 'hidden',
        },
      }}
    >
      <Box sx={{ padding: 1, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Typography variant="h6" sx={{ color: 'white' }}></Typography>
      </Box>
      <List>
        {content.map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton onClick={() => handleNavigate(text)}>
              <ListItemIcon sx={{ justifyContent: 'center', minWidth: 'auto' }}>
                {icons[index % icons.length]}
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
