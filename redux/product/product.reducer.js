import ProductActionType from './product.types';
import { decodeApiResponse } from '../common.utils';

const INITIAL_STATE = {
  fetchProductResponse: null,
  fetchProductData: [],
};

const productReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ProductActionType.FETCH_PRODUCT_SUCCESS:
      return {
        ...state,
        fetchProductResponse: action.payload,
        fetchProductData: decodeApiResponse(action.payload, 'GetProductListKey'),
      };

    case ProductActionType.FETCH_PRODUCT_FAILURE:
      return { ...state, fetchProductResponse: action.payload };

    case ProductActionType.FETCH_PRODUCT_RESPONSE_CHANGED:
      return { ...state, fetchProductResponse: null };

    default:
      return state;
  }
};

export default productReducer;