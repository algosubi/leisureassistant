var React = require('react-native');


var {
    View,
    Text,
    StyleSheet,
    } = React;


var YeogaStandBy = React.createClass({

    getInitialState: function () {
        return {
        };
    },
    render: function () {

        return (
            <View style={styles.container}>
                <View style={styles.default}></View>
                <View style={styles.centerContainer}>
                    <View style={styles.imageContainer}>
                        <Image source={require('@g/assets/img/button_yeogago.png')} style={styles.imgImage}/>
                    </View>
                    <Text style={styles.titleText}  onPress={this.onPress}>
                        {this.state.titleText + '\n\n'}
                    </Text>
                </View>
                <View style={styles.default}></View>
            </View>)
    },
    onPress: function () {
        this.props.navigator.push({name: 'yeogaSetup'});
    }

});

var styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'stretch',
        backgroundColor: '#fff'
    },
});

module.exports = YeogaStandBy;