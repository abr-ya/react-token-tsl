export interface IApp {
	showLoading: () => void;
	hideLoading: (data: boolean) => void;
	requestProductsSaga: () => void;
	addToCart: (id: number) => void;
	delFromCart: (id: number) => void;
	loading: boolean;
	data?: any[];
	requestUserSaga: () => void;
}
