import { validateRequiredParams } from "../../../utils/decorators";
import { RequestType } from "../../../types";
import { BINANCE_API_URLS } from "../../../constants";

import { BinanceApiClient } from "../httpClient";
import { IApiClientInitializeOptions } from "../types";

import { 
  IGet24hrTickerPriceChangeStatistics,
  IGetAggregateTradesList, 
  IGetBasis, 
  IGetCompositeIndexSymbolInformation, 
  IGetContinuousContractKlineCandlestickData, 
  IGetFundingRateHistory, 
  IGetIndexPriceKlineCandlestickData, 
  IGetKlineCandlestickData, 
  IGetLongShortRatio, 
  IGetMarkPrice, 
  IGetMultiAssetsModeAssetIndex, 
  IGetOlderTradesLookup, 
  IGetOpenInterest, 
  IGetOrderBookOptions, 
  IGetPremiumIndexKlineData, 
  IGetQuarterlyContractSettlementPrice, 
  IGetRecentTradesListOptions, 
  IGetSymbolOrderBookTicker, 
  IGetSymbolPriceTicker,
  IGetSymbolPriceTickerV2,
  IGetTakerBuySellVolume,
  IGetTopTraderLongShortRatioAccounts,
  IGetTopTraderLongShortRatioPositions,
  IQueryIndexPriceConstituents
} from "./types";

export class BinanceFuturesMarketApi extends BinanceApiClient {
  constructor(options: IApiClientInitializeOptions) {
    super(options);
    this.baseApiUrl = BINANCE_API_URLS.PERPETUAL_FUTURES.BASE;
    this.testnetUrl = BINANCE_API_URLS.PERPETUAL_FUTURES.TESTNET;
    this.url = options.enableTestnet ? this.testnetUrl : this.baseApiUrl;
  }

  public async testConnectivity() {
    try {
      const res = await this.publicRequest({
        method: RequestType.GET,
        path: "/fapi/v1/ping",
      });
      return res.data;
    } catch (error) {
      this.throwError(error?.response?.data?.message);
    }
  }

  public async checkServerTime() {
    try {
      const res = await this.publicRequest({
        method: RequestType.GET,
        path: "/fapi/v1/time",
      });
      return res.data;
    } catch (error) {
      this.throwError(error?.response?.data?.message);
    }
  }

  public async getExchangeInfo() {
    try {
      const res = await this.publicRequest({
        method: RequestType.GET,
        path: "/fapi/v1/exchangeInfo",
      });
      return res.data;
    } catch (error) {
      this.throwError(error?.response?.data?.message);
    }
  }

  @validateRequiredParams(["symbol"])
  public async getOrderBook(options: IGetOrderBookOptions) {
    try {
      const res = await this.publicRequest({
        method: RequestType.GET,
        path: "/fapi/v1/depth",
        params: options,
      });
      return res.data;
    } catch (error) {
      this.throwError(error?.response?.data?.message);
    }
  }

  /**
   * Market trades means trades filled in the order book. 
   * Only market trades will be returned, which means the insurance fund trades and ADL trades won't be returned.
   */
  @validateRequiredParams(["symbol"])
  public async getRecentTradesList(options: IGetRecentTradesListOptions) {
    try {
      const res = await this.publicRequest({
        method: RequestType.GET,
        path: "/fapi/v1/trades",
        params: options,
      });
      return res.data;
    } catch (error) {
      this.throwError(error?.response?.data?.message);
    }
  }

  /**
   * Market trades means trades filled in the order book. 
   * Only market trades will be returned, which means the insurance fund trades and ADL trades won't be returned.
   * Only supports returning data from the last three months (the earliest available time is currently 2023-11-21 00:00:00).
   */
  @validateRequiredParams(["symbol"])
  public async getOlderTradesLookup(options: IGetOlderTradesLookup) {
    try {
      const res = await this.publicRequest({
        method: RequestType.GET,
        path: "/fapi/v1/historicalTrades",
        params: options,
      });
      return res.data;
    } catch (error) {
      this.throwError(error?.response?.data?.message);
    }
  }

