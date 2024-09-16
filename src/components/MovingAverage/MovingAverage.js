import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

function MovingAveragesTable() {
    const rows = [
        { period: 'MA5', sma: 22.3, ema: 22.2 },
        { period: 'MA10', sma: 24.2, ema: 22.9 },
        { period: 'MA20', sma: 22.8, ema: 22.7 },
        { period: 'MA50', sma: 20.7, ema: 21.5 },
        { period: 'MA100', sma: 20.7, ema: 19.6 },
        { period: 'MA200', sma: 14.6, ema: 16.1 }
    ];

    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Period</TableCell>
                        <TableCell align="right">SMA</TableCell>
                        <TableCell align="right">EMA</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) => (
                        <TableRow
                            key={row.period}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell component="th" scope="row">
                                {row.period}
                            </TableCell>
                            <TableCell align="right">{row.sma}</TableCell>
                            <TableCell align="right">{row.ema}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default MovingAveragesTable;
