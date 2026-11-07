/* eslint-disable import/no-unresolved */
/* eslint-disable import/prefer-default-export */
import { createSelector } from 'reselect';

const selectCategoryList = (state) => state.category;

export const selectCategoryResponseData = createSelector(
  [selectCategoryList],
  (category) => category.fetchCategoryData,
);

export const selectCategoryResponse = createSelector(
  [selectCategoryList],
  (category) => category.fetchCategoryResponse,
);