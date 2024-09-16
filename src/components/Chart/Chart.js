import React, { useEffect, useRef, memo } from 'react';

function TradingViewChart({ symbol }) {
  const container = useRef();

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://s3.tradingview.com/external-embedding/embed-widget-single-quote.js";
    script.async = true;
    script.innerHTML = `
      {
        "symbol": "${symbol}",
        "width": "100%",
        "height": "400",
        "locale": "en",
        "colorTheme": "light",
        "isTransparent": false,
        "showSymbolLogo": true,
        "autosize": true,
        "chartOnly": true
      }`;

    container.current.innerHTML = ''; // Clear previous widget
    container.current.appendChild(script);
  }, [symbol]);

  return (
    <div className="tradingview-widget-container" ref={container}>
      <div className="tradingview-widget-container__widget"></div>
    </div>
  );
}

export default memo(TradingViewChart);
