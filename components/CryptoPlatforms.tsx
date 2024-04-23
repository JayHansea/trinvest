import React from "react";
import ImageComponent from "./ImageComponent";

const CryptoPlatforms = () => {
  return (
    <div className="bg-gray-900 py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <h2 className="text-center text-3xl lg:text-4xl font-semibold leading-8 text-white pb-10">
          Crypto Currency trading platforms
        </h2>
        <div className="mx-auto mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-4 gap-x-8 gap-y-10 sm:max-w-xl sm:gap-x-10 lg:mx-0 lg:max-w-none lg:gap-x-10">
          {/* Pass data to ImageComponent */}
          <ImageComponent
            src={"/assets/partner_binance.png"}
            alt="Binance"
            width={200}
            height={60}
          />
          <ImageComponent
            src={"/assets/partner_coinbasepro.png"}
            alt="Coinbase Pro"
            width={200}
            height={60}
          />
          <ImageComponent
            src={"/assets/partner_huobi.png"}
            alt="Huobi"
            width={200}
            height={60}
          />
          <ImageComponent
            src={"/assets/partner_kraken.png"}
            alt="Kraken"
            width={200}
            height={60}
          />
          <ImageComponent
            src={"/assets/partner_kucoin.png"}
            alt="KuCoin"
            width={200}
            height={60}
          />
          <ImageComponent
            src={"/assets/partner_bithumb.png"}
            alt="Bithumb"
            width={200}
            height={60}
          />
          <ImageComponent
            src={"/assets/partner_bitfinex.png"}
            alt="Bitfinex"
            width={200}
            height={60}
          />
          <ImageComponent
            src={"/assets/partner_gateio.png"}
            alt="Gate.io"
            width={200}
            height={60}
          />
        </div>
      </div>
    </div>
  );
};

export default CryptoPlatforms;
