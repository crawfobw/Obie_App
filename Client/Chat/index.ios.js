/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';
import React, {
  AppRegistry,
  Component,
  StyleSheet,
  Text,
  View,
  Navigator,
  TextInput,
  TouchableHighlight,
  Image,
} from 'react-native';

import Message from './app/Components/Message.js';
window.navigator.userAgent = "react-native";
var io = require('socket.io-client/socket.io');

class Chat extends Component {
  constructor(props) {
    super(props);
    this.socket = io('http://localhost:8800', {jsonp: false, transports: ['websocket']})
  }

  handleClick() {
    this.socket.emit('chat message', this.state.text);
  }

  render() {
    return (
      <View style={styles.center}>
        <Message
          socket={this.socket}/>

        <View style={styles.flowRight}>
          <TextInput style={styles.inputMessage}
            placeholder="Enter a message"
            textAlign="center"
            onChangeText={(text) => this.setState({text})} />

          <TouchableHighlight style={styles.button}
          underlayColor='#99d9f4'>
            <Text style={styles.buttonText} 
              onPress={this.handleClick.bind(this)}> Send </Text>
          </TouchableHighlight>

        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  flowRight: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputMessage: {
    flex: 3.5,
    height: 36,
    fontSize: 18,
    padding:4,
    marginRight: 4,
    marginLeft: 4,
    borderWidth: 1,
    borderColor: '#48BBEC',
    borderRadius: 8,
    color: '#48BBEC'
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  center: {
    marginTop: 200,
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
    alignSelf: 'center'
  },
  button: {
    height: 36,
    flex: 1,
    borderRadius: 8,
    backgroundColor: '#48BBEC',
    borderColor: '#48BBEC',
    justifyContent: 'center',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('Chat', () => Chat);
