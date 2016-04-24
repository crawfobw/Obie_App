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
    }

    render() {
        return(
            <View>

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