import {all, fork} from 'redux-saga/effects';

import allSagas from './sagas';
import userSagas from './token/userSagas';
//import authSagas from './token/authSagas';

export default function* rootSaga() {
	yield all([
		fork(allSagas),
		fork(userSagas),
		//fork(authSagas),
	]);
}
