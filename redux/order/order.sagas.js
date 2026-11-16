import {
  takeLatest, put, all, call,
} from 'redux-saga/effects';
import OrderActionType from './order.types';
import { encodeJson } from '../encode-decode';
import { createOrderService } from './order.services';
import { 
    createOrderFailure, 
    createOrderRespChanged, 
    createOrderSuccess
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

export function* orderSaga() {
  yield all([
    call(onCreateOrderStart),
    call(onResetCreateOrderStart),
  ]);
}