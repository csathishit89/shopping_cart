import ProductActionType from './product.types';

export const getProductDataStart = (data) => ({
  type: ProductActionType.FETCH_PRODUCT_START,
  payload: data,
});

export const getProductDataSuccess = (data) => ({
  type: ProductActionType.FETCH_PRODUCT_SUCCESS,
  payload: data,
});

export const getProductDataFailure = (error) => ({
  type: ProductActionType.FETCH_PRODUCT_FAILURE,
  payload: error,
});

export const getProductDataRespReset = () => ({
  type: ProductActionType.FETCH_PRODUCT_RESPONSE_RESET,
});

export const getProductDataRespChanged = () => ({
  type: ProductActionType.FETCH_PRODUCT_RESPONSE_CHANGED,
});