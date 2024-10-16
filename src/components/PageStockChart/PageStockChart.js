import React, { useEffect } from 'react';
import { createChart } from 'lightweight-charts';  // Import LightweightCharts
import io from 'socket.io-client';  // Import socket.io-client

const PageStockChart = ({ symbol }) => {  // Accept the symbol prop
  useEffect(() => {
    // Ensure we don't create multiple charts on each re-render
    const domElement = document.getElementById('tvchart');
    if (domElement.firstChild) {
      domElement.removeChild(domElement.firstChild);
    }

    // Get the dimensions of the parent container (Box)
    const chartWidth = domElement.parentElement.offsetWidth;
    const chartHeight = 300;  // Set to 300px to match the Box's height

    const chartProperties = {
      width: chartWidth,
      height: chartHeight,
      timeScale: {
        timeVisible: true,
        secondsVisible: false,
      },
    };

    // Create the chart and add the candlestick series
    const chart = createChart(domElement, chartProperties);
    const candleSeries = chart.addCandlestickSeries();

    // Function to fetch data from Alpha Vantage
    const fetchAlphaVantageData = async () => {
      const apiKey = 'FFTZ06W4JZ6C7ZDS';  // Replace with your Alpha Vantage API key
      // Use the symbol prop in the API request
      const url = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${symbol}&apikey=${apiKey}`;

      try {
        const response = await fetch(url);
        const data = await response.json();

        // Extract and format the data for the candlestick chart
        const timeSeries = data['Time Series (Daily)'];
        const cdata = Object.keys(timeSeries).map((timestamp) => {
          const dayData = timeSeries[timestamp];
          return {
            time: new Date(timestamp).getTime() / 1000,  // Convert date to timestamp
            open: parseFloat(dayData['1. open']),
            high: parseFloat(dayData['2. high']),
            low: parseFloat(dayData['3. low']),
            close: parseFloat(dayData['4. close']),
          };
        });

        // Sort the data by time (ascending order)
        cdata.sort((a, b) => a.time - b.time);

        // Set the data in the candlestick series
        candleSeries.setData(cdata);
      } catch (err) {
        console.error(err);
      }
    };

    // Fetch data from Alpha Vantage once
    fetchAlphaVantageData();

    // WebSocket connection for real-time updates (if available)
    const socket = io('http://127.0.0.1:4000/');
    socket.on('KLINE', (pl) => {
      candleSeries.update(pl);
    });

    // Handle resizing of the chart
    const handleResize = () => {
      const newWidth = domElement.parentElement.offsetWidth;
      chart.applyOptions({ width: newWidth });
    };

    // Add resize event listener
    window.addEventListener('resize', handleResize);

    // Cleanup on component unmount
    return () => {
      window.removeEventListener('resize', handleResize);
      socket.disconnect();  // Disconnect the WebSocket on cleanup
    };
  }, [symbol]);  // Add symbol to dependency array

  return (
    <div id="tvchart"></div>
  );
};

export default PageStockChart;
