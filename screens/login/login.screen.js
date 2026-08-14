import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  View,
  Image,
  KeyboardAvoidingView,
  Text,
  TouchableOpacity,
  ScrollView,
  TextInput,
} from 'react-native';
import { StackActions } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';
import Spinner from 'react-native-loading-spinner-overlay';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import Modal from 'react-native-modal';
import Code from '../../constants/ColorCodes';
import styles from '../general-styles/general-styles';
import { alertModel } from '../alert-component/alert-component.screen';
import subStyles from './login.styles';
import { userLoginStart, addPersistDataStart, loginResponseResetStart } from '../../redux/login/login.action';
import { selectUserLogin, selectDecodeLoginRespone } from '../../redux/login/login.selectors';

const LoginScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const loginResponse = useSelector(selectUserLogin);
  const decodedResp = useSelector(selectDecodeLoginRespone);

  const [isLoading, setLoginSpinner] = useState(false);
  const [loginCredentials, setUserCredentils] = useState({
    phoneNumber: '',
    loginPassword: '',
    passwordIcon: 'eye-off',
    security: true,
    isShowCompanyModel: false,
  });

  const { phoneNumber, loginPassword, passwordIcon, security, isShowCompanyModel } = loginCredentials;

  // Similar to componentDidMount and componentDidUpdate:
  useEffect(() => {
    if (loginResponse !== null) {
      if (loginResponse.statusCode === '01') {
        if (decodedResp.length > 1) {
          setUserCredentils({...loginCredentials, isShowCompanyModel: true});
        } else {
          loginNav(decodedResp[0]);
        }
      } else if (loginResponse.statusCode === '100') {
        alertModel('Invaild Phone Number/Password');
      }
      setLoginSpinner(false);
      dispatch(loginResponseResetStart());
    }
  }, [loginResponse]);

  const loginNav = (loginResp) => {
    loginResp.IsLoginDone = true;
    let arrOfObj = [];
    arrOfObj.push(loginResp);
    dispatch(addPersistDataStart(arrOfObj));
    navigation.dispatch(StackActions.replace('Home'));
  }

  const onUserLogin = () => {
    if (phoneNumber === '') {
      alertModel('Enter the Phone Number');
    } else if (phoneNumber.length < 10) {
      alertModel('Please, check the Phone Number');
    } else if (loginPassword === '') {
      alertModel('Enter the password');
    } else {
      setLoginSpinner(true);
      dispatch(userLoginStart(loginCredentials));
    }
  };

  const onEyePress = () => {
    if (security === false) {
      setUserCredentils({ ...loginCredentials, security: true, passwordIcon: 'eye-off' });
    } else {
      setUserCredentils({ ...loginCredentials, security: false, passwordIcon: 'eye' });
    }
  };

  return (
    <SafeAreaView style={styles.mainContainer}>
      <KeyboardAvoidingView style={styles.mainContainer}>
        <ScrollView contentContainerStyle={styles.scrollFlex}>
          <View style={subStyles.loginMainConatiner}>

            <View style={subStyles.imageConatiner}>
              <Image
                style={subStyles.logoImage}
                source={require('../../assets/images/login/logo.png')}
              />
            </View>

            <View style={subStyles.textInputConatiner}>
              <View style={[subStyles.textInputMainContainer, subStyles.bottomMargin]}>
                <Ionicons style={subStyles.iconPadding} size={40} name="person-circle" color={Code.primary} />
                <TextInput
                  style={subStyles.cutomeInputText}
                  placeholder="User Name"
                  maxLength={10}
                  keyboardType="numeric"
                  onChangeText={
                    (phoneNumber) => setUserCredentils({ ...loginCredentials, phoneNumber })
                  }
                />
              </View>
              <View style={subStyles.textInputMainContainer}>
                <MaterialCommunityIcons
                  style={subStyles.iconPadding}
                  size={38}
                  name="lock"
                  color={Code.primary}
                />
                <TextInput
                  style={subStyles.cutomeInputText}
                  placeholder="Password"
                  secureTextEntry = {security}
                  onChangeText={
                    (loginPassword) => setUserCredentils({ ...loginCredentials, loginPassword })
                  }
                />
                <Ionicons style={subStyles.iconPadding} size={30} name={passwordIcon} color={Code.primary} onPress={() => onEyePress()} />
              </View>
            </View>

            <View style={subStyles.bottomContainer}>
              <TouchableOpacity
                style={styles.buttonContainer}
                onPress={onUserLogin}
              >
                <Text style={styles.btnText}>Submit</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

      
      <Modal
        visible={isShowCompanyModel}
      >
        <View style={subStyles.modalStyleContainer}>
          <Text style={subStyles.pendingDueHeadText}>Select Company</Text>
          <View style={subStyles.repaymentType}>
            {  decodedResp !== null && decodedResp !== undefined && decodedResp.length > 0 && decodedResp.map((item) => (
              <TouchableOpacity
                onPress={() => loginNav(item)}
                style={subStyles.optionBtnContainer}
                key={item.GeneralCompanyID}
              >
                <Text
                  style={styles.activeBtnText}
                >
                  {item.CompanyName}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </Modal>

      <Spinner
        visible={isLoading}
        textContent="Loading..."
        textStyle={styles.loadingText}
        color={Code.primary_medium}
        animation="slide"
      />
    </SafeAreaView>
  );
};

export default LoginScreen;
