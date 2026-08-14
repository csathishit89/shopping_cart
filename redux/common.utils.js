import { useSelector } from 'react-redux';
import { RNS3 } from 'react-native-upload-aws-s3';
import { I18n } from "i18n-js";
import * as ImagePicker from 'expo-image-picker';
import { manipulateAsync } from 'expo-image-manipulator';
import {Alert, Linking} from 'react-native';

import { decodeJson } from './encode-decode';
import en from '../constants/language/en.json';
import ta from '../constants/language/ta.json';
import hi from '../constants/language/hi.json';
import ka from '../constants/language/ka.json';
import { changeLanguage, getLoginData } from '../redux/login/login.selectors';
import { decode } from 'js-base64';
import { API_URL } from './const';

// Decode Token
export const decodeApiResponse = (reposneToken, decodeKey) => {
  const decodeResponse = decodeJson(reposneToken.response, decodeKey);
  return decodeResponse.data;
};

// Decode Double Response Token
export const decodeDoubleResponse = (reposneToken, decodeKey) => {
  const decodeResponse = decodeJson(reposneToken, decodeKey);
  return decodeResponse;
};

// Decode Token with Base64
export const decodeBase64Response = (reposneToken, decodeKey) => {
  let decodeResponse = decodeJson(reposneToken.response, decodeKey);
  if(decodeResponse?.data) {
    const Buffer = require("buffer").Buffer;
    decodeResponse = Buffer.from(decodeResponse.data, 'base64');
    decodeResponse = JSON.parse(decodeResponse);
  }
  return decodeResponse;
};

export const setLocalLang = () => {
  const lang = useSelector(changeLanguage);
  const i18n = new I18n({
    en,
    ta,
    hi,
    ka,
  });
  i18n.locale = lang;
  return i18n;
};

// Basic Details
export const formatAadhar = (value) => {
  let newval = '';
  if (value !== '' && value !== undefined && value !== null) {
    value = value.replace(/\s/g, '');
    for (let i = 0; i < value.length; i++) {
        if (i % 4 == 0 && i > 0) newval = newval.concat(' ');
        newval = newval.concat(value[i]);
    }
  }
  return newval;
}

// SPECIAL CHARACTER REMOVER
export const checkEnteredWord =(word) =>  {
  const regexFormat = /[^a-zA-Z0-9 -]/g;
  return word.replace(regexFormat, "");
}

