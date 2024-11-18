import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import PageStockHeader from '../PageStockHeader/PageStockHeader';
import { useParams } from 'react-router-dom';
import {
    Box,
    Typography,
    Grid,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableRow,
    Paper,
    CircularProgress,
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
    if (!financialData) return <CircularProgress color="primary" />;

    const formatPercentage = (value) => (value ? `${(value * 100).toFixed(2)}%` : "N/A");
    const formatCurrency = (value) => (value ? `$${(value / 1e9).toFixed(2)}B` : "N/A");

    // Chart Data and Configuration
    const revenueData = {
        labels: ['Revenue', 'Net Income', 'P/E Ratio'],
        datasets: [
            {
                label: 'Revenue',
                data: [financialData.revenue || 0, null, null],
                backgroundColor: 'rgba(54, 162, 235, 0.6)',
                yAxisID: 'y1',
            },
            {
                label: 'Net Income',
                data: [null, financialData.netIncome || 0, null],
                backgroundColor: 'rgba(75, 192, 192, 0.6)',
                yAxisID: 'y2',
            },
            {
                label: 'P/E Ratio',
                data: [null, null, financialData.trailingPE || 0],
                backgroundColor: 'rgba(255, 99, 132, 0.6)',
                yAxisID: 'y3',
            },
        ],
    };

    const options = {
        responsive: true,
        scales: {
            y1: {
                type: 'linear',
                position: 'left',
                title: {
                    display: true,
                    text: 'Revenue (Billions)',
                },
                ticks: {
                    callback: (value) => `$${value / 1e9}B`,
                },
                suggestedMin: 0,
                suggestedMax: financialData.revenue ? financialData.revenue * 1.2 : 1,
            },
            y2: {
                type: 'linear',
                position: 'right',
                title: {
                    display: true,
                    text: 'Net Income (Billions)',
                },
                ticks: {
                    callback: (value) => `$${value / 1e9}B`,
                },
                suggestedMin: 0,
                suggestedMax: financialData.netIncome ? financialData.netIncome * 1.2 : 1,
                grid: { drawOnChartArea: false },
            },
            y3: {
                type: 'linear',
                position: 'right',
                title: {
                    display: true,
                    text: 'P/E Ratio',
                },
                ticks: {
                    callback: (value) => value.toFixed(2),
                },
                suggestedMin: 0,
                suggestedMax: financialData.trailingPE ? financialData.trailingPE * 1.5 : 1,
                grid: { drawOnChartArea: false },
            },
        },
    };

    return (
        <Box sx={{ padding: 4, maxWidth: 1000, margin: 'auto' }}>
            <PageStockHeader />

            <Grid container spacing={3}>
                {/* Financial Data Table */}
                <Grid item xs={12}>
                    <Typography variant="h6" color="primary" sx={{ mb: 2, display: 'flex', alignItems: 'center' }}>
                        <MonetizationOnIcon sx={{ color: 'blue', mr: 1 }} />
                        Financial Overview
                    </Typography>
                    <TableContainer component={Paper} variant="outlined" sx={{ boxShadow: 'none', borderRadius: 1 }}>
                        <Table size="small">
                            <TableBody>
                                <TableRow>
                                    <TableCell colSpan={2} sx={{ fontWeight: 'bold', backgroundColor: '#f0f0f0', textAlign: 'center' }}>
                                        Key Financials
                                    </TableCell>
                                </TableRow>
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
                    <Typography variant="h6" gutterBottom color="primary">Revenue, Net Income, and P/E Ratio</Typography>
                    <Bar data={revenueData} options={options} />
                </Grid>
            </Grid>
        </Box>
    );
};

export default FinancialsPage;
