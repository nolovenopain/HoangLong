/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { Component } from 'react';
import { StatusBar, LogBox } from 'react-native';
import { Provider } from 'react-redux';
import RootComponent from './src/RootComponent/RootComponent';
import { createStore } from 'redux';
import rootReducer from './src/Reducer/Reducer';

const store = createStore(rootReducer);

LogBox.ignoreLogs([
	'Non-serializable values were found in the navigation state',
]);

export default class App extends Component {
	
	constructor(props) {
		super(props);
		
	}

	render() {
		return (
			<Provider store={store}>
				<StatusBar barStyle='dark-content' backgroundColor='transparent' translucent />
				<RootComponent/>
			</Provider>
		);
	}  
}

