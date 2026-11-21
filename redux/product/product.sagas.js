import {
  takeLatest, put, all, call,
} from 'redux-saga/effects';
import ProductActionType from './product.types';
import { encodeJson } from '../encode-decode';
import { getProductList, sendProductNewInfo, addProduct } from './product.services';
import { 
    getProductDataFailure, 
    getProductDataRespChanged, 
    getProductDataSuccess,
    saveProductNewInfoSuccess,
    saveProductNewInfoFailure,
    saveProductNewInfoRespChanged,
    addProductFailure,
    addProductSuccess,
    addProductRespChanged    
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

export function* saveProductNewInfoSaga({ payload }) {
  try {
    const key = 'SaveProductNewInfoKey';
    const jsonData = {
      ShopID: payload.ShopID,
      DatabaseName: payload.DatabaseName,
      ProductID: payload.ProductID,
      NewMRP_Price: payload.NewMRP_Price,
      Secratekey: key,
    };
    const tokenData = encodeJson(jsonData, key);
    const responseData = yield call(sendProductNewInfo, tokenData);
    
    if (responseData.data.statusCode === '100' || responseData.data.statusCode === '102' || responseData.data.statusCode === '111') {
      yield put(saveProductNewInfoFailure(responseData.data));
    } else {
      yield put(saveProductNewInfoSuccess(responseData.data));
    }
  } catch (error) {
    yield put(saveProductNewInfoFailure(error));
  }
}

export function* saveProductNewInfoResetSaga() {
  yield put(saveProductNewInfoRespChanged());
}

export function* onSaveProductNewInfoStart() {
  yield takeLatest(ProductActionType.SAVE_PRODUCT_NEW_INFO_START, saveProductNewInfoSaga);
}

export function* onResetSaveProductNewInfoStart() {
  yield takeLatest(ProductActionType.SAVE_PRODUCT_NEW_INFO_RESPONSE_RESET, saveProductNewInfoResetSaga);
}

export function* addProductSaga({ payload }) {
  try {
    const key = 'AddProductKey';
    const jsonData = {
      ShopID: payload.shopID,
      DatabaseName: payload.databaseName,
      productName: payload.productName,
      categoryID: payload.categoryID,
      productImage: payload.productImage,
      quantity: payload.quantity,
      quantityType: payload.quantityType,
      mrpPrice: payload.mrpPrice,
      purchasePrice: payload.purchasePrice,
      profitPrice: payload.profitPrice,
      effectiveDateTime: payload.effectiveDateTime,
      isActive: payload.isActive,
    };
    console.log(jsonData);
    const tokenData = encodeJson(jsonData, key);
    const responseData = yield call(addProduct, tokenData);
    
    if (responseData.data.statusCode === '100' || responseData.data.statusCode === '102' || responseData.data.statusCode === '111') {
      yield put(addProductFailure(responseData.data));
    } else {
      yield put(addProductSuccess(responseData.data));
    }
  } catch (error) {
    yield put(addProductFailure(error));
  }
}

export function* addProductResetSaga() {
  yield put(addProductRespChanged());
}

export function* onAddProductStart() {
  yield takeLatest(ProductActionType.ADD_PRODUCT_START, addProductSaga);
}

export function* onResetAddProductStart() {
  yield takeLatest(ProductActionType.ADD_PRODUCT_RESPONSE_RESET, addProductResetSaga);
}

export function* productSaga() {
  yield all([
    call(onProductGetStart),
    call(onResetProductGetStart),
    call(onSaveProductNewInfoStart),
    call(onResetSaveProductNewInfoStart),
    call(onAddProductStart),
    call(onResetAddProductStart),
  ]);
}