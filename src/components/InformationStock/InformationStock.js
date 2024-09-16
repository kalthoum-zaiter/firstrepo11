import React from 'react';
import { Grid, Paper, Typography, Box } from '@mui/material';

const InformationStock = () => {
  return (
    <Grid container spacing={2} sx={{ padding: 2, overflow: 'hidden' }}>
      <Grid item xs={12} md={8}>
        <Paper sx={{ padding: 2, display: 'flex', flexDirection: 'column', minHeight: '80vh' }}>
          <Typography variant="h6" gutterBottom></Typography>
          <Box sx={{ flexGrow: 1, backgroundColor: '#f4f4f4', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          </Box>
        </Paper>
      </Grid>

      <Grid item xs={12} md={4} >
        <Paper sx={{ padding: 2, minHeight: '80vh' }}>
          <Typography variant="h6" gutterBottom>Technical Indicators</Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            <Typography>RSI (14): </Typography>
            <Typography>STOCH (9,6): </Typography>
            <Typography>STOCHRSI (14): </Typography>
            <Typography>MACD (12,26): </Typography>
            <Typography>CCI (14): </Typography>
            <Typography>ATR (14): </Typography>
            <Typography>ROC: </Typography>
          </Box>
        </Paper>
      </Grid>

      <Grid item xs={12} md={5} sx={{ mt: 2 }}>
        <Paper sx={{ padding: 2, minHeight: '50vh', overflow: 'auto' }}>
          <Typography variant="h6" gutterBottom>Moving Averages</Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
       
          </Box>
        </Paper>
      </Grid>
      <Grid item xs={12} md={7} sx={{ mt: 2 }}>
        <Paper sx={{ padding: 2, minHeight: '50vh', overflow: 'auto' }}>
          <Typography variant="h6" gutterBottom>Moving Averages</Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
          
          </Box>
        </Paper>
      </Grid>
      <Grid item xs={12}  sx={{ mt: 2 }}>
        <Paper sx={{ padding: 2, minHeight: '50vh', overflow: 'auto' }}>
          <Typography variant="h6" gutterBottom>Moving Averages</Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
        
          </Box>
        </Paper>
      </Grid>
      <Grid item xs={12} sx={{ mt: 2 }}>
        <Paper sx={{ padding: 2, minHeight: '50vh', overflow: 'auto' }}>
          <Typography variant="h6" gutterBottom>Technical Indicators Explained</Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>

RSI (14)
Relative Strength Index (14) is a momentum oscillator that helps identify overbought or oversold conditions in the trading of an asset. The "14" refers to the number of days over which the RSI is calculated. A reading above 70 often signals an overbought state, suggesting a potential pullback, while a reading below 30 indicates an oversold condition, potentially signaling a reversal to the upside.

STOCH (9,6)
Stochastic Oscillator (9,6) compares the closing price of a stock to its price range over a certain period, in this case, 9 periods, with a 6-period moving average smoothing. Values above 80 indicate an overbought condition, and values below 20 suggest oversold conditions. This helps traders identify potential reversal points in the market.

STOCHRSI (14)
Stochastic RSI (14) is essentially the RSI with a Stochastic applied to it, making it a more sensitive version of the traditional RSI. It oscillates between overbought and oversold levels, typically set at 80 and 20, respectively. This indicator is useful for identifying more frequent swings in the market momentum.

MACD (12,26)
Moving Average Convergence Divergence (12,26) is a trend-following momentum indicator. It shows the relationship between two moving averages of a stock’s price - usually calculated by subtracting the 26-period exponential moving average (EMA) from the 12-period EMA. The MACD crossing above its signal line suggests bullish momentum, while crossing below indicates bearish momentum.

CCI (14)
Commodity Channel Index (14) measures the current price level relative to an average price level over a specified period (14 periods). Readings above +100 can indicate that a stock is starting to move strongly upward (overbought), and readings below -100 can signal that a stock is moving strongly lower (oversold).

ATR (14)
Average True Range (14) is a tool used to measure the volatility of an asset. The "14" represents the period over which the ATR is calculated, typically 14 days. Higher ATR values indicate higher volatility, and vice versa. This is particularly useful for traders in setting stop-loss levels based on market volatility.

ROC
Rate of Change is a momentum oscillator that measures the percentage change in price between the current price and the price in a past period. It is used to identify overbought or oversold conditions. A rising ROC indicates an increase in upward momentum, while a falling ROC suggests an increase in downward momentum.
          </Box>
        </Paper>
      </Grid>
    </Grid>
  );
}

export default InformationStock;
