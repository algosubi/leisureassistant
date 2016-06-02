/**
 * Created by subi on 2016. 3. 28..
 */
/**
 * Created by subi on 2016. 3. 17..
 */
var React = require('react-native');
import Yeoga from '@g/src/model/Yeoga';

var {
    View,
    Image,
    Text,
    ListView,
    TouchableHighlight,
    StyleSheet
    } = React;

var GridView = require('react-native-grid-view');
var API_URL = 'https://categoryjson.firebaseio.com/.json';
var MOVIES_PER_ROW = 3;

var Category = React.createClass({
    render: function() {
      console.log(this.props.category);
        return <View style={styles.movie} >
            <Image
                source={{uri: this.props.category.thumb}}
                style={styles.thumbnail}
            />
            <View >
                <Text
                    style={styles.title}
                    numberOfLines={3}>{this.props.category.title}</Text>
            </View>
        </View>
    },
});

var UserPersonalSetup = React.createClass({
    getInitialState: function () {

        console.log(API_URL);
        return {
            username: '',
            loaded: false,
            dataSource: null,
        };
    },
    componentWillMount: function () {
        this.fetchData();
    },
    fetchData: function() {
        firebase.database().ref("interest").once("value", (snapshot)=> {
                console.log(snapshot.val());
                 var items = [];
                snapshot.forEach((child) => {
                    items.push(child.val());
                });
                this.setState({
                    dataSource: items,
                    loaded:true
                });

            }, function (errorObject) {
                console.log("The read failed: " + errorObject.code);

            });
    },
    render: function() {
        console.log(this.state.dataSource);
        if (!this.state.loaded) {
            return this.renderLoadingView();
        }

        return (
          <View style={styles.container}>
            <View style={styles.top}>
              <View style={styles.topInner}>
                <Text style={styles.topTitle}>관심 활동을 선택해 주세요</Text>
              </View>
            </View>
            <GridView
                items={this.state.dataSource}
                itemsPerRow={MOVIES_PER_ROW}
                renderItem={this.renderItem}
                style={styles.listView}
            />
            <TouchableHighlight
                style={styles.button}
                underlayColor={'#328FE6'}
                onPress={this.onPress}
            >
                <Text style={styles.label}>인증코드 전송</Text>
            </TouchableHighlight>
          </View>
        );
    },

    renderLoadingView: function() {
        return (
            <View>
                <Text>
                    Loading movies...
                </Text>
            </View>
        );
    },
    renderItem: function(item) {
        return <Category category={item} />
    },
    onPress: function () {
        this.props.navigator.push({name: 'yeogaStandBy'});
    }
});

var styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'stretch',
        backgroundColor: '#fff',
        flexDirection: 'column'
    },
    top: {
        flex: 1,
        flexDirection: 'column',

        marginBottom: 8,
        padding: 16,
    },
    topInner: {
        flexDirection: 'row',
        flex: 1,
        alignSelf: 'stretch',
        alignItems: 'center',
        borderColor: '#e5e5e5',
        borderWidth: 1,
        borderRadius: 3,
    },
    topTitle: {
        flex: 1,
        textAlign: 'left',
        color: '#545454',
        fontSize: 16,
        paddingLeft: 16,
    },
    movie: {
        height: 150,
        flex: 1,
        alignItems: 'center',
        flexDirection: 'column',
    },
    title: {
        fontSize: 10,
        marginBottom: 8,
        width: 90,
        textAlign: 'center',
    },
    year: {
        textAlign: 'center',
    },
    thumbnail: {
        flex: 1,
        alignSelf: 'stretch',
    },
    listView: {
        flex: 5,
    },
});

module.exports = UserPersonalSetup;