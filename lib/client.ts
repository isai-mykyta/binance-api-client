import { BinanceSpotRealTimeApi } from "./binance/realTime/spot";
import { BinanceUserDataRealTimeApi } from "./binance/realTime/userData";
import { BinanceFuturesMarketApi } from "./binance/restApi/futures/market";
import { BinanceFuturesTradeApi } from "./binance/restApi/futures/trades";
import { BinanceSpotDataStreamApi } from "./binance/restApi/spot/dataStream";
import { BinanceSpotMarketApi } from "./binance/restApi/spot/market";
import { BinanceSpotTradeApi } from "./binance/restApi/spot/trade";
import { BinanceSpotWalletApi } from "./binance/restApi/spot/wallet";
import { IApiClientInitializeOptions } from "./binance/restApi/types";

export class BinanceApi {
  spot: {
    market: BinanceSpotMarketApi;
    trade: BinanceSpotTradeApi;
    dataStream: BinanceSpotDataStreamApi;
    wallet: BinanceSpotWalletApi;
  };

  realtime: {
    spot: BinanceSpotRealTimeApi;
    userData: BinanceUserDataRealTimeApi;
  };

  futures: {
    market: BinanceFuturesMarketApi;
    trade: BinanceFuturesTradeApi;
  };

  constructor(options: IApiClientInitializeOptions) {
    this.spot = {
      market: new BinanceSpotMarketApi(options),
      trade: new BinanceSpotTradeApi(options),
      dataStream: new BinanceSpotDataStreamApi(options),
      wallet: new BinanceSpotWalletApi(options),
    };
    this.futures = {
      market: new BinanceFuturesMarketApi(options),
      trade: new BinanceFuturesTradeApi(options),
    };
    this.realtime = {
      spot: new BinanceSpotRealTimeApi(options),
      userData: new BinanceUserDataRealTimeApi(options),
    };
  }
}
