import OrderActionType from './order.types';

export const createOrderStart = (data) => ({
  type: OrderActionType.CREATE_ORDER_START,
  payload: data,
});

export const createOrderSuccess = (data) => ({
  type: OrderActionType.CREATE_ORDER_SUCCESS,
  payload: data,
});

export const createOrderFailure = (error) => ({
  type: OrderActionType.CREATE_ORDER_FAILURE,
  payload: error,
});

export const createOrderRespReset = () => ({
  type: OrderActionType.CREATE_ORDER_RESPONSE_RESET,
});

export const createOrderRespChanged = () => ({
  type: OrderActionType.CREATE_ORDER_RESPONSE_CHANGED,
});