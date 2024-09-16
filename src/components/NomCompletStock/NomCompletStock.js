import React , { useState, useEffect }from 'react'

import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import { Typography, Box } from '@mui/material';



const NomCompletStock = () => {
    const { tickerName } = useParams(); // This gets the ticker name from the URL
    const [companyName, setCompanyName] = useState(''); // State to store the company name

    useEffect(() => {
        const fetchCompanyName = async () => {
            try {
                const response = await axios.get('http://localhost:5000/company_name', { params: { ticker: tickerName } });
                const name = response.data.companyName.replace(/Corporation/g, '').trim(); // Remove "Corporation" and trim any extra space
                setCompanyName(name);
            } catch (error) {
                console.error('Failed to fetch company name:', error);
                setCompanyName(''); // Optionally set a default or error-related text
            }
        };

        fetchCompanyName();
    }, [tickerName]); 
  return (

    <Box sx={{ display: 'flex', alignItems: 'center' }}>
    <Typography variant="h6" component="span">
        {companyName} {companyName ? '-' : ''}
    </Typography>
    </Box>  )
}

export default NomCompletStock