// FUNCTION TO CHECK NEXT NAVIGATION SCREEN MANDATORY
export const navigationMandatoryCheck = (currentPage, mandData, userDocType, memberDetails) => {
  const stageStatus = parseInt(memberDetails[0].StageCompleted);
  let nextPage = nextNavigatePage(currentPage, userDocType, memberDetails);

  if(nextPage === 'BasicDetails'){
    // AADHAR NUMBER IS DEFAULT MANDATORY
    return nextPage;
  } else if(nextPage === 'PhotoVerify' && userDocType === 'Member'){
    const { Photo } = mandData;
    if(Photo === '1'){
      return nextPage;
    } else {
      memberDetails[0].StageCompleted = 3;
      return navigationMandatoryCheck(nextPage, mandData, userDocType, memberDetails);
    }
  } else if(nextPage === 'Signature'){
    const { Signature } = mandData;
    if( Signature === '1'){
      return nextPage;
    } else {
      memberDetails[0].StageCompleted = 4;
      return navigationMandatoryCheck(nextPage, mandData, userDocType, memberDetails);
    }
  } else if(nextPage === 'PersonlDetails'){
    const { DOB, MarritialStatus, FatherName, MotherName, SpouseName, SpouseDOB, AltPhone, IDProof1, IDProof2 } = mandData;
    if( DOB === '1' || MarritialStatus === '1' || FatherName === '1' || MotherName === '1' || SpouseName === '1' || SpouseDOB === '1' || AltPhone === '1' || IDProof1 === '1' || IDProof2 === '1'){
      return nextPage;
    } else {
      memberDetails[0].StageCompleted = 5;
      return navigationMandatoryCheck(nextPage, mandData, userDocType, memberDetails);
    }
  } else if(nextPage === 'Residential'){
    const { PinCode, DoorNo, StreetAddress, Country, State, District, City, Village } = mandData;
    if( PinCode === '1' || DoorNo === '1' || StreetAddress === '1' || Country === '1' || State === '1' || District === '1' || City === '1' || Village === '1'){
      return nextPage;
    } else {
      memberDetails[0].StageCompleted = 6;
      return navigationMandatoryCheck(nextPage, mandData, userDocType, memberDetails);
    }
  } else if(nextPage === 'CureentAddress'){
    const { CurrentAddressPin, CurrentDoorNo, CurrentAddress, CurrentAddressCountry, CurrentAddressState, CurrentAddressDistrict, CurrentAddressCity, CurrentAddressLocalArea } = mandData;
    if( CurrentAddressPin === '1' || CurrentDoorNo === '1' || CurrentAddress === '1' || CurrentAddressCountry === '1' || CurrentAddressState === '1' || CurrentAddressDistrict === '1' || CurrentAddressCity === '1' || CurrentAddressLocalArea === '1'){
      return nextPage;
    } else {
      memberDetails[0].StageCompleted = 7;
      return navigationMandatoryCheck(nextPage, mandData, userDocType, memberDetails);
    }
  } else if(nextPage === 'FamilyMemberIncome'){
    const { FamilyType, FamilyCount, FamilyMemberName, FamilyMemberGender, FamilyMemberAadhar, FamilyMemberAge, FamilyMemberRelationship, FamilyMemberEducation, FamilyMemberOccupation, FamilyTotalIncome, FamilyMonthlyIncode, FamilyMonthlyExpense, FamilyMontlyExtraSpend, FamilyChildrenCount } = mandData;
    if( FamilyType === '1' || FamilyCount === '1' || FamilyMemberName === '1' || FamilyMemberGender === '1' || FamilyMemberAadhar === '1' || FamilyMemberAge === '1' || FamilyMemberRelationship === '1' || FamilyMemberEducation === '1'|| FamilyMemberOccupation === '1'|| FamilyTotalIncome === '1'|| FamilyMonthlyIncode === '1'|| FamilyMonthlyExpense === '1'|| FamilyMontlyExtraSpend === '1'|| FamilyChildrenCount === '1'){
      return nextPage;
    } else {
      memberDetails[0].StageCompleted = 8;
      return navigationMandatoryCheck(nextPage, mandData, userDocType, memberDetails);
    }
  } else if(nextPage === 'BasicNomineeDetails'){
    const { NomineeRelationship, NomineeName, NomineeGender, NomineeFatherName, NomineeDOB, NomineeAadhar, NomineeIDProff, NomineePhoneNumber, NomineeCurrentDoorNo, NomineeCurrentAddress } = mandData;
    if( NomineeRelationship === '1' || NomineeName === '1' || NomineeGender === '1' || NomineeFatherName === '1' || NomineeDOB === '1' || NomineeAadhar === '1' || NomineeIDProff === '1' || NomineePhoneNumber === '1'|| NomineeCurrentDoorNo === '1'|| NomineeCurrentAddress === '1'){
      return nextPage;
    } else {
      memberDetails[0].StageCompleted = 9;
      return navigationMandatoryCheck(nextPage, mandData, userDocType, memberDetails);
    }
  } else if(nextPage === 'BankDetails'){
    const { BankAccNumber, ReBankAccNUmber, AccHolderName, IFSCCode, BankName, BankBranchName, RBIStatus, AccountType } = mandData;
    if( BankAccNumber === '1' || ReBankAccNUmber === '1' || AccHolderName === '1' || IFSCCode === '1' || BankName === '1' || BankBranchName === '1' || RBIStatus === '1' || AccountType === '1'){
      return nextPage;
    } else {
      memberDetails[0].StageCompleted = 10;
      return navigationMandatoryCheck(nextPage, mandData, userDocType, memberDetails);
    }
  } else if(nextPage === 'HouseDetails'){
    const { HouseType, DurationOfStay, NoOfRoom, FacilityType, AgricultureLand, LiveStock, AssetType, LandValue } = mandData;
    if( HouseType === '1' || DurationOfStay === '1' || NoOfRoom === '1' || FacilityType === '1' || AgricultureLand === '1' || LiveStock === '1' || AssetType === '1' || LandValue === '1'){
      return nextPage;
    } else {
      memberDetails[0].StageCompleted = 11;
      return navigationMandatoryCheck(nextPage, mandData, 'Member', memberDetails);
    }
  } else if(nextPage === 'AadharDetails' && userDocType === 'Member'){
    const { aadharPhoto, aadharBacktPhoto } = mandData;
    if( aadharPhoto === '1' || aadharBacktPhoto === '1'){
      return nextPage;
    } else {
      memberDetails[0].StageCompleted = 12;
      return navigationMandatoryCheck(nextPage, mandData, 'Member', memberDetails);
    }
  } else if( stageStatus === 12 && (nextPage === 'Rationcard' || nextPage === 'VoterID' || nextPage === 'DrivingLicence' || nextPage === 'Passport' || nextPage === 'Pancard')){
    const { IDProof1Image, IDProof1BackImage } = mandData;
    if (IDProof1Image === '1' || IDProof1BackImage === '1'){
      return nextPage;
    } else {
      memberDetails[0].StageCompleted = 13;
      return navigationMandatoryCheck(nextPage, mandData, 'Member', memberDetails);
    }
  } else if( stageStatus === 13 && (nextPage === 'Rationcard' || nextPage === 'VoterID' || nextPage === 'DrivingLicence' || nextPage === 'Passport' || nextPage === 'MemberElectricity' || nextPage === 'MemberGas' || nextPage === 'MemberTelephone' || nextPage === 'MemberWater')){
    const { IDProof2Image, IDProof2BackImage } = mandData;
    if (IDProof2Image === '1' || IDProof2BackImage === '1'){
      return nextPage;
    } else {
      memberDetails[0].StageCompleted = 14;
      return navigationMandatoryCheck(nextPage, mandData, 'Member', memberDetails);
    }
  } else if( nextPage === 'PassbookDetails' ){
    const { PassbookImage } = mandData;
    if (PassbookImage === '1'){
      return nextPage;
    } else {
      memberDetails[0].StageCompleted = 15;
      return navigationMandatoryCheck(nextPage, mandData, 'Nominee', memberDetails);
    }
  } else if( nextPage === 'NomineePhotoVerify' ){
    const { NomineePhoto } = mandData;
    if (NomineePhoto === '1'){
      return nextPage;
    } else {
      memberDetails[0].StageCompleted = 16;
      return navigationMandatoryCheck(nextPage, mandData, 'Nominee', memberDetails);
    }
  } else if( nextPage === 'NomineeAadhar' ){
    const { NomineeAadharBackPhoto, NomineeAadharPhoto } = mandData;
    if (NomineeAadharBackPhoto === '1' || NomineeAadharPhoto === '1'){
      return nextPage;
    } else {
      memberDetails[0].StageCompleted = 17;
      return navigationMandatoryCheck(nextPage, mandData, 'Nominee', memberDetails);
    }
  } else if( stageStatus === 17 && (nextPage === 'NomineeRationcard' || nextPage === 'NomineeVoterID' || nextPage === 'NomineeDrivingLicence' || nextPage === 'NomineePassport')){
    const { NomineeIDProffImage, NomineeIDProffBackImage } = mandData;
    if (NomineeIDProffImage === '1' || NomineeIDProffBackImage === '1'){
      return nextPage;
    } else {
      memberDetails[0].StageCompleted = 18;
      return navigationMandatoryCheck(nextPage, mandData, 'Nominee', memberDetails);
    }
  } else if( nextPage === 'HouseImages' ){
    const { HouseImage1, HouseImage2, HouseImage3, HouseImage4, HouseImage5 } = mandData;
    if (HouseImage1 === '1' || HouseImage2 === '1' || HouseImage3 === '1' || HouseImage4 === '1' || HouseImage5 === '1'){
      return nextPage;
    } else {
      memberDetails[0].StageCompleted = 19;
      return navigationMandatoryCheck(nextPage, mandData, 'Member', memberDetails);
    }
  } else if( nextPage === 'ExtraInfromation' ){
    const { BloodGroup, Disability, Identification, EducationQualification, Religion, Caste, Rural_Urban, MobileType } = mandData;
    if (BloodGroup === '1' || Disability === '1' || Identification === '1' || EducationQualification === '1' || Religion === '1'|| Caste === '1'|| Rural_Urban === '1' || MobileType === '1'){
      return nextPage;
    } else {
      memberDetails[0].StageCompleted = 20;
      return navigationMandatoryCheck(nextPage, mandData, 'Member', memberDetails);
    }
  } else if( nextPage === 'OfficialDetails' ){
    const { EconomicActivity, Center, ApplicationAmount, AnnualIncome, MonthlyIncome, OtherIncome, PreferredLanguage, ProductType } = mandData;
    if (EconomicActivity === '1' || Center === '1' || ApplicationAmount === '1' || AnnualIncome === '1' || MonthlyIncome === '1'|| OtherIncome === '1'|| PreferredLanguage === '1'|| ProductType === '1'){
      return nextPage;
    } else {
      memberDetails[0].StageCompleted = 21;
      return navigationMandatoryCheck(nextPage, mandData, 'Member', memberDetails);
    }
  } else if( nextPage === 'CoApplicantDone' ){
    const { CoApplicantName, CoApplicantDOB, CoApplicantAadharNumber, CoApplicantRelationship, CoApplicantOccupation, CoApplicantPhoneNumber, CoApplicantMonthlyIncome, CoApplicantIDProof, CoApplicantIDProofNumber, CoApplicantAddressProof, CoApplicantAddressProofNumber, CoApplicantAadharFront, CoApplicantAadharBack, CoApplicantIDProofBack, CoApplicantIDProofFront, CoApplicantAddressProofFront, CoApplicantAddressProofBack, CoApplicantPhoto, CoApplicantCBCheck } = mandData;

    if(parseFloat(CoApplicantCBCheck) === 1) {
      nextPage = 'AddMember';
      return nextPage;
    }

    if (CoApplicantName === '1' || CoApplicantDOB === '1' || CoApplicantAadharNumber === '1' || CoApplicantRelationship === '1' || CoApplicantOccupation === '1'|| CoApplicantPhoneNumber === '1'|| CoApplicantMonthlyIncome === '1'|| CoApplicantIDProof === '1'|| CoApplicantAddressProof === '1'|| CoApplicantAddressProofNumber === '1' || CoApplicantAadharFront === '1' || CoApplicantAadharBack === '1' || CoApplicantIDProofBack === '1' || CoApplicantIDProofFront === '1' || CoApplicantAddressProofFront === '1' || CoApplicantAddressProofBack === '1' || CoApplicantPhoto === '1' || CoApplicantIDProofNumber === '1'){
      return nextPage;
    } else {
      memberDetails[0].StageCompleted = 22;
      return navigationMandatoryCheck(nextPage, mandData, 'Member', memberDetails);
    }
  } else {
    nextPage = 'AddMember';
    return nextPage;
  }
}

