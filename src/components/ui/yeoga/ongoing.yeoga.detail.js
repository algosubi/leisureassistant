'use strict';

var React = require('react-native');
var ScrollableTabView = require('react-native-scrollable-tab-view');
var {
    StyleSheet,
    Text,
    ListView,
    TouchableHighlight,
    View,
    ScrollView,
    } = React;

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
        };
    },

render: function() {
    return (
    <ScrollableTabView tabBarUnderlineColor={'#78cfdb'} tabBarActiveTextColor={'#78cfdb'} style={[styles.tabContainer, {borderBottomWidth: 0}]}>
        <ScrollView tabLabel="정보">
            <View style={styles.container}>
                <View className="detailTop" style={styles.detailTop}>
                    <View className="topInfo" style={styles.topInfo}>
                        <View className="infoLeft" style={styles.infoLeft}>
                            <Text style={styles.infoDay}>토요일</Text>
                            <Text style={styles.infoDate}>9</Text>
                            <Text style={styles.infoTime}>오후 7:00</Text>
                        </View>
                        <View className="infoRight" style={styles.infoRight}>
                            <Text style={styles.infoWhen}>2016/4/9 토요일 오후 7:00</Text>
                            <Text style={styles.infoPlace}>강남역 11번 출구</Text>
                            <Text style={styles.infoPrice}>15.000원</Text>
                        </View>
                    </View>
                    <View className="infoBottom" style={styles.infoBottom}>
                        <TouchableHighlight
                            style={styles.joinBtn}
                            underlayColor={'#328FE6'}
                            onPress={this.onPress}
                        >
                            <Text style={styles.joinLabel}>참석하기</Text>
                        </TouchableHighlight>
                    </View>
                </View>
                <View className="detailJoinLists" style={styles.detailJoinLists}>
                    <View className="listsTop" style={styles.listsTop}>
                        <Text style={styles.listsTitle}>참석하는 사람들</Text>
                    </View>
                    <View className="liststContent" style={styles.liststContent}>
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
            </View>
        </ScrollView>
        <ScrollView tabLabel="채팅">
            </ScrollView>
    </ScrollableTabView>

    );
},

});

var styles = StyleSheet.create({
    tabContainer: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'stretch',
        backgroundColor: 'white',
        borderTopWidth: 0,
    },
    container: {
        flex: 1,
        backgroundColor: 'white',
        flexDirection: 'column',
    },
    detailTop: {
        flex: 0.3,
        flexDirection: 'column',
        padding: 20,
    },
    topInfo: {
        flex: 1,
        flexDirection: 'row',
    },
    infoLeft: {
        flex: 0.3,
        flexDirection: 'column',
    },
    infoRight: {
        flex: 0.7,
        flexDirection: 'column',
    },
    infoBottom: {
        flex: 1,
    },
    joinBtn: {
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderRadius: 5,
        borderColor: '#328FE6',
        padding: 10,
        marginTop: 10,
        backgroundColor: '#32c5e6'
    },
    detailJoinLists: {
        flex: 0.7,
        flexDirection: 'column',
    },
    listsTop: {
        borderColor: '#e6e6e6',
        borderBottomWidth: 1,
        borderTopWidth: 1,
        padding: 10,
    },
    listsContent: {
        flexDirection: 'column',
    },
    listContainer: {
        flex: 1,
        flexDirection: 'row',
        borderColor: '#e6e6e6',
        borderBottomWidth: 1,
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

    }
});

module.exports = OngoingYeogaDetail;