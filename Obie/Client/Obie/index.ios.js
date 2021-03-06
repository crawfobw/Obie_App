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

import EnterName from './App/Components/EnterName';
import Home from './App/Components/Home';
import Login from './App/Components/Login';
import ChatRoom from './App/Components/ChatRoom.js';



// Required for socket.io to function properly
window.navigator.userAgent = "react-native";
var io = require('socket.io-client/socket.io');

class Obie extends Component {
  constructor(props) {
    super(props);
    this.socket = io('http://localhost:8000', {jsonp: false});
  }

  renderScene = (route, navigator) => {
    if (route.id == 'EnterName') {
      // invoke function on trying to pass socket
      return <EnterName socket={this.socket} {...route.passProps} index={this.index} navigator={navigator} />
    } else if (route.id == 'Home') {
      return <Home name={route.name} {...route.passProps} socket={this.socket} index={this.index} navigator={navigator}/>
    } else if (route.id == 'Login') {
      return <Login socket={this.socket} index={this.index} navigator={navigator}/>
    } else if (route.id == 'Room') {
      return <ChatRoom socket={this.socket} {...route.passProps} index={this.index} navigator={navigator}/>
    }
  };

  render() {
    return (
        <Navigator
          initialRoute={{id: 'Login', index: 0}}
          renderScene={ this.renderScene } />
    );
  }
};

const styles = StyleSheet.create({
  flowRight: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
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
  inputName: {
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
  center: {
    padding: 20,
    marginTop: 250,
  }
});


AppRegistry.registerComponent('Obie', () => Obie);