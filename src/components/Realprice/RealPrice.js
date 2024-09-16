import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:5000'); // Adjust the URL based on your Flask server

const StockPrice = () => {
    const [price, setPrice] = useState(0);

    useEffect(() => {
        socket.emit('start_stream'); // Start the price stream

        socket.on('stock_price', (data) => {
            setPrice(data.price);
        });

        return () => {
            socket.disconnect();
        };
    }, []);

    return (
        <div>
            <h1>Real-Time Stock Price: ${price}</h1>
        </div>
    );
};

export default StockPrice;
