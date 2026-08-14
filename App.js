import { StatusBar } from 'expo-status-bar';
import { useFonts } from 'expo-font';
import { Provider } from 'react-redux'
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { PersistGate } from 'redux-persist/integration/react';
import { StyleSheet, Text, View } from 'react-native';

import AppNavigator from './navigation/AppNavigator';
import { store, persistor } from './redux/store';
import { AppContextProvider } from './redux/context/AppContext';

const App = () => {
  return (
    <Provider store={store}>
      <AppContextProvider>
        <SafeAreaProvider>
          <PersistGate persistor={persistor}>
            <AppNavigator />
            <StatusBar style="light" />
          </PersistGate>
        </SafeAreaProvider>
      </AppContextProvider>
    </Provider>
  );
}

export default App;