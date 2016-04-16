/**
 * Created by subi on 2016. 3. 28..
 */
/**
 * Created by subi on 2016. 3. 17..
 */
var React = require('react-native');

var {
    View,
    Text,
    Switch,
    TextInput,
    TouchableHighlight,
    StyleSheet
    } = React;

var UserProfileSetup = React.createClass({
    getInitialState: function () {
        console.log("유저 프로필 설정 화면");
        console.log(this.props.userUid);
        return {
            username: '',
            colorTrueSwitchIsOn: true,
            colorFalseSwitchIsOn: false,
        };
    },

    render: function () {
        return (
            <View style={styles.container}>
                <View style={styles.loginContainer}>
                    <TextInput
                        style={styles.input}
                        value={this.state.username}
                        onChangeText={(text) => this.setState({username: text})}
                        placeholder={'Enter User Nickname'}
                        maxLength={12}
                        multiline={false}
                    />

                    <TouchableHighlight
                        style={styles.button}
                        underlayColor={'#328FE6'}
                        onPress={this.onPress}
                    >
                        <Text style={styles.label}>LOGIN</Text>
                    </TouchableHighlight>
                </View>
            </View>)
    },
    onPress: function () {
        var ref = new Firebase("https://leisureassistant.firebaseio.com/users");
        ref.child(this.props.userUid).set({"name":this.state.username}, (error)=> {
            if (error) {
            } else {
                this.props.navigator.pop();
                this.props.navigator.push({name: 'userPersonalSetup'});
            }
        });
    }

});

var styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#6E5BAA',
        flexDirection: 'column'
    },
    logoContainer: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    logoImage : {
        width: 250,
        height: 50
    },
    loginContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    input: {
        width: 250,
        color: '#555555',
        padding: 10,
        height: 50,
        borderColor: '#32C5E6',
        borderWidth: 1,
        borderRadius: 4,
        alignSelf: 'center',
        backgroundColor: '#ffffff'
    },
    button: {
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderRadius: 5,
        borderColor: '#328FE6',
        padding: 10,
        marginTop: 10,
        backgroundColor: '#32c5e6'
    },
    label: {
        width: 230,
        alignSelf: 'center',
        textAlign: 'center',
        fontSize: 20,
        fontWeight: '600',
        color: '#ffffff'
    }
});

module.exports = UserProfileSetup;