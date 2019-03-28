import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter} from 'react-router-dom';
import {Provider} from 'react-redux';
import { createStore , applyMiddleware,compose,combineReducers} from 'redux';
import thunk from 'redux-thunk'; //thunk helps to add middle ware to action creators with the help of applyMiddle from redux above

import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

import Authreducer from './store/reducers/authReducer';
const composeEnhancers = process.env.NODE_ENV === 'development'? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : null || compose;

const rootReducer = combineReducers({
    auth : Authreducer
})

// Second arguments enable us to use redux dev tools
const store =  createStore(rootReducer ,composeEnhancers(
    applyMiddleware(thunk)
));

const app = (
    <Provider store={store}>
<BrowserRouter>
    <App/>
    </BrowserRouter>
    </Provider>
);
ReactDOM.render(app, document.getElementById('root'));
serviceWorker.register();
