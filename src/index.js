import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux' ;
import {createStore, compose, combineReducers, applyMiddleware} from 'redux';
import thunk from "redux-thunk";
import { BrowserRouter } from 'react-router-dom';
import reportWebVitals from './reportWebVitals';

import './index.css';
import adminReducer from './Store/admin';
import analysisReducer from './Store/analysisReducer';
import App from './App';
import store from './Store/store';

// const rootreducer=combineReducers({
//   admin:adminReducer,
//   analysis:analysisReducer
// })

// const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;
// export const store = createStore(rootreducer, composeEnhancers(applyMiddleware(thunk)));

ReactDOM.render(
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
