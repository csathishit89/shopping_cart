import {
  takeLatest, put, all, call,
} from 'redux-saga/effects';
import OrderActionType from './order.types';
import { encodeJson } from '../encode-decode';
import { createOrderService, getOrderList } from './order.services';
import { 
    createOrderFailure, 
    createOrderRespChanged, 
    createOrderSuccess,
    getOrderDataFailure, 
    getOrderDataRespChanged, 
    getOrderDataSuccess
} from './order.action';

export function* createOrderDetailsSaga({ payload }) {
  try {
    const key = 'AddOrderDetailsKey';
    const jsonData = {
      ShopID: payload.ShopID,
      DatabaseName: payload.DatabaseName,
      CustomerName: payload.CustomerName,
      CustomerPhoneNumber: payload.CustomerPhoneNumber,
      InvoiceTotalAmount: payload.InvoiceTotalAmount,
      CreatedBy: payload.CreatedBy,
      Items: payload.Items,
      Secratekey: key,
    };
    const tokenData = encodeJson(jsonData, key);
    const responseData = yield call(createOrderService, tokenData);
    
    if (responseData.data.statusCode === '100' || responseData.data.statusCode === '102' || responseData.data.statusCode === '111') {
      yield put(createOrderFailure(responseData.data));
    } else {
      yield put(createOrderSuccess(responseData.data));
    }
  } catch (error) {
    yield put(createOrderFailure(error));
  }
}

export function* createOrderDetailsResetSaga() {
  yield put(createOrderRespChanged());
}

export function* onCreateOrderStart() {
  yield takeLatest(OrderActionType.CREATE_ORDER_START, createOrderDetailsSaga);
}

export function* onResetCreateOrderStart() {
  yield takeLatest(OrderActionType.CREATE_ORDER_RESPONSE_RESET, createOrderDetailsResetSaga);
}

export function* orderGetDetails({ payload }) {
  try {
    const key = 'GetOrderListKey';
    const jsonData = {
      ShopID: payload.shopID,
      CustomerID: payload.customerID,
      DatabaseName: payload.databaseName,
      Secratekey: key,
    };
    const listData = encodeJson(jsonData, key);
    const responseData = yield call(getOrderList, listData);
    if (responseData.data.statusCode === '100') {
      yield put(getOrderDataFailure(responseData.data));
    } else {
      yield put(getOrderDataSuccess(responseData.data));
    }
  } catch (error) {
    yield put(getOrderDataFailure(error));
  }
}

export function* orderGetDetailsReset() {
  yield put(getOrderDataRespChanged());
}

export function* onOrderGetStart() {
  yield takeLatest(OrderActionType.FETCH_ORDER_START, orderGetDetails);
}

export function* onResetOrderGetStart() {
  yield takeLatest(OrderActionType.FETCH_ORDER_RESPONSE_RESET, orderGetDetailsReset);
}

export function* orderSaga() {
  yield all([
    call(onCreateOrderStart),
    call(onResetCreateOrderStart),
    call(onOrderGetStart),
    call(onResetOrderGetStart),
  ]);
}