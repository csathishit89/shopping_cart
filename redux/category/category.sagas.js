import {
  takeLatest, put, all, call,
} from 'redux-saga/effects';
import CategoryActionType from './category.types';
import { encodeJson } from '../encode-decode';
import { getCategoryList } from './category.services';
import { 
    getCategoryDataFailure, 
    getCategoryDataRespChanged, 
    getCategoryDataSuccess
} from './category.action';


export function* categoryGetDetails({ payload }) {
  try {
    const key = 'GetCategoryListKey';
    const jsonData = {
      ShopID: payload.shopID,
      DatabaseName: payload.databaseName,
      Secratekey: key,
    };
    const listData = encodeJson(jsonData, key);
    const responseData = yield call(getCategoryList, listData);
    if (responseData.data.statusCode === '100') {
      yield put(getCategoryDataFailure(responseData.data));
    } else {
      yield put(getCategoryDataSuccess(responseData.data));
    }
  } catch (error) {
    yield put(getCategoryDataFailure(error));
  }
}

export function* categoryGetDetailsReset() {
  yield put(getCategoryDataRespChanged());
}

export function* onCategoryGetStart() {
  yield takeLatest(CategoryActionType.FETCH_CATEGORY_START, categoryGetDetails);
}

export function* onResetCategoryGetStart() {
  yield takeLatest(CategoryActionType.FETCH_CATEGORY_RESPONSE_RESET, categoryGetDetailsReset);
}

export function* categorySaga() {
  yield all([
    call(onCategoryGetStart),
    call(onResetCategoryGetStart),
  ]);
}
