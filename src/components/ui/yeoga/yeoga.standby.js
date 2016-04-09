var React = require('react-native');
import Yeoga from '@g/src/model/Yeoga';


var {
    View,
    Text,
    Image,
    StyleSheet,
    } = React;


var YeogaStandBy = React.createClass({

    getInitialState: function () {
        return {
            titleText: '멍청아!',
        };
    },
    render: function () {

        return (
            <View style={styles.container}>
                <View style={styles.default}></View>
                <View style={styles.centerContainer}>
                    <View Style={styles.imageContainer}>
                        <Image source={require('@g/assets/img/button_yeogago.png')} style={styles.imgImage} />
                    </View>
                    <Text style={styles.titleText}>
                        {this.state.titleText + '\n\n'}
                    </Text>
                </View>
                <View style={styles.default}></View>
            </View>)
    },

});

var styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'stretch',
        backgroundColor: '#fff'
    },
    centerContainer: {
        flex: 0.8,
        justifyContent: 'center',
        flexDirection: 'column',
    },
    imageContainer: {
        flex: 1,
        justifyContent: 'center',
        textAlign: 'center',
    },
    imgImage: {
        alignSelf: 'stretch',
        width: 200,
        height: 200,
    },
    titleText: {
        flex: 1,
    },
    default: {
        flex: 0.1,
    }
});

module.exports = YeogaStandBy;