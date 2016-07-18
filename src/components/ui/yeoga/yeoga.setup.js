import React from 'react';
import ReactNative from 'react-native';

var generateUUID =
    require('@g/src/model/UUID');
import Request from '@g/src/model/Request';
var Icon = require('react-native-vector-icons/FontAwesome');


var {
    View,
    Image,
    TextInput,
    Text,
    ScrollView,
    TouchableHighlight,
    StyleSheet,
    DatePickerAndroid,
    TimePickerAndroid,
    DatePickerIOS,
    Platform,
    TouchableOpacity
    } = ReactNative;


var YeogaSetup = React.createClass({
    getInitialState: function () {
        console.log("여가 설정 화면");

        return {
            date: this.props.date,
            dateText: "날짜를 입력해 주세요",
            timeText: "시간을 입력해 주세요",
            thisLocation: "",
            datePickerMode: 'hidden',
            timeZoneOffsetInHours: this.props.timeZoneOffsetInHours,
            address: "",
            wantYeoga: "",
            type: "",
        };
    },
    getDefaultProps: function () {
        return {
            date: new Date(),
            timeZoneOffsetInHours: (-1) * (new Date()).getTimezoneOffset() / 60,
        };
    },
    toggleDatePicker: function () {
        var mode = this.state.datePickerMode == 'hidden' ? 'visible' : 'hidden';
        this.setState({datePickerMode: mode});
    },

    onDateChange: function (date) {
        this.setState({
            date: date, dateText: _dateToString(date), timeText: _formatTime(date.getHours(), date.getMinutes())
        });
    },

    componentDidMount: function () {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                var initialPosition = JSON.stringify(position);
                this.setState({initialPosition});
                this.reverseGeocode(position.coords);
            },
            (error) => Alert.alert("에러", "위치정보를 불러올 수 없습니다", [
                {text: 'OK', onPress: () => console.log('OK Pressed!')},
            ]),
            {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
        );
        this.watchID = navigator.geolocation.watchPosition((position) => {
            var lastPosition = JSON.stringify(position);
            this.setState({lastPosition});
        });
    },
    reverseGeocode: function (coords) {
        var url = 'https://openapi.naver.com/v1/map/reversegeocode?query=' + coords.longitude + ',' + coords.latitude;
        fetch(
            url,
            {
                method: "GET",
                dataType: 'json',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'X-Naver-Client-Id': 'FOJFXLbPo4L1IwZUvfnQ',
                    'X-Naver-Client-Secret': 'md9ZyycJ5Q'
                }
            }
        ).then((response) => {
            console.log(response);
            response.json().then((data)=> {
                this.setState({
                    address: data.result.items[0].addrdetail.sido + " " + data.result.items[0].addrdetail.sigugun + " " + data.result.items[0].addrdetail.dongmyun
                });
            });
        }).catch((error)=> {
            console.error(error);
        }).done();

    },
    componentWillUnmount: function () {
        navigator.geolocation.clearWatch(this.watchID);
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
                    newState['dateText'] = "날짜를 입력해 주세요";
                } else {
                    var date = new Date(year, month, day);
                    newState['dateText'] = _dateToString(date);
                    newState['date'] = date;
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
                newState['date'] = this.state.date.setHours(hour, minute);
                newState['timeText'] = _formatTime(hour, minute);
            } else if (action === TimePickerAndroid.dismissedAction) {
                newState['timeText'] = "시간을 입력해 주세요";
            }
            this.setState(newState);
        } catch (message) {
            console.warn(`Error in example Time: `, message);
        }
    },
    yeogaSetupPress: function () {
        var requestID = generateUUID();
        var request = new Request(requestID, this.props.userUid,
            this.state.date, this.state.address, this.state.wantYeoga, this.state.type);
        firebase.database().ref("request").child(requestID).set(request
            , (error)=> {
                if (error) {
                    console.log(error);
                } else {
                    console.log("신청 성공");
                    firebase.database().ref("users").child(this.props.userUid).update({requestID: requestID}, (error)=> {
                        if (error) {
                            console.log(error);
                        } else {
                            this.props.navigator.replace({
                                name: 'ongoingYeoga', passProps: {requestID: requestID}
                            });
                        }
                    });

                }
            });

    },
    render: function () {
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
        var location = (  <View><Text style={styles.title}>
            {this.state.address}
        </Text></View>);
        return (
            <View style={styles.container}>
                <ScrollView contentContainerStyle={styles.yeogaContainer}>
                    <View className="myLocation" style={styles.myLocation}>
                        <View style={styles.row}>
                            <Text style={styles.title}>
                                원하시는 여가활동을 말씀해 주세요
                            </Text>
                        </View>
                        <View style={styles.row}>
                            <TextInput
                                style={styles.input}
                                value={this.state.username}
                                onChangeText={(text) => this.setState({username: text})}
                                placeholder={'원하는 여가활동 작성'}
                                maxLength={12}
                                multiline={false}
                            />
                        </View>
                    </View>

                    <View className="myLocation" style={styles.myLocation}>
                        <View style={styles.row}>
                            <Text style={styles.title}>
                                위치를 설정해 주세요
                            </Text>
                        </View>
                        <View style={styles.row}>
                            { this.state.address == "" ? <View/> : location}
                        </View>
                        <View style={styles.row}>
                            <Icon.Button name="plus" style={styles.modiBtn} backgroundColor="black"
                                         borderColor="white"></Icon.Button>
                            <Text style={styles.locationModi}>
                                재설정
                            </Text>
                        </View>
                    </View>

                    <View ClassName="myHopingActivity" style={styles.myHopingActivity}>
                        <View style={styles.row}>
                            <Text style={styles.title}>
                                날짜를 선택해 주세요
                            </Text>
                        </View>
                        <Text
                            onPress={this.showDatePicker.bind(this, {
                                                                    Date: this.state.date,
                                                                    minDate: new Date(),
                                                                    maxDate: new Date(2020, 4, 10),
                                                                })}
                            style={styles.input}
                            multiline={false}>
                            {this.state.dateText}
                        </Text>
                    </View>

                    <View className="mySpareTime" style={styles.mySpareTime}>
                        <View style={styles.row}>
                            <Text style={styles.title}>
                                시간을 설정해 주세요
                            </Text>
                        </View>
                        <Text
                            onPress={this.showTimePicker.bind(this, {
                                                     hour: this.state.Hour,
                                                     minute: this.state.Minute,
                                                     is24Hour: true
                                               })}
                            style={styles.input}
                            multiline={false}>
                            {this.state.timeText}
                        </Text>
                    </View>

                    <View className="myActivityType" style={styles.myActivityType}>
                        <View style={styles.row}>
                            <Text style={styles.title}>
                                유형을 선택해 주세요
                            </Text>
                        </View>
                        <View style={styles.row}>

                        </View>
                    </View>


                </ScrollView>
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
    return date.getUTCFullYear() + '년 ' + (date.getMonth() + 1) + '월 ' + date.getDate() + '일 ';
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
    row: {
        flexDirection: 'row',
        flex: 0.5,
        paddingRight: 16,
        paddingLeft: 16,
        alignSelf: 'stretch',
    },
    title: {
        flex: 1,
        alignSelf: 'center',
        justifyContent: 'center',
        textAlign: 'left',
        color: '#545454',
        fontSize: 16,
    },
    locationModi: {
        flex: 1,
        textAlign: 'right',
    },
    input: {
        color: '#555555',
        flex: 1,
        height: 50,
        borderBottomColor: '#979797',
        borderBottomWidth: 2,
        alignSelf: 'stretch',
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