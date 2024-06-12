import { RequestType } from "../../../types";
import { BINANCE_API_URLS } from "../../../constants";
import { validateRequiredParams } from "../../../utils/decorators";

import { BinanceApiClient } from "../httpClient";
import { IApiClientInitializeOptions } from "../types";

import { 
  ICancelAllOpenOrders,
  ICancelOrder,
  IChangeMultiAssetsMode, 
  IChangePositionMode, 
  IGetCurrentAllOpenOrders, 
  IGetOrderModifyHistory, 
  IModifyMultipleOrder, 
  IModifyOrder, 
  INewLimitOrder, 
  INewMarketOrder, 
  INewOrder,
  INewStopMarketOrder,
  INewStopOrder,
  INewTakeProfitMarketOrder,
  INewTakeProfitOrder,
  INewTrallingStopMarketOrder,
  IPlaceMultipleOrders,
  IQueryOrder
} from "./types";

export class BinanceFuturesTradeApi extends BinanceApiClient {
  constructor(options: IApiClientInitializeOptions) {
    super(options);
    this.baseApiUrl = BINANCE_API_URLS.PERPETUAL_FUTURES.BASE;
    this.testnetUrl = BINANCE_API_URLS.PERPETUAL_FUTURES.TESTNET;
    this.url = options.enableTestnet ? this.testnetUrl : this.baseApiUrl;
  }

  @validateRequiredParams(["dualSidePosition"])
  public async changePositionMode(options: IChangePositionMode) {
    try {
      const res = await this.privateRequest({
        method: RequestType.POST,
        path: "/fapi/v1/positionSide/dual",
        params: options,
      });
      return res.data;
    } catch (error) {
      this.throwError(error?.response?.data?.message);
    }
  }

  public async getCurrentPositionMode() {
    try {
      const res = await this.privateRequest({
        method: RequestType.GET,
        path: "/fapi/v1/positionSide/dual",
      });
      return res.data;
    } catch (error) {
      this.throwError(error?.response?.data?.message);
    }
  }

  @validateRequiredParams(["multiAssetsMargin"])
  public async changeMultiAssetsMode(options: IChangeMultiAssetsMode) {
    try {
      const res = await this.privateRequest({
        method: RequestType.POST,
        path: "/fapi/v1/multiAssetsMargin",
        params: options,
      });
      return res.data;
    } catch (error) {
      this.throwError(error?.response?.data?.message);
    }
  }

  public async getCurrentMultiAssetsMode() {
    try {
      const res = await this.privateRequest({
        method: RequestType.GET,
        path: "/fapi/v1/multiAssetsMargin",
      });
      return res.data;
    } catch (error) {
      this.throwError(error?.response?.data?.message);
    }
  }

  @validateRequiredParams(["symbol", "side", "positionSide", "type"])
  public async newOrder(options: INewOrder) {
    try {
      const res = await this.privateRequest({
        method: RequestType.POST,
        path: "/fapi/v1/order",
        params: options,
      });
      return res.data;
    } catch (error) {
      this.throwError(error?.response?.data?.message);
    }
  }

  @validateRequiredParams(["timeInForce", "quantity", "price"])
  public async newLimitOrder(options: INewLimitOrder) {
    try {
      const res = await this.newOrder({ ...options, type: "LIMIT", });
      return res.data;
    } catch (error) {
      this.throwError(error?.response?.data?.message);
    }
  }

  @validateRequiredParams(["quantity"])
  public async newMarketOrder(options: INewMarketOrder) {
    try {
      const res = await this.newOrder({ ...options, type: "MARKET", });
      return res.data;
    } catch (error) {
      this.throwError(error?.response?.data?.message);
    }
  }

  @validateRequiredParams(["stopPrice", "quantity", "price"])
  public async newStopOrder(options: INewStopOrder) {
    try {
      const res = await this.newOrder({ ...options, type: "STOP", });
      return res.data;
    } catch (error) {
      this.throwError(error?.response?.data?.message);
    }
  }

  @validateRequiredParams(["stopPrice", "quantity", "price"])
  public async newTakeProfitOrder(options: INewTakeProfitOrder) {
    try {
      const res = await this.newOrder({ ...options, type: "TAKE_PROFIT", });
      return res.data;
    } catch (error) {
      this.throwError(error?.response?.data?.message);
    }
  }

