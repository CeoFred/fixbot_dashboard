import React from "react";
import ReactDOM from "react-dom";
import {Provider} from 'react-redux';
import {
  createStore,
  applyMiddleware,
  compose,
  combineReducers
} from 'redux';
import thunk from 'redux-thunk'; //thunk helps to add middle ware to action
// import { createBrowserHistory } from "history";
import {
  BrowserRouter} from "react-router-dom";

import Authreducer from './store/reducers/authReducer';
import App from "./App";
import "assets/scss/black-dashboard-react.scss";
import "assets/demo/demo.css";
import "assets/css/nucleo-icons.css";

// const hist = createBrowserHistory();
const composeEnhancers = process.env.NODE_ENV === 'development' ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : null || compose;

const rootReducer = combineReducers({
  auth: Authreducer
})

// Second arguments enable us to use redux dev tools
const store = createStore(rootReducer, composeEnhancers(
  applyMiddleware(thunk)
));

ReactDOM.render(
 <Provider store={store}>
  <BrowserRouter>
    <App />
    </BrowserRouter>
    </Provider>
,
  document.getElementById("root")
);
