// eslint-disable-next-line import/no-unresolved
import LoginActionType from './login.types';

export const userLoginStart = (userCredentials) => ({
  type: LoginActionType.LOGIN_USER_SINGIN_START,
  payload: userCredentials,
});

export const userLoginSuccess = (user) => ({
  type: LoginActionType.LOGIN_USER_RESPONSE_SUCCESS,
  payload: user,
});

export const userLoginFailure = (error) => ({
  type: LoginActionType.LOGIN_USER_RESPONSE_FAILURE,
  payload: error,
});

export const loginResponseResetStart = () => ({
  type: LoginActionType.LOGIN_RESPONSE_REST_START,
});

export const loginUserResponseChanged = () => ({
  type: LoginActionType.LOGIN_USER_RESPONSE_CHANGED,
});

export const logoutStart = () => ({
  type: LoginActionType.LOGIN_USER_SINGOUT_START,
});


export const logoutResponseChanged = () => ({
  type: LoginActionType.LOGIN_USER_SINGOUT_CHANGED,
});

export const addPersistDataStart = (loginData) => ({
  type: LoginActionType.ADD_PERSIST_LOGIN_DATA_START,
  payload: loginData,
});

export const getAppGeneralDataStart = (userCredentials) => ({
  type: LoginActionType.GET_APP_GENERAL_DATA_START,
  payload: userCredentials,
});

export const getAppGeneralDataSuccess = (user) => ({
  type: LoginActionType.GET_APP_GENERAL_DATA_SUCCESS,
  payload: user,
});

export const getAppGeneralDataFailure = (error) => ({
  type: LoginActionType.GET_APP_GENERAL_DATA_FAILURE,
  payload: error,
});

export const getAppGeneralDataResetStart = () => ({
  type: LoginActionType.GET_APP_GENERAL_DATA_RESET_START,
});

export const getAppGeneralDataResponseChanged = () => ({
  type: LoginActionType.GET_APP_GENERAL_DATA_CHANGED,
});

export const getAppVesrionStart = () => ({
  type: LoginActionType.GET_APP_VERSION_START,
});

export const getAppVesrionSuccess = (data) => ({
  type: LoginActionType.GET_APP_VERSION_SUCCESS,
  payload: data,
});

export const getAppVesrionFailure = (error) => ({
  type: LoginActionType.GET_APP_VERSION_FAILURE,
  payload: error,
});

export const getAppVesrionResetStart = () => ({
  type: LoginActionType.GET_APP_VERSION_RESET_START,
});

export const getAppVesrionResponseChanged = () => ({
  type: LoginActionType.GET_APP_VERSION_CHANGED,
});

export const getUserDetailsStart = (userCredentials) => ({
  type: LoginActionType.GET_USER_DETAILS_START,
  payload: userCredentials,
});

export const getUserDetailsSuccess = (data) => ({
  type: LoginActionType.GET_USER_DETAILS_SUCCESS,
  payload: data,
});

export const getUserDetailsFailure = (error) => ({
  type: LoginActionType.GET_USER_DETAILS_FAILURE,
  payload: error,
});

export const getUserDetailsResetStart = () => ({
  type: LoginActionType.GET_USER_DETAILS_RESET_START,
});

export const getUserDetailsResponseChanged = () => ({
  type: LoginActionType.GET_USER_DETAILS_CHANGED,
});
