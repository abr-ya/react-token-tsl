import {productActionTypes} from './productActionTypes';
import {createAction, createCustomAction} from 'typesafe-actions';

export const showLoading = createAction(productActionTypes.SHOW_LOADING)();
export const hideLoading = createAction(productActionTypes.HIDE_LOADING)();
export const requestProductsSaga = createAction(productActionTypes.REQUEST_PRODUCTS_SAGA)();
export const setProducts = createCustomAction(productActionTypes.SET_PRODUCTS,
	(data: any[]) => ({data}),
);
export const addToCart = createCustomAction(productActionTypes.ADD_TO_CART,
	(id: number) => ({id}),
);
export const delFromCart = createCustomAction(productActionTypes.DEL_FROM_CART,
	(id: number) => ({id}),
);
