var React = require('react-native');
var {
    View,
    Text,
    TextInput,
    TouchableHighlight,
    StyleSheet
    } = React;


var YeogaSetup = React.createClass({
    getInitialState: function () {
        console.log(this.props.userUid);
        return {
            date: null
        };
    },

    render: function () {
        console.log("여가 설정 화면");
        return (
            <View style={styles.container}>
                <View style={styles.yeogaContainer}>
                    <TextInput
                        style={styles.input}
                        value={this.state.date}
                        onChangeText={(text) => this.setState({date: text})}
                        placeholder={'여가 시간을 입력하세요'}
                        maxLength={12}
                        multiline={false}
                    />

                    <TouchableHighlight
                        style={styles.button}
                        underlayColor={'#328FE6'}
                        onPress={this.onPress}
                    >
                        <Text style={styles.label}>여가 설정</Text>
                    </TouchableHighlight>
                </View>
            </View>)
    },
    onPress: function () {
        var ref = new Firebase("https://leisureassistant.firebaseio.com/users");
        ref.child(this.props.userUid).set({"name":this.state.username}, (error)=> {
            if (error) {
            } else {
                this.props.navigator.push({name: 'userPersonalSetup'});
            }
        });
    }
});
var styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'stretch',
        backgroundColor: '#6E5BAA'
    },
    yeogaContainer: {
        flex: 1,
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
        flex: 1,
        alignSelf: 'center',
        textAlign: 'center',
        fontSize: 20,
        fontWeight: '600',
        color: '#ffffff'
    }
});

module.exports = YeogaSetup;