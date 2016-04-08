/**
 * Created by subi on 2016. 3. 28..
 */
/**
 * Created by subi on 2016. 3. 17..
 */
var React = require('react-native');

var {
    View,
    Image,
    Text,
    TextInput,
    TouchableHighlight,
    StyleSheet
    } = React;

var base64Icon = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEsAAABLCAQAAACSR7JhAAADtUlEQVR4Ac3YA2Bj6QLH0XPT1Fzbtm29tW3btm3bfLZtv7e2ObZnms7d8Uw098tuetPzrxv8wiISrtVudrG2JXQZ4VOv+qUfmqCGGl1mqLhoA52oZlb0mrjsnhKpgeUNEs91Z0pd1kvihA3ULGVHiQO2narKSHKkEMulm9VgUyE60s1aWoMQUbpZOWE+kaqs4eLEjdIlZTcFZB0ndc1+lhB1lZrIuk5P2aib1NBpZaL+JaOGIt0ls47SKzLC7CqrlGF6RZ09HGoNy1lYl2aRSWL5GuzqWU1KafRdoRp0iOQEiDzgZPnG6DbldcomadViflnl/cL93tOoVbsOLVM2jylvdWjXolWX1hmfZbGR/wjypDjFLSZIRov09BgYmtUqPQPlQrPapecLgTIy0jMgPKtTeob2zWtrGH3xvjUkPCtNg/tm1rjwrMa+mdUkPd3hWbH0jArPGiU9ufCsNNWFZ40wpwn+62/66R2RUtoso1OB34tnLOcy7YB1fUdc9e0q3yru8PGM773vXsuZ5YIZX+5xmHwHGVvlrGPN6ZSiP1smOsMMde40wKv2VmwPPVXNut4sVpUreZiLBHi0qln/VQeI/LTMYXpsJtFiclUN+5HVZazim+Ky+7sAvxWnvjXrJFneVtLWLyPJu9K3cXLWeOlbMTlrIelbMDlrLenrjEQOtIF+fuI9xRp9ZBFp6+b6WT8RrxEpdK64BuvHgDk+vUy+b5hYk6zfyfs051gRoNO1usU12WWRWL73/MMEy9pMi9qIrR4ZpV16Rrvduxazmy1FSvuFXRkqTnE7m2kdb5U8xGjLw/spRr1uTov4uOgQE+0N/DvFrG/Jt7i/FzwxbA9kDanhf2w+t4V97G8lrT7wc08aA2QNUkuTfW/KimT01wdlfK4yEw030VfT0RtZbzjeMprNq8m8tnSTASrTLti64oBNdpmMQm0eEwvfPwRbUBywG5TzjPCsdwk3IeAXjQblLCoXnDVeoAz6SfJNk5TTzytCNZk/POtTSV40NwOFWzw86wNJRpubpXsn60NJFlHeqlYRbslqZm2jnEZ3qcSKgm0kTli3zZVS7y/iivZTweYXJ26Y+RTbV1zh3hYkgyFGSTKPfRVbRqWWVReaxYeSLarYv1Qqsmh1s95S7G+eEWK0f3jYKTbV6bOwepjfhtafsvUsqrQvrGC8YhmnO9cSCk3yuY984F1vesdHYhWJ5FvASlacshUsajFt2mUM9pqzvKGcyNJW0arTKN1GGGzQlH0tXwLDgQTurS8eIQAAAABJRU5ErkJggg==';

var UserPersonalSetup = React.createClass({
    getInitialState: function () {
        console.log("유저 개인 설정 화면");
        return {
            username: ''
        };
    },

    render: function () {
        return (
            <View style={styles.container}>
                <View style={styles.selectorContainer}>
                    <Image
                        style={styles.icon}
                        source={{uri: 'http://facebook.github.io/react/img/logo_og.png'}}
                    />
                    <Image
                        style={styles.icon}
                        source={{uri: 'http://facebook.github.io/react/img/logo_og.png'}}
                    />
                    <Image
                        style={styles.icon}
                        source={{uri: 'http://facebook.github.io/react/img/logo_og.png'}}
                    />
                </View>
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
        this.props.navigator.push({name: 'yeogaStandBy'});
    }

});

var styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#6E5BAA'
    },
    selectorContainer: {
        padding: 0,
        margin: 0,
        flex: 1,
        justifyContent: 'space-around',
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'center',
    },
    icon: {
        flex: 1,
        width: 64,
        height: 64,
    },
    loginContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
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

module.exports = UserPersonalSetup;