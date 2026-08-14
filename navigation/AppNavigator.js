import React, { useEffect } from 'react';
import * as Notifications from 'expo-notifications';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import SplashNavigation from './SplashNavigation';
import LoginNavigation from './LoginNavigator';
import TabNavigation from './TabNavigation';

const SwitchStack = createNativeStackNavigator();
const AppNavigator = () => {
  
  return (
    <NavigationContainer>
      <SwitchStack.Navigator screenOptions={{ headerShown: false }}>
        {/* <SwitchStack.Screen name="Splash" component={SplashNavigation} /> */}
        {/* <SwitchStack.Screen name="Login" component={LoginNavigation} /> */}
        <SwitchStack.Screen name="Home" component={TabNavigation} />
      </SwitchStack.Navigator>
    </NavigationContainer>
  );
}


export default AppNavigator;