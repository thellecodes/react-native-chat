import IO from 'socket.io-client';
import axios from 'axios';

/** misc */
import {WEBSITE_URL} from '../../helpers/misc';

/** Actions */
import {
  SEND_MESSAGE,
  LOAD_MESSAGES,
  CHAT_ERROR,
  CHAT_DISCONNECT,
  JOIN_CHATROOM,
} from './types';
import AsyncStorage from '@react-native-community/async-storage';

/** socket configurations */
const socket = IO(`${WEBSITE_URL}`, {
  forceNew: true,
});
socket.on('connection', () => console.log('Connection'));

export const loadMessages = ({token, name}) => async dispatch => {
  socket.emit('getMessages');
  await axios({
    method: 'GET',
    url: `${WEBSITE_URL}/messages`,
    headers: {
      'Content-Type': 'application/json',
      'x-auth-token': token,
    },
  }).then(res => {
    return dispatch({
      type: LOAD_MESSAGES,
      payload: res.data.messages,
    });
  });
};

export const joinChatroom = ({name, room}) => async dispatch => {
  const token = await AsyncStorage.getItem('@token');
  const trimCurrentUser = name.trim().toLowerCase();
  socket.emit('join', {name, room}, error => {
    if (error) {
      return dispatch({
        type: CHAT_ERROR,
        payload: error,
      });
    }
  });

  socket.on('message', message => {
    if (trimCurrentUser !== message[0].chatUser) {
      dispatch({
        type: LOAD_MESSAGES,
        payload: message,
      });
    } else {
      dispatch({
        type: JOIN_CHATROOM,
        payload: message,
      });
    }

    const {msg, type} = message[0];
    if (type !== 'bot' && msg !=='') {
      axios({
        method: 'POST',
        url: `${WEBSITE_URL}/chatroom`,
        data: message,
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': token,
        },
      });
    }
  });
};

export const sendMessage = ({
  name,
  msg,
  date,
  token,
  room,
}) => async dispatch => {
  if (!msg) return;
  socket.emit('sendMessage', {name, msg, date, room}, callback => {});
};

export const disconnectChatRoom = () => async dispatch => {
  socket.emit('disconnect', () => {
    return dispatch({
      type: CHAT_DISCONNECT,
    });
  });
  socket.off();
};
