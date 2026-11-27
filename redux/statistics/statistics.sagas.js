import {
  takeLatest,
  put,
  all,
  call,
} from 'redux-saga/effects';
import StatisticsActionType from './statistics.types';
import { encodeJson } from '../encode-decode';
import {
  fetchTotalOrdersService,
  fetchTotalRevenueProfitService,
  fetchTopTenProductSalesService,
} from './statistics.services';
import {
  fetchTotalOrdersSuccess,
  fetchTotalOrdersFailure,
  fetchTotalOrdersRespChanged,
  fetchTotalRevenueProfitSuccess,
  fetchTotalRevenueProfitFailure,
  fetchTotalRevenueProfitRespChanged,
  fetchTopTenProductSalesSuccess,
  fetchTopTenProductSalesFailure,
  fetchTopTenProductSalesRespChanged,
} from './statistics.action';

const FAILURE_CODES = ['100', '102'];

export function* fetchTotalOrdersSaga({ payload }) {
  try {
    const key = 'FetchTotalOrderDetailsKey';
    const jsonData = {
      ShopID: payload.ShopID ?? payload.shopID,
      DatabaseName: payload.DatabaseName ?? payload.databaseName,
      Secratekey: key,
    };
    const tokenData = encodeJson(jsonData, key);
    const responseData = yield call(fetchTotalOrdersService, tokenData);

    if (FAILURE_CODES.includes(responseData.data.statusCode)) {
      yield put(fetchTotalOrdersFailure(responseData.data));
    } else {
      yield put(fetchTotalOrdersSuccess(responseData.data));
    }
  } catch (error) {
    yield put(fetchTotalOrdersFailure(error));
  }
}

export function* fetchTotalOrdersResetSaga() {
  yield put(fetchTotalOrdersRespChanged());
}

export function* onFetchTotalOrdersStart() {
  yield takeLatest(StatisticsActionType.FETCH_TOTAL_ORDERS_START, fetchTotalOrdersSaga);
}

export function* onResetFetchTotalOrdersStart() {
  yield takeLatest(StatisticsActionType.FETCH_TOTAL_ORDERS_RESPONSE_RESET, fetchTotalOrdersResetSaga);
}

export function* fetchTotalRevenueProfitSaga({ payload }) {
  try {
    const key = 'FetchTotalRevenueProfitDetailsKey';
    const jsonData = {
      ShopID: payload.ShopID ?? payload.shopID,
      DatabaseName: payload.DatabaseName ?? payload.databaseName,
      Secratekey: key,
    };
    const tokenData = encodeJson(jsonData, key);
    const responseData = yield call(fetchTotalRevenueProfitService, tokenData);
    if (FAILURE_CODES.includes(responseData.data.statusCode)) {
      yield put(fetchTotalRevenueProfitFailure(responseData.data));
    } else {
      yield put(fetchTotalRevenueProfitSuccess(responseData.data));
    }
  } catch (error) {
    yield put(fetchTotalRevenueProfitFailure(error));
  }
}

export function* fetchTotalRevenueProfitResetSaga() {
  yield put(fetchTotalRevenueProfitRespChanged());
}

export function* onFetchTotalRevenueProfitStart() {
  yield takeLatest(
    StatisticsActionType.FETCH_TOTAL_REVENUE_PROFIT_START,
    fetchTotalRevenueProfitSaga,
  );
}

export function* onResetFetchTotalRevenueProfitStart() {
  yield takeLatest(
    StatisticsActionType.FETCH_TOTAL_REVENUE_PROFIT_RESPONSE_RESET,
    fetchTotalRevenueProfitResetSaga,
  );
}

export function* fetchTopTenProductSalesSaga({ payload }) {
  try {
    const key = 'FetchTopTenProdutSalesInfoKey';
    const jsonData = {
      ShopID: payload.ShopID ?? payload.shopID,
      DatabaseName: payload.DatabaseName ?? payload.databaseName,
      Secratekey: key,
    };
    const tokenData = encodeJson(jsonData, key);
    const responseData = yield call(fetchTopTenProductSalesService, tokenData);

    if (FAILURE_CODES.includes(responseData.data.statusCode)) {
      yield put(fetchTopTenProductSalesFailure(responseData.data));
    } else {
      yield put(fetchTopTenProductSalesSuccess(responseData.data));
    }
  } catch (error) {
    yield put(fetchTopTenProductSalesFailure(error));
  }
}

export function* fetchTopTenProductSalesResetSaga() {
  yield put(fetchTopTenProductSalesRespChanged());
}

export function* onFetchTopTenProductSalesStart() {
  yield takeLatest(
    StatisticsActionType.FETCH_TOP_TEN_PRODUCT_SALES_START,
    fetchTopTenProductSalesSaga,
  );
}

export function* onResetFetchTopTenProductSalesStart() {
  yield takeLatest(
    StatisticsActionType.FETCH_TOP_TEN_PRODUCT_SALES_RESPONSE_RESET,
    fetchTopTenProductSalesResetSaga,
  );
}

export function* statisticsSaga() {
  yield all([
    call(onFetchTotalOrdersStart),
    call(onResetFetchTotalOrdersStart),
    call(onFetchTotalRevenueProfitStart),
    call(onResetFetchTotalRevenueProfitStart),
    call(onFetchTopTenProductSalesStart),
    call(onResetFetchTopTenProductSalesStart),
  ]);
}