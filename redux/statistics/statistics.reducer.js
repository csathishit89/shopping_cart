import StatisticsActionType from './statistics.types';
import { decodeApiResponse } from '../common.utils';

const INITIAL_STATE = {
  totalOrdersResponse: null,
  totalOrdersData: null,
  totalRevenueProfitResponse: null,
  totalRevenueProfitData: null,
  topTenProductSalesResponse: null,
  topTenProductSalesData: null,
};

const statisticsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case StatisticsActionType.FETCH_TOTAL_ORDERS_SUCCESS:
      return {
        ...state,
        totalOrdersResponse: action.payload,
        totalOrdersData: decodeApiResponse(action.payload, 'FetchTotalOrderDetailsKey'),
      };

    case StatisticsActionType.FETCH_TOTAL_ORDERS_FAILURE:
      return { ...state, totalOrdersResponse: action.payload };

    case StatisticsActionType.FETCH_TOTAL_ORDERS_RESPONSE_CHANGED:
      return { ...state, totalOrdersResponse: null };

    case StatisticsActionType.FETCH_TOTAL_REVENUE_PROFIT_SUCCESS:
      return {
        ...state,
        totalRevenueProfitResponse: action.payload,
        totalRevenueProfitData: decodeApiResponse(
          action.payload,
          'FetchTotalRevenueProfitDetailsKey',
        ),
      };

    case StatisticsActionType.FETCH_TOTAL_REVENUE_PROFIT_FAILURE:
      return { ...state, totalRevenueProfitResponse: action.payload };

    case StatisticsActionType.FETCH_TOTAL_REVENUE_PROFIT_RESPONSE_CHANGED:
      return { ...state, totalRevenueProfitResponse: null };

    case StatisticsActionType.FETCH_TOP_TEN_PRODUCT_SALES_SUCCESS:
      return {
        ...state,
        topTenProductSalesResponse: action.payload,
        topTenProductSalesData: decodeApiResponse(action.payload, 'FetchTopTenProdutSalesInfoKey'),
      };

    case StatisticsActionType.FETCH_TOP_TEN_PRODUCT_SALES_FAILURE:
      return { ...state, topTenProductSalesResponse: action.payload };

    case StatisticsActionType.FETCH_TOP_TEN_PRODUCT_SALES_RESPONSE_CHANGED:
      return { ...state, topTenProductSalesResponse: null };

    default:
      return state;
  }
};

export default statisticsReducer;