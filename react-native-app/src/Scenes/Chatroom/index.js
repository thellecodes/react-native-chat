import React, {Component, Fragment} from 'react';
import {StyleSheet, Animated, FlatList, Image, YellowBox} from 'react-native';
import {Actions} from 'react-native-router-flux';
import AsyncStorage from '@react-native-community/async-storage';
import {connect} from 'react-redux';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {
  Container,
  Content,
  Text,
  ListItem,
  Left,
  Body,
  Right,
  Thumbnail,
  Footer,
  Title,
  Input,
  Button,
  Header,
} from 'native-base';

/** Images */
import Boy from '../../Images/boy.png';
import Add from '../../Images/add.png';
import lego from '../../Images/lego.png';
import {TouchableOpacity} from 'react-native-gesture-handler';

/** Chatroom actions */
import {
  loadMessages,
  joinChatroom,
  disconnectChatRoom,
  sendMessage,
} from '../../store/actions/chatActions';
import {logout} from '../../store/actions/authActions';

/** ignore warnings */
YellowBox.ignoreWarnings(['Remote debugger']);

class Chatroom extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userdetails: '',
      room: 'vendor',
      messages: [],
      msgText: '',
      stickyHeaderIndices: [],
      currentUser: false,
    };
    this.textInput = React.createRef();
    this.flatList = React.createRef();
  }

  async componentDidMount() {
    const token = await AsyncStorage.getItem('@token');
    const user = JSON.parse(await AsyncStorage.getItem('@user'));

    const room = 'vendor';
    this.props.loadMessages({token, name: user.name}).then(() => {
      this.props.joinChatroom({room, name: user.name}).then(() => {
        this.setState({
          currentUser: user.name,
        });
      });
    });
  }

  componentDidUpdate(prev, nextprop) {}

  componentWillUnmount() {
    this.props.disconnectChatRoom();
  }

  updateInput = text => this.setState({msgText: text});

  submitMsg = async () => {
    const user = JSON.parse(await AsyncStorage.getItem('@user'));
    const token = await AsyncStorage.getItem('@token');
    let msgToSubmit = {
      name: user.name,
      msg: this.state.msgText,
      date: '01/01/01',
      token,
      room: 'vendor',
    };

    this.props
      .sendMessage(msgToSubmit)
      .then(() => this.setState({msgText: ''}));
  };

  renderItem = ({item}) => {
    if (item.header) {
      // return (
      //   <ListItem itemDivider>
      //     <Left />
      //     <Body style={{marginRight: 40}}>
      //       <Text style={{fontWeight: 'bold'}}>{item.name}</Text>
      //     </Body>
      //     <Right />
      //   </ListItem>
      // );
    } else if (!item.header) {
      return this.state.isFromUser ? null : (
        <ListItem avatar style={styles.chatList}>
          <Fragment>
            {this.state.currentUser === item.name ? (
              <Left style={styles.left}>
                {item.type === 'bot' ? (
                  <Image source={lego} />
                ) : (
                  <Thumbnail
                    source={Boy}
                    style={{width: 28.95, height: 40.23}}
                  />
                )}
              </Left>
            ) : null}
            <Body style={styles.chatBody}>
              <TouchableOpacity>
                <Text note style={styles.chatname}>
                  {item.name}
                </Text>
                <Text style={styles.chatmsg}>{item.msg}</Text>
              </TouchableOpacity>
            </Body>
            {this.state.currentUser !== item.name ? (
              <Right style={styles.right}>
                {item.type === 'bot' ? (
                  <Image source={lego} />
                ) : (
                  <Thumbnail
                    source={Boy}
                    style={{width: 28.95, height: 40.23}}
                  />
                )}
              </Right>
            ) : null}
          </Fragment>
        </ListItem>
      );
    }
  };

  render() {
    return (
      <Container style={styles.container}>
        <Header style={styles.chatroomHeader}>
          <Left>
            <Button transparent>
              <Ionicons name="ios-menu" style={styles.chatHeaderIcons} />
            </Button>
          </Left>
          <Body>
            <Title style={{color: '#FB1963'}}>Chatroom</Title>
          </Body>
          <Right>
            <Button
              transparent
              onPress={() =>
                this.props.logout().then(() => {
                  Actions.replace('auth');
                })
              }>
              <Ionicons
                name="ios-close-circle-outline"
                style={styles.chatHeaderIcons}
              />
            </Button>
          </Right>
        </Header>
        <Content style={styles.container}>
          {this.props.chat.messages.length > 0 ? (
            <FlatList
              ref={ref => (this.flatList = ref)}
              onContentSizeChange={() =>
                this.flatList.scrollToEnd({animated: true})
              }
              onLayout={() => this.flatList.scrollToEnd({animated: true})}
              data={this.props.chat.messages}
              renderItem={this.renderItem}
              keyExtractor={item => item.msgid}
            />
          ) : null}
        </Content>
        <Footer style={styles.footer}>
          <Input
            style={styles.Input}
            placeholderTextColor="#2E2D2C"
            placeholder="Type something"
            onChangeText={text => this.updateInput(text)}
            onSubmitEditing={() => this.submitMsg()}
            clearButtonMode={'always'}
            value={this.state.msgText}
            ref={input => {
              this.textInput = input;
            }}
          />

          <TouchableOpacity
            onPress={() => this.submitMsg()}
            style={{display: 'flex', alignItems: 'center'}}>
            <Image source={Add} onPress={() => this.submitMsg()} />
          </TouchableOpacity>
        </Footer>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  chat: state.chat,
});

export default connect(mapStateToProps, {
  joinChatroom,
  loadMessages,
  disconnectChatRoom,
  sendMessage,
  logout,
})(Chatroom);

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F8F9FA',
  },
  chatroomHeader: {
    backgroundColor: '#ffffff',
  },
  chatHeaderIcons: {
    color: '#FB1963',
    fontFamily: 'SF-UI-Display-Bold',
    fontSize: 30,
    fontWeight: 'bold',
    alignItems: 'center',
  },
  chatList: {
    marginTop: 10,
    marginBottom: 5,
  },
  chatBody: {
    backgroundColor: '#ffffff',
    borderRadius: 68,
    marginLeft: 22,
    paddingLeft: 30,
  },
  chatname: {
    color: '#95989A',
    marginBottom: 3,
    textTransform: 'capitalize',
    fontFamily: 'SF-UI-Display-Regular',
    fontSize: 12,
  },
  chatmsg: {
    fontFamily: 'SF-UI-Display-Regular',
    fontSize: 16,
    color: '#2E2D2C',
  },
  footer: {
    backgroundColor: 'transparent',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginRight: 22,
    marginBottom: 16,
    marginLeft: 26,
    paddingLeft: 22,
    paddingTop: 14,
    paddingBottom: 16,
    paddingRight: 22.6,
  },
  Input: {
    fontFamily: 'SF-UI-Display-Regular',
    fontSize: 16,
    color: '#2E2D2C',
    backgroundColor: '#ffffff',
    marginRight: 7,
    borderRadius: 10,
    paddingLeft: 15,
    alignItems: 'center',
  },
  left: {
    display: 'flex',
    alignItems: 'center',
  },
  right: {
    marginLeft: 10,
    display: 'flex',
    alignItems: 'center',
  },
});
