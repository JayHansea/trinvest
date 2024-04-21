"use client";
import React, { useEffect } from "react";
import { CoinpriceData } from "@/utils/CoinpriceData";

const Coinprice = () => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src =
      "https://s3.tradingview.com/external-embedding/embed-widget-ticker-tape.js";
    script.async = true;
    script.innerHTML = `
      {
        "symbols": ${JSON.stringify(CoinpriceData.symbols)},
        "showSymbolLogo": ${CoinpriceData.showSymbolLogo},
        "isTransparent": ${CoinpriceData.isTransparent},
        "displayMode": "${CoinpriceData.displayMode}",
        "colorTheme": "${CoinpriceData.colorTheme}",
        "locale": "${CoinpriceData.locale}"
      }
    `;

    // Append the script to the parent div of Coinprice component
    const coinpriceDiv = document.getElementById("coinprice-container");
    if (coinpriceDiv) {
      coinpriceDiv.appendChild(script);
    }

    // Cleanup function
    return () => {
      if (coinpriceDiv && coinpriceDiv.contains(script)) {
        coinpriceDiv.removeChild(script);
      }
    };
  }, []);

  return (
    <div id="coinprice-container" className="tradingview-widget-container">
      <div className="tradingview-widget-container__widget"></div>
    </div>
  );
};

export default Coinprice;