export const nextNavigatePage = (currentPage, userDocType, memberDetails) => {
  let navigationPage = '';
  const stageStatus = parseInt(memberDetails[0].StageCompleted);
  const selectIDProof = memberDetails[0].MemberIDProof;
  const selectAddressProof = memberDetails[0].MemberAddressProof;
  const selectNomineeIdProof = memberDetails[0].NomineeIDProof;

  if (stageStatus === 1) {
    navigationPage = 'BasicDetails';
  } else if (stageStatus === 2) {
    navigationPage = 'PhotoVerify';
  } else if (stageStatus === 3 && userDocType === 'Member') {
    navigationPage = 'Signature';
  } else if (stageStatus === 4) {
    navigationPage = 'PersonlDetails';
  } else if (stageStatus === 5) {
    navigationPage = 'Residential';
  } else if (stageStatus === 6) {
    navigationPage = 'CureentAddress';
  } else if (stageStatus === 7) {
    navigationPage = 'FamilyMemberIncome';
  } else if (stageStatus === 8) {
    navigationPage = 'BasicNomineeDetails';
  } else if (stageStatus === 9) {
    navigationPage = 'BankDetails';
  } else if (stageStatus === 10) {
    navigationPage = 'HouseDetails';
  } else if (stageStatus === 11) {
    navigationPage = 'AadharDetails';
  } else if (stageStatus === 12) {
    if (selectIDProof === 'RationCard') {
      navigationPage = 'Rationcard';
    } else if (selectIDProof === 'VoterID') {
      navigationPage = 'VoterID';
    } else if (selectIDProof === 'DrivingLicense') {
      navigationPage = 'DrivingLicence';
    } else if (selectIDProof === 'Passport') {
      navigationPage = 'Passport';
    } else if (selectIDProof === 'PanCard') {
      navigationPage = 'Pancard';
    } else if (selectAddressProof === 'RationCard') {
      navigationPage = 'Rationcard';
    } else if (selectAddressProof === 'VoterID') {
      navigationPage = 'VoterID';
    } else if (selectAddressProof === 'DrivingLicense') {
      navigationPage = 'DrivingLicence';
    } else if (selectAddressProof === 'Passport') {
      navigationPage = 'Passport';
    } else if (selectAddressProof === 'Electricity') {
      navigationPage = 'MemberElectricity';
    } else if (selectAddressProof === 'Gas') {
      navigationPage = 'MemberGas';
    } else if (selectAddressProof === 'Telephone') {
      navigationPage = 'MemberTelephone';
    } else if (selectAddressProof === 'Water') {
      navigationPage = 'MemberWater';
    } else {
      navigationPage = 'PassbookDetails';
    }
  } else if (stageStatus === 12 && (selectIDProof === 'Rationcard' || selectIDProof === 'VoterID' || selectIDProof === 'DrivingLicence' || selectIDProof === 'Passport' || selectIDProof === 'Pancard')) {
    if (selectIDProof === 'RationCard') {
      navigationPage = 'Rationcard';
    } else if (selectIDProof === 'VoterID') {
      navigationPage = 'VoterID';
    } else if (selectIDProof === 'DrivingLicense') {
      navigationPage = 'DrivingLicence';
    } else if (selectIDProof === 'Passport') {
      navigationPage = 'Passport';
    } else if (selectIDProof === 'PanCard') {
      navigationPage = 'Pancard';
    } else if (selectAddressProof === 'RationCard') {
      navigationPage = 'Rationcard';
    } else if (selectAddressProof === 'VoterID') {
      navigationPage = 'VoterID';
    } else if (selectAddressProof === 'DrivingLicense') {
      navigationPage = 'DrivingLicence';
    } else if (selectAddressProof === 'Passport') {
      navigationPage = 'Passport';
    } else if (selectAddressProof === 'Electricity') {
      navigationPage = 'MemberElectricity';
    } else if (selectAddressProof === 'Gas') {
      navigationPage = 'MemberGas';
    } else if (selectAddressProof === 'Telephone') {
      navigationPage = 'MemberTelephone';
    } else if (selectAddressProof === 'Water') {
      navigationPage = 'MemberWater';
    } else {
      navigationPage = 'PassbookDetails';
    }
  } else if (((stageStatus === 12 && (selectIDProof === '' || selectIDProof === undefined || selectIDProof === null)) || (stageStatus === 13)) && (selectAddressProof === 'RationCard' || selectAddressProof === 'VoterID' || selectAddressProof === 'DrivingLicense' || selectAddressProof === 'Passport' || selectAddressProof === 'Electricity' || selectAddressProof === 'Gas' || selectAddressProof === 'Telephone' || selectAddressProof === 'Water')) {
    if (selectAddressProof === 'RationCard') {
      navigationPage = 'Rationcard';
    } else if (selectAddressProof === 'VoterID') {
      navigationPage = 'VoterID';
    } else if (selectAddressProof === 'DrivingLicense') {
      navigationPage = 'DrivingLicence';
    } else if (selectAddressProof === 'Passport') {
      navigationPage = 'Passport';
    } else if (selectAddressProof === 'Electricity') {
      navigationPage = 'MemberElectricity';
    } else if (selectAddressProof === 'Gas') {
      navigationPage = 'MemberGas';
    } else if (selectAddressProof === 'Telephone') {
      navigationPage = 'MemberTelephone';
    } else if (selectAddressProof === 'Water') {
      navigationPage = 'MemberWater';
    } else {
      navigationPage = 'PassbookDetails';
    }
  } else if (stageStatus === 13 && (selectAddressProof === '' || selectAddressProof === null || selectAddressProof === undefined)) {
    navigationPage = 'PassbookDetails';
  } else if (stageStatus === 14) {
    navigationPage = 'PassbookDetails';
  } else if (stageStatus === 15) {
      navigationPage = 'NomineePhotoVerify';
  } else if (stageStatus === 16) {
    navigationPage = 'NomineeAadhar';
  } else if (stageStatus === 17 && (selectNomineeIdProof === 'RationCard' || selectNomineeIdProof === 'VoterID' || selectNomineeIdProof === 'DrivingLicense' || selectNomineeIdProof === 'Passport')) {
    if (selectNomineeIdProof === 'RationCard') {
      navigationPage = 'NomineeRationcard';
    } else if (selectNomineeIdProof === 'VoterID') {
      navigationPage = 'NomineeVoterID';
    } else if (selectNomineeIdProof === 'DrivingLicense') {
      navigationPage = 'NomineeDrivingLicence';
    } else if (selectNomineeIdProof === 'Passport') {
      navigationPage = 'NomineePassport';
    } else {
      navigationPage = 'HouseImages';
    }
  } else if (stageStatus === 17 && (selectNomineeIdProof === '' || selectNomineeIdProof === null || selectNomineeIdProof === undefined)) {
    navigationPage = 'HouseImages';
  } else if (stageStatus === 18) {
    navigationPage = 'HouseImages';
  } else if (stageStatus === 19) {
    navigationPage = 'ExtraInfromation';
  } else if (stageStatus === 20) {
    navigationPage = 'OfficialDetails';
  } else if (stageStatus === 21) {
    navigationPage = 'CoApplicantDone';
  } else {
    navigationPage = 'AddMember';
  }
  return navigationPage;
};


