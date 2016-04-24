import React, {
  Text,
  View,
  Component,
  Image,
  StyleSheet,
  TextInput,
  TouchableHighlight,
  ActivityIndicatorIOS
} from 'react-native';

import Home from './Home.js';
import Message from './Message.js';

export default class EnterName extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: ''
    };
  }
  handleChange(event) {
    this.setState({
      name: event.nativeEvent.text
    });
  }
 
  handleNameSubmit(event) {
    this.props.navigator.push({
      component: Home,
      name: this.state.name
    });
  }

  render() {
    var _this = this;
    return (
      <View style={styles.center}>
      
        <View style={styles.flowRight}>
          <TextInput style={styles.inputName}
            placeholder={_this.props.user}
            textAlign="center"
            onChange={this.handleChange.bind(this)} />

          <TouchableHighlight style={styles.button}
          underlayColor='#99d9f4'>
            <Text style={styles.buttonText} 
              onPress={this.handleNameSubmit.bind(this)}> Go </Text>
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
  center: {
    padding: 20,
    marginTop: 250,
  }
});