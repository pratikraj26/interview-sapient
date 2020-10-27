import './config'

import Cookies from 'universal-cookie'
import React from 'react'
import ReactDOMServer from 'react-dom/server'
import { Provider } from "react-redux";
import Main from "~/Views/Main";
import store from "~/redux/store";

process.on('message', async (data) => {
	try{
		process.stdout.write("Now rendering app")
		global.window.document.cookie = data.cookie
		let cookies = new Cookies(global.window.document.cookie)
		const context = { };

		const initialState = store.getState()
		const jsx = (
			<Provider store={store}>
				<Main />
			</Provider>
		);
		const renderedHTML = ReactDOMServer.renderToString(jsx);
		process.send({
			renderedHTML,
			initialState
		}, () => {
			process.disconnect()
		})
	}catch(error){
		console.error('SSR Render error', error)
		process.stderr.write(JSON.stringify(error))
		process.disconnect()
	}
	
})