  /**
   * If both startTime and endTime are sent, time between startTime and endTime must be less than 1 hour.
   * If fromId, startTime, and endTime are not sent, the most recent aggregate trades will be returned.
   * Only market trades will be aggregated and returned, which means the insurance fund trades and ADL trades won't be aggregated.
   * Sending both startTime/endTime and fromId might cause response timeout, please send either fromId or startTime/endTime.
   */
  @validateRequiredParams(["symbol"])
  public async getAggregateTradesList(options: IGetAggregateTradesList) {
    try {
      const res = await this.publicRequest({
        method: RequestType.GET,
        path: "/fapi/v1/aggTrades",
        params: options,
      });
      return res.data;
    } catch (error) {
      this.throwError(error?.response?.data?.message);
    }
  }

  @validateRequiredParams(["symbol", "interval"])
  public async getKlineCandlestickData(options: IGetKlineCandlestickData) {
    try {
      const res = await this.publicRequest({
        method: RequestType.GET,
        path: "/fapi/v1/klines",
        params: options,
      });
      return res.data;
    } catch (error) {
      this.throwError(error?.response?.data?.message);
    }
  }

  @validateRequiredParams(["pair", "interval", "contractType"])
  public async getContinuousContractKlineCandlestickData(options: IGetContinuousContractKlineCandlestickData) {
    try {
      const res = await this.publicRequest({
        method: RequestType.GET,
        path: "/fapi/v1/continuousKlines",
        params: options,
      });
      return res.data;
    } catch (error) {
      this.throwError(error?.response?.data?.message);
    }
  }

  @validateRequiredParams(["pair", "interval"])
  public async getIndexPriceKlineCandlestickData(options: IGetIndexPriceKlineCandlestickData) {
    try {
      const res = await this.publicRequest({
        method: RequestType.GET,
        path: "/fapi/v1/indexPriceKlines",
        params: options,
      });
      return res.data;
    } catch (error) {
      this.throwError(error?.response?.data?.message);
    }
  }

  @validateRequiredParams(["symbol", "interval"])
  public async getMarkPriceKlineCandlestickData(options: IGetIndexPriceKlineCandlestickData) {
    try {
      const res = await this.publicRequest({
        method: RequestType.GET,
        path: "/fapi/v1/markPriceKlines",
        params: options,
      });
      return res.data;
    } catch (error) {
      this.throwError(error?.response?.data?.message);
    }
  }

  @validateRequiredParams(["symbol", "interval"])
  public async getPremiumIndexKlineData(options: IGetPremiumIndexKlineData) {
    try {
      const res = await this.publicRequest({
        method: RequestType.GET,
        path: "/fapi/v1/markPriceKlines",
        params: options,
      });
      return res.data;
    } catch (error) {
      this.throwError(error?.response?.data?.message);
    }
  }

  public async getMarkPrice(options: IGetMarkPrice) {
    try {
      const res = await this.publicRequest({
        method: RequestType.GET,
        path: "/fapi/v1/premiumIndex",
        params: options,
      });
      return res.data;
    } catch (error) {
      this.throwError(error?.response?.data?.message);
    }
  }

  @validateRequiredParams(["symbol"])
  public async getFundingRateHistory(options: IGetFundingRateHistory) {
    try {
      const res = await this.publicRequest({
        method: RequestType.GET,
        path: "/fapi/v1/fundingRate",
        params: options,
      });
      return res.data;
    } catch (error) {
      this.throwError(error?.response?.data?.message);
    }
  }

  public async getFundingRateInfo() {
    try {
      const res = await this.publicRequest({
        method: RequestType.GET,
        path: "/fapi/v1/fundingInfo",
      });
      return res.data;
    } catch (error) {
      this.throwError(error?.response?.data?.message);
    }
  }

  public async get24hrTickerPriceChangeStatistics(options: IGet24hrTickerPriceChangeStatistics) {
    try {
      const res = await this.publicRequest({
        method: RequestType.GET,
        path: "/fapi/v1/ticker/24hr",
        params: options,
      });
      return res.data;
    } catch (error) {
      this.throwError(error?.response?.data?.message);
    }
  }

  public async getSymbolPriceTicker(options: IGetSymbolPriceTicker) {
    try {
      const res = await this.publicRequest({
        method: RequestType.GET,
        path: "/fapi/v1/ticker/price",
        params: options,
      });
      return res.data;
    } catch (error) {
      this.throwError(error?.response?.data?.message);
    }
  }