// S3 IMAGE UPLOAD
export const imageUploadToS3 = async (result, path, loginData) => {
  // SERVER UPLOAD IMAGE
  
  const {
    companyID,
    databaseName,
  } = loginData;

  // Prepare the form data
  // try {
  let formData = new FormData();
  formData.append('photoimg', {
    uri: result.uri,
    name: result.name,
    type: result.type,
  }); // Appending the image file
  formData.append('typeval', path);
  formData.append('companyID', companyID);
  formData.append('databaseName', databaseName);
  formData.append('fileFormat', 'Image');

  const response = await fetch(`${API_URL}Common/uploadImageToServer.php`, {
    method: 'POST',
    body: formData,
  });
  if (!response.ok) {
    console.error('Server returned an error:', response.status, response.statusText);
    // return "Image Upload Failed";
  } else {
    const responseJson = await response.json();
    if (responseJson.status === "Success") {
      return responseJson.response;
    } else if ('error_message' in responseJson) {
      return "Image Upload Failed";
    }
  }

// } catch (error) {
//   console.error('Caught error:', error);
//   // return "Image Upload Failed";
// }

};
// export const uploadPdfFile = async (result, path,loginData) => {
//   debugger;
//   console.log("This state: ", result);
//   console.log("path: ", path);

//   const {
//     companyID,
//     databaseName,
//   } = loginData;

