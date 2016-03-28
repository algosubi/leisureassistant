var React = require('react-native');
var {
    View,
    Text,
    StyleSheet
    } = React;

var YeogaSetup = React.createClass({

    render: function() {
        console.log("메인화면");
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
module.exports = YeogaSetup;