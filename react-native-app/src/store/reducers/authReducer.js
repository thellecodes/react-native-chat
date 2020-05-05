import AsyncStorage from '@react-native-community/async-storage';

/** Redux Actions */
import {
  USER_LOADING,
  USER_LOADED,
  AUTH_ERROR,
  REGISTER_FAIL,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  LOGIN_SUCCESS,
  REGISTER_SUCCESS,
} from '../actions/types';

const initialState = {
  token: AsyncStorage.getItem('@token'),
  isAuthenticated: false,
  isLoading: false,
  user: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case USER_LOADING:
      return {
        ...state,
        isLoading: true,
      };
    case USER_LOADED:
      AsyncStorage.multiSet([
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
      AsyncStorage.multiSet([
        ['@token', action.payload.token],
        ['@user', JSON.stringify(action.payload.user)],
      ]);
      return {
        ...state,
        ...action.payload,
        isAuthenticated: true,
        isLoading: true,
      };
    case REGISTER_FAIL:
    case LOGIN_FAIL:
    case LOGOUT_SUCCESS:
    case AUTH_ERROR:
      AsyncStorage.multiRemove(['@token', '@user']);
      return {
        ...state,
        token: null,
        user: null,
        isAuthenticated: false,
        isLoading: false,
      };
    default:
      return state;
  }
};
