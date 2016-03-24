var React = require('react-native');
var {
    View,
    Text,
    StyleSheet
    } = React;

module.exports = React.createClass({
    render: function() {
        return (
            <View style={styles.container}>
                <Text style={{color: 'white'}}>Main</Text>
            </View>
        );
    }
});

var styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'stretch',
        backgroundColor: '#6E5BAA'
    }
});