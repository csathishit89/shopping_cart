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

export const saveProductNewInfoStart = (data) => ({
  type: ProductActionType.SAVE_PRODUCT_NEW_INFO_START,
  payload: data,
});

export const saveProductNewInfoSuccess = (data) => ({
  type: ProductActionType.SAVE_PRODUCT_NEW_INFO_SUCCESS,
  payload: data,
});

export const saveProductNewInfoFailure = (error) => ({
  type: ProductActionType.SAVE_PRODUCT_NEW_INFO_FAILURE,
  payload: error,
});

export const saveProductNewInfoRespReset = () => ({
  type: ProductActionType.SAVE_PRODUCT_NEW_INFO_RESPONSE_RESET,
});

export const saveProductNewInfoRespChanged = () => ({
  type: ProductActionType.SAVE_PRODUCT_NEW_INFO_RESPONSE_CHANGED,
});
