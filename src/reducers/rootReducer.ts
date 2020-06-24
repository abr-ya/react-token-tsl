import {combineReducers} from 'redux';
import productReducer from './productReducer';
import authReducer from '../token/reducerAuth';

const createRootReducer = () =>
	combineReducers({
		product: productReducer,
		authorization: authReducer,
	});

export default createRootReducer;
