import axios, {AxiosRequestConfig, AxiosPromise} from 'axios';
import {setAccessToken, login, logout} from './actionsAuth';
import {RootState} from '../index';
import {removeTokens} from './token';

const createAxiosShit = (accessToken: string, config?: AxiosRequestConfig) =>
	axios.create({
		baseURL: '/',
		headers: {
			'Content-Type': 'application/json',
			'Authorization': accessToken,
		},
		withCredentials: true,
		...config,
	});

interface IFailedQueue {
	resolve: (payload: any) => void;
	reject: (payload: any) => void;
}

let isRefreshing = false;
let failedQueue: IFailedQueue[] = [];

const processQueue = (error: Error | null, token: null | string = null) => {
	failedQueue.forEach(prom => {
		if (error) {
			prom.reject(error);
		} else {
			prom.resolve(token);
		}
	});

	failedQueue = [];
};

export const initializeAxios = (store: RootState, dispatch: (action: any) => void) => {
	const accessToken = store.authorization.accessToken;
	const refreshToken = store.authorization.refreshToken;

	const nonAuthFetch = axios.create({
		baseURL: '/',
		headers: {
			'Content-Type': 'application/json',
		},
		withCredentials: true,
	});

	const fetch = createAxiosShit(`Bearer ${accessToken}`);

	fetch.interceptors.response.use(
		response => response,
		async error => {
			const originalRequest = error.config;

			if (error.response && error.response.status === 401 && !originalRequest._retry) {
				console.log('401');
				if (isRefreshing) {
					return new Promise<AxiosPromise>((resolve, reject) => {
						failedQueue.push({resolve, reject});
					}).then(token => {
						originalRequest.headers['Authorization'] = token;

						return axios(originalRequest);
					}).catch(err => Promise.reject(err));
				}

				originalRequest._retry = true;
				isRefreshing = true;

				try {
					const ref = await nonAuthFetch.post('auth/refresh-tokens/', {
						refresh: refreshToken,
					});

					console.log('Получили новый accessToken');

					//записать аксес токен
					dispatch(setAccessToken(ref.data.access));
					dispatch(login());

					const resp = axios({
						...error.config, headers: {
							...error.config.headers,
							Authorization: `Bearer ${ref.data.access}`,
						},
					});

					processQueue(null, `Bearer ${ref.data.access}`);

					return Promise.resolve(resp);

				} catch (error) {
					console.log(error);
					processQueue(error, null);
					if (error.response.status === 401) {
						console.log('Не получилось обновить access_token - Ваш рефреш токен протух');
						removeTokens();
						dispatch(logout());
					}

					console.log('last Error: ', error);
				} finally {
					isRefreshing = false;
				}
			}

			return Promise.reject(error);
		});

	const requestTypes = (sectionUrl: string) => ({

		get: (url: string, config?: any) => fetch.get(`${sectionUrl}${url}`, config),

		post: (url: string, config: string) => fetch.post(`${sectionUrl}${url}`, config),

		delete: (url: string) => fetch.delete(`${sectionUrl}${url}`),

		patch: (url: string, config: string) => fetch.patch(`${sectionUrl}${url}`, config),

	});

	const fetchProfile = requestTypes('profile');

	const fetchCart = requestTypes('cart');

	const fetchCatalogs = requestTypes('catalogs');

	const fetchOrders = requestTypes('orders');

	const fetchProducts = requestTypes('products');

	return {
		fetchProfile,
		fetchCart,
		fetchCatalogs,
		fetchOrders,
		fetchProducts,
		nonAuthFetch,
	};
};
