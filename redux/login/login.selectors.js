/* eslint-disable import/no-unresolved */
/* eslint-disable import/prefer-default-export */
import { createSelector } from 'reselect';
import { I18n } from "i18n-js";

import en from '../../constants/language/en.json';
import ta from '../../constants/language/ta.json';
import hi from '../../constants/language/hi.json';
import ka from '../../constants/language/ka.json';

const selectLoginUser = (state) => state.SNlogin;

export const selectUserLogin = createSelector(
  [selectLoginUser],
  (SNlogin) => SNlogin.loginResponseChanged,
);

export const selectDecodeLoginRespone = createSelector(
  [selectLoginUser],
  (SNlogin) => SNlogin.decodeLoginResponse,
);

export const loggedInDetails = createSelector(
  [selectLoginUser],
  (SNlogin) => SNlogin.loginWhiteListStorage,
);

export const selectUserDetails = createSelector(
  [selectLoginUser],
  (SNlogin) => SNlogin.userDetails,
);

export const getLoginDetails = createSelector(
  [selectLoginUser],
  (SNlogin) => {
    const { loginWhiteListStorage } = SNlogin;
    let userID = ''; let companyID = ''; let databaseName = ''; let generalCompanyID = ''; let infogID = ''; let level = ''; let officerAttendenceMandatory = ''; let BranchIDs = ''; let isHighMarkCheck = ''; let isCollectionPhotoNeeded = ''; let isHighmarkMandatoryForApp = ''; let isHavingConsumer = ''; let isQrPaymentAllow = 0; let isBorrowerHighmarkMandatory = 0; let isOTPNeeded = 0; let isAuditingImageNeed = 0; let isNextFollowUpNeed = 0; let isRejectionNeedForFieldOfficer= 0;
    if (loginWhiteListStorage !== null) {
      if (loginWhiteListStorage.length > 0) {
        userID = loginWhiteListStorage[0].UserID;
        companyID = loginWhiteListStorage[0].UserCompanyID;
        databaseName = loginWhiteListStorage[0].DatabaseName;
        infogID = loginWhiteListStorage[0].infogID;
        level = loginWhiteListStorage[0].UserLevel;
        officerAttendenceMandatory = loginWhiteListStorage[0].IsOfficerAttendenceMandatory;
        generalCompanyID = loginWhiteListStorage[0].GeneralCompanyID;
        BranchIDs = loginWhiteListStorage[0].BranchID;
        isHighMarkCheck = loginWhiteListStorage[0].IsHighMarkCheck;
        isCollectionPhotoNeeded = loginWhiteListStorage[0].IsCollectionPhotoNeeded;
        isHighmarkMandatoryForApp = loginWhiteListStorage[0].isHighmarkMandatoryForApp;
        isHavingConsumer = loginWhiteListStorage[0].isHavingConsumer;
        isQrPaymentAllow = loginWhiteListStorage[0].isQrPaymentAllow;
        isBorrowerHighmarkMandatory = loginWhiteListStorage[0].isBorrowerHighmarkMandatory;
        isOTPNeeded = loginWhiteListStorage[0].isOTPNeeded;
        isAuditingImageNeed = loginWhiteListStorage[0].IsAuditingImageNeed;
        isNextFollowUpNeed = loginWhiteListStorage[0].IsNextFollowUpNeed;
        isRejectionNeedForFieldOfficer = loginWhiteListStorage[0].isRejectionNeedForFieldOfficer;
      }
    }
    return [
      userID,
      companyID,
      databaseName,
      infogID,
      level,
      officerAttendenceMandatory,
      generalCompanyID,
      BranchIDs,
      isHighMarkCheck,
      isCollectionPhotoNeeded,
      isHighmarkMandatoryForApp,
      isHavingConsumer,
      isQrPaymentAllow,
      isBorrowerHighmarkMandatory,
      isOTPNeeded,
      isAuditingImageNeed,
      isNextFollowUpNeed,
      isRejectionNeedForFieldOfficer,
    ];
  },
);

export const selectedLangType = createSelector(
  [selectLoginUser],
  (SNlogin) => SNlogin.langType,
);

