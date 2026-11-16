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