  @validateRequiredParams(["stopPrice"])
  public async newStopMarketOrder(options: INewStopMarketOrder) {
    try {
      const res = await this.newOrder({ ...options, type: "STOP_MARKET", });
      return res.data;
    } catch (error) {
      this.throwError(error?.response?.data?.message);
    }
  }

  @validateRequiredParams(["stopPrice"])
  public async newTakeProfitMarketOrder(options: INewTakeProfitMarketOrder) {
    try {
      const res = await this.newOrder({ ...options, type: "TAKE_PROFIT_MARKET", });
      return res.data;
    } catch (error) {
      this.throwError(error?.response?.data?.message);
    }
  }

  @validateRequiredParams(["quantity", "callbackRate"])
  public async newTrallingStopMarketOrder(options: INewTrallingStopMarketOrder) {
    try {
      const res = await this.newOrder({ ...options, type: "TRAILING_STOP_MARKET", });
      return res.data;
    } catch (error) {
      this.throwError(error?.response?.data?.message);
    }
  }

  // Max 5 orders
  @validateRequiredParams(["symbol", "side", "type", "quantity"])
  public async placeMultipleOrders(options: IPlaceMultipleOrders[]) {
    try {
      const res = await this.privateRequest({
        method: RequestType.POST,
        path: "/fapi/v1/batchOrders",
        params: JSON.stringify(options),
      });
      return res.data;
    } catch (error) {
      this.throwError(error?.response?.data?.message);
    }
  }

  @validateRequiredParams(["symbol", "side", "price", "quantity"])
  public async modifyOrder(options: IModifyOrder) {
    try {
      const res = await this.privateRequest({
        method: RequestType.PUT,
        path: "/fapi/v1/order",
        params: options,
      });
      return res.data;
    } catch (error) {
      this.throwError(error?.response?.data?.message);
    }
  }

  @validateRequiredParams(["batchOrders"])
  public async modifyMultipleOrder(options: IModifyMultipleOrder) {
    try {
      const res = await this.privateRequest({
        method: RequestType.PUT,
        path: "/fapi/v1/batchOrders",
        params: JSON.stringify(options),
      });
      return res.data;
    } catch (error) {
      this.throwError(error?.response?.data?.message);
    }
  }

  @validateRequiredParams(["symbol"])
  public async getOrderModifyHistory(options: IGetOrderModifyHistory) {
    try {
      const res = await this.privateRequest({
        method: RequestType.GET,
        path: "/fapi/v1/orderAmendment",
        params: options,
      });
      return res.data;
    } catch (error) {
      this.throwError(error?.response?.data?.message);
    }
  }

  @validateRequiredParams(["symbol"])
  public async queryOrder(options: IQueryOrder) {
    try {
      const res = await this.privateRequest({
        method: RequestType.GET,
        path: "/fapi/v1/order",
        params: options,
      });
      return res.data;
    } catch (error) {
      this.throwError(error?.response?.data?.message);
    }
  }

  @validateRequiredParams(["symbol"])
  public async cancelOrder(options: ICancelOrder) {
    try {
      const res = await this.privateRequest({
        method: RequestType.DELETE,
        path: "/fapi/v1/order",
        params: options,
      });
      return res.data;
    } catch (error) {
      this.throwError(error?.response?.data?.message);
    }
  }

  @validateRequiredParams(["symbol"])
  public async cancelAllOpenOrders(options: ICancelAllOpenOrders) {
    try {
      const res = await this.privateRequest({
        method: RequestType.DELETE,
        path: "/fapi/v1/allOpenOrders",
        params: options,
      });
      return res.data;
    } catch (error) {
      this.throwError(error?.response?.data?.message);
    }
  }

  @validateRequiredParams(["symbol"])
  public async getCurrentAllOpenOrders(options: IGetCurrentAllOpenOrders) {
    try {
      const res = await this.privateRequest({
        method: RequestType.GET,
        path: "/fapi/v1/openOrders",
        params: options,
      });
      return res.data;
    } catch (error) {
      this.throwError(error?.response?.data?.message);
    }
  }
}
