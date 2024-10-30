import React from 'react';
import { Box, Card, CardContent, Typography, Grid, Table, TableBody, TableCell, TableContainer, TableRow, Paper, Divider } from '@mui/material';
import { Bar, Line } from 'react-chartjs-2';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import ReactSpeedometer from 'react-d3-speedometer';

// Sample data for the charts and tables
const sampleEPSData = [
    { label: 'H1 21', type: 'reported', values: [4.63, 4.48] },
    { label: 'H2 21', type: 'reported', values: [4.19, 4.14] },
    { label: 'H1 22', type: 'reported', values: [6.00, 5.37] },
    { label: 'H2 22', type: 'reported', values: [5.26, 5.12] },
];

const sampleRevenueData = [
    { label: 'H1 21', type: 'reported', values: [15.2, 15.21] },
    { label: 'H2 21', type: 'reported', values: [17.09, 14.39] },
    { label: 'H1 22', type: 'reported', values: [18.37, 17.73] },
    { label: 'H2 22', type: 'reported', values: [19.89, 20.10] },
];

const sampleAnalystBreakdown = [
    { label: 'Strong Buy', count: 11 },
    { label: 'Buy', count: 2 },
    { label: 'Hold', count: 9 },
];

const epsChartData = {
    labels: sampleEPSData.map((item) => item.label),
    datasets: [
        {
            label: 'Reported',
            data: sampleEPSData.map((item) => item.values[0]),
            backgroundColor: 'rgba(54, 162, 235, 0.6)',
        },
        {
            label: 'Estimated',
            data: sampleEPSData.map((item) => item.values[1]),
            backgroundColor: 'rgba(201, 203, 207, 0.6)',
        },
    ],
};

const revenueChartData = {
    labels: sampleRevenueData.map((item) => item.label),
    datasets: [
        {
            label: 'Reported',
            data: sampleRevenueData.map((item) => item.values[0]),
            backgroundColor: 'rgba(255, 159, 64, 0.6)',
        },
        {
            label: 'Estimated',
            data: sampleRevenueData.map((item) => item.values[1]),
            backgroundColor: 'rgba(201, 203, 207, 0.6)',
        },
    ],
};

const priceTargetData = {
    labels: ['Current', 'Average', 'High', 'Low'],
    datasets: [
        {
            label: 'Price Target',
            data: [358.45, 411.3, 502.0, 325.0],
            borderColor: 'rgba(75, 192, 192, 1)',
            backgroundColor: 'rgba(75, 192, 192, 0.3)',
            fill: true,
        },
    ],
};

const ForecastPage = () => {
    return (
        <Box sx={{ padding: 4, maxWidth: 1200, margin: 'auto' }}>
            {/* Stock Overview Section */}
            <Box sx={{ mb: 4 }}>
                <Typography variant="h4">OR 358,45 EUR <TrendingUpIcon color="success" /></Typography>
                <Typography variant="subtitle2" color="textSecondary">+2,80 (+0,79%)</Typography>
            </Box>

            {/* Forecast Charts */}
            <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                    <Card>
                        <CardContent>
                            <Typography variant="h6">Bénéfice par action</Typography>
                            <Bar data={epsChartData} options={{ responsive: true }} />
                            <Divider sx={{ my: 2 }} />
                            <ForecastTable data={sampleEPSData} />
                        </CardContent>
                    </Card>
                </Grid>

                <Grid item xs={12} md={6}>
                    <Card>
                        <CardContent>
                            <Typography variant="h6">Revenu</Typography>
                            <Bar data={revenueChartData} options={{ responsive: true }} />
                            <Divider sx={{ my: 2 }} />
                            <ForecastTable data={sampleRevenueData} />
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>

            {/* Price Target Section */}
            <Box sx={{ mt: 4 }}>
                <Card>
                    <CardContent>
                        <Typography variant="h6">Prix cible</Typography>
                        <Line data={priceTargetData} options={{ responsive: true }} />
                        <Typography variant="subtitle2" color="textSecondary">
                            Les analystes estiment un maximum de 502,0 EUR et un minimum de 325,0 EUR.
                        </Typography>
                    </CardContent>
                </Card>
            </Box>

            {/* Analyst Recommendations */}
            <Box sx={{ mt: 4 }}>
                <Card>
                    <CardContent>
                        <Typography variant="h6">Note des analystes</Typography>
                        <Grid container spacing={2}>
                            <Grid item xs={12} md={6}>
                                <ReactSpeedometer
                                    maxValue={100}
                                    value={75} // Example value
                                    needleColor="steelblue"
                                    startColor="green"
                                    endColor="red"
                                    segments={5}
                                    width={200}
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <AnalystBreakdown data={sampleAnalystBreakdown} />
                            </Grid>
                        </Grid>
                    </CardContent>
                </Card>
            </Box>
        </Box>
    );
};

// ForecastTable Component for displaying forecast data tables
const ForecastTable = ({ data = [] }) => {
    return (
        <TableContainer component={Paper} sx={{ mt: 2 }}>
            <Table size="small">
                <TableBody>
                    {data.map((row, index) => (
                        <TableRow key={index} hover sx={{ backgroundColor: row.type === 'reported' ? '#e3f2fd' : '#f0f0f0' }}>
                            <TableCell>{row.label}</TableCell>
                            {row.values.map((value, i) => (
                                <TableCell key={i} align="right" sx={{ color: value < 0 ? 'red' : 'green' }}>
                                    {value}
                                </TableCell>
                            ))}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

// AnalystBreakdown Component for showing analyst recommendations
const AnalystBreakdown = ({ data }) => (
    <Box>
        {data.map((item, index) => (
            <Box key={index} sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography variant="body2">{item.label}</Typography>
                <Typography variant="body2" color={item.label === 'Strong Buy' ? 'green' : 'inherit'}>
                    {item.count}
                </Typography>
            </Box>
        ))}
    </Box>
);

export default ForecastPage;
