import { createSelector } from 'reselect';

const selectStatisticsState = (state) => state.statistics;

export const selectTotalOrdersData = createSelector(
  [selectStatisticsState],
  (statistics) => statistics.totalOrdersData,
);

export const selectTotalOrdersResponse = createSelector(
  [selectStatisticsState],
  (statistics) => statistics.totalOrdersResponse,
);

export const selectTotalRevenueProfitData = createSelector(
  [selectStatisticsState],
  (statistics) => statistics.totalRevenueProfitData,
);

export const selectTotalRevenueProfitResponse = createSelector(
  [selectStatisticsState],
  (statistics) => statistics.totalRevenueProfitResponse,
);

export const selectTopTenProductSalesData = createSelector(
  [selectStatisticsState],
  (statistics) => statistics.topTenProductSalesData,
);

export const selectTopTenProductSalesResponse = createSelector(
  [selectStatisticsState],
  (statistics) => statistics.topTenProductSalesResponse,
);