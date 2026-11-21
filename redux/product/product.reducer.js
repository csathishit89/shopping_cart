import ProductActionType from './product.types';
import { decodeApiResponse } from '../common.utils';

const INITIAL_STATE = {
  fetchProductResponse: null,
  fetchProductData: [],
  saveProductNewInfoResponse: null,
  saveProductNewInfoData: [],
  addProductResponse: null,
  addProductData: []
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
    
    case ProductActionType.SAVE_PRODUCT_NEW_INFO_SUCCESS:
      return {
        ...state,
        saveProductNewInfoResponse: action.payload,
        saveProductNewInfoData: decodeApiResponse(action.payload, 'SaveProductNewInfoKey'),
      };

    case ProductActionType.SAVE_PRODUCT_NEW_INFO_FAILURE:
      return { ...state, saveProductNewInfoResponse: action.payload };

    case ProductActionType.SAVE_PRODUCT_NEW_INFO_RESPONSE_CHANGED:
      return { ...state, saveProductNewInfoResponse: null };

    case ProductActionType.ADD_PRODUCT_SUCCESS:
      return {
        ...state,
        addProductResponse: action.payload,
        addProductData: decodeApiResponse(action.payload, 'AddProductKey'),
      };

    case ProductActionType.ADD_PRODUCT_FAILURE:
      return { ...state, addProductResponse: action.payload };

    case ProductActionType.ADD_PRODUCT_RESPONSE_CHANGED:
      return { ...state, addProductResponse: null };

    default:
      return state;
  }
};

export default productReducer;