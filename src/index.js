import React from 'react';
import ReactDOM from 'react-dom';
import {applyMiddleware, createStore} from 'redux';
import thunk from 'redux-thunk';
import reducers from './reducers/index';
import {Provider} from 'react-redux';
import './index.css';
import App from './App';
import { composeWithDevTools } from 'redux-devtools-extension';

const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);

ReactDOM.render(
    <Provider store={createStoreWithMiddleware(reducers,composeWithDevTools())}>
        <App/>
    </Provider>, document.getElementById('root'));
