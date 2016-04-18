import React, {
	Text,
	View,
	Component,
	StyleSheet,
  TextInput,
  TouchableHighlight,
} from 'react-native';

import Message from './Message.js';

export default class Home extends Component {
	constructor(props) {
		super(props);
		this.state = {
			name: props.name
		}
	}
	render() {
		return (
			<View style={styles.flowDown}>
				<View style={styles.topLeft}>
					<Text> Hi, {this.props.name}. </Text> 
				</View>

         

			</View>
		)

	}
};

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
