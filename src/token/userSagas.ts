import {takeLatest, call, put, select} from 'redux-saga/effects';
import {userActionTypes} from './constantsUser';
import * as userAction from './actionsAuth';
import {requestUserPalette, defaultUserPalette} from '../api/km'; //requestUserAgreements
import {RootState} from '../index';
import {getLocalRefreshTokenSaga} from './authSagas';

function* requestUserSaga() {
	console.log('requestUserSaga');
	// тут сага вызывается напрямую
	yield getLocalRefreshTokenSaga();

	const refreshToken = yield select((state: RootState) => state.authorization.refreshToken);

	try {
		if (!!refreshToken) {
			const response = yield call(requestUserPalette);
			if (response.status === 200) {
				yield put(userAction.setUserPalette(response.data));
			}
		} else {
			yield put(userAction.setUserPalette(defaultUserPalette));
		}
	} catch (error) {
		yield put(userAction.setUserPalette(defaultUserPalette));
	}

	// try {
	// 	const respAgr = yield call(requestUserAgreements);
	// 	const agreement = yield respAgr.data.data.find((item: any) => item.is_default);
	// 	yield put(userAction.setUserAgreement(agreement));
	// 	yield put(userAction.setUserNewAgr(agreement));
	// } catch (error) {
	// 	console.log('requestUserAgreements', error);
	// }
}

export default function* watchCommonLayout() {
	yield takeLatest(userActionTypes.REQUEST_USER_SAGA, requestUserSaga);
}
