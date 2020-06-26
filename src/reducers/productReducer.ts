import {ActionType, getType} from 'typesafe-actions';

import * as actions from '../actions/productActions';

export type productState = Readonly<{
	loading: boolean;
	products: any[];
	cart: any;
}>;

const initialState: productState = {
	loading: false,
	products: [],
	cart: {2: 1, 3: 2},
};

export type productActions = ActionType<typeof actions>;

export default (
	state = initialState,
	action: productActions,
): productState => {
	switch(action.type) {
		case getType(actions.showLoading):
			return {
				...state,
				loading: true,
			};
		case getType(actions.hideLoading):
			return {
				...state,
				loading: false,
			};
		case getType(actions.setProducts):
			return {
				...state,
				products: action.data,
			};
		case getType(actions.addToCart):
			return {
				...state,
				cart: {
					...state.cart,
					[action.id]: state.cart[action.id] ? parseInt(state.cart[action.id], 10) + 1 : 1,
				},
			};
		case getType(actions.delFromCart):
			const newCart = state.cart;
			delete newCart[action.id];

			return {
				...state,
				cart: {...newCart},
			};
		default:
			return state;
	}
};
