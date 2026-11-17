import { createSelector } from 'reselect';

const selectOrderState = (state) => state.order;

export const selectCreateOrderData = createSelector(
  [selectOrderState],
  (order) => order.createOrderData,
);

export const selectCreateOrderResponse = createSelector(
  [selectOrderState],
  (order) => order.createOrderResponse,
);

export const selectOrderResponseData = createSelector(
  [selectOrderState],
  (order) => order.fetchOrderData,
);

export const selectOrderResponse = createSelector(
  [selectOrderState],
  (order) => order.fetchOrderResponse,
);
