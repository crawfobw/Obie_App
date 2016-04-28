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

export default class ChatRoom extends Component {
    constructor(props) {
        super(props);
        //roomId = this.props.roomId
        this.state = {
            messages : [],
            roomName : 'Default Room',
            userMessage : ''
        };
    }

    componentDidMount() {
        var _this = this;
        this.props.socket.on('room info for ' + this.props.roomId, function(roomData) {
            _this.setState({
                roomName: roomData.name,
                messages: roomData.messages
            });
            _this.forceUpdate();
        });

        this.props.socket.on("message from " + this.props.roomId, function(message) {
            _this.state.messages.push(message);
            _this.forceUpdate();
        });

        this.props.socket.emit('get room', this.props.roomId);

    }

    handleChange(event) {
        this.setState({
            userMessage: event.nativeEvent.text
        });
    }

    handleMessageSubmit(event) {
        var message = {
            'person': this.props.name,
            'content': this.state.userMessage,
            'roomId': this.props.roomId
        };
        this.props.socket.emit('chat message', message);
    }

    handleBack(event) {
        this.props.navigator.pop();
    }

    render() {
        var _this = this;
        return(
            <View>
                <Text style={styles.title}>{this.state.roomName}</Text>
                <TouchableHighlight style={styles.back}
                    underlayColor='#99d9f4'>
                    <Text style={styles.buttonText}
                        onPress={this.handleBack.bind(this)}> Back </Text>
                </TouchableHighlight>
                <View style={styles.center}>
                    {
                        // print all messages
                        this.state.messages.map(m => {
                            return <Text > {m.message} - {m.person} < / Text >
                        })
                    }
                </View>
                <View style={styles.flowRight}>
                    <TextInput style={styles.inputName}
                        placeholder="Enter a message"
                        textAlign="center"
                        onChange={this.handleChange.bind(this)} />

                    <TouchableHighlight style={styles.button}
                        underlayColor='#99d9f4'>
                        <Text style={styles.buttonText}
                            onPress={this.handleMessageSubmit.bind(this)}> Send </Text>
                    </TouchableHighlight>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    back: {
        height: 36,
        width: 60,
        flex: 1,
        borderRadius: 8,
        backgroundColor: '#48BBEC',
        borderColor: '#48BBEC',
        left:20,

    },
    flowRight: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },

    title: {
        flex: 1,
        top: 20,
        fontSize: 24,
        left: 150,
        alignItems: 'center'
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
        padding: 4,
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