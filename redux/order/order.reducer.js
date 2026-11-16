import OrderActionType from './order.types';
import { decodeApiResponse } from '../common.utils';

const INITIAL_STATE = {
  createOrderResponse: null,
  createOrderData: null,
};

const orderReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case OrderActionType.CREATE_ORDER_SUCCESS:
      return {
        ...state,
        createOrderResponse: action.payload,
        createOrderData: decodeApiResponse(action.payload, 'AddOrderDetailsKey'),
      };

    case OrderActionType.CREATE_ORDER_FAILURE:
      return { ...state, createOrderResponse: action.payload };

    case OrderActionType.CREATE_ORDER_RESPONSE_CHANGED:
      return { ...state, createOrderResponse: null };

    default:
      return state;
  }
};

export default orderReducer;