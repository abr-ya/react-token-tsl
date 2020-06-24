import {put} from 'redux-saga/effects';
//import {call, put, takeLatest, select} from 'redux-saga/effects';
import * as authorizationActions from './actionsAuth';
//import * as userAction from '../../library/common/actions/user';
//import {authorizationActionTypes} from './constants';
import {getRefreshTokenFromLS} from './token';
//import {getRefreshTokenFromLS, setRefreshTokenToLS} from 'library/utils/token';
//import {encryptAuthData} from './utils';
//import {requestLoginCodeBySms, sendSmsCode, getAccessToken} from './api';
//import {showSnackbarMessage} from 'library/utils';
//import {push} from 'connected-react-router';
//import {initializeAxios} from 'library/utils/fetch';
//import {RootState, dispatchSomething} from 'main';

export function* getLocalRefreshTokenSaga() {
	//достать из локал сторедж рефреш токен и записать в стэйт
	try {
		const refreshToken = getRefreshTokenFromLS();
		console.log(refreshToken);
		if (!!refreshToken) {
			yield put(authorizationActions.setRefreshToken(refreshToken));
		} else {
			throw new Error('There no any tocken in local storage...');
		}
	} catch (error) {
		console.log(error);
	}
}

// export function* getAccessTokenSaga() {
// 	try {
// 		const refreshToken = yield select((_state: RootState) => _state.authorization.refreshToken);
// 		console.log('refreshToken');
// 		const access = yield call(getAccessToken, refreshToken);
// 		console.log('getAccessTokenSaga');
// 		console.log(access.data.access);
// 		yield call(authorizationActions.setAccessToken, access.data.access);
// 	} catch (error) {
// 		console.log(error);
// 	}
// }

// function* authenticateWithLoginAndPasswordSaga(
// 	action: ReturnType<typeof authorizationActions.authenticateWithLoginAndPasswordSaga>) {

// 	yield put(authorizationActions.toggleIsPennding());

// 	try {
// 		yield call(requestLoginCodeBySms, encryptAuthData(action.login, action.password));
// 		console.log('sms code has been send');
// 		yield put(authorizationActions.setAuthorizationStep(1));
// 		//тут я буду отправлять логин и пароль на сервер
// 		//для получения проверочной смс
// 	} catch (error) {
// 		// 401 - не заданные или не валидные учетные данные
// 		// 403 - запрос отбит по rate-limit'у
// 		console.log(error);
// 		console.log(error.response.status);

// 		if (error.response.status === 401) {
// 			showSnackbarMessage(
// 				'Введены неверные учетные данные',
// 				'error',
// 				3000,
// 				1000,
// 				200,
// 			);
// 		} else if (error.response.status === 403) {
// 			showSnackbarMessage(
// 				'Слишком много запросов',
// 				'error',
// 				3000,
// 				1000,
// 				200,
// 			);
// 		}
// 	}

// 	yield put(authorizationActions.toggleIsPennding());
// }

// function* sendSmsCodeSaga(action: ReturnType<typeof authorizationActions.sendSmsCodeSaga>) {

// 	yield put(authorizationActions.toggleIsPennding());

// 	//отправляю смс и получаю два токена
// 	//записываю их в стэйт
// 	//рефреш записываю в локал стэйт

// 	try {
// 		const tockens = yield call(sendSmsCode, encryptAuthData(action.login, action.password), action.code);

// 		yield put(authorizationActions.setTokens(tockens.data.access, tockens.data.refresh));
// 		const state = yield select((_state: RootState) => _state);

// 		yield call(initializeAxios, state, dispatchSomething);

// 		yield call(setRefreshTokenToLS, tockens.data.refresh);

// 		yield put(userAction.requestUserSaga());

// 		yield put(userAction.login());

// 		yield put(authorizationActions.setAuthorizationStep(0));

// 		yield put(push('/'));

// 	} catch (error) {
// 		console.log(error);

// 		if (error.response.status === 400) {
// 			showSnackbarMessage(
// 				'Введен неверный проверочный код',
// 				'error',
// 				3000,
// 				1000,
// 				200,
// 			);
// 		}
// 	}

// 	yield put(authorizationActions.toggleIsPennding());
// }

// export default function* watchEntities() {
// 	yield takeLatest(authorizationActionTypes.GET_LOCAL_REFRESH_TOKEN_SAGA, getLocalRefreshTokenSaga);
// 	yield takeLatest(authorizationActionTypes.AUTHENTICATE_WITH_LOGIN_AND_PASSWORD_SAGA,
// 		authenticateWithLoginAndPasswordSaga);
// 	yield takeLatest(authorizationActionTypes.SEND_SMS_CODE_SAGA, sendSmsCodeSaga);
// }
