import React, {Component} from 'react';
import {View, Text} from 'react-native';
import {Router, Scene} from 'react-native-router-flux';

/**
 * @components
 * For Routes
 */
import AnimateScene from './AnimateScene';
import Login from './Auth/Login';
import Register from './Auth/Register';
import Auth from './Auth';
import Chatroom from './Chatroom';

export default class LoadingScene extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Router userProps={this.props}>
        <Scene key="root" hideNavbar={true}>
          <Scene
            key="loading"
            initial={true}
            hideNavBar={true}
            component={AnimateScene}
          />
          <Scene key="auth" component={Auth} hideNavBar={true} />
          <Scene key="login" component={Login} hideNavBar={true} />
          <Scene key="register" component={Register} hideNavBar={true} />
          <Scene key="chatroom" component={Chatroom} hideNavBar={true} />
        </Scene>
      </Router>
    );
  }
}
