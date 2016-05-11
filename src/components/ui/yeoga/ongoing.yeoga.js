/**
 * Created by subi on 2016. 3. 28..
 */
/**
 * Created by subi on 2016. 3. 17..
 */
var React = require('react-native');
import Yeoga from '@g/src/model/Yeoga';
var Icon = require('react-native-vector-icons/FontAwesome');

var {
    ListView,
    Text,
    TouchableHighlight,
    Dimensions,
    View,
    Image,
    StyleSheet
    } = React;


var firebaseRef = new Firebase("https://leisureassistant.firebaseio.com");

var OngoingYeoga = React.createClass({
    getInitialState: function () {
        console.log("OngoingYeoga 화면");
        console.log(this.props.route.passProps.yeogaID);
        console.log(this.props.navigator);

        return {
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
                    console.log(child.val());
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
        var wideRatio = (9*width)/16;

        return (
            <View style={styles.container}>
                <View>
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
                                    <Text style={styles.locationText}>{data.location}</Text>
                                </View>
                                </View>
                            </View>
                            </View>
                        </View>
                        </TouchableHighlight>
                        </View>}
                    />
                </View>
            </View>
            )
    },
    onPress: function () {
        this.props.navigator.push({name: 'ongoingYeogaDetail'});
    }

});

function timeConverter(UNIX_timestamp){
    var a = new Date(UNIX_timestamp);
    var months = ['1월','2월','3월', '4월', '5월','6월','7월','8월','9월','10월','11월','12월'];
    var year = a.getFullYear();
    var month = months[a.getMonth()];
    var date = a.getDate();
    var hour = a.getHours();
    var time = year + '년 ' + month + ' ' + date + '일 ' + hour + '시' ;
    return time;
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