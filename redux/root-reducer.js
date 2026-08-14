import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';

import loginReducer from './login/login.reducer';

const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
    whitelist: ['SNlogin'],
  };
const rootReducer = combineReducers({
	SNlogin: loginReducer,
});

export default persistReducer(persistConfig, rootReducer);
