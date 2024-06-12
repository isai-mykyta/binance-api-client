export interface IGetOrderBookOptions {
  symbol: string;
  limit?: number; // Default 500; Valid limits:[5, 10, 20, 50, 100, 500, 1000]
}

export interface IGetRecentTradesListOptions {
  symbol: string;
  limit?: number; // Default 500; max 1000.
}

export interface IGetOlderTradesLookup {
  symbol: string;
  limit?: number; // Default 500; max 1000.
  fromId?: number; // TradeId to fetch from. Default gets most recent trades.
}

export interface IGetAggregateTradesList {
  symbol: string;
  fromId?: number;
  startTime?: number;
  endTime?: number;
  limit?: number; // Default 500; max 1000.
}

export interface IGetKlineCandlestickData {
  symbol: string;
  interval?: string;
  startTime?: number;
  endTime?: number;
  limit?: number; // Default 500; max 1500.
}

export interface IGetContinuousContractKlineCandlestickData {
  pair: string;
  contractType: "PERPETUAL" | "CURRENT_QUARTER" | "NEXT_QUARTER";
  interval: string;
  startTime?: number;
  endTime?: number;
  limit?: number; // Default 500; max 1500.
}

export interface IGetIndexPriceKlineCandlestickData {
  pair: string;
  interval: string;
  startTime?: number;
  endTime?: number;
  limit?: number; // Default 500; max 1500.
}

export interface IGetMarkPriceKlineCandlestickData {
  symbol: string;
  interval: string;
  startTime?: number;
  endTime?: number;
  limit?: number; // Default 500; max 1500.
}

export interface IGetPremiumIndexKlineData {
  symbol: string;
  interval: string;
  startTime?: number;
  endTime?: number;
  limit?: number; // Default 500; max 1500.
}

export interface IGetMarkPrice {
  symbol?: string;
}

export interface IGetFundingRateHistory {
  symbol: string;
  startTime?: number;
  endTime?: number;
  limit?: number; // Default 500; max 1000.
}

export interface IGet24hrTickerPriceChangeStatistics {
  symbol?: string;
}

export interface IGetSymbolPriceTicker {
  symbol?: string;
}

export interface IGetSymbolPriceTickerV2 {
  symbol?: string;
}

export interface IGetSymbolOrderBookTicker {
  symbol?: string;
}

export interface IGetOpenInterest {
  symbol: string;
}

export interface IGetQuarterlyContractSettlementPrice {
  pair: string;
}

export interface IGetTopTraderLongShortRatioAccounts {
  symbol: string;
  period: string;
  limit?: number; // default 30, max 500
  startTime?: number;
  endTime?: number;
}

export interface IGetTopTraderLongShortRatioPositions {
  symbol: string;
  period: string;
  limit?: number; // default 30, max 500
  startTime?: number;
  endTime?: number;
}

export interface IGetLongShortRatio {
  symbol: string;
  period: string;
  limit?: number; // default 30, max 500
  startTime?: number;
  endTime?: number;
}

export interface IGetTakerBuySellVolume {
  symbol: string;
  period: string;
  limit?: number; // default 30, max 500
  startTime?: number;
  endTime?: number;
}

export interface IGetBasis {
  pair: string;
  contractType: "CURRENT_QUARTER" | "NEXT_QUARTER" | "PERPETUAL";
  period: string;
  limit?: number; // default 30, max 500
  startTime?: number;
  endTime?: number;
}

export interface IGetCompositeIndexSymbolInformation {
  symbol?: string;
}

export interface IGetMultiAssetsModeAssetIndex {
  symbol?: string;
}

export interface IQueryIndexPriceConstituents {
  symbol: string;
}

export interface IChangePositionMode {
  dualSidePosition: string; // "true": Hedge Mode; "false": One-way Mode
}

export interface IChangeMultiAssetsMode {
  multiAssetsMargin: string; // "true": Multi-Assets Mode; "false": Single-Asset Mode
}

