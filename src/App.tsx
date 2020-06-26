import React, {useEffect} from 'react';
import {BrowserRouter, Switch, Route, Redirect} from 'react-router-dom';
import styles from './app.module.scss';
import {IApp} from './interfaces';
import Nav from './components/Nav/Nav';
import Loader from './components/Loader/Loader';
import {Home, About} from './pages/';

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
		//{link: "/grid1", name: "Grid1", exact: true,},
		//{link: "/grid2", name: "Grid2", exact: true,},
		//{link: "/form", name: "Form", exact: true,},
		{link: "/about", name: "About", exact: true,},
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
						{/* <Route path="/grid1" component={() => (<Grid1 columns={columns} rows={rows} />)} />
						<Route path="/grid2" component={() => (<Grid2 columns={columns} rows={rows} />)} />
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
