import React, {Component} from 'react';
import {Image, StyleSheet, ImageBackground, Animated} from 'react-native';
import {View, Text, Form, Item, Input, Button} from 'native-base';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {connect} from 'react-redux';
import Fontiso from 'react-native-vector-icons/Fontisto';
import MatCIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import Entypo from 'react-native-vector-icons/Entypo';

/** Image */
import loginBg from '../../Images/loginBg.png';
import Logo from '../../Images/Logo.png';
import Landing from '../../Images/Landing.png';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {Actions} from 'react-native-router-flux';

/** Actions */
import {register} from '../../store/actions/authActions';

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      logoAnime: new Animated.Value(0),
      form: {
        email: {value: ''},
        password: {value: ''},
        name: {value: ''},
        cpassword: {value: ''},
      },
    };
  }

  componentDidMount() {
    Animated.parallel([
      Animated.spring(this.state.logoAnime, {
        toValue: 1,
        tension: 2,
        friction: 1,
        duration: 1000,
      }).start(),
    ]);
  }

  updateInput = (name, text) => {
    let formCopy = this.state.form;

    formCopy[name].value = text;

    this.setState({
      form: formCopy,
    });
  };

  submitUser = () => {
    const {form} = this.state;
    let formToSubmit = {};

    let formCopy = form;

    for (let key in formCopy) {
      formToSubmit[key] = formCopy[key].value;
    }

    const {email, password} = formToSubmit;

    if (!email || !password) {
      return alert('Fill all credentials');
    } else {
      this.props.register(formToSubmit);
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.content}>
          {/* First */}
          <ImageBackground
            source={loginBg}
            style={{width: '100%', height: '100%', flex: 1}}
            resizeMode="cover">
            <View style={styles.top}>
              <Image source={Landing} style={styles.landing} />
            </View>

            {/* Last */}
            <View style={styles.middle}>
              <View style={styles.register}>
                <TouchableOpacity style={styles.regText}>
                  <Text style={styles.regText}>Register</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.regText}>
                  <Text style={styles.regText}>
                    <AntDesign name="right" />
                  </Text>
                </TouchableOpacity>
              </View>

              {/* Form area */}

              <View style={styles.formArea}>
                <Animated.View
                  style={[
                    {
                      opacity: this.state.logoAnime,
                      top: this.state.logoAnime.interpolate({
                        inputRange: [0, 1],
                        outputRange: [5, 0],
                      }),
                    },
                    {
                      alignSelf: 'center',
                    },
                  ]}>
                  <Image source={Logo} />
                </Animated.View>

                <Animated.View
                  style={[
                    {
                      opacity: this.state.logoAnime,
                      left: this.state.logoAnime.interpolate({
                        inputRange: [0, 1],
                        outputRange: [-2, 0],
                      }),
                    },
                  ]}>
                  <View style={{flex: 1, width: '100%', alignSelf: 'center'}}>
                    <Form style={styles.mainForm}>
                      <Item style={styles.formItems}>
                        <Entypo name="user" style={styles.Icon} />
                        <Input
                          placeholder="Full name"
                          onChangeText={text => this.updateInput('name', text)}
                          style={styles.Input}
                        />
                      </Item>
                      <Item style={styles.formItems}>
                        <Fontiso name="email" style={styles.Icon} />
                        <Input
                          placeholder="E-mail"
                          style={styles.Input}
                          onChangeText={text => this.updateInput('email', text)}
                        />
                      </Item>
                      <Item style={styles.formItems}>
                        <MatCIcon name="textbox-password" style={styles.Icon} />
                        <Input
                          placeholder="Password"
                          style={styles.Input}
                          onChangeText={text =>
                            this.updateInput('password', text)
                          }
                        />
                      </Item>
                      <Item style={styles.formItems}>
                        <MatCIcon name="textbox-password" style={styles.Icon} />
                        <Input
                          placeholder="Confirm Password"
                          style={styles.Input}
                          onChangeText={text =>
                            this.updateInput('cpassword', text)
                          }
                          onSubmitEditing={() => this.submitUser()}
                        />
                      </Item>
                    </Form>
                  </View>
                </Animated.View>

                <Animated.View
                  style={[{opacity: this.state.logoAnime}, styles.Buttons]}>
                  <Button
                    block
                    style={styles.btnGrp}
                    onPress={() => this.submitUser()}>
                    <Text style={styles.btnText}>Register</Text>
                  </Button>
                </Animated.View>

                <Animated.View
                  style={[
                    {opacity: this.state.logoAnime},
                    styles.Buttons,
                    styles.question,
                  ]}>
                  <Text style={styles.do}>Do you have an account</Text>
                  <TouchableOpacity
                    style={[styles.do]}
                    onPress={() => {
                      Actions.jump('login');
                    }}>
                    <Text
                      style={[styles.do, {color: '#29AFA0', marginLeft: 15}]}>
                      Signin
                    </Text>
                  </TouchableOpacity>
                </Animated.View>
              </View>
            </View>
            {/* Second */}
            <View style={styles.bottom}></View>
          </ImageBackground>
        </View>
      </View>
    );
  }
}
const mapStateToProps = state => ({
  auth: state.auth,
});

