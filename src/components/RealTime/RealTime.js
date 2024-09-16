import React, { useEffect, useState, useRef } from 'react';

const WebSocketComponent = () => {
  const [prices, setPrices] = useState({});
  const ws = useRef(null); // Use ref to maintain the WebSocket instance across renders
  const apiKey = 'b65a3b8ca9a84d05badd27336c33ca2a'; // Add your Twelve Data API key here
  const route = 'quotes/price'; // The route for price data

  useEffect(() => {
    // Establish WebSocket connection
    ws.current = new WebSocket(`wss://ws.twelvedata.com/v1/${route}?apikey=${apiKey}`);

    ws.current.onopen = () => {
      console.log('WebSocket connected');

      // Send subscription message after the WebSocket is open
      const subscribeMessage = JSON.stringify({
        action: 'subscribe',
        params: {
          symbols: ['AAPL', 'BTC/USD', 'EUR/USD'], // Add your symbols here
        },
      });
      
      // Ensure the connection is ready before sending
      if (ws.current.readyState === WebSocket.OPEN) {
        ws.current.send(subscribeMessage);
      }

      // Start sending heartbeats every 10 seconds
      const heartbeatInterval = setInterval(() => {
        const heartbeatMessage = JSON.stringify({ action: 'heartbeat' });
        
        // Only send if the WebSocket is still open
        if (ws.current.readyState === WebSocket.OPEN) {
          ws.current.send(heartbeatMessage);
        }
      }, 10000);

      // Cleanup on component unmount
      return () => {
        clearInterval(heartbeatInterval);
        if (ws.current) {
          ws.current.close();
        }
      };
    };

    // Handle incoming messages
    ws.current.onmessage = (event) => {
      const data = JSON.parse(event.data);

      // Handle price events
      if (data.event === 'price') {
        setPrices((prevPrices) => ({
          ...prevPrices,
          [data.symbol]: data.price,
        }));
      }
    };

    // Handle WebSocket errors
    ws.current.onerror = (error) => {
      console.error('WebSocket error', error);
    };

    // Handle WebSocket closure
    ws.current.onclose = () => {
      console.log('WebSocket disconnected');
    };

    return () => {
      if (ws.current) {
        ws.current.close();
      }
    };
  }, []);

  return (
    <div>
      <h1>Real-time Prices</h1>
      <ul>
        {Object.keys(prices).map((symbol) => (
          <li key={symbol}>
            {symbol}: {prices[symbol]}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default WebSocketComponent;
