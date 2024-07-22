import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import axios from 'axios';

// Enregistrement des composants nécessaires pour ChartJS
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const RSIChart = ({ symbol }) => {
  const [rsiData, setRsiData] = useState({
    labels: [],
    datasets: [
      {
        label: 'RSI',
        data: [],
        borderColor: 'rgb(75, 192, 192)',
        backgroundColor: 'rgba(75, 192, 192, 0.5)',
      },
    ],
  });

  useEffect(() => {
    const fetchRSI = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/rsi`, { params: { symbol } });
        const data = response.data;

        if (data && data['Technical Analysis: RSI']) {
          const rsiValues = data['Technical Analysis: RSI'];
          const labels = Object.keys(rsiValues).sort();
          const rsi = labels.map(label => parseFloat(rsiValues[label]['RSI']));

          setRsiData(prevData => ({
            ...prevData,
            labels,
            datasets: [
              {
                ...prevData.datasets[0],
                data: rsi
              }
            ]
          }));
        }
      } catch (error) {
        console.error('Error fetching RSI data:', error);
      }
    };

    fetchRSI();
  }, [symbol]);

  const options = {
    scales: {
      x: {
        type: 'category',
        title: {
          display: true,
          text: 'Date'
        }
      },
      y: {
        beginAtZero: false,
        title: {
          display: true,
          text: 'RSI Value'
        }
      }
    }
  };

  return (
    <div>
      <h2>RSI Chart</h2>
      <Line options={options} data={rsiData} />
    </div>
  );
};

export default RSIChart;
