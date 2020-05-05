import 'react-native-gesture-handler';
import React, {Fragment, Component} from 'react';
import {StyleSheet} from 'react-native';
import {connect} from 'react-redux';

/** Redux actions */
import {loadUser} from './store/actions/authActions';
import {clearErrors} from './store/actions/errorActions';

/** Loading Scene */
import LoadingScene from './Scenes/LoadingScene';

class App extends Component {
  componentDidMount() {
    this.props.loadUser();
  }

  render() {
    const {auth, error} = this.props;
    return <LoadingScene auth={auth} error={error} />;
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  error: state.error,
});

export default connect(mapStateToProps, {loadUser, clearErrors})(App);

const styles = StyleSheet.create({});
