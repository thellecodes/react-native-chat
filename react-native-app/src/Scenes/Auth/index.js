import React, {Component} from 'react';
import {StyleSheet, Animated, Image} from 'react-native';
import {Container, Content, Text, View, Button} from 'native-base';

/**
 * @images
 */
import Logo from '../../Images/Logo.png';
import Landing from '../../Images/Landing.png';

/** Actions */
import {Actions} from 'react-native-router-flux';

export default class AnimateScene extends Component {
  constructor(props) {
    super(props);

    this.state = {
      LogoAnime: new Animated.Value(0),
    };
  }

  componentDidMount() {
    const {LogoAnime} = this.state;

    Animated.parallel([
      Animated.timing(LogoAnime, {
        toValue: 1,
        duration: 1000,
      }).start(),
    ]);
  }
  render() {
    const {LogoAnime} = this.state;
    return (
      <View style={styles.container}>
        <View style={styles.content}>
          <Animated.View
            style={[
              {
                opacity: LogoAnime,
              },
              styles.logoTop,
            ]}>
            <Image source={Logo} />
          </Animated.View>

          <Animated.View style={[{opacity: LogoAnime}, styles.Landing]}>
            <Image source={Landing} />
          </Animated.View>

          <Animated.View style={[{opacity: LogoAnime}, styles.Buttons]}>
            <Button
              block
              style={styles.btnGrp}
              onPress={() => Actions.jump('login')}>
              <Text style={styles.btnText}>Login</Text>
            </Button>
            <Button
              block
              style={styles.btnGrp}
              onPress={() => Actions.jump('register')}>
              <Text style={styles.btnText}>Register</Text>
            </Button>
          </Animated.View>
        </View>
      </View>
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
