import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import PageStockHeader from '../PageStockHeader/PageStockHeader';
import { useParams } from 'react-router-dom';
import {
    Box,
    Card,
    CardContent,
    Typography,
    Grid,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableRow,
    Paper,
    Divider,
    TableHead,
} from '@mui/material';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import PercentIcon from '@mui/icons-material/Percent';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';

// Register ChartJS elements
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const FinancialsPage = () => {
    const [financialData, setFinancialData] = useState(null);
    const [error, setError] = useState(null);
    const { tickerName } = useParams();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/financials', { params: { ticker: tickerName } });
                setFinancialData(response.data);
            } catch (err) {
                setError("Could not fetch financial data.");
            }
        };
        fetchData();
    }, [tickerName]);

    if (error) return <Typography color="error">{error}</Typography>;
    if (!financialData) return <Typography>Loading...</Typography>;

    // Helper functions for formatting
    const formatPercentage = (value) => (value ? `${(value * 100).toFixed(2)}%` : "N/A");
    const formatCurrency = (value) => (value ? `$${(value / 1e9).toFixed(2)}B` : "N/A");

    // Chart Data
    const revenueData = {
        labels: ['Revenue', 'EPS', 'P/E Ratio'],
        datasets: [
            {
                label: 'Key Financials',
                data: [
                    financialData.revenue || 0,
                    financialData.trailingPE || 0,
                    financialData.trailingPE || 0,
                ],
                backgroundColor: ['rgba(54, 162, 235, 0.6)', 'rgba(75, 192, 192, 0.6)', 'rgba(255, 99, 132, 0.6)'],
                borderColor: ['rgba(54, 162, 235, 1)', 'rgba(75, 192, 192, 1)', 'rgba(255, 99, 132, 1)'],
                borderWidth: 1,
            },
        ],
    };

    return (
        <Box sx={{ padding: 4, maxWidth: 1000, margin: 'auto' }}>
            <PageStockHeader />

            <Grid container spacing={3}>
                {/* Combined Financial Data Table */}
                <Grid item xs={12}>
                            <Typography variant="h6" color="primary" sx={{ mb: 2, display: 'flex', alignItems: 'center' }}>
                                <MonetizationOnIcon sx={{ color: 'blue', mr: 1 }} />
                                Financial Overview
                            </Typography>
                            <TableContainer component={Paper} variant="outlined" sx={{ boxShadow: 'none', borderRadius: 1 }}>
                                <Table size="small">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell colSpan={2} sx={{ fontWeight: 'bold', backgroundColor: '#f0f0f0', textAlign: 'center' }}>
                                                Key Financials
                                            </TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        <TableRow hover>
                                            <TableCell>Revenue</TableCell>
                                            <TableCell align="right">{formatCurrency(financialData.revenue)}</TableCell>
                                        </TableRow>
                                        <TableRow hover>
                                            <TableCell>EPS</TableCell>
                                            <TableCell align="right">{financialData.trailingPE || "N/A"}</TableCell>
                                        </TableRow>
                                        <TableRow hover>
                                            <TableCell>P/E Ratio</TableCell>
                                            <TableCell align="right">{financialData.trailingPE || "N/A"}</TableCell>
                                        </TableRow>
                                        <TableRow hover>
                                            <TableCell>Market Cap</TableCell>
                                            <TableCell align="right">{formatCurrency(financialData.marketCap)}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell colSpan={2} sx={{ fontWeight: 'bold', backgroundColor: '#f0f0f0', textAlign: 'center' }}>
                                                <PercentIcon sx={{ color: 'gray', mr: 1 }} />
                                                Dividend Information
                                            </TableCell>
                                        </TableRow>
                                        <TableRow hover>
                                            <TableCell>Dividend Yield</TableCell>
                                            <TableCell align="right">{formatPercentage(financialData.dividendYield)}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell colSpan={2} sx={{ fontWeight: 'bold', backgroundColor: '#f0f0f0', textAlign: 'center' }}>
                                                <TrendingUpIcon sx={{ color: 'gray', mr: 1 }} />
                                                Financial Ratios
                                            </TableCell>
                                        </TableRow>
                                        <TableRow hover>
                                            <TableCell>Debt to Equity</TableCell>
                                            <TableCell align="right">{financialData.debtToEquity || "N/A"}</TableCell>
                                        </TableRow>
                                        <TableRow hover>
                                            <TableCell>Return on Equity</TableCell>
                                            <TableCell align="right">{formatPercentage(financialData.returnOnEquity)}</TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </TableContainer>
                      
                </Grid>

                {/* Revenue Chart */}
                <Grid item xs={12}>
                      
                            <Typography variant="h6" gutterBottom color="primary">Revenue, EPS, and P/E Ratio</Typography>
                            <Bar data={revenueData} options={{ responsive: true }} />
                       
                   
                </Grid>
            </Grid>
        </Box>
    );
};

export default FinancialsPage;
