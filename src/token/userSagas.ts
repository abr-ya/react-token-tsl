import {takeLatest, call, put, select} from 'redux-saga/effects';
import {userActionTypes} from './constantsUser';
import {setUserPalette, setUserAgreement, setUserNewAgr} from './actionsAuth';
import {requestUserPalette, defaultUserPalette, requestUserAgreements} from '../api/km';
import {RootState} from '../index';
import {getLocalRefreshTokenSaga} from './authSagas';
import {showLoading, hideLoading} from '../actions/productActions';

function* requestUserSaga() {
	yield put(showLoading());

	console.log('requestUserSaga');
	// тут сага вызывается напрямую
	yield getLocalRefreshTokenSaga();

	const refreshToken = yield select((state: RootState) => state.authorization.refreshToken);

	try {
		if (!!refreshToken) {
			const response = yield call(requestUserPalette);
			if (response.status === 200) {
				yield put(setUserPalette(response.data));
			}
		} else {
			yield put(setUserPalette(defaultUserPalette));
		}
	} catch (error) {
		yield put(setUserPalette(defaultUserPalette));
	}

	yield put(hideLoading());

	try {
		const respAgr = yield call(requestUserAgreements);
		const agreement = yield respAgr.data.data.find((item: any) => item.is_default);
		yield put(setUserAgreement(agreement));
		yield put(setUserNewAgr(agreement));
	} catch (error) {
		console.log('requestUserAgreements', error);
	}
}

export default function* watchCommonLayout() {
	yield takeLatest(userActionTypes.REQUEST_USER_SAGA, requestUserSaga);
}
