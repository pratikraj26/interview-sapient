import React from 'react'
import { Provider } from "react-redux"
import { BrowserRouter, Route, Switch } from "react-router-dom"
import Main from "~/Views/Main";
import store from '~/redux/store'

export default function App() {
	return (
		<Provider store={store} >
			<BrowserRouter>
				<Switch>
					<Route exact path="/" component={Main} />
					<Route exact path="/search" component={Main} />
				</Switch>
			</BrowserRouter>
		</Provider>
	);
}