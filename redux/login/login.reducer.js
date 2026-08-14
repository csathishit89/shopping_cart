/* eslint-disable import/no-unresolved */
import LoginActionType from './login.types';
import { decodeApiResponse } from '../common.utils';

const INITIAL_STATE = {
  loginResponseChanged: null,
  decodeLoginResponse: null,
  loginWhiteListStorage: [],
  langType: 'en',
  appVersionResponse: null,
  userDetailsResponse: null,
  generalDataResp: null,
  generalData: [],
};

const loginReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LoginActionType.LOGIN_USER_RESPONSE_SUCCESS:
      return {
        ...state,
        loginResponseChanged: action.payload,
        decodeLoginResponse: decodeApiResponse(action.payload, 'AppLoginUserKey'),
        langType: 'en',
      };

    case LoginActionType.LOGIN_USER_RESPONSE_FAILURE:
      return { ...state, loginResponseChanged: action.payload, decodeLoginResponse: null };

    case LoginActionType.LOGIN_USER_RESPONSE_CHANGED:
      return { ...state, loginResponseChanged: null };

    case LoginActionType.ADD_PERSIST_LOGIN_DATA_START:
      return { ...state, loginWhiteListStorage: action.payload, decodeLoginResponse: null };

    case LoginActionType.LOGIN_USER_SINGOUT_CHANGED:
      return {
        ...state, loginResponseChanged: null, loginWhiteListStorage: [], langType: 'en',
      };

    case LoginActionType.SET_LANGUAGE_START:
      return {
        ...state,
        langType: action.payload,
      };

    case LoginActionType.GET_APP_VERSION_SUCCESS:
      return { ...state, appVersionResponse: action.payload, };

    case LoginActionType.GET_APP_VERSION_FAILURE:
      return { ...state, appVersionResponse: action.payload, };

    case LoginActionType.GET_APP_VERSION_CHANGED:
      return { ...state, appVersionResponse: null,  };

      case LoginActionType.GET_USER_DETAILS_SUCCESS:
        return { ...state, decodeLoginResponse: decodeApiResponse(action.payload, 'AppLoginUserKey'), userDetails: 'SUCCESS'};
  
      case LoginActionType.GET_USER_DETAILS_FAILURE:
        return { ...state, decodeLoginResponse: null, userDetails: 'FAILURE' };
  
      case LoginActionType.GET_USER_DETAILS_CHANGED:
        return { ...state, userDetails: null,  };

    case LoginActionType.GET_APP_GENERAL_DATA_SUCCESS:
      return {
        ...state,
        generalDataResp: action.payload,
        generalData: decodeApiResponse(action.payload, 'AppGeneralDataToken'),
      };

    case LoginActionType.GET_APP_GENERAL_DATA_FAILURE:
      return { ...state, generalDataResp: action.payload };

    case LoginActionType.GET_APP_GENERAL_DATA_CHANGED:
      return { ...state, generalDataResp: null };

    default:
      return state;
  }
};

export default loginReducer;