import React, { useState, useEffect } from 'react';
import { Typography, Grid, Divider, Box, CircularProgress, Paper } from '@mui/material';
import { Bar, Line, Pie } from 'react-chartjs-2';
import { Chart, ArcElement, BarElement, LineElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import StockHeader from '../PageStockHeader/PageStockHeader';

// Enregistrer les éléments nécessaires dans Chart.js
Chart.register(ArcElement, BarElement, LineElement, CategoryScale, LinearScale, Tooltip, Legend);

// Composant principal de la page de prévisions
const ForecastPage = () => {
    const [forecastData, setForecastData] = useState(null);
    const [predictionResult, setPredictionResult] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [loadingPrediction, setLoadingPrediction] = useState(false);
    const { tickerName } = useParams();

    // Fonction pour récupérer les données de prévision
    const fetchForecastData = async (ticker) => {
        try {
            const response = await axios.get('http://127.0.0.1:5000/api/forecast', { params: { ticker } });
            setForecastData(response.data);
            setLoading(false);
        } catch (error) {
            console.error("Failed to fetch forecast data:", error);
            setError("Failed to fetch forecast data.");
            setLoading(false);
        }
    };

    // Fonction pour récupérer les prédictions de sentiment
    const fetchPrediction = async (symbol) => {
        setLoadingPrediction(true);
        try {
            const response = await fetch('http://localhost:5000/predictSentiment', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ symbol }),
            });

            if (response.ok) {
                const result = await response.json();
                setPredictionResult(result);
                setError(null);
            } else {
                const errorData = await response.json();
                setError(errorData.error || 'An error occurred');
                setPredictionResult(null);
            }
        } catch (err) {
            setError('Failed to fetch data. Please try again.');
            setPredictionResult(null);
        } finally {
            setLoadingPrediction(false);
        }
    };

    // Charger les données lors du montage du composant
    useEffect(() => {
        if (tickerName) {
            fetchForecastData(tickerName);
            fetchPrediction(tickerName);
        }
    }, [tickerName]);

    if (loading) return <CircularProgress size={40} />;
    if (error) return <Typography color="error">{error}</Typography>;

    const { eps = [], revenue = [], price_target = {}, analyst_breakdown = [] } = forecastData || {};

    // Configurer les données pour les graphiques
    const epsChartData = {
        labels: eps.map((item) => item.label),
        datasets: [
            {
                label: 'Prévision EPS',
                data: eps.map((item) => item.values[0]),
                backgroundColor: 'rgba(54, 162, 235, 0.6)',
            },
        ],
    };

    const revenueChartData = {
        labels: revenue.map((item) => item.label),
        datasets: [
            {
                label: 'Prévision de Revenu',
                data: revenue.map((item) => item.values[0]),
                backgroundColor: 'rgba(100, 149, 237, 0.6)',
            },
        ],
    };

    const priceTargetData = {
        labels: ['Actuel', 'Moyen', 'Haut', 'Bas'],
        datasets: [
            {
                label: 'Objectif de Prix',
                data: [price_target.current, price_target.average, price_target.high, price_target.low],
                borderColor: 'rgba(70, 130, 180, 1)',
                backgroundColor: 'rgba(70, 130, 180, 0.3)',
                fill: true,
            },
        ],
    };

    const analystChartData = {
        labels: analyst_breakdown.map((item) => item.label),
        datasets: [
            {
                data: analyst_breakdown.map((item) => item.count),
                backgroundColor: ['#89CFF0', '#4682B4', '#B0E0E6', '#6495ED'],
                hoverBackgroundColor: ['#A9CCE3', '#5DADE2', '#AED6F1', '#3498DB'],
            },
        ],
    };

    return (
        <div style={{ width: '90%', margin: 'auto', paddingTop: '2rem' }}>
            {/* Section Header pour les informations de l'action */}
            <StockHeader />

            <Grid container spacing={4}>
                {/* Section pour l'affichage du prix cible prédictif */}
                <Grid item xs={12} md={6} style={{ height: 300 }}>
                    <Typography variant="h5" style={{ marginTop: '2rem', marginBottom: '1rem', color: '#1976d2' }}>
                        Prévisions Financières pour {tickerName}
                    </Typography>

                    <Paper elevation={3} sx={{ padding: 2, marginBottom: 2, textAlign: 'center' }}>
                        {loadingPrediction ? (
                            <CircularProgress />
                        ) : predictionResult ? (
                            <>
                                <Typography variant="h6">Prix Cible Prédictif</Typography>
                                <Typography variant="h5" color="primary" sx={{ mt: 1 }}>
                                    {predictionResult.prediction} €
                                </Typography>
                            </>
                        ) : (
                            error && <Typography color="error">{error}</Typography>
                        )}
                    </Paper>
                </Grid>

                {/* Section pour le graphique de la recommandation des analystes */}
                <Grid item xs={12} md={6} style={{ textAlign: 'center', height: 300 }}>
                    <Typography variant="h6" style={{ marginBottom: '1rem' }}>
                        Recommandation des Analystes
                    </Typography>
                    <Pie data={analystChartData} options={{ responsive: true, maintainAspectRatio: false }} height={300} />
                </Grid>

                {/* Section pour le graphique de la prévision EPS */}
                <Grid item xs={12} md={6} style={{ height: 300 }} sx={{ marginBottom: '20px' }}>
                    <Typography variant="h6" style={{ marginBottom: '1rem' }}>
                        Prévision EPS
                    </Typography>
                    <Bar data={epsChartData} options={{ responsive: true, maintainAspectRatio: false }} height={300} />
                </Grid>

                {/* Section pour le graphique de la prévision de revenu */}
                <Grid item xs={12} md={6} style={{ height: 300 }}  sx={{ marginBottom: '20px' }}>
                    <Typography variant="h6" style={{ marginBottom: '1rem' }}>
                        Prévision de Revenu
                    </Typography>
                    <Bar data={revenueChartData} options={{ responsive: true, maintainAspectRatio: false }} height={300} />
                </Grid>

                {/* Section pour le graphique de l'objectif de prix */}
         <Grid item xs={12} sx={{ marginTop: '20px' }} style={{ height: 300 }}>
             <Typography variant="h6" style={{ marginBottom: '1rem' }}>
             Objectif de Prix
            </Typography>
             <Line data={priceTargetData} options={{ responsive: true, maintainAspectRatio: false }} height={300} />
        </Grid>

            </Grid>
        </div>
    );
};

export default ForecastPage;
