/* eslint-disable import/no-unresolved */
import CategoryActionType from './category.types';
import { decodeApiResponse } from '../common.utils';

const INITIAL_STATE = {
  fetchCategoryResponse: null,
	fetchCategoryData: [],
};

const categoryReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CategoryActionType.FETCH_CATEGORY_SUCCESS:
			return {
				...state,
				fetchCategoryResponse: action.payload,
				fetchCategoryData: decodeApiResponse(action.payload, 'GetCategoryListKey'),
			};

		case CategoryActionType.FETCH_CATEGORY_FAILURE:
			return { ...state, fetchCategoryResponse: action.payload };

		case CategoryActionType.FETCH_CATEGORY_RESPONSE_CHANGED:
			return { ...state, fetchCategoryResponse: null };

    default:
      return state;
  }
};

export default categoryReducer;