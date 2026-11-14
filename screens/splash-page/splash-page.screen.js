import React, { useEffect } from 'react';
import {
  SafeAreaView,
  Image
} from 'react-native';
import { useSelector } from 'react-redux';
import { StackActions } from '@react-navigation/native';
import stylesSplash from './splash-page.styles';
import { loggedInDetails } from '../../redux/login/login.selectors';

const SplashPageScreen = ({ navigation }) => {
  const loginData = useSelector(loggedInDetails);

  useEffect(() => {
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
  }, [loginData]);

  return (
    <SafeAreaView style={stylesSplash.mainContainer}>
      <Image style={stylesSplash.splashImageStyle} source={require('../../assets/images/splash_screen.png')} />
    </SafeAreaView>
  );
};

export default (SplashPageScreen);
