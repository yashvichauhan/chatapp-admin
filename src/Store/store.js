import {createStore, compose, combineReducers, applyMiddleware} from 'redux';
import thunk from "redux-thunk";

import adminReducer from './admin';
import analysisReducer from './analysisReducer';

const rootreducer=combineReducers({
    admin:adminReducer,
    analysis:analysisReducer
})

const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;
const store = createStore(rootreducer, composeEnhancers(applyMiddleware(thunk)));

export default store;

  