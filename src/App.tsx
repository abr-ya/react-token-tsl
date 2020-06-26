import React, {useEffect} from 'react';
import {BrowserRouter, Switch, Route, Redirect} from 'react-router-dom';
import Nav from './components/Nav/Nav';
import Loader from './components/Loader/Loader';
import {Home, About, Grid1} from './pages/';
import {IApp} from './interfaces';

import 'devextreme/dist/css/dx.common.css';
import 'devextreme/dist/css/dx.light.css';
import styles from './app.module.scss';

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

	const title = "Token Test App";
	const links = [
		{link: "/", name: "Главная", exact: true,},
		{link: "/grid1", name: "Grid1", exact: true,},
		//{link: "/grid2", name: "Grid2", exact: true,},
		//{link: "/form", name: "Form", exact: true,},
		{link: "/about", name: "About", exact: true,},
	];
	const columns = [
		{ name: "name", title: "Name" },
		{ name: "sex", title: "Sex" },
		{ name: "city", title: "City" },
		{ name: "car", title: "Car" }
	];
	const rows = [
		{ sex: "Female", name: "Sandra", city: "Las Vegas", car: "Audi A4" },
		{ sex: "Male", name: "Paul", city: "Paris", car: "Nissan Altima" },
		{ sex: "Male", name: "Mark", city: "Paris", car: "Honda Accord" },
		{ sex: "Male", name: "Paul", city: "Paris", car: "Nissan Altima" },
		{ sex: "Female", name: "Linda", city: "Austin", car: "Toyota Corolla" },
		{ sex: "Male", name: "Robert", city: "Las Vegas", car: "Chevrolet Cruze" },
		{ sex: "Female", name: "Lisa", city: "London", car: "BMW 750" },
		{ sex: "Male", name: "Mark", city: "Chicago", car: "Toyota Corolla" },
		{ sex: "Male", name: "Thomas", city: "Rio de Janeiro", car: "Honda Accord" },
		{ sex: "Male", name: "Robert", city: "Las Vegas", car: "Honda Civic" },
		{ sex: "Female", name: "Betty", city: "Paris", car: "Honda Civic" },
	];

	const cartHandlers = {addToCart, delFromCart};

	return (
		<BrowserRouter basename="/">
			<div className="container">
				<Nav title={title} links={links} />
			</div>
			<div className={mainClasses.join(' ')}>
				{loading
					? <Loader/>
					: (<Switch>
						<Route path="/" exact component={() => <Home cartHandlers={cartHandlers} />} />
						<Route path="/grid1" component={() => (<Grid1 columns={columns} rows={rows} />)} />
						{/* <Route path="/grid2" component={() => (<Grid2 columns={columns} rows={rows} />)} />
						<Route path="/form" component={Form} /> */}
						<Route path="/about" component={About} />
						<Redirect to="/" />
					</Switch>)
				}
			</div>
		</BrowserRouter>
	);
};

export default App;
