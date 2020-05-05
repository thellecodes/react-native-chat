import React from 'react';
import {AppRegistry, YellowBox} from 'react-native';
import App from './src/App';
import {name as appName} from './app.json';
import {Provider} from 'react-redux';

YellowBox.ignoreWarnings(['Remote debugger']);

/**
 * Store for redux
 */

import store from './src/storeconfig';

const AppRedux = () => (
  <Provider store={store}>
    <App />
  </Provider>
);

AppRegistry.registerComponent(appName, () => AppRedux);
