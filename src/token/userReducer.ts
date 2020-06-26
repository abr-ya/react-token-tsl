import {ActionType, getType} from 'typesafe-actions';
import * as actions from './actionsAuth';
import {IPalette} from './actionsAuth';

export type UserState = Readonly<{
	isAuth: boolean;
	permissions: string[];
	userId: string | null;
	caption: string | null;
	palette: IPalette;
	agreementName: string;
	agreementId: string;
	oldAgreementId: string;
}>;

const initialState: UserState = {
	isAuth: false,
	permissions: [],
	userId: null,
	caption: null,
	palette: {},
	agreementName: '',
	agreementId: '',
	oldAgreementId: '',
};

export type UserActions = ActionType<typeof actions>;

export default (state = initialState, action: UserActions): UserState => {
	switch (action.type) {
		case getType(actions.login):
			return {
				...state,
				isAuth: true,
			};
		case getType(actions.logout):
			return {
				...state,
				isAuth: false,
				permissions: [],
				userId: null,
				caption: null,
			};
		case getType(actions.setUserPalette):
			return {
				...state,
				palette: action.palette,
			};
		case getType(actions.setUserAgreement):
			return {
				...state,
				agreementName: action.agreement.name,
				agreementId: action.agreement.id,
			};
		case getType(actions.setUserNewAgr):
			return {
				...state,
				oldAgreementId: action.agreement.id,
			};
		default:
			return state;
	}
};