//   let formData = new FormData();
//   formData.append('photoimg', {
//     uri: result.uri,
//     name: result.name,
//     type: result.type,
//   });
  

//   formData.append('typeval', path);
//   formData.append('companyID', companyID);
//   formData.append('databaseName', databaseName);
//   formData.append('fileFormat', 'Pdf');
 
//   console.log([...formData.entries()]);  // Log form data entries


//   const response = await fetch(`${API_URL}Common/uploadImageToServer.php`, {
//     method: 'POST',
//     body: formData,
   
//   });
  
//     console.log("formData text: ", [...formData.entries()]);
//     if (!response.ok) {
//       const errorText = await response.text();
//       console.error('Server returned an error:', errorText);
//   } else {
//       const responseJson = await response.json();
//       console.log("Server response JSON: ", responseJson);
//   }
//   // if (!response.ok) {
//   //   console.error('Server returned an error:');
//   // } else {
//   //   const responseJson = await response.json();
//   //   if (responseJson.status === "Success") {
//   //     return responseJson.response;
//   //   } else if ('error_message' in responseJson) {
//   //     return "Image Upload Failed";
//   //   }
//   // }

//   debugger;
 

// }

export const uploadPdfFile = async (file, path, loginData) => {
  // debugger;
  const formData = new FormData();
  formData.append('photoimg', file);
  formData.append('typeval', path);
  formData.append('companyID', loginData.companyID);
  formData.append('databaseName', loginData.databaseName);
  formData.append('fileFormat', 'Pdf');

  const response = await fetch(`${API_URL}Common/uploadImageToServer.php`, {
      method: 'POST',
      body: formData,
  });

  if (!response.ok) {
      throw new Error('Upload failed');
  }

  const responseJson = await response.json();
  
  console.log("API Response:", responseJson);
  
  return responseJson; 
};




