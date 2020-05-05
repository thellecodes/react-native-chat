import {GET_ERRORS, CLEAR_ERRORS} from '../actions/types';

const initialState = {
  msg: {},
  status: null,
  id: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_ERRORS:
      return {
        msg: action.payload.msg,
        status: action.payload.stautus,
        id: action.payload.id,
      };
    case CLEAR_ERRORS:
      return {
        msg: null,
        status: null,
        id: null,
      };
    default:
      return state;
  }
};
