import {
  takeLatest, put, all, call,
} from 'redux-saga/effects';
import ProductActionType from './product.types';
import { encodeJson } from '../encode-decode';
import { getProductList } from './product.services';
import { 
    getProductDataFailure, 
    getProductDataRespChanged, 
    getProductDataSuccess
} from './product.action';

export function* productGetDetails({ payload }) {
  try {
    const key = 'GetProductListKey';
    const jsonData = {
      ShopID: payload.shopID,
      CategoryID: payload.categoryID,
      DatabaseName: payload.databaseName,
      Secratekey: key,
    };
    const listData = encodeJson(jsonData, key);
    const responseData = yield call(getProductList, listData);
    if (responseData.data.statusCode === '100') {
      yield put(getProductDataFailure(responseData.data));
    } else {
      yield put(getProductDataSuccess(responseData.data));
    }
  } catch (error) {
    yield put(getProductDataFailure(error));
  }
}

export function* productGetDetailsReset() {
  yield put(getProductDataRespChanged());
}

export function* onProductGetStart() {
  yield takeLatest(ProductActionType.FETCH_PRODUCT_START, productGetDetails);
}

export function* onResetProductGetStart() {
  yield takeLatest(ProductActionType.FETCH_PRODUCT_RESPONSE_RESET, productGetDetailsReset);
}

export function* productSaga() {
  yield all([
    call(onProductGetStart),
    call(onResetProductGetStart),
  ]);
}