export const findProofValue = (dataArr, label) => {
  let value = '';
  dataArr.map((item) => {
    if (item.label === label) {
      value = item.value;
    }
  });
  return value;
};

// CAPTURE IMAGE
export const captureImage = async (isCrop) => {
  let cropOption = true;
  let takeImg;
  let CameraStatus;
  let MediaStatus;
  if (isCrop === 'Passport' || isCrop === 'PassbookCheque' || isCrop === 'Electricity' || isCrop === 'Water' || isCrop === 'Gas' || isCrop === 'Telephone' || isCrop === 'Image' || isCrop === 'Collection' || isCrop === 'OfficerAttendance' || isCrop === 'Training' || isCrop === 'PreDisbursement' || isCrop === 'PreDisbursementGroup') {
    cropOption = false;
  }

  // CHECK CAMERA PERMISSION
  const CameraPermission = ImagePicker.getCameraPermissionsAsync();
  CameraStatus = (await CameraPermission).granted;

  // REQUEST CAMERA PERMISSION
  if (!CameraStatus) {
    const { granted } = await ImagePicker.requestCameraPermissionsAsync();
    CameraStatus = granted;
  }

  // CHECK MEDIA PERMISSION
  const MediaPermission = ImagePicker.getMediaLibraryPermissionsAsync();
  MediaStatus = (await MediaPermission).granted;

  // REQUEST MEDIA PERMISSION
  if (!MediaStatus) {
    const { granted } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    MediaStatus = granted;
  }

  if (CameraStatus && MediaStatus) {
    takeImg = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: cropOption,
      aspect: [4, 3],
      quality: 0.5,
    });
  } else {
    if (!CameraStatus && !MediaStatus) {
      openSettings('In order to use the camera, you must give permission for Aavin to access the Camera and Media. You can grant this permission in the App Setting.');
    } else if (!MediaStatus && CameraStatus) {
      openSettings('In order to use the camera, you must give permission for Aavin to access the Files and Media. You can grant this permission in the App Setting.');
    } else if (MediaStatus && !CameraStatus) {
      openSettings('In order to use the camera, you must give permission for Aavin to access the camera. You can grant this permission in the App Setting.');
    }
  }
  let data;

  if (takeImg !== undefined) {
    if (!takeImg.canceled) {
      const { uri, type } = takeImg.assets[0];
      const manipResult = await manipulateAsync(
        uri,
        [{ rotate: 0 }],
        { compress: 0.6 },
      );
      data = {
        // `uri` can also be a file system path (i.e. file://)
        uri: manipResult.uri,
        name: `${Date.now()}-S3-MIN.png`,
        type: 'image/png',
      };
    }
  }
  return data;
};

