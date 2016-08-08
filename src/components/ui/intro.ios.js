/**
 * Created by subi on 2016. 3. 17..
 */
import React from 'react';
import ReactNative from 'react-native';

var {
    Navigator,
    PixelRatio,
    View,
    AsyncStorage,
    Text,
    StyleSheet,
    StatusBar,
    } = ReactNative;

var YeogaStandBy = require('./yeoga/yeoga.standby'),
    YeogaSetup = require('./yeoga/yeoga.setup'),
    UserPhoneCerti = require('./signup/user.phone.certi'),
    UserPersonalSetup = require('./signup/user.personal.setup'),
    UserProfileSetup = require('./signup/user.profile.setup'),
    UserProfileView = require('./signup/user.profile.view'),
    OngoingYeoga = require('./yeoga/ongoing.yeoga'),
    OngoingYeogaDetail = require('./yeoga/ongoing.yeoga.detail');

var ROUTES = {
    userPhoneCerti: UserPhoneCerti,
    userProfileSetup: UserProfileSetup,
    userPersonalSetup: UserPersonalSetup,
    userProfileView: UserProfileView,
    yeogaSetup: YeogaSetup,
    yeogaStandBy: YeogaStandBy,
    ongoingYeoga: OngoingYeoga,
    ongoingYeogaDetail: OngoingYeogaDetail
};
var generateUUID =
    require('@g/src/model/UUID');

var userUid;
var yeogaID;
const barHeight = StatusBar.currentHeight;
var Intro = React.createClass({
    propTypes: {
        userUid: React.PropTypes.string,
    },

    getInitialState: function () {

        return {
            needSignUp: false,
            loaded: false,
            existYeoga: false,
            currentStatusBarHeight: StatusBar.currentHeight,

        };
    },
    componentWillMount: function () {
        AsyncStorage.getItem('@LeisureStore:userID', (err, result) => {
            console.log('userID', result);
            if (result == null) {
                this.setState({
                    needSignUp: true
                    , loaded: true
                    , existYeoga: false
                });
            } else {
                firebase.database().ref("users").child(result).once("value", (snapshot)=> {
                    if (snapshot.val() == null) {
                        console.log("회원가입 필요");
                        console.log(StatusBar, '스테이터스바');
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
        firebase.off();
    },
    renderScene: function (route, navigator) {
        var Component = ROUTES[route.name];
        return (
            <View style={[styles.viewStyle, {paddingTop: PixelRatio.get() * 20}]}>
                <Component route={route} navigator={navigator} userUid={userUid}/>
            </View>
        );
    },
    render: function () {
        console.log(StatusBar.currentHeight);
        console.log(this.state);

        if (!this.state.loaded) {
            return this.renderLoadingView();
        }

        if (this.state.needSignUp) {
            return (
                <View className="rootScope" style={styles.rootScope}>
                    <StatusBar
                        barStyle="default"
                    />
                    <View className="statusBar"
                          style={[styles.statusBar, {height: this.state.currentStatusBarHeight}]}></View>
                    <Navigator
                        initialRoute={ {name : 'userProfileSetup'} }
                        renderScene={this.renderScene}
                        navigationBar={
                                            <View style={styles.navBar}>
                                                 <Text style={styles.backButton}>Back</Text>
                                            </View>
                                           }
                        configureScene={ () => { return Navigator.SceneConfigs.FloatFromRight; } }
                    />
                </View>
            );
        } else {
            if (this.state.existYeoga) {
                console.log('여가아이디 : ' + yeogaID);
                return (
                    <View className="rootScope" style={styles.rootScope}>
                        <StatusBar
                            barStyle="light-content"
                        />
                        <View className="statusBar"
                              style={[styles.statusBar, {height: StatusBar.currentHeight}]}></View>
                        <Navigator
                            style={ styles.container }
                            initialRoute={ {name : 'ongoingYeoga',passProps: {yeogaID: yeogaID}} }
                            renderScene={this.renderScene}
                            sceneStyle={styles.navigator}
                            navigationBar={
                                            <View style={styles.navBar}>
                                                 <Text style={styles.backButton}>Back</Text>
                                            </View>
                                           }
                            configureScene={ () => { return Navigator.SceneConfigs.FloatFromRight; } }
                        />
                    </View>
                );
            } else {
                return (
                    <View className="rootScope" style={styles.rootScope}>
                        <StatusBar
                            barStyle="light-content"
                        />
                        <View className="statusBar"
                              style={[styles.statusBar, {height: StatusBar.currentHeight}]}></View>
                        <Navigator
                            style={ styles.container }
                            initialRoute={ {name : 'yeogaStandBy'} }
                            navigationBar={
                                            <View style={styles.navBar}>
                                                 <Text style={styles.backButton}>Back</Text>
                                            </View>
                                           }
                            renderScene={this.renderScene}
                            configureScene={ () => { return Navigator.SceneConfigs.FloatFromRight; } }
                        />
                    </View>
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
    loading: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    rootScope: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'stretch',
        backgroundColor: '#78cfdb',
    },
    statusBar: {
        alignItems: 'stretch',
    },
    navBar: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        alignItems: 'center',
        backgroundColor: '#78cfdb',
        justifyContent: 'center',
        height: PixelRatio.get() * 20,
        flexDirection: 'row'
    },
    viewStyle: {
        flex: 1,
        alignItems: 'stretch',
        flexDirection: 'column',
    }
});
module.exports = Intro;
