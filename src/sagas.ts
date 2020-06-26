import {call, takeLatest, put} from 'redux-saga/effects'; // takeEvery, select
import * as api from './api';
import * as productActions from './actions/productActions';
import {productActionTypes} from './actions/productActionTypes';
//import {RootState} from 'main';

function* requestProductsSaga(action: ReturnType<typeof productActions.requestProductsSaga>) {
	console.log('requestProductsSaga');
	try {
		yield put(productActions.showLoading());
		const response = yield call(api.requestProducts);
		console.log('data: ', response.data);
		yield put(productActions.setProducts(response.data));
		yield put(productActions.hideLoading());
	} catch (error) {
		console.error(error);
	}
}

export default function* watchEntities() {
	yield takeLatest(productActionTypes.REQUEST_PRODUCTS_SAGA, requestProductsSaga);
}