// Capture VoterId Image
export const captureVoterIdImage = async (isCrop) => {
  const cropOption = true;
  let takeImg;
  let CameraStatus;
  let MediaStatus;

  // CHECK CAMERA PERMISSION
  const CameraPermission = ImagePicker.getCameraPermissionsAsync();
  CameraStatus = (await CameraPermission).granted;

  // REQUEST CAMERA PERMISSION
  if (!CameraStatus) {
    const { granted } = await ImagePicker.requestCameraPermissionsAsync();
    CameraStatus = granted;
  }

  // CHECK MEDIA PERMISSION
  const MediaPermission = ImagePicker.getMediaLibraryPermissionsAsync();
  MediaStatus = (await MediaPermission).granted;

  // REQUEST MEDIA PERMISSION
  if (!MediaStatus) {
    const { granted } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    MediaStatus = granted;
  }

  if (CameraStatus && MediaStatus) {
    takeImg = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: cropOption,
      // aspect: [2, 3],
      quality: 0.5,
    });
  } else {
    if (!CameraStatus && !MediaStatus) {
      openSettings('In order to use the camera, you must give permission for Aavin to access the Camera and Media. You can grant this permission in the App Setting.');
    } else if (!MediaStatus && CameraStatus) {
      openSettings('In order to use the camera, you must give permission for Aavin to access the Files and Media. You can grant this permission in the App Setting.');
    } else if (MediaStatus && !CameraStatus) {
      openSettings('In order to use the camera, you must give permission for Aavin to access the camera. You can grant this permission in the App Setting.');
    }
  }

  let data;
  if (takeImg !== undefined) {
    if (!takeImg.canceled) {
      const { uri, type } = takeImg.assets[0];
      const manipResult = await manipulateAsync(
        uri,
        [{ rotate: 0 }],
        { compress: 0.6 },
      );
      data = {
        // `uri` can also be a file system path (i.e. file://)
        uri: manipResult.uri,
        name: `${Date.now()}.png`,
        type: 'image/png',
      };
    }
  }
  return data;
};

