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

export const getOrderDataStart = (data) => ({
  type: OrderActionType.FETCH_ORDER_START,
  payload: data,
});

export const getOrderDataSuccess = (data) => ({
  type: OrderActionType.FETCH_ORDER_SUCCESS,
  payload: data,
});

export const getOrderDataFailure = (error) => ({
  type: OrderActionType.FETCH_ORDER_FAILURE,
  payload: error,
});

export const getOrderDataRespReset = () => ({
  type: OrderActionType.FETCH_ORDER_RESPONSE_RESET,
});

export const getOrderDataRespChanged = () => ({
  type: OrderActionType.FETCH_ORDER_RESPONSE_CHANGED,
});
