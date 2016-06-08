/**
 * Created by subi on 2016. 3. 28..
 */
/**
 * Created by subi on 2016. 3. 17..
 */
import React from 'react';
import ReactNative from 'react-native';

import { ToggleContainer, ToggleItem } from 'deco-ride-share-demo'
var DeviceInfo = require('react-native-device-info');
var ImagePickerManager = require('NativeModules').ImagePickerManager;

var {
    View,
    Dimensions,
    StatusBar,
    ListView,
    Navigator,
    Text,
    ScrollView,
    Image,
    TextInput,
    TouchableHighlight,
    StyleSheet
    } = ReactNative;

var firebaseRef = new Firebase("https://leisureassistant.firebaseio.com");
// simply add your google key
Geocoder.fallbackToGoogle('AIzaSyAKLZUsGPP0hH6Wpfbuk6-xUBQmJbPekZs');
var UserProfileSetup = React.createClass({
    getInitialState: function () {
        console.log("유저 프로필 설정 화면");
        return {
            username: '',
            avatarSource: ''

            introduction: '',
            dataSource: new ListView.DataSource({
                rowHasChanged: (row1, row2) => row1 !== row2,
            })
        };
    },
    componentWillMount: function () {
        firebaseRef.child("activity").orderByChild("yeogaID").equalTo('aldknfakldnf')
            .on("value", (snapshot)=> {
                console.log(snapshot.val());
                var items = [];
                snapshot.forEach((child) => {
                    console.log(child.val().location[0]);
                    console.log(child.val().location[1]);

                    items.push(child.val());
                });
                this.setState({
                    dataSource: this.state.dataSource.cloneWithRows(items)
                });

            }, function (errorObject) {
                console.log("The read failed: " + errorObject.code);

            });
    },
    render: function () {
        var {height, width} = Dimensions.get('window');
        var wideRatio = (9 * width) / 16;
      console.log(styles.first.height);
        return (
            <View style={styles.container}>
                <View style={styles.profileContainer}>
                  <View style={styles.first}>
                    <Image
                        style={[styles.profileBg, {width: width}]}
                        source={require('@g/assets/img/yoga.jpg')}
                    />
                    <View style={styles.profileImgView}>
                    <Image
                        style={styles.profileImg}
                        source={require('@g/assets/img/yoga.jpg')}
                    />
                    <Text style={styles.profileName}>요가걸</Text>
                    <Text style={styles.profileIntroduce}>핫요가 좋아요!! 므흣!</Text>
                    </View>
                  </View>
        <ScrollableTabView tabBarUnderlineColor={'#fff'} tabBarActiveTextColor={'#78CEDA'} tabBarBackgroundColor={'#fff'} tabBarInactiveTextColor={'#D7D7D7'} style={styles.second}>
            <ScrollView tabLabel="캘린더" contentContainerStyle={styles.third}>
            </ScrollView>
            <ScrollView tabLabel="리스트" contentContainerStyle={styles.third}>
                    <ListView
                        dataSource={this.state.dataSource}
                        renderRow={(data) =>
                        <View className="list" style={styles.list}>
                        <TouchableHighlight style={styles.innerList} onPress={this.onPress}>
                        <View style={styles.innerList}>
                            <View className="top" style={styles.top}>
                                <Image
                                    style={[styles.topImage, {width: width, height: wideRatio}]}
                                    source={require('@g/assets/img/yoga.jpg')}
                                />
                            </View>
                            <View style={[styles.bottom, {marginTop: -wideRatio, height: wideRatio}]}>
                            <View className="left" style={styles.bottomTop}>
                                <Text style={styles.activityHowMany}>{data.joiners}</Text>
                                <Text style={styles.activityHowManyText}>명</Text>
                            </View>
                            <View className="right" style={styles.bottomCenter}>
                            </View>
                            <View className="right" style={styles.bottomBottom}>
                                <View style={styles.bottomBottomTop}>
                                    <Text style={styles.activityTitle}>{data.title}</Text>
                                 </View>
                                <View style={styles.bottomBottomBottom}>
                                <View style={styles.activityTime}>
                                    <Icon style={styles.timeIcon} name="clock-o"></Icon>
                                    <Text style={styles.timeText}>{timeConverter(data.date)}</Text>
                                </View>
                                <View style={styles.activityLocation}>
                                    <Icon style={styles.locationIcon} name="location-arrow"></Icon>
                                    <Text style={styles.locationText}>{data.address.address_components[2].long_name + ' ' + data.address.address_components[1].long_name + ' ' + data.address.address_components[0].long_name}</Text>
                                </View>
                                </View>
                            </View>
                            </View>
                        </View>
                        </TouchableHighlight>
                        </View>}
                    />
            </ScrollView>
        </ScrollableTabView>
                </View>

            </View>)
    },
    onPress: function () {
        firebaseRef.child("users").child(DeviceInfo.getUniqueID()).update({
            "name": this.state.username,
            "introduction": this.state.introduction
        });
        this.props.navigator.push({name: 'userPersonalSetup'});
    }
});

