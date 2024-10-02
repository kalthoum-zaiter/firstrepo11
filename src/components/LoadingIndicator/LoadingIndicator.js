// LoadingIndicator.js
import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { LinearProgress } from '@mui/material';

const LoadingIndicator = ({ setLoading }) => {
  const location = useLocation();

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000); // Simule un délai de 1 seconde, ajuste selon tes besoins

    return () => clearTimeout(timer);
  }, [location, setLoading]);

  return <LinearProgress color="primary" />;
};

export default LoadingIndicator;
