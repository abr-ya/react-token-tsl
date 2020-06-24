import {createCustomAction, createAction} from 'typesafe-actions';
import {authorizationActionTypes} from './constants';
import {userActionTypes} from './constantsUser';

interface IPalette {[key: string]: string;}

export const toggleIsPennding = createAction(
	authorizationActionTypes.TOGGLE_ISPENNDING,
)();

export const setAuthorizationStep = createCustomAction(
	authorizationActionTypes.SET_AUTHORIZATION_STEP,
	(step: number) => ({step}),
);

export const setTokens = createCustomAction(
	authorizationActionTypes.SET_TOKENS,
	(accessToken: string, refreshToken: string) => ({accessToken, refreshToken}),
);

export const setRefreshToken = createCustomAction(
	authorizationActionTypes.SET_REFRESH_TOKEN,
	(refreshToken: string) => ({refreshToken}),
);

export const setAccessToken = createCustomAction(
	authorizationActionTypes.SET_ACCESS_TOKEN,
	(accessToken: string) => ({accessToken}),
);

export const getLocalRefreshTokenSaga = createAction(
	authorizationActionTypes.GET_LOCAL_REFRESH_TOKEN_SAGA,
)();

export const authenticateWithLoginAndPasswordSaga = createCustomAction(
	authorizationActionTypes.AUTHENTICATE_WITH_LOGIN_AND_PASSWORD_SAGA,
	// tslint:disable-next-line: no-shadowed-variable
	(login: string, password: string) => ({login, password}),
);

export const sendSmsCodeSaga = createCustomAction(
	authorizationActionTypes.SEND_SMS_CODE_SAGA,
	// tslint:disable-next-line: no-shadowed-variable
	(login: string, password: string, code: string) => ({login, password, code}),
);

//////////////////////
// library/common/actions/user
//////////////////////
export const login = createAction(userActionTypes.LOGIN)();
export const logout = createAction(userActionTypes.LOGOUT)();

export const requestUserSaga = createAction(userActionTypes.REQUEST_USER_SAGA)();

export const setUserPalette = createCustomAction(userActionTypes.SET_USER_PALETTE,
	(palette: IPalette) => ({palette}));

export const setUserAgreement = createCustomAction(userActionTypes.SET_USER_AGREEMENT,
	(agreement: any) => ({agreement}));

export const setUserNewAgr = createCustomAction(userActionTypes.SET_USER_PRICE_AGR,
	(agreement: any) => ({agreement}));
//////////////////////
