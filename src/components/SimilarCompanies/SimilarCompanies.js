import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableRow, Paper, Avatar, Typography } from '@mui/material';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

function SimilarCompaniesTable() {
    const companies = [
        { name: 'BILL Holdings', ticker: 'BILL', rsi: 23.99, change: -18.6, logo: 'path/to/logo1.png' },
        { name: 'Clearwater Analytics', ticker: 'CWAN', rsi: 69.61, change: -12.4, logo: 'path/to/logo2.png' },
        { name: 'Alarm.com', ticker: 'ALRM', rsi: 36.93, change: -15.4, logo: 'path/to/logo3.png' },
        { name: 'Par Technology', ticker: 'PAR', rsi: 30.16, change: -16.2, logo: 'path/to/logo4.png' },
        { name: 'Docebo', ticker: 'DCBO', rsi: 37.18, change: -8, logo: 'path/to/logo5.png' }
    ];

    return (
        <TableContainer component={Paper}>
            <Table>
                <TableBody>
                    {companies.map((company, index) => (
                        <TableRow key={index}>
                            <TableCell component="th" scope="row">
                                <Avatar src={company.logo} alt={company.ticker} sx={{ marginRight: 2 }} />
                                <Typography>{company.name}</Typography>
                                <Typography variant="caption" color="textSecondary">
                                    {company.ticker}
                                </Typography>
                            </TableCell>
                            <TableCell align="right">
                                {company.rsi.toFixed(2)}
                                {company.change > 0 ? (
                                    <ArrowDropUpIcon style={{ color: 'green' }} />
                                ) : (
                                    <ArrowDropDownIcon style={{ color: 'red' }} />
                                )}
                                {Math.abs(company.change)}%
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default SimilarCompaniesTable;
