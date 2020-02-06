import React, {Component} from 'react';
import {View, Text} from 'react-native';

import {Router, Scene} from 'react-native-router-flux';

import AnimateScene from './AnimateScene';
import Auth from './Auth';
import Chatroom from './Chatroom';
import Login from './Auth/Login';
import Register from './Auth/Register';

export default class LoadingScene extends Component {
  render() {
    return (
      <Router>
        <Scene key="root" hideNavBar={true}>
          <Scene
            component={AnimateScene}
            key="loading"
            initial={true}
            hideNavBar={true}
          />
          <Scene component={Auth} key="auth" hideNavBar={true} />
          <Scene component={Login} key="login" hideNavBar={true} />
          <Scene component={Register} key="register" hideNavBar={true} />
          <Scene component={Chatroom} key="chatroom" hideNavBar={true} />
        </Scene>
      </Router>
    );
  }
}
