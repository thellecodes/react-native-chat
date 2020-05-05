import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
import {
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  REGISTER_FAIL,
  REGISTER_SUCCESS,
  USER_LOADED,
  USER_LOADING,
  LOGOUT_SUCCESS,
} from './types';

/** Helper Functions */
import {WEBSITE_URL} from '../../helpers/misc';

/** Error Action */
import {returnErrors} from './errorActions';

/**
 *
 * @route {loaduser}
 * @url {/api/auth/user} Public
 */
export const loadUser = () => async (dispatch, getState) => {
  dispatch({type: USER_LOADING});
  const token = await getState().auth.token;

  // Headers
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  // If token, add it to headers
  if (token) {
    config.headers['x-auth-token'] = token;
  }

  await axios
    .get(`${WEBSITE_URL}/api/auth/user`, config)
    .then(res => {
      return dispatch({
        type: USER_LOADED,
        payload: res.data,
      });
    })
    .catch(err => {
      return (
        dispatch(returnErrors(err.response.data, err.response.status)) &&
        dispatch({
          type: AUTH_ERROR,
        })
      );
    });
};

/**
 *
 * @route {login}
 * @url {/api/auth} Public
 */

export const login = ({email, password}) => async dispatch => {
  // Request body
  const data = {email, password};

  if (email !== '') {
    await axios({
      method: 'POST',
      url: `${WEBSITE_URL}/api/auth`,
      data,
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(res => {
        return dispatch({
          type: LOGIN_SUCCESS,
          payload: res.data,
        });
      })
      .catch(err => {
        alert(err.response.data);
        return dispatch({
          type: AUTH_ERROR,
        });
      });
  }
};

/**
 *
 * @route {register}
 * @url {/api/users}
 */
export const register = ({
  email,
  password,
  cpassword,
  name,
}) => async dispatch => {
  // Request body
  const data = {email, password, name, cpassword};

  if (email !== '') {
    await axios({
      method: 'POST',
      url: `${WEBSITE_URL}/api/users`,
      data,
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(res => {
        return dispatch({
          type: REGISTER_SUCCESS,
          payload: res.data,
        });
      })
      .catch(err => {
        alert(err.response.data);
        return dispatch({
          type: REGISTER_FAIL,
        });
      });
  }
};

export const logout = () => async dispatch => {
  return dispatch({
    type: LOGOUT_SUCCESS,
  });
};
