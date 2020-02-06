import {GET_ERRORS, CLEAR_ERRORS} from './types';

// Return Errors
export const returnErrors = (msg, status, id = null) => async dispatch => {
  return dispatch({
    type: GET_ERRORS,
    payload: {msg, status, id},
  });
};

// Clear Errors

export const clearErrors = () => async dispatch => {
  return dispatch({
    type: CLEAR_ERRORS,
  });
};
