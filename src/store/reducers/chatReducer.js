import {
  JOIN_CHATROOM,
  LOAD_MESSAGES,
  CHAT_ERROR,
  SEND_MESSAGE,
  CHAT_DISCONNECT,
} from '../actions/types';

import Asyncstorage from '@react-native-community/async-storage';

const initialState = {
  message: [],
  activeUsers: 0,
  errormsg: null,
  currentUser: null,
};

export default (state = initialState, action) => {
  switch (action.payload) {
    case JOIN_CHATROOM:
      Asyncstorage.setItem('@chatUser', action.payload[0].chatUser);
      return {
        ...state,
        activeUsers: state.activeUsers + 1,
        currentUser: action.payload[0].chatUser,
        message: [...state.message, ...action.payload],
      };
    case LOAD_MESSAGES:
    case SEND_MESSAGE:
      return {
        ...state,
        message: [...state.message, ...action.payload],
      };
    default:
      return state;
  }
};
