import React, { useState } from 'react';

function StockTrendButton() {
    const [symbol, setSymbol] = useState('IBM'); // Symbole par défaut
    const [trend, setTrend] = useState('');
    const [trendColor, setTrendColor] = useState('');
    const [loading, setLoading] = useState(false);

    const fetchStockTrend = async () => {
        setLoading(true);
        const response = await fetch(`http://localhost:5000/rsi_trend?symbol=${symbol}`);
        const data = await response.json();
        if (response.ok && data.trend) {
            setTrend(data.trend);
            // Définition de la couleur en fonction de la tendance
            switch(data.trend) {
                case 'Bullish':
                    setTrendColor('green');
                    break;
                case 'Bearish':
                    setTrendColor('red');
                    break;
                default:
                    setTrendColor('blue');
            }
        } else {
            setTrend('Failed to fetch stock trend.');
            setTrendColor('black');
        }
        setLoading(false);
    };

    // Styles pour le carreau qui affiche la tendance
    const trendStyle = {
        padding: '1000000px',
        backgroundColor: trendColor,
        color: 'white',
        fontWeight: 'bold',
        display: 'inline-block',
        borderRadius: '5px'
    };

    return (
        <div>
            <input 
                type="text" 
                value={symbol} 
                onChange={(e) => setSymbol(e.target.value)} 
                placeholder="Enter Stock Symbol" 
            />
            <button onClick={fetchStockTrend} disabled={loading}>
                {loading ? 'Loading...' : 'Get Stock Trend'}
            </button>
            <div style={trendStyle}>{trend}</div>
        </div>
    );
}

export default StockTrendButton;
