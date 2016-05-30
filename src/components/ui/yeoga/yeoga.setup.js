var React = require('react-native');
var generateUUID =
    require('@g/src/model/UUID');
import Yeoga from '@g/src/model/Yeoga';


var {
    View,
    Image,
    TextInput,
    Text,
    TouchableHighlight,
    StyleSheet,
    DatePickerAndroid,
    TimePickerAndroid,
    DatePickerIOS,
    Platform,
    TouchableOpacity
    } = React;


var firebaseRef = new Firebase("https://leisureassistant.firebaseio.com");
var YeogaSetup = React.createClass({
    getDefaultProps: function() {
        return {
            date: new Date(),
            timeZoneOffsetInHours: (-1) * (new Date()).getTimezoneOffset() / 60,
        };
    },
    toggleDatePicker: function(){
        var mode = this.state.datePickerMode == 'hidden' ? 'visible' : 'hidden';
        this.setState({datePickerMode: mode});
    },

    onDateChange: function(date){
        this.setState({
            date: date, Text: _dateToString(date)
        });
    },


    getInitialState: function() {
        return {
            date: this.props.date,
            Text: "시간을 입력해 주세요",
            thisLocation: "부산광역시 금정구 장전동",
            datePickerMode: 'hidden',
            timeZoneOffsetInHours: this.props.timeZoneOffsetInHours
        };
    },
    async showDatePicker(options) {
        if (Platform.OS === 'ios') {
            this.setState({
                datePickerMode: 'visible'
            });
        } else {
            try {
                var newState = {};
                const {action, year, month, day} = await DatePickerAndroid.open(options);
                if (action === DatePickerAndroid.dismissedAction) {
                    newState['Text'] = "시간을 입력해 주세요";
                } else {
                    var date = new Date(year, month, day);
                    newState['Text'] = _dateToString(date);
                    newState['date'] = date;
                    this.showTimePicker({
                        hour: this.state.Hour,
                        minute: this.state.Minute,
                        is24Hour: true
                    })
                }
                this.setState(newState);
            } catch (exception) {
                console.warn(`Error in example Date: `, exception);
            }
        }

    },
    async showTimePicker(options) {
        try {
            const {action, minute, hour} = await TimePickerAndroid.open(options);
            var newState = {};
            if (action === TimePickerAndroid.timeSetAction) {
                newState['Hour'] = hour;
                newState['Minute'] = minute;
                this.state.date.setHours(hour, minute);
                newState['Text'] = _dateToString(this.state.date);
            } else if (action === TimePickerAndroid.dismissedAction) {
                newState['Text'] = "시간을 입력해 주세요";
            }
            this.setState(newState);
        } catch (message) {
            console.warn(`Error in example Time: `, message);
        }
    },
    yeogaSetupPress: function() {
        var yeogaID = generateUUID();
        console.log(yeogaID);
        var yeoga = new Yeoga(yeogaID, this.props.userUid,
            this.state.date.getTime());
        console.log(yeoga);
        firebaseRef.child('yeoga').child(yeogaID).set(yeoga
            , (error)=> {
                if (error) {
                    console.log(error);
                } else {
                    console.log("신청 성공");
                    firebaseRef.child('users').child(this.props.userUid).update({yeogaID: yeogaID}, (error)=> {
                        if (error) {
                            console.log(error);
                        } else {
                            this.props.navigator.replace({
                                name: 'ongoingYeoga', passProps: {yeogaID: yeogaID}
                            });
                        }
                    });

                }
            });

    },
    render: function() {
        console.log("여가 설정 화면");
        console.log(this.state);
        var datePicker = (
            <View style={ styles.datePicker }>
                <TouchableOpacity onPress={ this.toggleDatePicker } style={{ padding: 5, alignItems: 'flex-end' }}>
                    <Text>Done</Text>
                </TouchableOpacity>

                <DatePickerIOS
                    date={this.state.date}
                    mode="datetime"
                    timeZoneOffsetInMinutes={this.state.timeZoneOffsetInHours * 60}
                    onDateChange={ this.onDateChange }
                />
            </View>
        );

        return (
            <View style={styles.container}>
                <View style={styles.yeogaContainer}>
                    <View className="myLocation" style={styles.myLocation}>
                        <View style={styles.viewTop}>
                        <Text style={styles.viewTitle}>
                           내위치
                        </Text>
                            <Text style={styles.modiLocation}>재설정</Text>
                        </View>
                        <Text style={styles.thisLocation}>
                            {this.state.thisLocation}
                        </Text>
                    </View>

                    <View ClassName="myHopingActivity" style={styles.myHopingActivity}>
                        <Text style={styles.viewTitle}>
                            희망활동
                        </Text>
                        <TextInput
                            style={styles.inputText}
                            onChangeText={(text) => this.setState({text})}
                            value={this.state.text}
                        />
                    </View>

                    <View className="mySpareTime" style={styles.mySpareTime}>
                        <Text style={styles.viewTitle}>
                            활동가능시간
                        </Text>
                        <Text
                            style={styles.input}
                            onPress={this.showDatePicker.bind(this, {
                                                                    Date: this.state.date,
                                                                    minDate: new Date(),
                                                                    maxDate: new Date(2020, 4, 10),
                                                                })}
                            multiline={false}>
                            {this.state.Text}
                        </Text>
                    </View>

                    <View className="myActivityType" style={styles.myActivityType}>
                        <Text style={styles.viewTitle}>
                            활동형태
                        </Text>
                        <View style={styles.viewContent}>

                        </View>
                    </View>


                </View>
                { this.state.datePickerMode == 'visible' ? datePicker : <View/> }
                <View className="toolbarBottom" style={styles.toolbarBottom}>
                    <Text onPress={this.yeogaSetupPress} style={styles.toolbarBottomText}>완료</Text>
                </View>
            </View>)
    },

});


