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

var YeogaStandBy = require('./yeoga/yeoga.standby');
var YeogaSetup = require('./yeoga/yeoga.setup');
var UserPersonalSetup = require('./signup/user.personal.setup');
var UserProfileSetup = require('./signup/user.profile.setup');
var OngoingYeoga = require('./yeoga/ongoing.yeoga');

var ROUTES = {
    userProfileSetup: UserProfileSetup,
    userPersonalSetup: UserPersonalSetup,
    yeogaSetup: YeogaSetup,
    yeogaStandBy: YeogaStandBy,
    ongoingYeoga: OngoingYeoga,
};
var firebaseRef = new Firebase("https://leisureassistant.firebaseio.com");
var userUid;
var Intro = React.createClass({
    propTypes: {
        userUid: React.PropTypes.string,
    },

    getInitialState: function () {
        return {
            needSignUp: false
            , loaded: false

        };
    },
    componentWillMount: function () {
        var DeviceInfo = require('react-native-device-info');
        var FirebaseTokenGenerator = require("firebase-token-generator");
        var tokenGenerator = new FirebaseTokenGenerator("ZckdhJgaozqG512EpTjdAYLZ7i2LIBFevBtyggl6");
        var token = tokenGenerator.createToken({uid: DeviceInfo.getUniqueID(), isModerator: true});

        firebaseRef.authWithCustomToken(token, (error, authData)=> {
            if (error) {
                console.log("Login Failed!", error);
            } else {
                userUid = authData.uid;
                console.log("Login Succeeded!", authData);
                firebaseRef.child("users").child(DeviceInfo.getUniqueID()).on("value", (snapshot)=> {
                    if (snapshot.val() == null) {
                        console.log("회원가입 필요");
                        this.setState({
                            needSignUp: true
                            , loaded: true

                        });
                    } else {
                        console.log("이미 가입된 사용자");
                        console.log(snapshot.val());

                        this.setState({
                            needSignUp: false
                            , loaded: true

                        });

                    }
                }, function (errorObject) {
                    console.log("The read failed: " + errorObject.code);

                });
            }
        });


    },

    componentWillUnmount: function () {
        firebaseRef.off();
    },
    renderScene: function (route, navigator) {
        var Component = ROUTES[route.name];
        return <Component route={route} navigator={navigator} userUid={userUid}/>;
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
                    initialRoute={ {name : 'userProfileSetup'} }
                    renderScene={this.renderScene}
                    configureScene={ () => { return Navigator.SceneConfigs.FloatFromRight; } }
                />
            );
        } else {
            return (
                <Navigator
                    style={ styles.container }
                    initialRoute={ {name : 'yeogaStandBy'} }
                    renderScene={this.renderScene}
                    configureScene={ () => { return Navigator.SceneConfigs.FloatFromRight; } }
                />
            );
        }
    },
    renderLoadingView: function () {
        return (
            <View style={styles.loading}>
                <Text>
                    Loading 여가비서
                </Text>
            </View>
        );
    },

});

var styles = StyleSheet.create({
    container: {
        flex: 1
    }, loading: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF'
    }
});
module.exports = Intro;
