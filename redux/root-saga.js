import { all, call } from 'redux-saga/effects';

import { loginSaga } from './login/login.sagas';

// Category
import { categorySaga } from './category/category.sagas';

// Product
import { productSaga } from './product/product.sagas';



export default function* rootSaga() {
	yield all([
		call(loginSaga),
		call(categorySaga),
		call(productSaga),
    ]);
}