function _formatTime(hour, minute) {
    return (hour < 10 ? '0' + hour : hour) + ':' + (minute < 10 ? '0' + minute : minute);
}

function _dateToString(date) {
    console.log(date);
    return date.getUTCFullYear() + '년 ' + (date.getMonth() + 1) + '월 ' + date.getDate() + '일 ' + _formatTime(date.getHours(), date.getMinutes());
}

var styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'stretch',
        backgroundColor: '#fff'
    },
    default: {
        flex: 0.1,
    },
    yeogaContainer: {
        flex: 0.8,
        justifyContent: 'center',
        alignItems: 'stretch',
        alignSelf: 'stretch',
        padding: 16,
    },
    myLocation: {
        flex: 1,
        flexDirection: 'column',
        borderColor: '#e5e5e5',
        borderWidth: 1,
        borderRadius: 3,
        marginBottom: 8,
    },
    myHopingActivity: {
        flex: 1,
        flexDirection: 'column',
        borderColor: '#e5e5e5',
        borderWidth: 1,
        borderRadius: 3,
        marginTop: 8,
        marginBottom: 8,
    },
    mySpareTime: {
        flex: 1,
        flexDirection: 'column',
        borderColor: '#e5e5e5',
        borderWidth: 1,
        borderRadius: 3,
        marginTop: 8,
        marginBottom: 8,
    },
    myActivityType: {
        flex: 1,
        flexDirection: 'column',
        borderColor: '#e5e5e5',
        borderWidth: 1,
        borderRadius: 3,
    },
    toolbarBottom: {
        backgroundColor: '#fff',
        height: 40,
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        borderTopColor: '#e6e6e6',
        borderTopWidth: 1,
        flexDirection: 'row',
        alignItems: 'center',
    },
    viewTop: {
        flexDirection: 'row',
    },
    viewTitle: {
        flex: 1,
        color: '#999999',
        fontSize: 14,
        paddingTop: 20,
        paddingBottom: 20,
    },
    modiLocation: {
        paddingTop: 20,
        flex: 1,
        textAlign: 'right',
        fontSize: 12,
    },
    thisLocation: {
        color: "#666666",
        fontSize: 18,
    },
    inputText: {
        height: 50,
        borderWidth: 1,
    },
    toolbarBottomText: {
        flex: 1,
        textAlign: 'right',
        paddingRight: 20,
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
    setActivityCompleted: {
        flex: 1,
        alignSelf: 'center',
        textAlign: 'center',
        fontSize: 20,
        fontWeight: '600',
        color: '#ffffff'
    },
    datePicker: {
        borderTopWidth: 1,
        position: 'absolute',
        bottom: 0,
        right: 0,
        left: 0,
        height: 220,
        borderColor: '#CCC',
        backgroundColor: '#FFF',
    },

});

module.exports = YeogaSetup;