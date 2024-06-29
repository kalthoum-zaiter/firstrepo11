const getDesignTokens = (mode) => ({
    palette: {
      mode,
      ...(mode === 'light'
        ? {
            // Light theme colors
            primary: {
              main: "#00c853", // Green shade for primary actions, links
              dark: "#009624", // Darker green for hover states
              light: "#5efc82", // Light green for backgrounds or large fields
              contrastText: "#ffffff", // White text for readability on dark backgrounds
            },
            secondary: {
              main: "#f44336", // Red shade for secondary actions or alerts
              dark: "#ba000d", // Darker red for secondary hover states
              light: "#ff7961", // Light red
              contrastText: "#000000", // Black text for secondary buttons or less prominent info
            },
            text: {
              primary: "#212121", // Dark grey for primary text
              secondary: "#757575", // Medium grey for secondary text
            },
            background: {
              paper: "#ffffff", // White background for elements like cards and modals
              default: "#fafafa", // Light grey for page backgrounds
            },
          }
        : {
            // Dark theme colors
            primary: {
              main: "#00e676", // Bright green for primary actions in dark mode
              dark: "#00a152", // Dark green for dark mode interactions
              light: "#66ffa6", // Very light green for highlights or accents in dark mode
              contrastText: "#000000", // Black text for maximum contrast on light green
            },
            secondary: {
              main: "#ff1744", // Bright red for urgent actions in dark mode
              dark: "#b2102f", // Dark red for pressing but less urgent actions
              light: "#ff616f", // Light red for notifications or flags in dark mode
              contrastText: "#ffffff", // White text for clarity on dark red
            },
            text: {
              primary: "#ffffff", // White text for general readability in dark mode
              secondary: "#bbbbbb", // Light grey for less critical information in dark mode
            },
            background: {
              paper: "#424242", // Dark grey for surfaces like cards and modals in dark mode
              default: "#303030", // Nearly black for overall background in dark mode
            },
          }),
    },
    typography: {
      fontFamily: 'Orbitron', // Maintains the modern and tech-oriented font style
    },
  });
  
  export default getDesignTokens;
  