export default connect(mapStateToProps, {register})(Register);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  content: {
    flex: 1,
    position: 'relative',
  },
  top: {
    position: 'relative',
    paddingRight: 12.7,
    paddingLeft: 12.7,
    height: 222,
    alignItems: 'center',
    width: '100%',
    backgroundColor: 'transparent',
  },
  landing: {
    height: 170,
    width: 170,
    marginTop: 49.5,
  },
  bottom: {
    position: 'relative',
    height: '100%',
    paddingRight: 12.7,
    paddingLeft: 12.7,
    backgroundColor: '#ffffff',
  },
  middle: {
    flex: 1,
    width: '100%',
    position: 'absolute',
    zIndex: 5,
    backgroundColor: 'transparent',
    paddingLeft: 30,
    paddingRight: 30,
  },
  register: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    flex: 1,
    marginTop: 37,
    backgroundColor: 'transparent',
    alignItems: 'center',
  },
  regText: {
    fontFamily: 'Cairo-Bold',
    fontWeight: 'normal',
    color: '#E85B1C',
  },
  formArea: {
    marginTop: 100,
    paddingLeft: 29.9,
    paddingRight: 29.9,
    width: '100%',
    borderRadius: 10,
    shadowColor: '#707070',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 6,
    padding: 2,
  },
  mainForm: {
    marginTop: 20,
  },
  formItems: {
    marginTop: 15,
    borderWidth: 0.5,
    borderColor: '#29AFA0',
    borderRadius: 10,
  },
  Input: {
    fontFamily: 'Cairo-Bold',
    fontWeight: 'normal',
    fontSize: 15,
  },
  Icon: {
    color: '#959595',
    marginRight: 10,
    fontFamily: 'Cairo-Regular',
    fontSize: 12,
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
  question: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: 10,
    marginBottom: 10,
    alignSelf: 'center',
  },
  do: {
    display: 'flex',
    flexDirection: 'row',
    fontFamily: 'Cairo-Regular',
    fontSize: 12,
  },
});

// <View style={{flex: 1, width: '100%', alignSelf: 'center'}}>
//   <Form style={styles.mainForm}>
//     <Item style={styles.formItems}>
//       <Entypo name="user" style={styles.Icon} />
//       <Input
//         placeholder="Full name"
//         onChangeText={text => this.updateInput('name', text)}
//         style={styles.Input}
//       />
//     </Item>
//     <Item style={styles.formItems}>
//       <Fontiso name="email" style={styles.Icon} />
//       <Input
//         placeholder="E-mail"
//         style={styles.Input}
//         onChangeText={text => this.updateInput('email', text)}
//       />
//     </Item>
//     <Item style={styles.formItems}>
//       <MatCIcon name="textbox-password" style={styles.Icon} />
//       <Input
//         placeholder="Password"
//         style={styles.Input}
//         onChangeText={text =>
//           this.updateInput('password', text)
//         }
//       />
//     </Item>
//     <Item style={styles.formItems}>
//       <MatCIcon name="textbox-password" style={styles.Icon} />
//       <Input
//         placeholder="Confirm Password"
//         style={styles.Input}
//         onChangeText={text =>
//           this.updateInput('cpassword', text)
//         }
//       />
//     </Item>
//   </Form>
