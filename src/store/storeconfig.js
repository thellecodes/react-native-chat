import {createStore, applyMiddleware} from 'redux';

import thunk from 'redux-thunk';

const middleware = [thunk];
const initialState = {};

import rootReducer from './reducers';

const store = createStore(
  rootReducer,
  initialState,
  applyMiddleware(...middleware),
);

export default store;
