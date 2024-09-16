import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import axios from 'axios';
import { CircularProgress, Box } from '@mui/material';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  TimeScale
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  TimeScale,
  Title,
  Tooltip,
  Legend
);

const RSIChart = ({ symbol }) => {
  const [chartData, setChartData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRSIData = async () => {
      try {
        // Update the URL to your Flask endpoint
        const response = await axios.get(`http://localhost:5000/rsi`, { params: { symbol: symbol } });
        if (response.data && response.data['Technical Analysis: RSI']) {
          const rsiValues = response.data['Technical Analysis: RSI'];
          const labels = Object.keys(rsiValues).sort();
          const data = labels.map(label => ({
            x: label,
            y: parseFloat(rsiValues[label].RSI)
          }));
          setChartData({
            labels,
            datasets: [{
              label: 'RSI',
              data,
              borderColor: 'rgba(75,192,192,1)',
              backgroundColor: 'rgba(75,192,192,0.2)',
              fill: true,
              tension: 0.4
            }]
          });
        }
        setLoading(false);
      } catch (error) {
        console.error('Error fetching RSI data:', error);
        setLoading(false);
      }
    };

    fetchRSIData();
  }, [symbol]);

  if (loading) {
    return <Box display="flex" justifyContent="center" alignItems="center" height="100%">
      <CircularProgress />
    </Box>;
  }

  if (!chartData) {
    return <Box display="flex" justifyContent="center" alignItems="center" height="100%">
      <p>No RSI data available.</p>
    </Box>;
  }

  const options = {
    scales: {
      x: {
        type: 'time',
        time: {
          unit: 'month',
          tooltipFormat: 'MMM D, YYYY'
        }
      },
      y: {
        beginAtZero: false,
        suggestedMax: 100
      }
    },
    plugins: {
      legend: {
        display: false
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            return `RSI: ${context.raw.y.toFixed(2)}`;
          }
        }
      }
    },
    maintainAspectRatio: false
  };

  return <Line data={chartData} options={options} height={400} />;
};

export default RSIChart;
