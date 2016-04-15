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
    StyleSheet
    } = React;


var firebaseRef = new Firebase("https://leisureassistant.firebaseio.com");

var OngoingYeoga = React.createClass({
    getInitialState: function () {
        console.log("OngoingYeoga 화면");
        console.log(this.props.route.passProps.yeogaID);
        var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

        return {
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
            <ListView
                style={styles.container}
                dataSource={this.state.dataSource}
                renderRow={(dataSource) => <Text>{dataSource.title}</Text>}
            />)
    }

});

var styles = StyleSheet.create({
    container: {
        flex: 1
    },
    loginContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    input: {
        width: 250,
        color: '#555555',
        padding: 10,
        height: 50,
        borderColor: '#32C5E6',
        borderWidth: 1,
        borderRadius: 4,
        alignSelf: 'center',
        backgroundColor: '#ffffff'
    },
    button: {
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderRadius: 5,
        borderColor: '#328FE6',
        padding: 10,
        marginTop: 10,
        backgroundColor: '#32c5e6'
    },
    label: {
        width: 230,
        flex: 1,
        alignSelf: 'center',
        textAlign: 'center',
        fontSize: 20,
        fontWeight: '600',
        color: '#ffffff'
    }
});

module.exports = OngoingYeoga;