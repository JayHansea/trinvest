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
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div className="tradingview-widget-container">
      <div className="tradingview-widget-container__widget"></div>
    </div>
  );
};

export default Coinprice;
