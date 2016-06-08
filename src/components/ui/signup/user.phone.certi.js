/**
 * Created by subi on 2016. 3. 28..
 */
/**
 * Created by subi on 2016. 3. 17..
 */
import React from 'react';
import ReactNative from 'react-native';
import CheckBox from 'react-native-checkbox';

var {
    View,
    Text,
    TextInput,
    TouchableHighlight,
    StyleSheet
    } = ReactNative;

var UserPhoneCerti = React.createClass({
    getInitialState: function () {
        console.log("유저 프로필 설정 화면");
        console.log(this.props.userUid);
        return {
            username: '',
            colorTrueSwitchIsOn: true,
            colorFalseSwitchIsOn: false,
        };
    },

    render: function () {
        return (
            <View style={styles.container}>
                <View style={styles.loginContainer}>
                    <View style={styles.top}>
                        <View style={styles.row}>
                            <Text style={styles.title}>
                                이름을 입력해 주세요
                            </Text>
                        </View>
                        <View style={styles.row}>
                        <TextInput
                            style={styles.input}
                            value={this.state.username}
                            onChangeText={(text) => this.setState({username: text})}
                            placeholder={'Enter User Nickname'}
                            maxLength={12}
                            multiline={false}
                        />
                        </View>
                    </View>
                    <View style={styles.center}>
                        <View style={styles.row}>
                            <Text style={styles.title}>
                                핸드폰 번호를 입력해 주세요
                            </Text>
                        </View>
                        <View style={styles.row}>
                            <TextInput
                                style={styles.input}
                                value={this.state.username}
                                onChangeText={(text) => this.setState({username: text})}
                                placeholder={'Enter User Nickname'}
                                maxLength={12}
                                multiline={false}
                            />
                        </View>
                    </View>
                    <View style={styles.bottom}>
                        <View style={styles.row}>
                            <CheckBox
                                label=''
                                checked={false}
                                onChange={(checked) => console.log('I am checked', checked)}
                            />
                            <Text style={styles.mainTitle}>
                                아래 전체 약관에 동의합니다.
                            </Text>
                        </View>
                        <View style={styles.row}>
                            <CheckBox
                                label=''
                                checked={false}
                                onChange={(checked) => console.log('I am checked', checked)}
                            />
                            <Text style={styles.subTitle}>
                                본인 확인 서비스 이용 동의
                            </Text>
                        </View>
                        <View style={styles.row}>
                            <CheckBox
                                label=''
                                checked={false}
                                onChange={(checked) => console.log('I am checked', checked)}
                            />
                            <Text style={styles.subTitle}>
                                개인정보 수집 이용 동의
                            </Text>
                        </View>
                        <View style={styles.row}>
                            <CheckBox
                                label=''
                                checked={false}
                                onChange={(checked) => console.log('I am checked', checked)}
                            />
                            <Text style={styles.subTitle}>
                                고유 식별 정보 처리 동의
                            </Text>
                        </View>
                        <View style={styles.row}>
                            <CheckBox
                                label=''
                                checked={false}
                                onChange={(checked) => console.log('I am checked', checked)}
                            />
                            <Text style={styles.subTitle}>
                                통신사 이용 약관 동의
                            </Text>
                        </View>
                    </View>
                </View>
                <TouchableHighlight
                    style={styles.button}
                    underlayColor={'#328FE6'}
                    onPress={this.onPress}
                >
                    <Text style={styles.label}>인증코드 전송</Text>
                </TouchableHighlight>
            </View>)
    },
    onPress: function () {
        this.props.navigator.push({name: 'userProfileSetup'});
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
    loginContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'stretch',
        alignSelf: 'stretch',
        padding: 16,
    },
    top: {
        flex: 1,
        flexDirection: 'column',
        borderColor: '#e5e5e5',
        borderWidth: 1,
        borderRadius: 3,
        marginBottom: 8,
    },
    center: {
        flex: 1,
        flexDirection: 'column',
        borderColor: '#e5e5e5',
        borderWidth: 1,
        borderRadius: 3,
        marginTop: 8,
        marginBottom: 8,
    },
    bottom: {
        flex: 2,
        flexDirection: 'column',
        marginTop: 8,
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
        fontSize: 20,
    },
    mainTitle: {
        flex: 1,
        alignSelf: 'center',
        justifyContent: 'center',
        textAlign: 'left',
        color: '#545454',
        fontSize: 20,
    },
    subTitle: {
        flex: 1,
        alignSelf: 'center',
        justifyContent: 'center',
        textAlign: 'left',
        color: '#545454',
        fontSize: 16,
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
        padding: 10,
        marginTop: 10,
        backgroundColor: '#FFBE40'
    },
    label: {
        width: 230,
        alignSelf: 'center',
        textAlign: 'center',
        fontSize: 20,
        fontWeight: '600',
        color: '#ffffff'
    }
});

module.exports = UserPhoneCerti;