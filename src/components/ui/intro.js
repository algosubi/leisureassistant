/**
 * Created by subi on 2016. 3. 17..
 */
var React = require('react-native')
var {
    Navigator,
    StyleSheet
    } = React;

var Login = require('./login');
var Main = require('./main');

var ROUTES = {
    login: Login,
    main: Main
};

module.exports = React.createClass({
    renderScene: function (route, navigator) {
        var Component = ROUTES[route.name];
        return <Component route={route} navigator={navigator}/>;
    },
    render: function () {
        return (
            <Navigator
                style={ styles.container }
                initialRoute={ {name: 'login'} }
                renderScene={this.renderScene}
                configureScene={ () => { return Navigator.SceneConfigs.FloatFromRight; } }
            />
        );
    }
});

var styles = StyleSheet.create({
    container: {
        flex: 1
    }
});