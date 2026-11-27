import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';

import loginReducer from './login/login.reducer';
import CategoryReducer from './category/category.reducer';
import ProductReducer from './product/product.reducer';
import orderReducer from './order/order.reducer';
import statisticsReducer from './statistics/statistics.reducer';
import { statisticsSaga } from './statistics/statistics.sagas';

const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
    whitelist: ['login'],
  };
const rootReducer = combineReducers({
	login: loginReducer,
  category: CategoryReducer,
  product: ProductReducer,
  order: orderReducer,
  statistics: statisticsReducer,
});

export default persistReducer(persistConfig, rootReducer);
