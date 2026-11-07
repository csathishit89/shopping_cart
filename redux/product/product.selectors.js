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