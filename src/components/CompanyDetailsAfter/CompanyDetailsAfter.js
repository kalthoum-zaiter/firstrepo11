import React, { useEffect, useState } from 'react';
import { Box, Typography, Grid, CircularProgress, Divider } from '@mui/material';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import moment from 'moment';

const Company = () => {
  const { tickerName } = useParams();  // Extract ticker from URL parameters
  const [newsData, setNewsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNews = async (ticker) => {
      try {
        const response = await axios.get('http://localhost:5000/api/news', {
          params: { ticker }
        });
        setNewsData(response.data);
      } catch (err) {
        setError('Failed to fetch news');
      } finally {
        setLoading(false);
      }
    };

    if (tickerName) {
      fetchNews(tickerName);
    }
  }, [tickerName]);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ textAlign: 'center', mt: 4 }}>
        <Typography color="error">{error}</Typography>
      </Box>
    );
  }

  if (!newsData.length) {
    return (
      <Box sx={{ textAlign: 'center', mt: 4 }}>
        <Typography>No news available for {tickerName}</Typography>
      </Box>
    );
  }

  const timeSincePublication = (publishedDate) => {
    const now = moment();
    const published = moment(publishedDate);
    const duration = moment.duration(now.diff(published));
    const hours = duration.asHours();

    if (hours < 24) {
      return `${Math.floor(hours)} hours ago`;
    } else {
      return `${Math.floor(hours / 24)} days ago`;
    }
  };

  return (
    <Box sx={{ width: '90%', margin: 'auto', mt: 4 }}>
      <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
        Actualités
      </Typography>
      <Grid container spacing={2}>
        {newsData.map((newsItem, index) => (
          <Grid item xs={12} key={index}>
            <Typography variant="body2" sx={{ color: '#888', mb: 1 }}>
              {newsItem.source} • {timeSincePublication(newsItem.published)}
            </Typography>
            <Typography
              variant="body1"
              sx={{ fontWeight: 'bold', mb: 1, cursor: 'pointer' }}
              onClick={() => window.open(newsItem.link, '_blank')}
            >
              {newsItem.title}
            </Typography>
            {index < newsData.length - 1 && <Divider sx={{ my: 2 }} />}
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Company;