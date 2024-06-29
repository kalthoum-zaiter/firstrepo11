import React from 'react';
import { Box, Typography, Paper, Grid } from '@mui/material';
import StockWidget from '../TickerInfo/TickerInfo';

// The GenerateAiScore component
const GenerateAiScore = ({ stockData }) => {
  // Checking if stockData is available
  if (!stockData) {
    return <Box padding={3}><Typography>Loading data...</Typography></Box>;
  }

  return (
    <Box padding={3}>
      <Typography variant="h4" gutterBottom>
        {stockData.name} - AI Stock Analysis
      </Typography>

      <Grid container spacing={2} sx={{backgroundColor:'white'}}>

        {/* Fundamental Analysis */}
        <Grid item xs={12} md={6}>
          <Paper elevation={3} padding={2} sx={{borderRadius :'0px'}}>

            <StockWidget></StockWidget>
          </Paper>
        </Grid>

        {/* Technical Analysis */}
        <Grid item xs={12} md={6}>
          <Paper elevation={3} padding={2}>
            <Typography variant="h6" color="secondary">Technical Analysis</Typography>
            <Typography variant="body1">{stockData.technical.description}</Typography>
          </Paper>
        </Grid>

        {/* Alternative Data Analysis */}
        <Grid item xs={12} md={6}>
          <Paper elevation={3} padding={2}>
            <Typography variant="h6" color="secondary">Alternative Data Analysis</Typography>
            <Typography variant="body1">{stockData.alternativeData.description}</Typography>
          </Paper>
        </Grid>

        {/* Conclusion and Recommendation */}
        <Grid item xs={12} md={6}>
          <Paper elevation={3} padding={2}>
            <Typography variant="h6" color="secondary">Conclusion and Recommendation</Typography>
            <Typography variant="body1">{stockData.conclusion.description}</Typography>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

// Default props to ensure there is no crash if stockData is not provided
GenerateAiScore.defaultProps = {
  stockData: {
    name: "Not available",
    fundamentals: { description: "Fundamental analysis data is not available." },
    technical: { description: "Technical analysis data is not available." },
    alternativeData: { description: "Alternative data analysis is not available." },
    conclusion: { description: "Conclusion and recommendation are not available." }
  }
};

export default GenerateAiScore;
