/**
 * Created by subi on 2016. 3. 28..
 */
/**
 * Created by subi on 2016. 3. 17..
 */

import React from 'react';
import ReactNative from 'react-native';
import Geocoder from 'react-native-geocoder';
var Icon = require('react-native-vector-icons/FontAwesome');

var {
    ListView,
    Text,
    TouchableHighlight,
    Dimensions,
    View,
    ScrollView,
    Image,
    StyleSheet
    } = ReactNative;

// simply add your google key
Geocoder.fallbackToGoogle('AIzaSyAKLZUsGPP0hH6Wpfbuk6-xUBQmJbPekZs');

var OngoingYeoga = React.createClass({
    getInitialState: function () {
        console.log("OngoingYeoga 화면");
        console.log(this.props.route.passProps.requestID);

        return {
            dataSource: new ListView.DataSource({
                rowHasChanged: (row1, row2) => row1 !== row2,
            })
        };
    },
    componentWillMount: function () {
        firebase.database().ref("activity").orderByChild("requestID").equalTo(this.props.route.passProps.requestID)
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
        return (
            <ScrollView style={styles.container}>
                <View>
                    <ListView
                        dataSource={this.state.dataSource}
                        enableEmptySections={true}
                        renderRow={(data) =>
                        <View className="list" style={styles.list}>
                        <TouchableHighlight style={styles.innerList} onPress={this.onPress(data.id)}>
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
                </View>
            </ScrollView>
        )
    },
    onPress: function (id) {
        this.props.navigator.push({name: 'ongoingYeogaDetail', passProps: {activityID: id}});
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
    return time;w
}

var styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        flexDirection: 'column',
    },
    title: {
        borderBottomColor: '#e6e6e6',
        borderBottomWidth: 1,
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 20,
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

module.exports = OngoingYeoga;