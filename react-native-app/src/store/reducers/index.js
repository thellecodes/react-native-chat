import {combineReducers} from 'redux';
import authReducer from './authReducer';
import errorReducer from './errorReducer';
import chatReducer from './chatReducer';

export default combineReducers({
  auth: authReducer,
  error: errorReducer,
  chat: chatReducer,
});
