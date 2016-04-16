/**
 * Created by subi on 2016. 3. 28..
 */
/**
 * Created by subi on 2016. 3. 17..
 */
var React = require('react-native');
import Yeoga from '@g/src/model/Yeoga';

var {
    ListView,
    Text,
    TouchableHighlight,
    View,
    StyleSheet
    } = React;


var firebaseRef = new Firebase("https://leisureassistant.firebaseio.com");

var OngoingYeoga = React.createClass({
    getInitialState: function () {
        console.log("OngoingYeoga 화면");
        console.log(this.props.route.passProps.yeogaID);
        var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

        return {
            title: '추천 여가 리스트',
            dataSource: ds.cloneWithRows(['row 1', 'row 2']),
        };
    },
    componentWillMount: function () {
        firebaseRef.child("activity").orderByChild("yeogaID").equalTo('aldknfakldnf')
            .on("value", (snapshot)=> {
                console.log(snapshot.val());
                var items = [];
                snapshot.forEach((child) => {
                    console.log(child.val());
                    items.push(Yeoga.fromJSON(child.val()));
                });
                this.setState({
                    dataSource: this.state.dataSource.cloneWithRows(items)
                });

            }, function (errorObject) {
                console.log("The read failed: " + errorObject.code);

            });
    },
    render: function () {
        return (
            <View style={styles.container}>
                <View className="title" style={styles.title}>
                    <Text>{this.state.title}</Text>
                </View>
                <View>

                    <ListView
                        dataSource={this.state.dataSource}
                        renderRow={(dataSource) =>
                        <View className="lists" style={styles.lists}>
                            <View className="left" style={styles.left}>
                                <View style={styles.leftTop}><Text>토요일</Text></View>
                                <View style={styles.leftCenter}><Text>9</Text></View>
                                <View style={styles.leftBottom}><Text>오후 7:00</Text></View>
                            </View>
                            <TouchableHighlight className="right" style={styles.right} onPress={this.onPress}>
                                <View>
                                <View style={styles.rightLeft}>
                                    <View style={styles.rightTop}>
                                     <Text>보올링</Text>
                                    </View>
                                    <View style={styles.rightBottom}>
                                    <Text>강남역 11번 출구</Text>
                                    </View>
                                </View>
                                <View style={styles.rightRight}>
                                    <Text>8명</Text>
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
    loginContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    lists: {
        flexDirection: 'row',
        alignItems: 'stretch',
    },
    left: {
        flex: 0.5,
        flexDirection: 'column',
        borderColor: '#e6e6e6',
        borderBottomWidth: 1,
        borderRightWidth: 1,
    },
    leftTop: {
        flex: 1,
    },
    leftCenter: {
        flex: 1,
    },
    leftBottom: {
        flex: 1,
    },
    right: {
        flex: 1.5,
        borderBottomColor: '#e6e6e6',
        borderBottomWidth: 1,
        flexDirection: 'row',
    },
    rightLeft: {
        flex: 0.8,
        flexDirection: 'column',
    },
    rightRight: {
        flex: 0.2,
    },
    rightTop: {

    },
    rightBottom: {

    },

});

module.exports = OngoingYeoga;