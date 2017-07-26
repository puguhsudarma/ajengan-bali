import React from 'react';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import reduxLogger from 'redux-logger';
import reduxThunk from 'redux-thunk';
import appInfoReducer from '../reducers/AppInfo.Reducer';
import navReducer from '../reducers/Nav.Reducer';
import warungReducer from '../reducers/Warung.Reducer';
import makananReducer from '../reducers/Makanan.Reducer';
import AppWithNavigationState from './configureRoute';

const reducerCombined = combineReducers({
  appInfo: appInfoReducer,
  nav: navReducer,
  warung: warungReducer,
  makanan: makananReducer,
});
const middleware = applyMiddleware(
  reduxThunk,
  reduxLogger,
);
const store = createStore(reducerCombined, middleware);

const SimaluApp = () => (
  <Provider store={store}>
    <AppWithNavigationState />
  </Provider>
);

export default SimaluApp;
