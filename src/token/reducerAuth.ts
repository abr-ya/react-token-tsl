import {ActionType, getType} from 'typesafe-actions';

import * as actions from './actionsAuth';

export type AuthorizationState = Readonly<{
	isPending: boolean;
	authorizationStep: number;
	accessToken: string | undefined;
	refreshToken: string | undefined;
}>;

const initialState: AuthorizationState = {
	isPending: false,
	authorizationStep: 0,
	accessToken: undefined,
	refreshToken: undefined,
};

export type authorizationsActions = ActionType<typeof actions>;

export default (
	state = initialState,
	action: authorizationsActions,
): AuthorizationState => {
	switch (action.type) {

		case getType(actions.toggleIsPennding):
			return {
				...state,
				isPending: !state.isPending,
			};

		case getType(actions.setAuthorizationStep):
			return {
				...state,
				authorizationStep: action.step,
			};

		case getType(actions.setTokens):
			return {
				...state,
				accessToken: action.accessToken,
				refreshToken: action.refreshToken,
			};

		case getType(actions.setRefreshToken):
			return {
				...state,
				refreshToken: action.refreshToken,
			};

		case getType(actions.setAccessToken):
			return {
				...state,
				accessToken: action.accessToken,
			};

		default:
			return state;

	}
};
