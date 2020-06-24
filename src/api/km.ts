import {fetches} from '../index';

export const requestUserPalette = () => fetches().fetchProfile.get('/palette/');

export const defaultUserPalette = {
	color_1: 'FFFFFF',
	color_2: '191919',
	color_3: 'FF1F1F',
	color_4: 'F7F7F7',
	color_5: 'FAFAFA',
	color_6: '919191',
	color_7: 'E9E9E9',
	color_8: 'CACACA',
	color_9: '1A77D0',		// цвет фона
	color_10: 'E1F6FF',	// цвет кнопки
	main_image_url: 'http://cdn2.km-union.ru/unicorn/logo.jpg',
	background_image_url: 'http://cdn2.km-union.ru/unicorn/logo.jpg',
};

// user
export const requestUserData = () => fetches().fetchProfile.get('/user/');
export const requestUserAgreements = () => fetches().fetchProfile.get('/agreements/?all=true');
export const requestUserEvents = () => fetches().fetchProfile.get('/events/');
export const requestEventNotifications = (id: number) => fetches().fetchProfile.get(`/events/${id}/notifications/`);

export const requestUserDataSet = (last_name: string, first_name: string, email: string) =>
fetches().fetchProfile.patch('/user/', JSON.stringify({last_name, first_name, email}));

export const requestUserAgreementDefSet = (agreement: string) =>
fetches().fetchProfile.patch(`/agreements/${agreement}/set-by-default/`, JSON.stringify({}));

export const requestUserEventChange = (event: number) =>
fetches().fetchProfile.patch(`/events/${event}/change-enabled/`, JSON.stringify({}));

export const requestUserEventNotChange = (event: number, notification: number) =>
fetches().fetchProfile.patch(`/events/${event}/notifications/${notification}/change-enabled/`, JSON.stringify({}));
