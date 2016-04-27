import React, {
	Text,
	View,
	Component,
	StyleSheet,
    TextInput,
    TouchableHighlight,
} from 'react-native';

import Message from './Message.js';

var goToChatRoom = function(room, user, navigator) {
    navigator.push({
        id: 'Room',
        passProps: { roomId : room, name: user }
    });
};

export default class Home extends Component {
	constructor(props) {
		super(props);
		this.state = {
			name: 'placeholder'
		};
        //this.props.socket.emit('checkConnection', this.props.user);
        var path = 'https://graph.facebook.com/' + this.props.user.userId +"?access_token=" + this.props.user.token;
        fetch(path, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then((response) => response.text())
          .then((responseText) => {
            this.setState({name: JSON.parse(responseText).name});
          })
          .catch((error) => {
            this.props.socket.emit('checkConnection', error);
        });
	}


    handleSports(event) {
        goToChatRoom('sports', this.state.name, this.props.navigator);
    }
    handlePolitics(event) {
        goToChatRoom('politics', this.state.name, this.props.navigator);
    }
    handleFashion(event) {
        goToChatRoom('fashion', this.state.name, this.props.navigator);
    }
    handleTechnology(event) {
        goToChatRoom('technology', this.state.name, this.props.navigator);
    }


	render() {
		return (
			<View style={styles.flowDown}>
                <Text style={styles.center}>Hello, { this.state.name }.</Text>
                <Text style={styles.center}>Please Choose a chat room to join</Text>

                <TouchableHighlight style={styles.button}
                    underlayColor='#99d9f4'>
                    <Text style={styles.buttonText}
                        onPress={this.handleSports.bind(this)}> Sports </Text>
                </TouchableHighlight>

                <TouchableHighlight style={styles.button}
                    underlayColor='#99d9f4'>
                    <Text style={styles.buttonText}
                        onPress={this.handlePolitics.bind(this)}> Politics </Text>
                </TouchableHighlight>

                <TouchableHighlight style={styles.button}
                    underlayColor='#99d9f4'>
                    <Text style={styles.buttonText}
                        onPress={this.handleFashion.bind(this)}> Fashion </Text>
                </TouchableHighlight>

                <TouchableHighlight style={styles.button}
                    underlayColor='#99d9f4'>
                    <Text style={styles.buttonText}
                        onPress={this.handleTechnology.bind(this)}> Technology </Text>
                </TouchableHighlight>
            </View>
        )
	}
}

const styles = StyleSheet.create({
  flowDown: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  topLeft: {
    marginTop: 50,
  },
  image: {
    width: 370,
    height: 300,
    marginLeft:10,
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
    left: 30,
    top: 200,
    marginBottom: 2
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
  center: {
    left: 30,
    top: 200
  }
});
