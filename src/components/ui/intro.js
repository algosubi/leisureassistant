/**
 * Created by subi on 2016. 3. 17..
 */
var React = require('react-native')
var Firebase = require('firebase')
var {
    Navigator,
    PixelRatio,
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
var yeogaID;
var Intro = React.createClass({
    propTypes: {
        userUid: React.PropTypes.string,
    },

    getInitialState: function () {
        return {
            needSignUp: false
            , loaded: false,
            existYeoga: false

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
                firebaseRef.child("users").child(DeviceInfo.getUniqueID()).once("value", (snapshot)=> {
                    if (snapshot.val() == null) {
                        console.log("회원가입 필요");
                        this.setState({
                            needSignUp: true
                            , loaded: true
                            , existYeoga: false
                        });
                    } else {
                        console.log("이미 가입된 사용자");
                        console.log(snapshot.val());
                        var existYeoga = false;

                        if (snapshot.val().yeogaID != null) {
                            existYeoga = true;
                            yeogaID = snapshot.val().yeogaID;
                        }
                        this.setState({
                            needSignUp: false
                            , loaded: true
                            , existYeoga: existYeoga
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
        return (<View style={{marginTop: PixelRatio.get() * 20}}>
            <Component route={route} navigator={navigator} userUid={userUid}/>
        </View>);
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
                    navigationBar={ <View style={styles.navBar}>
                                             <Text style={styles.backButton}>Back</Text>
                                        </View>
                                       }
                    configureScene={ () => { return Navigator.SceneConfigs.FloatFromRight; } }
                />
            );
        } else {
            if (this.state.existYeoga) {
                console.log('여가아이디 : ' + yeogaID);
                return (
                    <Navigator
                        style={ styles.container }
                        initialRoute={ {name : 'ongoingYeoga',passProps: {yeogaID: yeogaID}} }
                        renderScene={this.renderScene}
                        sceneStyle={styles.navigator}
                        navigationBar={ <View style={styles.navBar}>
                                             <Text style={styles.backButton}>Back</Text>
                                        </View>
                                       }
                        configureScene={ () => { return Navigator.SceneConfigs.FloatFromRight; } }
                    />
                );
            } else {
                return (
                    <Navigator
                        style={ styles.container }
                        initialRoute={ {name : 'yeogaStandBy'} }
                        navigationBar={ <View style={styles.navBar}>
                                             <Text style={styles.backButton}>Back</Text>
                                        </View>
                                       }
                        renderScene={this.renderScene}
                        configureScene={ () => { return Navigator.SceneConfigs.FloatFromRight; } }
                    />
                );
            }

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
        flex: 1,
        alignItems: 'stretch',
        flexDirection:'column'
    }, loading: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF'
    },
    navBar: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        alignItems: 'center',
        backgroundColor: '#fff',
        borderBottomColor: '#eee',
        borderColor: 'transparent',
        borderWidth: 1,
        justifyContent: 'center',
        height: PixelRatio.get() * 20,
        flexDirection: 'row'
    },
});
module.exports = Intro;
