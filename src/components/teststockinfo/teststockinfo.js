import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';  // Import useLocation
import { Grid, Typography, Divider,  Box } from '@mui/material';
import axios from 'axios';
import NomCompletStock from '../NomCompletStock/NomCompletStock';

const CompanyInfo = ({ tickerName }) => {
    const [companyData, setCompanyData] = useState({});
    const [loading, setLoading] = useState(true);
    const location = useLocation();  // Use location to access path

    // Check if the current path is the overview
    const isOverview = location.pathname === `/stock/${tickerName}/overview`;

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const stockRes = await axios.get('http://localhost:5000/api/stock', { params: { ticker: tickerName } });

                setCompanyData({
                    price: stockRes.data.price,
                    volume: stockRes.data.volume,
                    description: stockRes.data.description,
                    sector: stockRes.data.sector
                });
            } catch (error) {
                console.error('Error fetching data:', error);
                setCompanyData({ error: 'Data not available' });
            }
            setLoading(false);
        };

        fetchData();
    }, [tickerName]);

   

    return (
        <Grid container sx={{ maxWidth: 345, margin: 'auto', mt: 5 }}>
            <Grid item xs={12}>
                <Typography variant="h5" component="div" sx={{ fontWeight: 'bold', mb: 2 }}>
                    About <NomCompletStock></NomCompletStock>
                </Typography>
                <Divider />

                {isOverview && companyData.description && (
                    <>
                        <Typography variant="body2" sx={{ mt: 2 }}>
                            {companyData.description}
                        </Typography>
                        <Divider />
                    </>
                )}

                <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
                    <Typography variant="subtitle1">
                        Current Price
                    </Typography>
                    <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                        ${companyData.price || 'N/A'}
                    </Typography>
                </Box>
                <Divider />

                <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
                    <Typography variant="subtitle1">
                        Volume
                    </Typography>
                    <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                        {companyData.volume || 'N/A'}
                    </Typography>
                </Box>
            </Grid>
        </Grid>
    );
};

export default CompanyInfo;
