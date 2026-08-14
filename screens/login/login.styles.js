/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
import { StyleSheet } from 'react-native';
import Code from '../../constants/ColorCodes';

const fontReg = 'Roboto';
const fontBold = 'RobotoBold';
export default StyleSheet.create({

  loginMainConatiner: {
    flex: 1,
    flexDirection: 'column',
  },

  imageConatiner: {
    flex: 0.8,
    justifyContent: 'center',
    alignItems: 'center',
  },

  logoImage: {
    width: 150,
    height: 150,
    resizeMode: 'contain',
  },

  logoText: {
    fontSize: 28,
    fontFamily: fontBold,
    color: Code.primary,
  },

  textInputConatiner: {
    flex: 0.3,
    padding: 15,
  },

  textInputMainContainer: {
    flexDirection: 'row',
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Code.white,
    shadowColor: Code.black,
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.4,
    shadowRadius: 3,
    elevation: 5,
    height: 55,
  },

  bottomMargin: {
    marginBottom: 25,
  },

  iconPadding: {
    padding: 5,
  },

  cutomeInputText: {
    flex: 1,
    paddingTop: 10,
    paddingRight: 10,
    paddingBottom: 10,
    paddingLeft: 0,
    marginRight: 15,
    backgroundColor: Code.white,
    color: Code.primary,
    fontSize: 16,
    fontFamily: fontReg,
  },

  textInputStyle: {
    backgroundColor: Code.white,
    marginBottom: 20,
  },

  inputTextStyle: {
    fontSize: 18,
    backgroundColor: 'transparent',
  },

  bottomContainer: {
    // flex: 0.3,
    flexDirection: 'column',
    justifyContent: 'flex-end',
    padding: 15,
  },

  forgotPassword: {
    fontSize: 14,
    fontFamily: fontReg,
    marginTop: 10,
    textAlign: 'center',
  },

  modalStyleContainer: {
    backgroundColor: '#fff',
    justifyContent: 'center',
    borderRadius: 25,
  },

  pendingDueHeadText: {
    fontSize: 18,
    fontFamily: fontBold,
    textAlign: 'center',
    padding: 10,
  },

  repaymentType: {
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    margin: 5,
  },

  optionBtnContainer: {
    backgroundColor: Code.primary,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    borderRadius: 5,
    marginBottom: 20,
    marginTop: 20,
    width: '90%'
  },
});
