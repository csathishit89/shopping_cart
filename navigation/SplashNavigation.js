import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SplashPageScreen from '../screens/splash-page/splash-page.screen';

const SplashStack = createNativeStackNavigator();

export default function SplashNavigation() {
  return (
    <SplashStack.Navigator>
      <SplashStack.Screen
        name="SplashPage"
        options={{ headerShown: false }}
        component={SplashPageScreen}
      />
    </SplashStack.Navigator>
  );
}
