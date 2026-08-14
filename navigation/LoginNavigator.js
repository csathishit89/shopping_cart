import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Code from '../constants/ColorCodes';
import LoginScreen from '../screens/login/login.screen';

const headStyle = {
  headerTitle: '', headerStyle: { backgroundColor: Code.primary, height: 40},
};

const LoginStack = createStackNavigator();

export default function LoginNavigation() {
  return (
    <LoginStack.Navigator
    initialRouteName="LoginPage">
      <LoginStack.Screen
        name="LoginPage"
        options={headStyle}
        component={LoginScreen}
      />
    </LoginStack.Navigator>
  );
}
