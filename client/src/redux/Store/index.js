import {createStore, compose, applyMiddleware} from 'redux'
import reducers from '../reducers'
import thunk from 'redux-thunk'


const composeApp = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export const store= createStore(reducers, composeApp(applyMiddleware(thunk)));