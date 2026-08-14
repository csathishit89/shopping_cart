/* eslint-disable import/extensions */
/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
import { StyleSheet } from 'react-native';
import Code from '../../constants/ColorCodes';

const fontReg = 'Roboto';
const fontBold = 'RobotoBold';
export default StyleSheet.create({
  mainContainer: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: Code.white,
  },

  keyboard: {
    flex: 1,
  },

  scrollFlex: {
    flexGrow: 1,
  },

  buttonContainer: {
    backgroundColor: Code.primary,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15,
    borderRadius: 30,
  },

  btnText: {
    fontSize: 18,
    fontFamily: fontBold,
    color: Code.white,
  },

  loadingText: {
    color: Code.primary_medium,
    fontFamily: fontReg,
  },

  inputTextStyle: {
    fontSize: 16,
    backgroundColor: Code.white,
    marginBottom: 15,
    marginTop: 5,
  },
  // Add Member Head
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: Code.primary,
    alignItems: 'center',
    padding: 10,
  },

  backIcon: {
    marginRight: 10,
  },

  headerText: {
    fontSize: 18,
    fontFamily: fontReg,
    color: Code.white,
    marginLeft: 5,
  },

  headTextConRow: {
    flexDirection: 'row',
  },

  flex: {
    flex: 1,
    flexDirection: 'row',
    marginBottom: 10,
  },

  percentageText: {
    fontSize: 12,
    fontFamily: fontReg,
    color: Code.white,
  },
  // Add Member Head

  commonBtnContainer: {
    backgroundColor: Code.primary,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15,
    borderRadius: 5,
    margin: 5,
  },

  greenBtnContainer: {
    backgroundColor: Code.green,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5,
    borderRadius: 5,
    width: '25%',
  },

  commonNonBtnContainer: {
    borderColor: Code.primary,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15,
    borderRadius: 5,
    borderWidth: 1,
    marginBottom: 5,
  },

  commonBtnText: {
    fontSize: 16,
    fontFamily: fontReg,
    color: Code.white,
  },

  commonBtnPadding: {
    marginLeft: 10,
    marginRight: 10,
  },

  rowWrapConatiner: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    marginTop: 10,
  },

  switchHeaderTitle: {
    fontSize: 14,
    fontFamily: fontBold,
    marginTop: 10,
    color: Code.nonActive,
  },

  nonActiveConatainer: {
    borderWidth: 0.8,
    borderColor: Code.primary,
    padding: 10,
    borderRadius: 5,
    width: '28%',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },

  nonActiveText: {
    fontSize: 14,
    fontFamily: fontBold,
    color: Code.primary,
  },

  activeBtnConatainer: {
    borderWidth: 0.8,
    borderColor: Code.primary,
    backgroundColor: Code.primary,
    padding: 10,
    borderRadius: 5,
    width: '28%',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },

  activeBtnText: {
    fontSize: 14,
    fontFamily: fontBold,
    color: Code.white,
  },

  boldNormalText: {
    fontSize: 16,
    fontFamily: fontBold,
    textAlignVertical: 'center',
    marginTop: 10,
  },

  normalCrossText: {
    fontSize: 16,
    fontFamily: fontReg,
    textAlignVertical: 'center',
    marginRight: 15,
  },

  switchText: {
    fontSize: 14,
    fontFamily: fontReg,
    textAlignVertical: 'center',
    color: Code.primary,
    marginRight: 5,
  },

  bottomBtnLine: {
    padding: 10,
    borderTopWidth: 2,
    borderTopColor: Code.border_shadow,
  },

  // START  MODEL
  modelContainer: {
    backgroundColor: '#fff',
    padding: 15,
    justifyContent: 'center',
    borderRadius: 10,
  },

  betweenRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  evenlyRow: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },

  betweenColumn: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },

  lineHorizontal: {
    borderWidth: 0.3,
    flexWrap: 'wrap',
    alignSelf: 'stretch',
    borderColor: Code.primary_medium,
    marginBottom: 5,
    marginTop: 5,
  },

  // Document
  pagePaddConatiner: {
    padding: 15,
  },

  docImageConatiner: {
    backgroundColor: Code.white,
    shadowColor: Code.black,
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.4,
    shadowRadius: 3,
    elevation: 5,
    borderRadius: 10,
    marginBottom: 20,
    marginTop: 15,
    borderColor: Code.border_shadow,
    borderWidth: 0.1,
    justifyContent: 'center',
    height: 220,
  },

  verifyIcon: {
    marginLeft: 5,
    textAlignVertical: 'center',
  },

  retakeBtnConatiner: {
    flexDirection: 'row',
    borderRadius: 10,
    borderWidth: 0.6,
    borderColor: Code.primary,
    padding: 5,
    justifyContent: 'center',
  },

  takeBtnText: {
    fontFamily: fontBold,
    fontSize: 14,
    textAlignVertical: 'center',
    marginLeft: 3,
  },

  docImageStyle: {
    width: '95%',
    margin: 10,
    height: 220,
  },

  captureImage: {
    width: '100%',
    height: 220,
    borderRadius: 10,
  },

  // Reasons
  preDefineReasonCon: {
    backgroundColor: Code.primary,
    padding: 10,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },

  preDefineText: {
    fontSize: 12,
    fontFamily: fontReg,
    color: Code.white,
  },

  preDefineNonSelectCon: {
    backgroundColor: Code.primary_light,
    padding: 10,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },

  preDefineNonSelectText: {
    fontSize: 12,
    fontFamily: fontReg,
    color: Code.black,
  },

  orText: {
    fontSize: 14,
    fontFamily: fontBold,
    color: Code.black,
    textAlign: 'center',
  },

  nextBtnContainer: {
    backgroundColor: Code.primary,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    borderRadius: 5,
    // marginBottom: 5,
    width: '40%',
  },

  skipDisableBtnContainer: {
    backgroundColor: Code.disable,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    borderRadius: 5,
    width: '40%',
  },

  outlineBtnContainer: {
    borderColor: Code.primary,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    borderRadius: 5,
    marginBottom: 5,
    width: '40%',
  },

  outlineBtnText: {
    fontSize: 16,
    fontFamily: fontReg,
    color: Code.primary,
  },

  // Photo Verify
  createMamberContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },

  imageMainContianer: {
    height: 250,
    width: 250,
    backgroundColor: Code.white,
    shadowColor: Code.black,
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.4,
    shadowRadius: 3,
    elevation: 3,
    borderRadius: 130,
    justifyContent: 'center',
    alignItems: 'center',
  },

  captureProfileImage: {
    height: 250,
    width: 250,
    borderRadius: 130,
  },

  createImage: {
    height: 150,
    width: 150,
    resizeMode: 'contain',
  },

  createatBtnContainer: {
    backgroundColor: Code.primary,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15,
    borderRadius: 10,
    width: '50%',
  },

  perfectText: {
    fontSize: 20,
    fontFamily: fontBold,
    textAlignVertical: 'center',
  },

  // Not Found
  notFoundConatiner: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  notFoundText: {
    fontSize: 18,
    fontFamily: fontBold,
    color: Code.primary,
  },

  DropdownStyleImage: {
    flexDirection: 'row',
    marginTop: 5,
    marginBottom: 15,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    height: 57,
    justifyContent: 'space-between',
    alignContent: 'center',
    fontFamily: fontReg,
  },

  // Drop Down Styles
  dropdown: {
    height: 60,
    borderColor: Code.disable,
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 8,
    marginBottom: 15,
    marginTop: 5,
  },

  icon: {
    marginRight: 5,
  },

  placeholderStyle: {
    fontSize: 16,
    fontFamily: fontReg,
  },

  selectedTextStyle: {
    fontSize: 16,
    fontFamily: fontReg,
  },

  iconStyle: {
    width: 20,
    height: 20,
  },

  inputSearchStyle: {
    height: 40,
    fontSize: 16,
    fontFamily: fontReg,
  },

  selectedColor: {
    borderColor: Code.primary,
  },

  pickerTextBox: {
    width: '100%',
    alignSelf: 'center',
  },

  helperText: {
    color: Code.primary,
    fontSize: 10,
    marginTop: -13,
  },

  resignContainer: {
    borderWidth: 0.8,
    borderColor: Code.primary,
    padding: 10,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },

  cameraOptionContainer: {
    justifyContent: 'flex-end',
    margin: 0,
  },

  modalContent: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 4,
    borderColor: 'rgba(0, 0, 0, 0.1)',
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
  },

  modalHeadText: {
    fontSize: 16,
    fontFamily: fontBold,
    textAlign: 'left',
    padding: 10,
  },

  modalConfirmation: {
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    textAlign: 'left',
    margin: 15,
  },

  modalBtnContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 12,
    borderRadius: 10,
    marginBottom: 20,
    backgroundColor: Code.white,
    shadowColor: Code.black,
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.4,
    shadowRadius: 3,
    elevation: 5,
    borderColor: Code.border_shadow,
    borderWidth: 0.1,
    height: 50,
  },

  modalNonBtnContainer: {
    borderColor: Code.primary,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 12,
    borderRadius: 10,
    marginBottom: 20,
    backgroundColor: Code.white,
    shadowColor: Code.black,
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.4,
    shadowRadius: 3,
    elevation: 5,
    borderWidth: 2,
    height: 50,
  },

  cameraIconStyle: {
    flexDirection: 'row',
  },

  normalText: {
    fontSize: 14,
    fontFamily: fontReg,
    color: Code.black,
    textAlign: 'center',
  },

  exitContainer: {
    flexDirection: 'row',
  },

  exitIcon: {
    marginRight: 10,
    marginTop: 4,
  },

  /** ******************** START UPDATE APP MODEL ************ */
  updateAppContainer: {
    backgroundColor: Code.white,
    padding: 15,
    borderRadius: 5,
  },

  appUpdateHeadText: {
    fontSize: 18,
    fontFamily: fontBold,
  },

  appUpdateText: {
    fontSize: 18,
    fontFamily: fontReg,
    marginTop: 10,
  },

  buttonMainContainer: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },

  noThanksContainer: {
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },

  updateAppNoText: {
    fontSize: 16,
    fontFamily: fontReg,
    color: Code.green,
  },

  updateBtnContainer: {
    backgroundColor: Code.primary,
    padding: 5,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    marginLeft: 10,
  },

  updateAppText: {
    fontSize: 16,
    fontFamily: fontBold,
    color: Code.white,
    marginLeft: 10,
    marginRight: 10,
  },

  inputUpdateStyle: {
    fontSize: 18,
    backgroundColor: 'transparent',
  },

  clearCartCancelBtnContainer: {
    borderColor: Code.primary,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 6,
    borderRadius: 20,
    width: '35%',
  },

  clearCartCancelBtnText: {
    fontSize: 16,
    fontFamily: fontBold,
    color: Code.primary,
  },

  clearBtnContainer: {
    backgroundColor: Code.primary,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 6,
    borderRadius: 20,
    width: '35%',
  },

  UpdateText: {
    color: Code.primary,
    fontFamily: 'calibri',
  },

  /** ******************** END UPDATE APP MODEL ************ */

  skipBtnText: {
    fontSize: 18,
    fontFamily: fontBold,
    color: Code.primary,
    textAlign: 'center',
    margin: 30,
  },

  skipBtnContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  proceedBtn: {
    width: '40%',
    backgroundColor: Code.primary,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 12,
    borderRadius: 5,
    marginBottom: 5,
  },

  skipBtn: {
    width: '40%',
    backgroundColor: Code.gray,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 12,
    borderRadius: 5,
    marginBottom: 5,
  },

  settingBtnContainer: {
    backgroundColor: Code.primary,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15,
    borderRadius: 5,
    marginBottom: 5,
  },

  settingNonBtnContainer: {
    borderColor: Code.primary,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15,
    borderRadius: 5,
    borderWidth: 1,
    marginBottom: 5,
  },

  addBtnContainer: {
    backgroundColor: Code.primary,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15,
    borderRadius: 5,
    marginBottom: 5,
  },

  customModalBtnContainer: {
    backgroundColor: Code.primary,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 12,
    borderRadius: 5,
    marginBottom: 5,
    width: '35%',
  },

  customModalNonBtnContainer: {
    borderColor: Code.primary,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 12,
    borderRadius: 5,
    borderWidth: 1,
    marginBottom: 5,
    width: '35%',
  },

  goButtonContainer: {
    left: '80%',
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#3C8C30',
    borderColor: '#3C8C30',
    shadowColor: '#000',
    elevation: 5,
  },

  goIconStyle: {
    fontSize: 30,
    color: '#fff',
  },

  verifiedIcon: {
    flexDirection: 'row',
    // width: '40%',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },

  nonverifiedIcon: {
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  headerTopContainer: {
    backgroundColor: Code.primary,
    marginTop: 0,
    height: 50,
  },

  kycContainer: {
    borderWidth: 1,
    padding: 10,
    marginBottom: 10,
    marginTop: 1,
    borderRadius: 10,
    borderColor: Code.gray,
  },

  kycSubContainer: {
    padding: 10,
    marginBottom: 10,
    marginTop: 1,
    borderRadius: 15,
    backgroundColor: Code.primary_light,
  },

  flexRow: {
    flexDirection: 'row',
  },

  paddingView: {
    padding: 3,
  },

  dropDownBox: {
    fontSize: 16,
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 6,
    marginVertical: 6,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignContent: 'center',
    borderWidth: 1,
    marginBottom: 13,
    borderColor: Code.disable,
  },

  dropDownText: {
    justifyContent: 'center',
    fontFamily: 'Roboto',
    fontSize: 16,
  },

  appMaintenanceHeadText: {
    fontSize: 18,
    fontFamily: fontBold,
    textAlign: 'center',
  },

  appMaintenanceText: {
    fontSize: 16,
    fontFamily: fontReg,
    marginVertical: 15,
    textAlign: 'justify',
  },

  maintenanceImage: {
    width: 150,
    height: 150,
    resizeMode: 'contain',
    alignSelf: 'center',
  },

  listConatiner: {
    borderRadius: 10,
    marginVertical: 7,
    marginHorizontal: 10,
    padding: 10,
    backgroundColor: Code.white,
    shadowColor: Code.black,
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 8,
  },

  deleteBtnContainer: {
    backgroundColor: Code.red,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    borderRadius: 5,
    width: '40%',
  },

  editBtnContainer: {
    backgroundColor: Code.primary,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    borderRadius: 5,
    width: '40%',
  },

  textInputConatiner: {
    flex: 1,
    flexDirection: 'column',
    padding: 10,
  },
});
