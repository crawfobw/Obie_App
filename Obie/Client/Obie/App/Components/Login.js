import React, {
	Component,
	View,
	Text,
  StyleSheet
} from 'react-native';

var FBLogin = require('react-native-facebook-login');
var FBLoginManager = require('NativeModules').FBLoginManager;

export default class Login extends Component {
  render() {
    var _this = this;
    return (
      <FBLogin style={styles.loginContainer}
        permissions={["email","user_friends"]}
        loginBehavior={FBLoginManager.LoginBehaviors.Native}
        onLogin={function(data){
          _this.setState({ user : data.credentials });
          _this.props.socket.emit('login', data.credentials);

          _this.props.navigator.push({
      			id: 'Home',
                user: data.credentials,
                passProps: {user: data.credentials}
          });
        }}
        onLogout={function(){
          console.log("Logged out.");
          _this.setState({ user : null });
        }}
        onLoginFound={function(data){
          console.log("Existing login found.");
          console.log(data);
          _this.setState({ user : data.credentials });

          _this.props.navigator.push({
      			id: 'Home',
                user: data.credentials,
                passProps: {user: data.credentials}
          });
        }}
        onLoginNotFound={function(){
          console.log("No user logged in.");
          _this.setState({ user : null });
        }}
        onError={function(data){
          console.log("ERROR");
          console.log(data);
        }}
        onCancel={function(){
          console.log("User cancelled.");
        }}
        onPermissionsMissing={function(data){
          console.log("Check permissions!");
          console.log(data);
        }}
      />
    )
  }
}

const styles = StyleSheet.create({
  loginContainer: {
    marginTop: 150,

    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bottomBump: {
    marginBottom: 15,
  },
});





