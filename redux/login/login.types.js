const LoginActionType = {
  /** ****************************** LOGIN *********************** */
  LOGIN_USER_SINGIN_START: 'login_user_signin_start',
  LOGIN_USER_RESPONSE_SUCCESS: 'login_user_response_success',
  LOGIN_USER_RESPONSE_FAILURE: 'login_user_response_failure',
  LOGIN_RESPONSE_REST_START: 'login_response_reset_start',
  LOGIN_USER_RESPONSE_CHANGED: 'login_user_response_changed',

  ADD_PERSIST_LOGIN_DATA_START: 'add_persist_login_data_start',

  LOGIN_USER_SINGOUT_START: 'login_user_signout_start',
  LOGIN_USER_SINGOUT_CHANGED: 'login_user_signout_changed',

  SET_LANGUAGE_START: 'set_language_start',
  
  GET_APP_VERSION_START: 'get_app_version_start',
  GET_APP_VERSION_SUCCESS: 'get_app_version_success',
  GET_APP_VERSION_FAILURE: 'get_app_version_failure',
  GET_APP_VERSION_RESET_START: 'get_app_version_reset_start',
  GET_APP_VERSION_CHANGED: 'get_app_version_changed',

  GET_APP_GENERAL_DATA_START: 'get_app_general_data_start',
  GET_APP_GENERAL_DATA_SUCCESS: 'get_app_general_data_success',
  GET_APP_GENERAL_DATA_FAILURE: 'get_app_general_data_failure',
  GET_APP_GENERAL_DATA_RESET_START: 'get_app_general_data_reset_start',
  GET_APP_GENERAL_DATA_CHANGED: 'get_app_general_data_changed',

  GET_USER_DETAILS_START: 'get_user_details_start',
  GET_USER_DETAILS_SUCCESS: 'get_user_details_success',
  GET_USER_DETAILS_FAILURE: 'get_user_details_failure',
  GET_USER_DETAILS_RESET_START: 'get_user_details_reset_start',
  GET_USER_DETAILS_CHANGED: 'get_user_details_changed',
};

export default LoginActionType;
