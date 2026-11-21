import { createSelector } from 'reselect';

const selectProductList = (state) => state.product;

export const selectProductResponseData = createSelector(
  [selectProductList],
  (product) => product.fetchProductData,
);

export const selectProductResponse = createSelector(
  [selectProductList],
  (product) => product.fetchProductResponse,
);

export const selectSaveProductNewInfoData = createSelector(
  [selectProductList],
  (product) => product.saveProductNewInfoData,
);

export const selectSaveProductNewInfoResponse = createSelector(
  [selectProductList],
  (product) => product.saveProductNewInfoResponse,
);

export const selectAddProductData = createSelector(
  [selectProductList],
  (product) => product.addProductData,
);

export const selectAddProductResponse = createSelector(
  [selectProductList],
  (product) => product.addProductResponse,
);