export interface INewOrder {
  symbol: string;
  side: "SELL" | "BUY";
  positionSide?: "BOTH" | "LONG" | "SHORT";
  type: "LIMIT" | "MARKET" | "STOP" | "TAKE_PROFIT" | "STOP_MARKET" | "TAKE_PROFIT_MARKET" | "TRAILING_STOP_MARKET";
  timeInForce?: string;
  quantity?: number; // Cannot be sent with closePosition=true(Close-All)
  reduceOnly?: string; // "true" or "false". default "false". Cannot be sent in Hedge Mode; cannot be sent with closePosition=true
  price?: string;
  newClientOrderId?: string;
  stopPrice?: number; // Used with STOP/STOP_MARKET or TAKE_PROFIT/TAKE_PROFIT_MARKET orders.
  closePosition?: string; // true, false；Close-All，used with STOP_MARKET or TAKE_PROFIT_MARKET.
  activationPrice?: number; // Used with TRAILING_STOP_MARKET orders, default as the latest price(supporting different workingType)
  callbackRate?: number; // Used with TRAILING_STOP_MARKET orders, min 0.1, max 10, where 1 for 1%
  workingType?: "MARK_PRICE" | "CONTRACT_PRICE" | "CONTRACT_PRICE";
  priceProtect?: "TRUE" | "FALSE"; // "TRUE" or "FALSE", default "FALSE". Used with STOP/STOP_MARKET or TAKE_PROFIT/TAKE_PROFIT_MARKET orders.
  newOrderRespType?: "ACK" | "RESULT";
  priceMatch?: string; // only avaliable for LIMIT/STOP/TAKE_PROFIT order; can be set to OPPONENT/ OPPONENT_5/ OPPONENT_10/ OPPONENT_20: /QUEUE/ QUEUE_5/ QUEUE_10/ QUEUE_20; Can't be passed together with price
  selfTradePreventionMode?: "NONE" | "EXPIRE_TAKER" | "EXPIRE_MAKER" | "EXPIRE_BOTH";
  goodTillDate?: number; // order cancel time for timeInForce GTD, mandatory when timeInforce set to GTD; order the timestamp only retains second-level precision, ms part will be ignored; The goodTillDate timestamp must be greater than the current time plus 600 seconds and smaller than 253402300799000
}

export type INewLimitOrder = Pick<INewOrder, "symbol" | "side"> & {
  timeInForce: string;
  quantity: number;
  price: string;
};

export type INewMarketOrder = Pick<INewOrder, "symbol" | "side"> & {
  quantity: number;
};

export type INewStopOrder = Pick<INewOrder, "symbol" | "side"> & {
  quantity: number;
  price: string;
  stopPrice: number;
};

export type INewTakeProfitOrder = Pick<INewOrder, "symbol" | "side"> & {
  quantity: number;
  price: string;
  stopPrice: number;
};

export type INewStopMarketOrder = Pick<INewOrder, "symbol" | "side"> & {
  stopPrice: number;
};

export type INewTakeProfitMarketOrder = Pick<INewOrder, "symbol" | "side"> & {
  stopPrice: number;
};

export type INewTrallingStopMarketOrder = Pick<INewOrder, "symbol" | "side"> & {
  quantity: number;
  callbackRate: number;
};

export interface IPlaceMultipleOrders {
  symbol: string;
  side: "SELL" | "BUY";
  positionSide?: "BOTH" | "LONG" | "SHORT";
  type: "LIMIT" | "MARKET" | "STOP" | "TAKE_PROFIT" | "STOP_MARKET" | "TAKE_PROFIT_MARKET" | "TRAILING_STOP_MARKET";
  timeInForce?: string;
  quantity: number;
  reduceOnly?: "true" | "false"; // "true" or "false". default "false".
  price?: number;
  newClientOrderId?: string;
  stopPrice?: number;
  activationPrice?: number;
  callbackRate?: number;
  workingType?: string;
  priceProtect?: "TRUE" | "FALSE"; // "TRUE" or "FALSE", default "FALSE". Used with STOP/STOP_MARKET or TAKE_PROFIT/TAKE_PROFIT_MARKET orders.
  newOrderRespType?: "ACK" | "RESULT";
  priceMatch?: string;
  selfTradePreventionMode?: "NONE" | "EXPIRE_TAKER" | "EXPIRE_MAKER" | "EXPIRE_BOTH";
  goodTillDate?: number;
}

export interface IModifyOrder {
  orderId?: number;
  origClientOrderId?: string;
  symbol: string;
  side: "SELL" | "BUY";
  quantity: number;
  price: number;
  priceMatch?: number;
}

export interface IModifyMultipleOrder {
  batchOrders: IModifyOrder[];
}

export interface IGetOrderModifyHistory {
  symbol: string;
  orderId?: number;
  origClientOrderId?: string;
  startTime?: number;
  endTime?: number;
  limit?: number;
}

export interface IQueryOrder {
  symbol: string;
  orderId?: number;
  origClientOrderId?: string;
}

export interface ICancelOrder {
  symbol: string;
  orderId?: number;
  origClientOrderId?: string;
}

export interface ICancelAllOpenOrders {
  symbol: string;
}

export interface IGetCurrentAllOpenOrders {
  symbol: string;
}