function timeConverter(UNIX_timestamp) {
    var a = new Date(UNIX_timestamp);
    var months = ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'];
    var year = a.getFullYear();
    var month = months[a.getMonth()];
    var date = a.getDate();
    var hour = a.getHours();
    var time = year + '년 ' + month + ' ' + date + '일 ' + hour + '시';
    return time;
}

var styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'stretch',
        backgroundColor: '#fff',
        flexDirection: 'column'
    },
    profileContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'stretch',
        alignSelf: 'stretch',
    },
    first: {
        flex: 0.4,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    second: {
        flex: 0.6,
        flexDirection: 'column',
    },
    third: {
        flex: 1,
        flexDirection: 'column',
    },
    profileBg: {
        height: 250,
        flex: 1,
        resizeMode: 'stretch',
    },
    profileImgView: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        alignSelf: 'stretch',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    profileImg: {
        height: 96,
        width: 96,
        borderRadius: 48,
    },
    profileName: {
        fontSize: 16,
        backgroundColor: 'rgba(255,255,255,0)',
        color: 'white',
        fontWeight: 'bold',
        marginTop: 8,
    },
    profileIntroduce: {
        fontSize: 16,
        backgroundColor: 'rgba(255,255,255,0)',
        color: 'white',
        fontWeight: 'bold',
        marginTop: 8,
    },
    list: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    innerList: {
        flex: 1,
        flexDirection: 'column',
    },
    top: {
        flex: 1,
    },
    topImage: {
        flex: 1,
    },
    bottom: {
        flexDirection: 'column',
        padding: 20,
        backgroundColor: 'rgba(0,0,0,0.28)',
    },
    bottomTop: {
        flex: 0.2,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    bottomCenter: {
        flex: 0.5
    },
    bottomBottom: {
        flex: 0.4,
    },
    bottomBottomTop: {
        flex: 1.5,
        justifyContent: 'center',
    },
    bottomBottomBottom: {
        flex: 1,
        flexDirection: 'row',
    },
    activityHowMany: {
        color: '#eebe60',
        fontSize: 18,
        fontWeight: 'bold',
    },
    activityHowManyText: {
        color: 'white',
        fontSize: 16,
    },
    activityTitle: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
    activityTime: {
        flex: 1,
        flexDirection: 'row',
    },
    timeText: {
        color: 'white',
        alignSelf: 'center',
    },
    timeIcon: {
        marginRight: 4,
        color: '#eebe60',
        alignSelf: 'center',
    },
    activityLocation: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end',
    },
    locationText: {
        color: 'white',
        alignSelf: 'center',
    },
    locationIcon: {
        marginRight: 4,
        color: '#eebe60',
        alignSelf: 'center',
    }
});

module.exports = UserProfileSetup;