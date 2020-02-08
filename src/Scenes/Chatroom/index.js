import React, {Component, Fragment} from 'react';
import {
  StyleSheet,
  Animated,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native';
import {Actions} from 'react-native-router-flux';
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

export default class Chatroom extends Component {
  state = {
    data: [{id: 1, name: 'Bolt Skills', msgid: '23i4789we9q7rihkj'}],
  };

  renderItem = ({item}) => {
    return (
      <ListItem avatar sytle={styles.chatList}>
        <Fragment>
          <Left style={styles.left}>
            <Image source={lego} />
          </Left>

          <Body style={styles.chatBody}>
            <TouchableOpacity>
              <Text note style={styles.chatname}>
                {'Samuel Anthony'}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity>
              <Text style={styles.chatmsg}>I am a dev, subscribe now</Text>
            </TouchableOpacity>
          </Body>
        </Fragment>
      </ListItem>
    );
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
            <Title style={{color: '#FB1963'}}> Chatroom</Title>
          </Body>

          <Right>
            <Button transparent>
              <Ionicons
                name="ios-close-circle-outline"
                style={styles.chatHeaderIcons}
              />
            </Button>
          </Right>
        </Header>
        <Content style={styles.container}>
          <FlatList
            data={this.state.data}
            renderItem={this.renderItem}
            keyExtractor={item => item.msgid}
          />
        </Content>

        <Footer style={styles.footer}>
          <Input
            style={styles.Input}
            placeholder="Type something"
            placeholderTextColor="#2E2D2C"
            clearButtonMode="always"
            vlaue={'some value'}
          />

          <TouchableOpacity>
            <Image source={Add} />
          </TouchableOpacity>
        </Footer>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f8f9fa',
  },
  chatroomHeader: {
    backgroundColor: '#ffffff',
  },
  chatHeaderIcons: {
    color: '#fb1963',
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
    fontSize: 13,
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
    marginRight: 12,
    marginBottom: 16,
    paddingLeft: 22,
    paddingTop: 14,
    paddingBottom: 16,
    paddingRight: 22.6,
  },
  Input: {
    fontFamily: 'SF-UI-Display-Regular',
    fontSize: 16,
    color: '#2E2D2C',
    backgroundColor: '#fff',
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
