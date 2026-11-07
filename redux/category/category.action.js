// eslint-disable-next-line import/no-unresolved
import CategoryActionType from './category.types';

export const getCategoryDataStart = (data) => ({
  type: CategoryActionType.FETCH_CATEGORY_START,
  payload: data,
});

export const getCategoryDataSuccess = (data) => ({
  type: CategoryActionType.FETCH_CATEGORY_SUCCESS,
  payload: data,
});

export const getCategoryDataFailure = (error) => ({
  type: CategoryActionType.FETCH_CATEGORY_FAILURE,
  payload: error,
});

export const getCategoryDataRespReset = () => ({
  type: CategoryActionType.FETCH_CATEGORY_RESPONSE_RESET,
});

export const getCategoryDataRespChanged = () => ({
  type: CategoryActionType.FETCH_CATEGORY_RESPONSE_CHANGED,
});