export const changeLanguage = createSelector(
  [selectLoginUser],
  (SNlogin) => {
    const i18n = new I18n({
      en,
      ta,
      hi,
      ka,
    });
    i18n.defaultLocale = SNlogin.langType;
    i18n.locale = SNlogin.langType;
    i18n.enableFallback = true;
    return SNlogin.langType;
  },
);

export const selectedGetAppVersion = createSelector(
  [selectLoginUser],
  (SNlogin) => SNlogin.appVersionResponse,
);

export const getLoginData = createSelector(
  [selectLoginUser],
  (SNlogin) => {
    const { loginWhiteListStorage } = SNlogin;
    let object = {
      userID:'',
      companyID:'',
      companyPhoneNumber:'',
      databaseName:'',
      infogID:'',
      level:'',
      officerAttendenceMandatory:'',
      generalCompanyID:'',
      BranchIDs:'',
      isHighMarkCheck:'',
      isCollectionPhotoNeeded:'',
      isHighmarkMandatoryForApp:'',
      isNeedCoApplicantCBCheckAfterMember:0,
      isHighmarkDownloadNeededForApp:0,
      isHavingConsumer:'',
      isQrPaymentAllow:0,
      isBorrowerHighmarkMandatory:0,
      UserName: '',
      isOTPNeeded:0,
      isAuditingImageNeed:0,
      isNextFollowUpNeed:0,
      isRejectionNeedForFieldOfficer:0,
      restrictHouseVerification:0,
      isDigitalCollectionNeeded: 0,
      AndroidVersionForCamera: 0,
      IsCropNeeded: 0,
      CompanyCountry: '',
      CountryID: '',
      IsConsumerReportStaff: 0,
      IsEquifaxCheck: 0,
      IsEquifaxConsumer: 0,
      IsIndividualSavings: 0,
      IsGoldLoanAvailed: 0,
      IsIndividualLoanNeeded: 0,
      IsBusinessLoanAvailed: 0,
      ProvisionType: '',
      IsShowMandatoryTypeScreen: 0,
      CompanyName: '', 
      CompanyLogo: '',
      UserPhoneNumber: '',
      EmergencyContanct: '',
      IsAfterEODCollectionNeededForApp: 0,
      UserPassword: '',
      IsWaterMarkNeeded: 0,
      IsAutoWalletUtilizationNeeded: 0,
      IsBMCanApproveMemberFromMobileApp: 0,
      isManagerHighmarkMandatoryForApp: 0,
      IsCenterPageShowFromMobileApp: 0,
      IsGroupPageShowFromMobileApp: 0,
      SkipEquifaxCheck: 0,
      IsCollectionLocationNeeded: 0,
      IsQrCollectionNeedFromApp: 0,
      IsHouseLocationMandatory: 0,
      ShowAddMemberForLevel1App: 0,
      IsPrepaidCreditBureauCheck: 0,
    };
    if (loginWhiteListStorage !== null) {
      if (loginWhiteListStorage.length > 0) {
        object = {
          userID:loginWhiteListStorage[0].UserID,
          companyID: loginWhiteListStorage[0].UserCompanyID,
          companyPhoneNumber: loginWhiteListStorage[0].UsercompanyPhoneNumber,
          databaseName: loginWhiteListStorage[0].DatabaseName,
          infogID: loginWhiteListStorage[0].infogID,
          level: loginWhiteListStorage[0].UserLevel,
          officerAttendenceMandatory: loginWhiteListStorage[0].IsOfficerAttendenceMandatory,
          generalCompanyID: loginWhiteListStorage[0].GeneralCompanyID,
          BranchIDs: loginWhiteListStorage[0].BranchID,
          isHighMarkCheck: loginWhiteListStorage[0].IsHighMarkCheck,
          isCollectionPhotoNeeded: loginWhiteListStorage[0].IsCollectionPhotoNeeded,
          isHighmarkMandatoryForApp: loginWhiteListStorage[0].isHighmarkMandatoryForApp,
          isHighmarkDownloadNeededForApp: loginWhiteListStorage[0].isHighmarkDownloadNeededForApp,
          isHavingConsumer: loginWhiteListStorage[0].isHavingConsumer,
          isQrPaymentAllow: loginWhiteListStorage[0].isQrPaymentAllow,
          isBorrowerHighmarkMandatory: loginWhiteListStorage[0].isBorrowerHighmarkMandatory,
          UserName: loginWhiteListStorage[0].UserName,
          isOTPNeeded: loginWhiteListStorage[0].isOTPNeeded,
          isAuditingImageNeed: loginWhiteListStorage[0].IsAuditingImageNeed,
          isNextFollowUpNeed: loginWhiteListStorage[0].IsNextFollowUpNeed,
          restrictHouseVerification: loginWhiteListStorage[0].RestrictHouseVerificationAfterTraining,
          isDigitalCollectionNeeded: loginWhiteListStorage[0].IsDigitalCollectionNeeded,
          AndroidVersionForCamera: loginWhiteListStorage[0].AndroidVersionForCamera,
          IsCropNeeded: loginWhiteListStorage[0].IsCropNeeded,
          isRejectionNeedForFieldOfficer: loginWhiteListStorage[0].isRejectionNeedForFieldOfficer,
          CompanyCountry: loginWhiteListStorage[0].CompanyCountry,
          CountryID: loginWhiteListStorage[0].CountryID,
          IsConsumerReportStaff: loginWhiteListStorage[0].IsConsumerReportStaff,
          IsEquifaxCheck: loginWhiteListStorage[0].isEquifaxCheck,
          IsEquifaxConsumer: loginWhiteListStorage[0].isEquifaxConsumer,
          IsIndividualSavings: loginWhiteListStorage[0].isIndividualSavings,
          IsGoldLoanAvailed: loginWhiteListStorage[0].isGoldLoanAvailed,
          IsIndividualLoanNeeded: loginWhiteListStorage[0].isIndividualLoanNeeded,
          IsBusinessLoanAvailed: loginWhiteListStorage[0].isBusinessLoanAvailed,
          IsShowMandatoryTypeScreen: loginWhiteListStorage[0].isShowMandatoryTypeScreen,
          ProvisionType: loginWhiteListStorage[0].provisionType,
          CompanyName: loginWhiteListStorage[0].CompanyName,
          CompanyLogo: loginWhiteListStorage[0].CompanyLogo,
          UserPhoneNumber: loginWhiteListStorage[0].UserPhoneNumber,
          EmergencyContanct: loginWhiteListStorage[0].EmergencyContanct,
          IsAfterEODCollectionNeededForApp: loginWhiteListStorage[0].isAfterEODCollectionNeededForApp,
          IsBMCanApproveMemberFromMobileApp: loginWhiteListStorage[0].isBMCanApproveMemberFromMobileApp,
          isManagerHighmarkMandatoryForApp: loginWhiteListStorage[0].isManagerHighmarkMandatoryForApp,
          IsCenterPageShowFromMobileApp: loginWhiteListStorage[0].isCenterPageShowFromMobileApp,
          IsGroupPageShowFromMobileApp: loginWhiteListStorage[0].isGroupPageShowFromMobileApp,
          UserPassword: loginWhiteListStorage[0].UserPassword,
          IsWaterMarkNeeded: 0,
          IsAutoWalletUtilizationNeeded: loginWhiteListStorage[0].IsAutoWalletUtilizationNeeded,
          isNeedCoApplicantCBCheckAfterMember: loginWhiteListStorage[0].isNeedCoApplicantCBCheckAfterMember,
          SkipEquifaxCheck: loginWhiteListStorage[0].SkipEquifaxCheck,
          IsCollectionLocationNeeded: loginWhiteListStorage[0].IsCollectionLocationNeeded,
          IsQrCollectionNeedFromApp: loginWhiteListStorage[0].isQrCollectionNeedFromApp,
          IsHouseLocationMandatory: loginWhiteListStorage[0].IsHouseLocationMandatory,
          ShowAddMemberForLevel1App: loginWhiteListStorage[0].ShowAddMemberForLevel1App,
          IsPrepaidCreditBureauCheck: loginWhiteListStorage[0].IsPrepaidCreditBureauCheck,
        }
      }
    }
    return object;
  },
);

export const selectGeneralDataResp = createSelector(
  [selectLoginUser],
  (SNlogin) => SNlogin.generalDataResp,
);

export const selectGeneralData = createSelector(
  [selectLoginUser],
  (SNlogin) => SNlogin.generalData,
);
