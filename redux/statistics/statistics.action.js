import StatisticsActionType from './statistics.types';

// Total Orders
export const fetchTotalOrdersStart = (data) => ({
  type: StatisticsActionType.FETCH_TOTAL_ORDERS_START,
  payload: data,
});

export const fetchTotalOrdersSuccess = (data) => ({
  type: StatisticsActionType.FETCH_TOTAL_ORDERS_SUCCESS,
  payload: data,
});

export const fetchTotalOrdersFailure = (error) => ({
  type: StatisticsActionType.FETCH_TOTAL_ORDERS_FAILURE,
  payload: error,
});

export const fetchTotalOrdersRespReset = () => ({
  type: StatisticsActionType.FETCH_TOTAL_ORDERS_RESPONSE_RESET,
});

export const fetchTotalOrdersRespChanged = () => ({
  type: StatisticsActionType.FETCH_TOTAL_ORDERS_RESPONSE_CHANGED,
});

// Total Revenue & Profit
export const fetchTotalRevenueProfitStart = (data) => ({
  type: StatisticsActionType.FETCH_TOTAL_REVENUE_PROFIT_START,
  payload: data,
});

export const fetchTotalRevenueProfitSuccess = (data) => ({
  type: StatisticsActionType.FETCH_TOTAL_REVENUE_PROFIT_SUCCESS,
  payload: data,
});

export const fetchTotalRevenueProfitFailure = (error) => ({
  type: StatisticsActionType.FETCH_TOTAL_REVENUE_PROFIT_FAILURE,
  payload: error,
});

export const fetchTotalRevenueProfitRespReset = () => ({
  type: StatisticsActionType.FETCH_TOTAL_REVENUE_PROFIT_RESPONSE_RESET,
});

export const fetchTotalRevenueProfitRespChanged = () => ({
  type: StatisticsActionType.FETCH_TOTAL_REVENUE_PROFIT_RESPONSE_CHANGED,
});

// Top Ten Product Sales
export const fetchTopTenProductSalesStart = (data) => ({
  type: StatisticsActionType.FETCH_TOP_TEN_PRODUCT_SALES_START,
  payload: data,
});

export const fetchTopTenProductSalesSuccess = (data) => ({
  type: StatisticsActionType.FETCH_TOP_TEN_PRODUCT_SALES_SUCCESS,
  payload: data,
});

export const fetchTopTenProductSalesFailure = (error) => ({
  type: StatisticsActionType.FETCH_TOP_TEN_PRODUCT_SALES_FAILURE,
  payload: error,
});

export const fetchTopTenProductSalesRespReset = () => ({
  type: StatisticsActionType.FETCH_TOP_TEN_PRODUCT_SALES_RESPONSE_RESET,
});

export const fetchTopTenProductSalesRespChanged = () => ({
  type: StatisticsActionType.FETCH_TOP_TEN_PRODUCT_SALES_RESPONSE_CHANGED,
});