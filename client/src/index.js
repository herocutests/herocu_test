import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from "react-redux";
import './style.css';
import './reset.css';
import { createStore, applyMiddleware } from "redux";
import rootReducer from "./reducers/index";
import App from "./components/App";
import SocketMiddleware, {Middleware} from './socketMiddleware';

const createStoreWithMiddleware = applyMiddleware(Middleware)(createStore);
const store = createStoreWithMiddleware(rootReducer);

SocketMiddleware(store);

const appSection = document.getElementById('chatApp');

ReactDOM.render(
    <Provider store={store}>
		<App />
	</Provider>, 
	appSection
)

