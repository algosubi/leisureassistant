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
                <View className="lists" style={styles.lists}>
                    <ListView
                        dataSource={this.state.dataSource}
                        renderRow={(dataSource) => <Text>{dataSource.title}</Text>}
                    />
                </View>
            </View>
            )
    }

});

var styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        flexDirection: 'column',
    },
    title: {
        height: 40,
    },
    loginContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

module.exports = OngoingYeoga;