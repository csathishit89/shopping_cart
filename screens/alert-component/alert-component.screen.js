/* eslint-disable import/prefer-default-export */
import {
  ToastAndroid,
  Platform,
  Alert,
} from 'react-native';

export const alertModel = (message) => {
  if (Platform.OS === 'android') {
    ToastAndroid.show(message, ToastAndroid.SHORT);
  } else {
    Alert.alert('Oops!!!', message);
  }
};
