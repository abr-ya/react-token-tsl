import {combineReducers} from 'redux';
import productReducer from './productReducer';
import authReducer from '../token/reducerAuth';
import userReducer from '../token/userReducer';

const createRootReducer = () =>
	combineReducers({
		authorization: authReducer,
		product: productReducer,
		user: userReducer,
	});

export default createRootReducer;
