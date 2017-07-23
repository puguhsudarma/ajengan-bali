import React from 'react';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import reduxLogger from 'redux-logger';
import reduxThunk from 'redux-thunk';
import reduxPromiseMiddleware from 'redux-promise-middleware';

import WarungReducer from '../reducers/Warung.Reducer';
import navReducer from '../reducers/Nav.Reducer';
import AppWithNavigationState from './configureRoute';

const reducerCombined = combineReducers({
  warung: WarungReducer,
  nav: navReducer,
});
const middleware = applyMiddleware(
  reduxLogger,
  reduxThunk,
  reduxPromiseMiddleware(),
);
const store = createStore(reducerCombined, middleware);

const SimaluApp = () => (
  <Provider store={store}>
    <AppWithNavigationState />
  </Provider>
);

export default SimaluApp;
