import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Typography, CircularProgress, Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { useParams } from 'react-router-dom';

const Financials = () => {  // Supprimé le prop 'ticker'
    const [financialData, setFinancialData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { tickerName } = useParams();  // Assurez-vous que votre route fournit 'tickerName'

    useEffect(() => {
        const fetchFinancials = async () => {
            setLoading(true);
            try {
                const response = await axios.get('http://127.0.0.1:5000/financials', {
                    params: { ticker: tickerName }
                });
                setFinancialData(response.data);
                setLoading(false);
            } catch (err) {
                setError(err.response ? err.response.data.error : 'Error fetching data');
                setLoading(false);
            }
        };

        if (tickerName) {  // Vérifiez que 'tickerName' est défini
            fetchFinancials();
        }
    }, [tickerName]);

    if (loading) {
        return <CircularProgress />;
    }

    if (error) {
        return <Typography color="error">{error}</Typography>;
    }

    const { income_statement, balance_sheet, cash_flow, history, info } = financialData;

    // Préparer les données pour les graphiques
    const historyData = Object.keys(history.Close).map(date => ({
        date,
        close: history.Close[date]
    })).reverse(); // Inverser pour avoir les dates croissantes

    return (
        <Box sx={{ padding: 2 }}>
            <Typography variant="h4" gutterBottom>
                Financials for {info.longName || tickerName}
            </Typography>

            <Grid container spacing={4}>
                {/* État des Résultats */}
                <Grid item xs={12}>
                    <Typography variant="h6">Income Statement</Typography>
                    <TableContainer component={Paper}>
                        <Table size="small">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Item</TableCell>
                                    {Object.keys(income_statement).map(date => (
                                        <TableCell key={date}>{date}</TableCell>
                                    ))}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {Object.keys(income_statement).map(item => (
                                    <TableRow key={item}>
                                        <TableCell>{item}</TableCell>
                                        {Object.keys(income_statement).map(date => (
                                            <TableCell key={date}>{income_statement[date][item]}</TableCell>
                                        ))}
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>

                {/* Bilan */}
                <Grid item xs={12}>
                    <Typography variant="h6">Balance Sheet</Typography>
                    <TableContainer component={Paper}>
                        <Table size="small">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Item</TableCell>
                                    {Object.keys(balance_sheet).map(date => (
                                        <TableCell key={date}>{date}</TableCell>
                                    ))}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {Object.keys(balance_sheet).map(item => (
                                    <TableRow key={item}>
                                        <TableCell>{item}</TableCell>
                                        {Object.keys(balance_sheet).map(date => (
                                            <TableCell key={date}>{balance_sheet[date][item]}</TableCell>
                                        ))}
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>

                {/* Flux de Trésorerie */}
                <Grid item xs={12}>
                    <Typography variant="h6">Cash Flow</Typography>
                    <TableContainer component={Paper}>
                        <Table size="small">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Item</TableCell>
                                    {Object.keys(cash_flow).map(date => (
                                        <TableCell key={date}>{date}</TableCell>
                                    ))}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {Object.keys(cash_flow).map(item => (
                                    <TableRow key={item}>
                                        <TableCell>{item}</TableCell>
                                        {Object.keys(cash_flow).map(date => (
                                            <TableCell key={date}>{cash_flow[date][item]}</TableCell>
                                        ))}
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>

                {/* Historique des Prix */}
                <Grid item xs={12}>
                    <Typography variant="h6">Price History (1 Year)</Typography>
                    <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={historyData}>
                            <CartesianGrid stroke="#ccc" />
                            <XAxis dataKey="date" tick={{ fontSize: 10 }} />
                            <YAxis />
                            <Tooltip />
                            <Line type="monotone" dataKey="close" stroke="#8884d8" />
                        </LineChart>
                    </ResponsiveContainer>
                </Grid>
            </Grid>
        </Box>
    );
};

export default Financials;
