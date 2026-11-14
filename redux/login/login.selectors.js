/* eslint-disable import/no-unresolved */
/* eslint-disable import/prefer-default-export */
import { createSelector } from 'reselect';

const selectLoginUser = (state) => state.login;

export const selectUserLogin = createSelector(
  [selectLoginUser],
  (login) => login.loginResponseChanged,
);

export const selectDecodeLoginRespone = createSelector(
  [selectLoginUser],
  (login) => login.decodeLoginResponse,
);
 
export const selectUserDetails = createSelector(
  [selectLoginUser],
  (login) => login.userDetails,
);

export const getLoginDetails = createSelector(
  [selectLoginUser],
  (login) => {
    const { decodeLoginResponse } = login;
    let GeneralShopID = ''; let GeneralUserID = ''; let DatabaseName = ''; let UserID = '';  let UserName = ''; let UserPhoneNumber = ''; let UserType = ''; let CustomerID = ''; let ShopID='';

    if (decodeLoginResponse !== null) {
      if (decodeLoginResponse.length > 0) {
        GeneralShopID = decodeLoginResponse[0].GeneralShopID;
        GeneralUserID = decodeLoginResponse[0].GeneralUserID;
        DatabaseName = decodeLoginResponse[0].DatabaseName;
        UserID = decodeLoginResponse[0].UserID;
        UserName = decodeLoginResponse[0].UserName;
        UserPhoneNumber = decodeLoginResponse[0].UserPhoneNumber;
        UserType = decodeLoginResponse[0].UserType;
        CustomerID = decodeLoginResponse[0].CustomerID;
        ShopID = decodeLoginResponse[0].ShopID;
      }
    }
    return [
      GeneralShopID,
      GeneralUserID,
      DatabaseName,
      UserID,
      UserName,
      UserPhoneNumber,
      UserType,
      CustomerID,
      ShopID
    ];
  },
);

export const selectedGetAppVersion = createSelector(
  [selectLoginUser],
  (login) => login.appVersionResponse,
);

export const loggedInDetails = createSelector(
  [selectLoginUser],
  (login) => login.loginWhiteListStorage,
);

export const getLoginData = createSelector(
  [selectLoginUser],
  (login) => {
    const { decodeLoginResponse } = login;
    let object = {
        GeneralShopID: '',
        GeneralUserID: '',
        DatabaseName: '',
        UserID: '',
        UserName: '',
        UserPhoneNumber: '',
        UserType: '',
        CustomerID: '',
        ShopID: '',
    };
    if (decodeLoginResponse !== null) {
      if (decodeLoginResponse.length > 0) {
        object = {
          GeneralShopID: decodeLoginResponse[0].GeneralShopID,
          GeneralUserID: decodeLoginResponse[0].GeneralUserID,
          DatabaseName: decodeLoginResponse[0].DatabaseName,
          UserID: decodeLoginResponse[0].UserID,
          UserName: decodeLoginResponse[0].UserName,
          UserPhoneNumber: decodeLoginResponse[0].UserPhoneNumber,
          UserType: decodeLoginResponse[0].UserType,
          CustomerID: decodeLoginResponse[0].CustomerID,
          ShopID: decodeLoginResponse[0].ShopID
        }
      }
    }
    return object;
  },
);

export const selectGeneralDataResp = createSelector(
  [selectLoginUser],
  (login) => login.generalDataResp,
);

export const selectGeneralData = createSelector(
  [selectLoginUser],
  (login) => login.generalData,
);
