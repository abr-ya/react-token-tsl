import React from 'react';
import {Button} from 'react-bootstrap';
//import Button from 'devextreme-react/button'; // тест подключения
import {requestUserData} from '../api/km';
import styles from '../app.module.scss';

export interface IHome {
    cartHandlers: any;
	// showLoading: () => void;
	// hideLoading: (data: boolean) => void;
	// requestProductsSaga: () => void;
	// addToCart: (id: number) => void;
	// delFromCart: (id: number) => void;
	// loading: boolean;
}

export const Home = ({cartHandlers}: IHome) => {
    const leftClasses = [styles.left, 'col-md-8'];
	const rightClasses = [styles.right, 'col-md-4'];

    const handleAdd = (id: number) => {
		console.log('handleAdd', id);
		cartHandlers.addToCart(id);
	};

	const handleRemove = (id: number) => {
		console.log('handleRemove', id);
		cartHandlers.delFromCart(id);
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
        <div>
            <h1>Главная страница</h1>

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
        </div>
    );
}
