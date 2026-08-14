import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  Image,
  View,
  Text,
  TouchableOpacity,
  Platform,
  Linking,
  Alert,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { StackActions } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import * as Location from 'expo-location';
import Modal from 'react-native-modal';
import stylesSplash from './splash-page.styles';
import { loggedInDetails, changeLanguage, selectedGetAppVersion, selectGeneralDataResp, selectGeneralData } from '../../redux/login/login.selectors';
import { getAppVesrionResetStart, getAppVesrionStart, setSelectedLanguageStart, getAppGeneralDataStart, getAppGeneralDataResetStart } from '../../redux/login/login.action';
import { expo } from '../../app.json';
import styles from '../../screens/general-styles/general-styles';

const SplashPageScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const loginData = useSelector(loggedInDetails);
  const getCurrentVersion = useSelector(selectedGetAppVersion);
  const getGeneralDataResp = useSelector(selectGeneralDataResp);
  const getGeneralData = useSelector(selectGeneralData);
  const lang = useSelector(changeLanguage);

  const [splashCredential, setSplashCredential] = useState({
    isShowUpdate: false,
    isShowMaintenance: false,
    needUpdateAppVersion: '',
    ServerMaintenanceMessage: '',
    IsServerUnderMaintenance: 0,
  });

  const { needUpdateAppVersion } = splashCredential;

  useEffect(() => {
    askPermissions();
  }, []);


  const askPermissions = async () => {
    let CameraStatus;
    let MediaStatus;
    let LocationStatus;

    // CHECK CAMERA PERMISSION
    const CameraPermission = ImagePicker.getCameraPermissionsAsync();
    CameraStatus = (await CameraPermission).granted;

    // REQUEST CAMERA PERMISSION
    if (!CameraStatus) {
      const { granted } = await ImagePicker.requestCameraPermissionsAsync();
      CameraStatus = granted;
    }

    // LOCATION PERMISSION
    // const { status }  = await Location.getForegroundPermissionsAsync();
    // LocationStatus = (status === 'granted') ? true : false;

    // if (!LocationStatus) {
      const { status } = await Location.requestForegroundPermissionsAsync();
      LocationStatus = (status === 'granted') ? true : false;
    // }

    // CHECK MEDIA PERMISSION
    const MediaPermission = ImagePicker.getMediaLibraryPermissionsAsync();
    MediaStatus = (await MediaPermission).granted;

    // REQUEST MEDIA PERMISSION
    if (!MediaStatus) {
      const { granted } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      MediaStatus = granted;
    }

    if (MediaStatus && CameraStatus && LocationStatus) {
      dispatch(setSelectedLanguageStart(lang));
      // dispatch(getAppVesrionStart());
      // dispatch(getAppGeneralDataStart());
      if (loginData !== null) {
        if (loginData.length > 0) {
          if (loginData[0].IsLoginDone) {
            navigation.dispatch(StackActions.replace('Home'));
          } else {
            navigation.dispatch(StackActions.replace('Login'));
          }
        } else {
          navigation.dispatch(StackActions.replace('Login'));
        }
      } else {
        navigation.dispatch(StackActions.replace('Login'));
      }
    } else {
      if (!CameraStatus && !MediaStatus) {
        openSettings('In order to use the camera, you must give permission for Aavin to access the Camera and Media. You can grant this permission in the App Setting.');
      } else if (!MediaStatus && CameraStatus) {
        openSettings('In order to use the camera, you must give permission for Aavin to access the Files and Media. You can grant this permission in the App Setting.');
      } else if (MediaStatus && !CameraStatus) {
        openSettings('In order to use the camera, you must give permission for Aavin to access the camera. You can grant this permission in the App Setting.');
      } else if (!LocationStatus) {
        openSettings('In order to use the GPS, you must give permission for Aavin to access the Location. You can grant this permission in the App Setting.');
      }
    }
  }

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
  }

  useEffect(() => {
    if (getCurrentVersion !== null) {
      if (getCurrentVersion.statusCode === '01') {
        let apiVersion = getCurrentVersion.UpdatedAppVersion.split('.').join("");
        let appVersion = expo.version.split('.').join("");
        const mantoryUpdate = getCurrentVersion.IsAppMantoryUpdate;
        splashCredential.needUpdateAppVersion = getCurrentVersion.UpdatedAppVersion;
        if (parseFloat(apiVersion) > parseFloat(appVersion) && mantoryUpdate === '1' && !(parseFloat(apiVersion) < parseFloat(appVersion))) {
          splashCredential.isShowUpdate = true;
        } else {
          if (loginData !== null) {
            if (loginData.length > 0) {
              if (loginData[0].IsLoginDone) {
                navigation.dispatch(StackActions.replace('Home'));
              } else {
                navigation.dispatch(StackActions.replace('Login'));
              }
            } else {
              navigation.dispatch(StackActions.replace('Login'));
            }
          } else {
            navigation.dispatch(StackActions.replace('Login'));
          }

        }
      }
      dispatch(getAppVesrionResetStart());
    }

    if (getGeneralDataResp) {
      if (getGeneralDataResp.statusCode === '01') {
        const { IsServerUnderMaintenance, IsAppMandatoryUpdateNeeded, AppVersion, ServerMaintenanceMessage } = getGeneralData;
        const CurrentApiVersion = AppVersion.split('.').join("");
        const CurrentAppVersion = expo.version.split('.').join("");
        splashCredential.needUpdateAppVersion = AppVersion;
        splashCredential.ServerMaintenanceMessage = ServerMaintenanceMessage;
        splashCredential.IsServerUnderMaintenance = IsServerUnderMaintenance;

        if (parseFloat(CurrentApiVersion) > parseFloat(CurrentAppVersion) && IsAppMandatoryUpdateNeeded === 1) {
          splashCredential.isShowUpdate = true;
        } else if (IsServerUnderMaintenance === 1) {
          splashCredential.isShowMaintenance = true;
        } else {
          if (loginData !== null) {
            if (loginData.length > 0) {
              if (loginData[0].IsLoginDone) {
                navigation.dispatch(StackActions.replace('Home'));
              } else {
                navigation.dispatch(StackActions.replace('Login'));
              }
            } else {
              navigation.dispatch(StackActions.replace('Login'));
            }
          } else {
            navigation.dispatch(StackActions.replace('Login'));
          }
        }

      }
      dispatch(getAppGeneralDataResetStart());
    }
  }, [getCurrentVersion, getGeneralDataResp]);

  const updateNewAppVersion = () => {
    if (Platform.OS === 'ios') {
      Linking.openURL('https://play.google.com/store/apps/details?id=com.sky.Aavin');
    } else {
      Linking.openURL('https://play.google.com/store/apps/details?id=com.sky.Aavin');
    }
  };

  return (
    <SafeAreaView style={stylesSplash.mainContainer}>
      <Image style={stylesSplash.splashImageStyle} source={require('../../assets/images/splashScreen.png')} />
      <Modal
        visible={splashCredential.isShowUpdate}
        animationIn="slideInLeft"
        transparent={true}
        animationOut="slideOutRight"
      >
        <View style={styles.updateAppContainer}>
          <Text style={styles.appUpdateHeadText}>Update Aavin App?</Text>
          <Text style={styles.appUpdateText}>
            Aavin Recommends that you update to the latest version - {needUpdateAppVersion}
          </Text>
          <View style={styles.buttonMainContainer}>
            <TouchableOpacity
              style={styles.updateBtnContainer}
              onPress={updateNewAppVersion}
            >
              <Text style={styles.updateAppText}>Update</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* <Modal
        visible={splashCredential.isShowMaintenance}
        animationIn="slideInLeft"
        transparent={true}
        animationOut="slideOutRight"
      >
        <View style={styles.updateAppContainer}>
          <Text style={styles.appMaintenanceHeadText}>Server Under Maintenance</Text>

          <Image
            style={styles.maintenanceImage}
            source={require('../../assets/images/Server_maintainence.png')}
          />

          <Text style={styles.appMaintenanceText}>
            {splashCredential.ServerMaintenanceMessage}
          </Text>
        </View>
      </Modal> */}
    </SafeAreaView>
  );
};

export default (SplashPageScreen);
