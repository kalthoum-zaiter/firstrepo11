import React, { useState, useEffect } from 'react';
import { 
    Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, 
    Button, Typography, TextField, Grid 
} from '@mui/material';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import SymbolInfo from '../SymbolInfo/SymbolInfo';

const TopStocks = () => {
    const [stocks, setStocks] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const apiKey = 'FFTZ06W4JZ6C7ZDS'; // Your API key
        const fetchStocks = async () => {
            try {
                const symbols = ['TPL', 'NVDA', 'PCTY', 'PLRX']; // Example stock symbols
                const promises = symbols.map(symbol =>
                    axios.get(`https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${apiKey}`)
                );
                const results = await Promise.all(promises);
                const stocksData = results.map(result => {
                    const globalQuote = result.data['Global Quote'];
                    return {
                        symbol: globalQuote ? globalQuote['01. symbol'] : 'N/A',
                        price: globalQuote ? globalQuote['05. price'] : 'N/A',
                        change: globalQuote ? globalQuote['09. change'] : 'N/A',
                        aiScore: Math.floor(Math.random() * 21) + 79 // Random AI Score for demonstration
                    };
                });
                setStocks(stocksData);
            } catch (error) {
                console.error('Error fetching stock data:', error);
            }
        };

        fetchStocks();
    }, []);

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };
    const handleGenerateAiReport = () => {
        navigate('/generateAiReport')
    };

    const filteredStocks = stocks.filter(stock =>
        stock.symbol.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleAddToPortfolio = () => {
        navigate('/portf');
    };
   
    const handleSymbolInfo = () => {
        navigate('/SymbolInfo');
    };
    return (
        <Grid
            container
            spacing={2}
            width="100%"
            sx={{
                display: 'flex',
                justifyContent: 'center',
                mt: 1,
                height: 'calc(100vh - 64px)', // Hauteur ajustée pour tenir compte de la hauteur de la barre d'application
                overflow: 'auto',
                scrollbarWidth: 'none',
                '&::-webkit-scrollbar': { display: 'none' },backgroundColor:'white'
            }}
        >
            <Grid item xs={12}>
                <Typography variant="h6" sx={{ paddingTop: 2, paddingBottom: 2, textAlign: 'left' }}>
                    Top Stocks
                    <br />
                    Our AI Score combines AI and Alternative data to assess a stock's mid-term market outperformance potential (6+ months) by analyzing multiple financial, technical and alternative data points. This predictive measure assigns a score from 0 to 100, representing the stock's performance and potential.
                    <br />
                    You can also filter on top stocks by sector / industry.
                </Typography>
                <TextField
                    variant="outlined"
                    placeholder="Search Stocks"
                    value={searchTerm}
                    onChange={handleSearchChange}
                    sx={{ marginBottom: 2 }}
                />
                <TableContainer component={Paper}>
                    <Table aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Company</TableCell>
                                <TableCell align="right">Price</TableCell>
                                <TableCell align="right">AI Score</TableCell>
                                <TableCell align="center">AI Analysis</TableCell>
                                <TableCell align="center">Add to Portfolio</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {filteredStocks.map((stock) => (
                                <TableRow key={stock.symbol}>
                                    <TableCell component="th" scope="row" onClick={handleSymbolInfo}>
                                        <Link to={`/stock/${stock.symbol}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                                            {stock.symbol}
                                        </Link>
                                    </TableCell>
                                    <TableCell align="right">{stock.price}</TableCell>
                                    <TableCell align="right">
                                        <Button variant="outlined" color="primary">{stock.aiScore}</Button>
                                    </TableCell>
                                    <TableCell align="center">
                                        <Button variant="contained" color="primary" onClick={handleGenerateAiReport}>Generate</Button>
                                    </TableCell>
                                    <TableCell align="center">
                                        <Button variant="contained" color="secondary" onClick={handleAddToPortfolio}>Add to Portfolio</Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Grid>
        </Grid>
    );
};

export default TopStocks;