  public async getSymbolPriceTickerV2(options: IGetSymbolPriceTickerV2) {
    try {
      const res = await this.publicRequest({
        method: RequestType.GET,
        path: "/fapi/v2/ticker/price",
        params: options,
      });
      return res.data;
    } catch (error) {
      this.throwError(error?.response?.data?.message);
    }
  }

  public async getSymbolOrderBookTicker(options: IGetSymbolOrderBookTicker) {
    try {
      const res = await this.publicRequest({
        method: RequestType.GET,
        path: "/fapi/v1/ticker/bookTicker",
        params: options,
      });
      return res.data;
    } catch (error) {
      this.throwError(error?.response?.data?.message);
    }
  }

  @validateRequiredParams(["symbol"])
  public async getOpenInterest(options: IGetOpenInterest) {
    try {
      const res = await this.publicRequest({
        method: RequestType.GET,
        path: "/fapi/v1/openInterest",
        params: options,
      });
      return res.data;
    } catch (error) {
      this.throwError(error?.response?.data?.message);
    }
  }

  @validateRequiredParams(["pair"])
  public async getQuarterlyContractSettlementPrice(options: IGetQuarterlyContractSettlementPrice) {
    try {
      const res = await this.publicRequest({
        method: RequestType.GET,
        path: "/futures/data/delivery-price",
        params: options,
      });
      return res.data;
    } catch (error) {
      this.throwError(error?.response?.data?.message);
    }
  }

  @validateRequiredParams(["symbol", "period"])
  public async getTopTraderLongShortRatioAccounts(options: IGetTopTraderLongShortRatioAccounts) {
    try {
      const res = await this.publicRequest({
        method: RequestType.GET,
        path: "/futures/data/topLongShortAccountRatio",
        params: options,
      });
      return res.data;
    } catch (error) {
      this.throwError(error?.response?.data?.message);
    }
  }

  @validateRequiredParams(["symbol", "period"])
  public async getTopTraderLongShortRatioPositions(options: IGetTopTraderLongShortRatioPositions) {
    try {
      const res = await this.publicRequest({
        method: RequestType.GET,
        path: "/futures/data/topLongShortPositionRatio",
        params: options,
      });
      return res.data;
    } catch (error) {
      this.throwError(error?.response?.data?.message);
    }
  }

  @validateRequiredParams(["symbol", "period"])
  public async getLongShortRatio(options: IGetLongShortRatio) {
    try {
      const res = await this.publicRequest({
        method: RequestType.GET,
        path: "/futures/data/globalLongShortAccountRatio",
        params: options,
      });
      return res.data;
    } catch (error) {
      this.throwError(error?.response?.data?.message);
    }
  }

  @validateRequiredParams(["symbol", "period"])
  public async getTakerBuySellVolume(options: IGetTakerBuySellVolume) {
    try {
      const res = await this.publicRequest({
        method: RequestType.GET,
        path: "/futures/data/takerlongshortRatio",
        params: options,
      });
      return res.data;
    } catch (error) {
      this.throwError(error?.response?.data?.message);
    }
  }

  @validateRequiredParams(["pair", "contractType", "period"])
  public async getBasis(options: IGetBasis) {
    try {
      const res = await this.publicRequest({
        method: RequestType.GET,
        path: "/futures/data/basis",
        params: options,
      });
      return res.data;
    } catch (error) {
      this.throwError(error?.response?.data?.message);
    }
  }

  public async getCompositeIndexSymbolInformation(options: IGetCompositeIndexSymbolInformation) {
    try {
      const res = await this.publicRequest({
        method: RequestType.GET,
        path: "/fapi/v1/indexInfo",
        params: options,
      });
      return res.data;
    } catch (error) {
      this.throwError(error?.response?.data?.message);
    }
  }

  public async getMultiAssetsModeAssetIndex(options: IGetMultiAssetsModeAssetIndex) {
    try {
      const res = await this.publicRequest({
        method: RequestType.GET,
        path: "/fapi/v1/assetIndex",
        params: options,
      });
      return res.data;
    } catch (error) {
      this.throwError(error?.response?.data?.message);
    }
  }

  @validateRequiredParams(["symbol"])
  public async queryIndexPriceConstituents(options: IQueryIndexPriceConstituents) {
    try {
      const res = await this.publicRequest({
        method: RequestType.GET,
        path: "/fapi/v1/constituents",
        params: options,
      });
      return res.data;
    } catch (error) {
      this.throwError(error?.response?.data?.message);
    }
  }
}
