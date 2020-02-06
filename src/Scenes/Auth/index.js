import React, {Component} from 'react';
import {StyleSheet, Animated, Image} from 'react-native';
import {View, Text, Container, Content, Button} from 'native-base';

/**
 * @image
 */
import Logo from '../../Images/Logo.png';
import Landing from '../../Images/Landing.png';

/** Actions */
import {Actions} from 'react-native-router-flux';

class Auth extends Component {
  constructor(props) {
    super(props);

    this.state = {
      singleAnime: new Animated.Value(0),
      buttonAnime: new Animated.Value(0),
    };
  }

  componentDidMount() {
    const {singleAnime, buttonAnime} = this.state;

    Animated.parallel([
      Animated.timing(singleAnime, {
        toValue: 1,
        duration: 1000,
      }).start(() =>
        Animated.spring(buttonAnime, {
          toValue: 1,
          tension: 10,
          friction: 2,
          duration: 300,
        }).start(),
      ),
    ]).start();
  }

  render() {
    const {singleAnime, buttonAnime} = this.state;

    return (
      <View style={styles.container}>
        <View style={styles.content}>
          <Animated.View style={[{opacity: singleAnime}, styles.logoTop]}>
            <Image source={Logo} />
          </Animated.View>

          <Animated.View style={[{opacity: singleAnime}, styles.Landing]}>
            <Image source={Landing} />
          </Animated.View>

          <Animated.View
            style={[
              {
                opacity: buttonAnime,
                bottom: buttonAnime.interpolate({
                  inputRange: [0, 1],
                  outputRange: [-30, 0],
                }),
              },
              styles.Buttons,
            ]}>
            <Button
              block
              style={styles.btnGrp}
              onPress={() => Actions.jump('login')}>
              <Text style={StyleSheet.btnText}>Login</Text>
            </Button>
            <Button
              block
              style={styles.btnGrp}
              onPress={() => Actions.jump('register')}>
              <Text style={StyleSheet.btnText}>Register</Text>
            </Button>
          </Animated.View>
        </View>
      </View>
    );
  }
}

export default Auth;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
    backgroundColor: '#fff',
  },
  content: {
    flex: 1,
    width: '100%',
  },
  logoTop: {
    marginBottom: 20,
    marginTop: 10,
    alignItems: 'center',
  },
  Landing: {
    marginTop: 5,
    alignItems: 'center',
  },
  Buttons: {
    marginTop: 5,
    alignItems: 'center',
    padding: 5,
    paddingLeft: 50,
    paddingRight: 50,
    marginBottom: 30,
  },
  btnGrp: {
    marginTop: 25,
    backgroundColor: '#29AFA0',
  },
  btnText: {
    color: '#ffffff',
    fontFamily: 'Cairo',
    fontWeight: 'normal',
  },
});
