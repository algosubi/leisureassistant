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
            titleText: '여가활동을 하려면 바서 여가고를 호출해' + '\n\n' + '원하는 여가를 설정해 주세요!',
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
        this.props.navigator.push({name: 'ongoingYeogaDetail'});
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
    centerContainer: {
        flex: 0.8,
        justifyContent: 'center',
        flexDirection: 'column',
    },
    imageContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'flex-end',
        justifyContent: 'center',
        textAlign: 'center',
    },
    imgImage: {
        width: 200,
        height: 200,
    },
    titleText: {
        flex: 1,
        marginTop: 20,
        textAlign: 'center',
    },
    default: {
        flex: 0.1,
    }
});

module.exports = YeogaStandBy;