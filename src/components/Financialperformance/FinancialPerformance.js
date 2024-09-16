import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

function FinancialTable() {
  // Données du tableau
  const rows = [
    { quarter: "Q1 '24", revenue: '8.1M', costOfRevenue: '1.8M', grossProfit: '6.3M', netIncome: '-830,000', ebitda: '-620,000', eps: '-0.070' },
    { quarter: "Q4 '23", revenue: '7.9M', costOfRevenue: '1.7M', grossProfit: '6.2M', netIncome: '-530,000', ebitda: '-480,000', eps: '-0.040' },
    { quarter: "Q3 '23", revenue: '7.8M', costOfRevenue: '1.8M', grossProfit: '6.1M', netIncome: '-1.4M', ebitda: '-1.4M', eps: '-0.110' },
    { quarter: "Q2 '23", revenue: '7.8M', costOfRevenue: '1.8M', grossProfit: '6M', netIncome: '-2M', ebitda: '-2M', eps: '-0.170' },
    { quarter: "Q1 '23", revenue: '7.8M', costOfRevenue: '1.7M', grossProfit: '6.1M', netIncome: '-2M', ebitda: '-2M', eps: '-0.170' }
  ];

  return (
    <TableContainer component={Paper}>
      <Table aria-label="financial table">
        <TableHead>
          <TableRow>
            <TableCell>Quarter</TableCell>
            <TableCell align="right">Revenue</TableCell>
            <TableCell align="right">Cost of Revenue</TableCell>
            <TableCell align="right">Gross Profit</TableCell>
            <TableCell align="right">Net Income</TableCell>
            <TableCell align="right">EBITDA</TableCell>
            <TableCell align="right">EPS</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, index) => (
            <TableRow key={index}>
              <TableCell component="th" scope="row">
                {row.quarter}
              </TableCell>
              <TableCell align="right">{row.revenue}</TableCell>
              <TableCell align="right">{row.costOfRevenue}</TableCell>
              <TableCell align="right">{row.grossProfit}</TableCell>
              <TableCell align="right">{row.netIncome}</TableCell>
              <TableCell align="right">{row.ebitda}</TableCell>
              <TableCell align="right">{row.eps}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default FinancialTable;