// Traning Image Upload
export const captureTraningImage = async (isGallery) => {
  let cropOption = false;
  let takeImg;
  let CameraStatus;
  let MediaStatus;

  if (isGallery === 0) {
    // CHECK CAMERA PERMISSION
    const CameraPermission = ImagePicker.getCameraPermissionsAsync();
    CameraStatus = (await CameraPermission).granted;

    // REQUEST CAMERA PERMISSION
    if (!CameraStatus) {
      const { granted } = await ImagePicker.requestCameraPermissionsAsync();
      CameraStatus = granted;
    }

    // CHECK MEDIA PERMISSION
    const MediaPermission = ImagePicker.getMediaLibraryPermissionsAsync();
    MediaStatus = (await MediaPermission).granted;

    // REQUEST MEDIA PERMISSION
    if (!MediaStatus) {
      const { granted } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      MediaStatus = granted;
    }
    if (CameraStatus && MediaStatus) {
      takeImg = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: cropOption,
        aspect: [4, 3],
        quality: 0.5,
      });
    } else {
      if (!CameraStatus && !MediaStatus) {
        openSettings('In order to use the camera, you must give permission for Aavin to access the Camera and Media. You can grant this permission in the App Setting.');
      } else if (!MediaStatus && CameraStatus) {
        openSettings('In order to use the camera, you must give permission for Aavin to access the Files and Media. You can grant this permission in the App Setting.');
      } else if (MediaStatus && !CameraStatus) {
        openSettings('In order to use the camera, you must give permission for Aavin to access the camera. You can grant this permission in the App Setting.');
      }
    }
  } else if (isGallery === 1) {

    const CameraPermission = ImagePicker.getCameraPermissionsAsync();
    CameraStatus = (await CameraPermission).granted;

    if (!CameraStatus) {
      const requestPermission = ImagePicker.requestCameraPermissionsAsync();
      CameraStatus = (await requestPermission).granted;
    }

    if (CameraStatus) {
      takeImg = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: cropOption,
        aspect: [4, 3],
        quality: 0.5,
      });
    } else {
      // await ImagePicker.requestMediaLibraryPermissionsAsync();
      openSettings('In order to use the camera, you must give permission for Aavin to access the camera. You can grant this permission in the App Setting.');
    }
  }
  let data;

  if (takeImg !== undefined) {
    if (!takeImg.canceled) {
      const { uri, type } = takeImg.assets[0];
      const manipResult = await manipulateAsync(
        uri,
        [{ rotate: 0 }],
        { compress: 0.6 },
      );
      data = {
        // `uri` can also be a file system path (i.e. file://)
        uri: manipResult.uri,
        name: `${Date.now()}.png`,
        type: 'image/png',
      };
    }
  }

  return data;
};

const openSettings = (alertVal) => {
  Alert.alert(
  'Aavin',
  alertVal,
    [
      {
        text: 'Cancel'
      },
      { 
        text: 'Open Settings', onPress: () => Linking.openSettings()
      }
    ],
    { cancelable: true }
  );
};

export const arrayConverter = (centerListArr) => {
  const centerArr = [];
  for (let i = 0; i < centerListArr.length; i++) {
    centerArr[i] = {
      ID: centerListArr[i].value,
      Name: centerListArr[i].label,
    };
  }
  return centerArr;
};

export const convertToYYYYMMDD = (dateString) => {
  // List of date formats to check
  var formats = [
      // Format: YYYY-MM-DD
      {regex: /^\d{4}-\d{2}-\d{2}$/, format: "$1-$2-$3"},
      // Format: DD/MM/YYYY
      {regex: /^(\d{2})\/(\d{2})\/(\d{4})$/, format: "$3-$2-$1"},
      // Format: MM/DD/YYYY
      {regex: /^(\d{2})\/(\d{2})\/(\d{4})$/, format: "$3-$1-$2"},
      // Add more formats if needed
  ];

  // Iterate through formats and check if any matches
  for (var i = 0; i < formats.length; i++) {
      var format = formats[i];
      var match = dateString.match(format.regex);
      if (match) {
          // Replace using the format string
          return format.format.replace(/\$(\d)/g, function(_, index) {
              return match[index];
          });
      }
  }

  // If no format matches, return null
  return null;
}