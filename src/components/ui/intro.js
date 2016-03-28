/**
 * Created by subi on 2016. 3. 17..
 */
var React = require('react-native')
var Firebase = require('firebase')

var {
    Navigator,
    View,
    Text,
    StyleSheet,
    } = React;

var Login = require('./login');
var Main = require('./main');

var ROUTES = {
    login: Login,
    main: Main
};

var Intro = React.createClass({
    getInitialState: function () {
        return {
            needSignUp: false
            , loaded: false

        };
    },
    componentWillMount: function () {
        var DeviceInfo = require('react-native-device-info');
        var firebaseRef = new Firebase("https://leisureassistant.firebaseio.com/users");
        firebaseRef.child(DeviceInfo.getUniqueID()).on("value", (snapshot)=> {
            if (snapshot.val() == null) {
                console.log("회원가입 필요");
                this.setState({
                    needSignUp: true
                    , loaded: true

                });
            } else {
                console.log("이미 가입된 사용자");
                this.setState({
                    needSignUp: false
                    , loaded: true

                });

            }
        }, function (errorObject) {
            console.log("The read failed: " + errorObject.code);

        });

    },

    componentWillUnmount: function () {
    },
    renderScene: function (route, navigator) {
        var Component = ROUTES[route.name];
        return <Component route={route} navigator={navigator}/>;
    },
    render: function () {
        console.log(this.state);
        if (!this.state.loaded) {
            return this.renderLoadingView();
        }

        if (this.state.needSignUp) {
            return (
                <Navigator
                    style={ styles.container }
                    initialRoute={ {name : 'login'} }
                    renderScene={this.renderScene}
                    configureScene={ () => { return Navigator.SceneConfigs.FloatFromRight; } }
                />
            );
        } else {
            return (
                <Navigator
                    style={ styles.container }
                    initialRoute={ {name : 'main'} }
                    renderScene={this.renderScene}
                    configureScene={ () => { return Navigator.SceneConfigs.FloatFromRight; } }
                />
            );
        }
    },
    renderLoadingView: function () {
        return (
            <View style={styles.container}>
                <Text>
                    Loading 여가비서
                </Text>
            </View>
        );
    },

});

var styles = StyleSheet.create({
    container: {
        flex: 1,
    }
});
module.exports = Intro;
