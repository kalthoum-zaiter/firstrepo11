import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Grid, Paper, Typography, Link, Divider, Card, CardContent, CardMedia } from '@mui/material';

function StockNews() {
    const [newsItems, setNewsItems] = useState([]);
    const { tickerName } = useParams();

    useEffect(() => {
        const fetchNews = async (ticker) => {
            try {
                const response = await axios.get(`http://localhost:5000/api/news`, { params: { ticker: ticker } });
                setNewsItems(response.data.slice(0, 6));
            } catch (error) {
                console.error('Error fetching news:', error);
                setNewsItems([]);
            }
        };

        if (tickerName) {
            fetchNews(tickerName);
        }
    }, [tickerName]);

    return (
        <Grid item xs={12} md={6}>
            <Paper elevation={3} sx={{ p: 2, overflow: 'auto', height: '100%' }}>
                {newsItems.length > 0 ? newsItems.map((item, index) => (
                    <React.Fragment key={index}>
                        <Card sx={{ display: 'flex', marginBottom: 2, padding: 2 }}>
                            <CardMedia
                                component="img"
                                sx={{ width: 88, height: 88 }}
                                image={item.imageUrl || 'path/to/default-image.jpg'}
                                alt="news image"
                            />
                            <CardContent sx={{ flex: '1 0 auto' }}>
                                <Typography variant="subtitle2" noWrap>
                                    <Link href={item.link} target="_blank" rel="noopener" underline="hover">
                                        {item.title}
                                    </Link>
                                </Typography>
                                <Typography variant="body2" color="textSecondary" noWrap>
                                    {item.summary}
                                </Typography>
                                <Typography variant="caption" color="textSecondary">
                                    {new Date(item.published).toLocaleDateString()} - {item.source}
                                </Typography>
                            </CardContent>
                        </Card>
                        {index !== newsItems.length - 1 && <Divider />}
                    </React.Fragment>
                )) : <Typography variant="subtitle1">No news available for {tickerName || 'the selected ticker'}.</Typography>}
            </Paper>
        </Grid>
    );
}

export default StockNews;
