import {
  JOIN_CHATROOM,
  LOAD_MESSAGES,
  CHAT_ERROR,
  SEND_MESSAGE,
  CHAT_DISCONNECT,
} from '../actions/types';
import AsyncStorage from '@react-native-community/async-storage';

initialState = {
  messages: [],
  activeUsers: 0,
  errormsg: '',
  currentUser: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case JOIN_CHATROOM:
      AsyncStorage.setItem('@chatUser', action.payload[0].chatUser);
      return {
        ...state,
        activeUsers: state.activeUsers++,
        currentUser: action.payload[0].chatUser,
        messages: [...state.messages, ...action.payload],
      };
    case CHAT_ERROR:
      AsyncStorage.removeItem('@chatUser');
      return {
        ...state,
        currentUser: null,
        errormsg: action.payload,
      };
    case LOAD_MESSAGES:
    case SEND_MESSAGE:
      return {
        ...state,
        messages: [...state.messages, ...action.payload],
      };
    case CHAT_DISCONNECT:
      return {
        ...state,
        activeUsers: activeUsers - 1,
        currentUser: null,
      };
    default:
      return state;
  }
};
