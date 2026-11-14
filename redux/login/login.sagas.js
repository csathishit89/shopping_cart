import {
  takeLatest, put, all, call,
} from 'redux-saga/effects';
import LoginActionType from './login.types';
import { encodeJson } from '../encode-decode';
import { getAppVersionDetails, userLoginVerify, fetchGeneralDataAPI, getUserDetails } from './login.services';
import {
  userLoginSuccess,
  userLoginFailure,
  loginUserResponseChanged,
  logoutResponseChanged,
  getAppVesrionFailure,
  getAppVesrionSuccess,
  getAppVesrionResponseChanged,
  getUserDetailsFailure,
  getUserDetailsSuccess,
  getUserDetailsResponseChanged,
  getAppGeneralDataResponseChanged,
  getAppGeneralDataSuccess,
  getAppGeneralDataFailure,
} from './login.action';

export function* userSignIn({ payload }) {
  try {
    const key = 'UserLoginVerify';
    const jsonData = {
      UserName: payload.phoneNumber,
      UserPassword: payload.loginPassword,
      Secratekey: key,
    };
    const loginData = encodeJson(jsonData, key);
    const responseData = yield call(userLoginVerify, loginData);
    if (responseData.data.statusCode === '100') {
      yield put(userLoginFailure(responseData.data));
    } else {
      yield put(userLoginSuccess(responseData.data));
    }
  } catch (error) {
    yield put(userLoginFailure(error));
  }
}

export function* makeUserLoginResponse() {
  yield put(loginUserResponseChanged());
}

export function* makeLogoutChanged() {
  yield put(logoutResponseChanged());
}

export function* onAppSignInStart() {
  yield takeLatest(LoginActionType.LOGIN_USER_SINGIN_START, userSignIn);
}

export function* userResponseRest() {
  yield takeLatest(LoginActionType.LOGIN_RESPONSE_REST_START, makeUserLoginResponse);
}

export function* onLogoutStateReset() {
  yield takeLatest(LoginActionType.LOGIN_USER_SINGOUT_START, makeLogoutChanged);
}

export function* appVersionCall() {
  try {
    const responseData = yield call(getAppVersionDetails);
    if (responseData.data.statusCode === '100') {
      yield put(getAppVesrionFailure(responseData.data));
    } else {
      yield put(getAppVesrionSuccess(responseData.data));
    }
  } catch (error) {
    yield put(getAppVesrionFailure(error));
  }
}

export function* versionRespClear() {
  yield put(getAppVesrionResponseChanged());
}

export function* onGetVersionStart() {
  yield takeLatest(LoginActionType.GET_APP_VERSION_START, appVersionCall);
}

export function* onGetVersionRespStart() {
  yield takeLatest(LoginActionType.GET_APP_VERSION_RESET_START, versionRespClear);
}

export function* getUserDetailsCall({ payload }) {
  try {
    const key = 'AppLoginUserKey';
    const jsonData = {
      UserID: payload.userID,
      CompanyID: payload.companyID,
      DatabaseName: payload.databaseName,
      Secratekey: key,
    };
    const loginData = encodeJson(jsonData, key);
    const responseData = yield call(getUserDetails, loginData);
    if (responseData.data.statusCode === '100') {
      yield put(getUserDetailsFailure(responseData.data));
    } else {
      yield put(getUserDetailsSuccess(responseData.data));
    }
  } catch (error) {
    yield put(getUserDetailsFailure(error));
  }
}

export function* userDetailsRespClear() {
  yield put(getUserDetailsResponseChanged());
}

export function* onGetUserDetailsStart() {
  yield takeLatest(LoginActionType.GET_USER_DETAILS_START, getUserDetailsCall);
}

export function* onGetUserDetailsRespStart() {
  yield takeLatest(LoginActionType.GET_USER_DETAILS_RESET_START, userDetailsRespClear);
}

export function* getGenaralData() {
  try {
    const responseData = yield call(fetchGeneralDataAPI);
    if (responseData.data.statusCode === '100') {
      yield put(getAppGeneralDataFailure(responseData.data));
    } else {
      yield put(getAppGeneralDataSuccess(responseData.data));
    }
  } catch (error) {
    yield put(getAppGeneralDataFailure(error));
  }
}

export function* generalDataRespChanged() {
  yield put(getAppGeneralDataResponseChanged());
}

export function* onFetchGeneralDataStart() {
  yield takeLatest(LoginActionType.GET_APP_GENERAL_DATA_START, getGenaralData);
}

export function* generalDataResponseRest() {
  yield takeLatest(LoginActionType.GET_APP_GENERAL_DATA_RESET_START, generalDataRespChanged);
}

export function* loginSaga() {
  yield all([
    call(onAppSignInStart),
    call(userResponseRest),
    call(onLogoutStateReset),
    call(onGetVersionStart),
    call(onGetVersionRespStart),
    call(onGetUserDetailsStart),
    call(onGetUserDetailsRespStart),
    call(onFetchGeneralDataStart),
    call(generalDataResponseRest),
  ]);
}
