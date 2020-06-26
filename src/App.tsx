import React, {useEffect} from 'react';
import styles from './app.module.scss';
import {IApp} from './interfaces';
import Loader from './components/Loader/Loader';
import {Button} from 'react-bootstrap';

import {requestUserData} from './api/km';

const App = ({
	//requestProductsSaga, // сейчас это данные с sw-api
	loading,
	addToCart, delFromCart,
	requestUserSaga,
}: IApp) => {
	useEffect(() => {
		//requestProductsSaga();
		requestUserSaga();
	// eslint-disable-next-line
	}, []);

	const mainClasses = [styles.app, 'container'];
	const leftClasses = [styles.left, 'col-md-8'];
	const rightClasses = [styles.right, 'col-md-4'];

	const handleAdd = (id: number) => {
		console.log('handleAdd', id);
		addToCart(id);
	};

	const handleRemove = (id: number) => {
		console.log('handleRemove', id);
		delFromCart(id);
	};

	const handleGet1 = () => {
		console.log('GetUserData:');
		requestUserData()
		.then(response => {
			console.log(response.data);
		})
		.catch(error => {
			console.log(error);
		});
	};

	return (
		<div className={mainClasses.join(' ')}>
			<h1>React-ts-redux-saga-bs</h1>
			<hr/>
				{loading
					? <Loader/>
					: (
					<div className='row'>
						<div className={leftClasses.join(' ')}>
							Главная панель
						</div>
						<div className={rightClasses.join(' ')}>
							Боковая панель
							<div className='mt-3'>
								<h3>Для теста Ридакс</h3>
								<Button onClick={() => handleAdd(1)} style={{marginRight: '10px'}}>
									Add to id1
								</Button>
								<Button onClick={() => handleRemove(1)}>
									Del id1
								</Button>

								<h3>Для теста запросов</h3>
								<Button onClick={() => handleGet1()} style={{marginRight: '10px'}}>
									User
								</Button>
								<Button onClick={() => false}>
									Просто кнопка
								</Button>
							</div>
						</div>
					</div>
					)
				}
		</div>
	);
};

export default App;
