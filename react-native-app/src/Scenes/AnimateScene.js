import React, {Component} from 'react';
import {StyleSheet, Animated, Image} from 'react-native';
import {Container, Content, Text, View, Spinner} from 'native-base';

/**
 * @images
 */
import Logo from '../Images/Logo.png';
import Landing from '../Images/Landing.png';

/** Actions */
import {Actions} from 'react-native-router-flux';
import AsyncStorage from '@react-native-community/async-storage';

export default class AnimateScene extends Component {
  constructor(props) {
    super(props);

    this.state = {
      LogoAnime: new Animated.Value(0),
      LandingAnime: new Animated.Value(0),
      lSpinner: new Animated.Value(0),
    };
  }

  async componentDidMount() {
    const {LogoAnime, LandingAnime, lSpinner} = this.state;
    const user = JSON.parse(await AsyncStorage.getItem('@user'));

    Animated.parallel([
      Animated.spring(LogoAnime, {
        toValue: 1,
        tension: 10,
        friction: 1,
        duration: 700,
      }).start(),
      Animated.timing(LandingAnime, {
        toValue: 1,
        duration: 900,
      }).start(() => {
        Animated.spring(lSpinner, {
          toValue: 1,
          tension: 10,
          duration: 3000,
        }).start(() => {
          if (user) {
            Actions.replace('chatroom');
          } else {
            Actions.replace('auth');
          }
        });
      }),
    ]).start();
  }
  render() {
    const {LogoAnime, LandingAnime, lSpinner} = this.state;
    return (
      <Container style={styles.container}>
        <Content style={styles.content}>
          <Animated.View
            style={[
              {
                opacity: LogoAnime,
                top: LogoAnime.interpolate({
                  inputRange: [0, 1],
                  outputRange: [1, 0],
                }),
                left: LogoAnime.interpolate({
                  inputRange: [0, 1],
                  outputRange: [-10, 0],
                }),
              },
              styles.logoTop,
            ]}>
            <Image source={Logo} />
          </Animated.View>

          <Animated.View style={[{opacity: LandingAnime}, styles.Landing]}>
            <Image source={Landing} />
          </Animated.View>

          <Animated.View
            style={[
              {
                opacity: lSpinner,
                bottom: lSpinner.interpolate({
                  inputRange: [0, 1],
                  outputRange: [-20, 0],
                }),
              },
              styles.Spinner,
            ]}>
            <Spinner color="#29AFA0" />
          </Animated.View>
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
    backgroundColor: '#ffffff',
  },
  content: {
    flex: 1,
    width: '100%',
  },
  logoTop: {
    marginBottom: 20,
    marginTop: 70,
    alignItems: 'center',
  },
  Landing: {
    marginTop: 55,
    alignItems: 'center',
  },
  Spinner: {
    marginTop: 50,
    alignItems: 'center',
  },
});
