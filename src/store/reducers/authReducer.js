import AsyStorage from '@react-native-community/async-storage';

/** Redux Actions */
import {
  USER_LOADING,
  USER_LOADED,
  AUTH_ERROR,
  REGISTER_FAIL,
  REGISTER_SUCCESS,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  LOGOUT_SUCCESS,
} from '../actions/types';

const intitialState = {
  token: AsyStorage.getItem('token'),
  isAuthenticated: false,
  isLoading: false,
  user: null,
};

export default (state = intitialState, action) => {
  switch (action.type) {
    case USER_LOADING:
      return {
        ...state,
        isLoading: true,
      };
    case USER_LOADED:
      AsyStorage.multiSet([
        ['@token', action.payload.token],
        ['@user', JSON.stringify(action.payload.user)],
      ]);
      return {
        ...state,
        isAuthenticated: true,
        isLoading: false,
        user: action.payload,
      };
    case LOGIN_SUCCESS:
    case REGISTER_SUCCESS:
      AsyStorage.multiSet([
        ['@token', action.payload.token],
        ['@user', JSON.stringify(action.payload.user)],
      ]);
      return {
        ...state,
        isAuthenticated: true,
        isLoading: false,
        user: action.payload,
      };
    case AUTH_ERROR:
    case LOGIN_FAIL:
    case LOGOUT_SUCCESS:
    case REGISTER_FAIL:
      AsyStorage.multiRemove(['@token', '@user']);
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        isLoading: false,
        user: null,
      };
    default:
      return state;
  }
};
