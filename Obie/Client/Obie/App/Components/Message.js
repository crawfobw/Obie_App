import React, {
  Text,
  View,
  Component,
  Image,
  StyleSheet
} from 'react-native';

export default class Message extends Component {
  constructor(props) {
    super(props);
	this.state = {
	  messages: []
	}
  };

  componentDidMount() {
  	// update messages as received
    this.props.socket.on('chat message', (msg) =>{
      this.state.messages.push(msg);
      this.forceUpdate();
    });
  }
  render() {
    return (
	  <View>
	    {
	      // print all messages
          this.state.messages.map(m => {
            return <Text>{m}</Text>
          })
        }
      </View>
	)
  }
}