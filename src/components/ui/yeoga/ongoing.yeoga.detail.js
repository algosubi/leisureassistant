'use strict';

var React = require('react-native');
var ScrollableTabView = require('react-native-scrollable-tab-view');
var Icon = require('react-native-vector-icons/FontAwesome');
var MapView = require('react-native-maps');
import Yeoga from '@g/src/model/Yeoga';
var {
    StyleSheet,
    Text,
    ListView,
    Image,
    Dimensions,
    TouchableHighlight,
    View,
    ScrollView,
    } = React;
var firebaseRef = new Firebase("https://leisureassistant.firebaseio.com");
var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
var OngoingYeogaDetail = React.createClass({
    statics: {
        title: '<TabBarIOS>',
        description: 'Tab-based navigation.',
    },

    displayName: 'OngoingYeogaDetail',

    getInitialState: function() {
        return {
            selectedTab: 'redTab',
            notifCount: 0,
            presses: 0,
            dataSource: ds.cloneWithRows(['row 1', 'row 2']),
            region: {
                latitude: 37.78825,
                longitude: -122.4324,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
            },
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
    onRegionChange: function(region) {
        this.setState({ region });
    },
    render: function() {
        var {height, width} = Dimensions.get('window');
        var wideRatio = (9*width)/16;
        return (
        <ScrollableTabView tabBarUnderlineColor={'#eebe60'} tabBarActiveTextColor={'#fff'} tabBarBackgroundColor={'#78cfdb'} tabBarInactiveTextColor={'#f2f2f2'} style={styles.tabContainer}>
            <ScrollView tabLabel="정보" contentContainerStyle={styles.container}>
                <ScrollView style={styles.mainContainer}>
                    <View className="detailTop" style={styles.detailTop}>
                        <View className="infoTop" style={styles.infoTop}>
                            <Image
                                style={[styles.topImage, {width: width, height: wideRatio}]}
                                source={require('@g/assets/img/yoga.jpg')}
                            />
                        </View>
                        <View className="infoCenter" style={styles.infoCenter}>
                            <View style={styles.infoCenterTop}>
                                <Text style={styles.activityDate}>2016년 5월 25일 일요일 7시</Text>
                            </View>
                            <View style={styles.infoCenterBottom}>
                                <Text style={styles.activityRemain}>마감</Text>
                            </View>
                        </View>
                        <View className="infoBottom" style={styles.infoBottom}>
                            <MapView
                                region={this.state.region}
                                onRegionChange={this.onRegionChange}
                                style={{height: 200, width: width}}
                            />
                            <View style={styles.infoBottomBottom}>
                                <Text style={styles.activityLocation}>
                                    서울시 성동구 서울숲 스케이트파크
                                </Text>
                                <Text style={styles.locationTrans}>
                                    주변 지하철역 분당선
                                </Text>
                            </View>
                        </View>
                    </View>

                    <View className="detailJoinLists" style={styles.detailJoinLists}>
                        <View className="listsTop" style={styles.listsTop}>
                            <Text style={styles.listsTitle}>참가비 15,000원</Text>
                        </View>
                        <View className="listsTop" style={styles.listsTop}>
                            <Text style={styles.listsTitle}>참석인원 4명/8명</Text>
                        </View>
                        <View className="liststContent" style={styles.listsContent}>
                            <ListView
                                dataSource={this.state.dataSource}
                                renderRow={(rowData) =>
                            <View className="listContainer" style={styles.listContainer}>

                                <TouchableHighlight className="listLeft" style={styles.listLeft}>
                                <Text>이미지</Text>
                                </TouchableHighlight>

                                <View className="listRight" style={styles.listRight}>
                                        <View style={styles.rightTop}>
                                         <Text>나다형</Text>
                                        </View>
                                        <View style={styles.rightBottom}>
                                        <Text>후하하하핫</Text>
                                        </View>
                                </View>
                            </View>}
                            />
                        </View>
                    </View>
                </ScrollView>
                <TouchableHighlight
                    style={styles.joinBtn}
                    underlayColor={'#328FE6'}
                    onPress={this.onPress}
                >
                    <Text style={styles.joinLabel}>참석하기</Text>
                </TouchableHighlight>
            </ScrollView>
            <ScrollView tabLabel="채팅" contentContainerStyle={styles.container}>
                <View style={styles.innerContainer}>
                    <View ClassName="chatContent" style={styles.chatContent}>
                        <Text>채팅 내용 들어갈 자리</Text>
                    </View>
                  
                    <View className="chatInput" style={styles.chatInput}>
                        <Icon.Button name="plus" style={styles.plusBtn} backgroundColor="white" borderColor="white"></Icon.Button>
                        <Text>테스트</Text>
                    </View>
                </View>
            </ScrollView>
        </ScrollableTabView>

        );
    },

});

var styles = StyleSheet.create({
    tabContainer: {
        backgroundColor: 'white',
        alignItems: 'stretch',
        flexDirection: 'column',
    },
    container: {
        flex: 1,
        backgroundColor: 'white',
        flexDirection: 'column',
        alignItems: 'stretch',
    },
    mainContainer: {
        flex: 0.94,
    },
    joinBtn: {
        flex: 0.06,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        backgroundColor: '#FFBE40'
    },
    joinLabel: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    innerContainer: {
        flex: 1,
        flexDirection: 'column',
        alignSelf: 'stretch',
        alignItems: 'stretch',
    },
    detailTop: {
        flexDirection: 'column',
    },
    infoTop: {
        flexDirection: 'row',
    },
    infoCenter: {
        flexDirection: 'column',
        alignItems: 'stretch',
        paddingTop: 10,
        paddingBottom: 10,
    },
    infoCenterTop: {
        flex: 1,
    },
    infoCenterBottom: {
        flex: 1,
    },
    activityDate: {
        color: 'rgba(0,0,0,0.6)',
        textAlign: 'center',
        paddingTop: 8,
        paddingBottom: 8,
        fontSize: 16,
    },
    activityRemain: {
        color: 'rgba(0,0,0,0.6)',
        textAlign: 'center',
        paddingTop: 8,
        paddingBottom: 8,
    },

    infoBottom: {
        flex: 1,
        flexDirection: 'column',
    },
    infoBottomBottom: {
        justifyContent: 'center',
        paddingTop: 10,
        paddingBottom: 10,
    },
    activityLocation: {
        flex: 1,
        color: 'rgba(0,0,0,0.6)',
        textAlign: 'center',
        fontSize: 16,
        fontWeight: 'bold',
        paddingTop: 8,
        paddingBottom: 8,
    },
    locationTrans: {
        flex: 1,
        color: 'rgba(0,0,0,0.6)',
        textAlign: 'center',
        paddingTop: 8,
        paddingBottom: 8,
    },

    detailJoinLists: {
        flex: 0.7,
        flexDirection: 'column',
    },
    listsTop: {
        borderColor: '#cdcdcd',
        borderTopWidth: 1,
        padding: 10,
    },
    listsTitle: {
        textAlign: 'center',
        fontSize: 16,
        color: 'rgba(0,0,0,0.6)',
        paddingTop: 10,
        paddingBottom: 10,
    },
    listsContent: {
        flexDirection: 'column',
    },
    listContainer: {
        flex: 1,
        flexDirection: 'row',
        borderColor: '#cdcdcd',
        borderTopWidth: 1,
        paddingTop: 10,
        paddingBottom: 10,
    },
    listLeft: {
        flex: 0.3,
        alignItems: 'center',
        justifyContent: 'center',
    },
    listRight: {
        flex: 0.7,
    },
    rightTop: {

    },
    rightBottom: {

    },
    chatContent: {
        flex: 3,
        alignSelf: 'stretch',
        padding: 50,
    },
    chatInput: {
        backgroundColor: '#fff',
        height: 40,
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        borderTopColor: '#e6e6e6',
        borderTopWidth: 1,
        flexDirection: 'row',
        alignItems: 'center',
    },
    plusBtn: {
        height: 30,
        width: 30,
        backgroundColor: 'gray',
        borderRadius: 50,
    }
});

module.exports = OngoingYeogaDetail;