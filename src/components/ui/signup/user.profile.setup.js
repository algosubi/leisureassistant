/**
 * Created by subi on 2016. 3. 28..
 */
/**
 * Created by subi on 2016. 3. 17..
 */
import React from 'react';
import ReactNative from 'react-native';
var Icon = require('react-native-vector-icons/FontAwesome');
var ImagePickerManager = require('NativeModules').ImagePickerManager;
var generateUUID =
    require('@g/src/model/UUID');

var Digits = require('react-native-fabric-digits');
var { DigitsLoginButton } = Digits;
var DigitsManager = require("react-native").NativeModules.DigitsManager;

var {
    Alert,
    Platform,
    AsyncStorage,
    Image,
    View,
    Text,
    TextInput,
    TouchableHighlight,
    StyleSheet
    } = ReactNative;


var UserProfileSetup = React.createClass({
    getInitialState: function () {
        console.log("유저 프로필 설정 화면");
        return {
            username: '',
            introduction: '',
            avatarSource: '',
            birth: ''
        };
    },

    completion: function (error, response) {
        console.log(response);
        if (error && error.code !== 1) {
            this.setState({logged: false, error: true, response: {}});
        } else if (response) {
            DigitsManager.sessionDetails((error, sessionDetails) => {
                if (error) {
                    console.error(error);
                } else {
                    console.log(sessionDetails);

                    firebase.database().ref("users").orderByChild("phone").equalTo(sessionDetails.phoneNumber)
                        .once("child_added", (snapshot)=> {
                            if (!snapshot.exists()) {
                                console.log("회원가입 필요");
                                if (!this.state.username) {
                                    Alert.alert(
                                        '입력오류',
                                        '이름을 입력해야 합니다',
                                        [
                                            {text: '확인', onPress: () => console.log('OK Pressed!')},
                                        ]
                                    );
                                    return;
                                }

                                if (!this.state.birth) {
                                    Alert.alert(
                                        '입력오류',
                                        '생년월일을 입력해야 합니다',
                                        [
                                            {text: '확인', onPress: () => console.log('OK Pressed!')},
                                        ]
                                    );
                                    return;
                                }
                                if (!this.state.introduction) {
                                    Alert.alert(
                                        '입력오류',
                                        '생년월일을 입력해야 합니다',
                                        [
                                            {text: '확인', onPress: () => console.log('OK Pressed!')},
                                        ]
                                    );
                                    return;
                                }
                                var userID = generateUUID();

                                firebase.database().ref("users").child(userID).update({
                                        "name": this.state.username,
                                        "introduction": this.state.introduction,
                                        "birth": this.state.birth,
                                        "avatarSource": this.state.avatarSource,
                                        "phone": sessionDetails.phoneNumber
                                    },
                                    (error)=> {
                                        if (error) {
                                            console.error(error);
                                        } else {
                                            AsyncStorage.setItem('@LeisureStore:userID', userID, ()=> {
                                                this.props.navigator.push({name: 'userPersonalSetup'});

                                            });
                                        }
                                    }
                                );
                            } else {
                                console.log("이미 가입된 사용자");
                                AsyncStorage.setItem('@LeisureStore:userID', snapshot.key, ()=> {
                                    console.log(snapshot.val().requestID);
                                    if (snapshot.val().requestID != null) {
                                        this.props.navigator.push({
                                            name: 'ongoingYeoga',
                                            passProps: {requestID: snapshot.val().requestID}
                                        });
                                    } else {
                                        this.props.navigator.push({name: 'yeogaStandBy'});
                                    }

                                });


                            }
                        }, function (errorObject) {
                            console.log("The read failed: " + errorObject.code);

                        });
                }
            });

        }
    },

    render: function () {
        return (
            <View style={styles.container}>
                <View style={styles.loginContainer}>
                    <TouchableHighlight style={styles.first} onPress={this.getImage}>
                        <Image style={styles.row}
                               source={{uri: this.state.avatarSource}}
                        />
                    </TouchableHighlight>
                    <View style={styles.second}>
                        <View style={styles.row}>
                            <Text style={styles.title}>
                                닉네임을 입력해 주세요
                            </Text>
                        </View>
                        <View style={styles.row}>
                            <TextInput
                                style={styles.input}
                                value={this.state.username}
                                onChangeText={(text) => this.setState({username: text})}
                                placeholder={'닉네임 입력'}
                                maxLength={12}
                                multiline={false}
                            />
                        </View>
                    </View>
                    <View style={styles.third}>
                        <View style={styles.row}>
                            <Text style={styles.title}>
                                자기소개를 입력해 주세요
                            </Text>
                        </View>
                        <View style={styles.row}>
                            <TextInput
                                style={styles.input}
                                value={this.state.introduction}
                                onChangeText={(text) => this.setState({introduction: text})}
                                placeholder={'자기소개 입력'}
                                maxLength={12}
                                multiline={false}
                            />
                        </View>
                    </View>
                    <View style={styles.fourth}>
                        <View style={styles.row}>
                            <Text style={styles.title}>
                                생년월일을 입력해 주세요
                            </Text>
                        </View>
                        <View style={styles.row}>
                            <TextInput
                                style={styles.input}
                                value={this.state.birth}
                                onChangeText={(text) => this.setState({birth: text})}
                                placeholder={'생년월일'}
                                maxLength={12}
                                multiline={false}
                            />
                        </View>
                    </View>
                    <View style={styles.fifth}>
                        <View style={styles.row}>


                        </View>
                    </View>
                </View>
                <DigitsLoginButton
                    options={{
                              title: "Logging in is great",
                              phoneNumber: "+82",
                              appearance: {
                                backgroundColor: {
                                  hex: "#ffffff",
                                  alpha: 1.0
                                },
                                accentColor: {
                                  hex: "#43a16f",
                                  alpha: 0.7
                                },
                                headerFont: {
                                  name: "Arial",
                                  size: 16
                                },
                                labelFont: {
                                  name: "Helvetica",
                                  size: 18
                                },
                                bodyFont: {
                                  name: "Helvetica",
                                  size: 16
                                }
                              }
                            }}
                    completion={this.completion}
                    text="인증번호 전송"
                    buttonStyle={styles.button}
                    textStyle={styles.DigitsAuthenticateButtonText}/>
            </View>)
    },
    onPress: function () {
        if (!this.state.username) {
            Alert.alert(
                't',
                '이름을 입력해야 합니다',
                [
                    {text: '확인', onPress: () => console.log('OK Pressed!')},
                ]
            );
            return;
        }

        if (!this.state.birth) {
            Alert.alert(
                't',
                '생년월일을 입력해야 합니다',
                [
                    {text: '확인', onPress: () => console.log('OK Pressed!')},
                ]
            );
            return;
        }
        if (!this.state.introduction) {
            Alert.alert(
                't',
                '생년월일을 입력해야 합니다',
                [
                    {text: '확인', onPress: () => console.log('OK Pressed!')},
                ]
            );
            return;
        }
        var userID = generateUUID();

        firebase.database().ref("users").child(userID).update({
                "name": this.state.username,
                "introduction": this.state.introduction,
                "birth": this.state.birth,
                "avatarSource": this.state.avatarSource,
                "phone": this.props.route.passProps.phone
            },
            (error)=> {
                if (error) {
                    console.error(error);
                } else {
                    AsyncStorage.setItem('@LeisureStore:userID', userID, ()=> {
                        this.props.navigator.push({name: 'userPersonalSetup'});

                    });
                }
            }
        )
        ;
    },
    options: {
        title: 'Select Image', // specify null or empty string to remove the title
        cancelButtonTitle: 'Cancel',
        takePhotoButtonTitle: 'Take Photo...', // specify null or empty string to remove this button
        chooseFromLibraryButtonTitle: 'Choose from Library...', // specify null or empty string to remove this button
        cameraType: 'back', // 'front' or 'back'
        mediaType: 'photo', // 'photo' or 'video'
        videoQuality: 'high', // 'low', 'medium', or 'high'
        durationLimit: 10, // video recording max time in seconds
        maxWidth: 100, // photos only
        maxHeight: 100, // photos only
        aspectX: 2, // android only - aspectX:aspectY, the cropping image's ratio of width to height
        aspectY: 1, // android only - aspectX:aspectY, the cropping image's ratio of width to height
        quality: 0.2, // 0 to 1, photos only
        angle: 0, // android only, photos only
        allowsEditing: false, // Built in functionality to resize/reposition the image after selection
        noData: false, // photos only - disables the base64 `data` field from being generated (greatly improves performance on large photos)
        storageOptions: { // if this key is provided, the image will get saved in the documents directory on ios, and the pictures directory on android (rather than a temporary directory)
            skipBackup: true, // ios only - image will NOT be backed up to icloud
            path: 'images' // ios only - will save image at /Documents/images rather than the root
        }
    },
    getImage: function () {
        ImagePickerManager.showImagePicker(this.options, (response) => {
            console.log('Response = ', response);

            if (response.didCancel) {
                console.log('User cancelled image picker');
            }
            else if (response.error) {
                console.log('ImagePickerManager Error: ', response.error);
            }
            else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            }
            else {
                var source;
                if (Platform.OS == 'ios') {
                    source = {uri: 'data:image/jpeg;base64,' + response.data, isStatic: true};
                } else {
                    source = {uri: response.uri, isStatic: true};
                }
                console.log(source);

                var url = 'https://upload.uploadcare.com/base/';
                var photo = {
                    uri: source.uri,
                    type: 'image/jpeg',
                    name: this.props.userUid + new Date() + ".jpg",
                };
                var body = new FormData();
                body.append('file', photo);
                body.append('UPLOADCARE_PUB_KEY', 'e3c0467dc0caf0061ba3');
                body.append('UPLOADCARE_STORE', '1');
                fetch(
                    url,
                    {
                        body: body,
                        method: "POST",
                        headers: {
                            'Accept': 'application/vnd.uploadcare-v0.5+json',
                            'Date': new Date(),
                            'Authorization': 'Uploadcare.Simple e3c0467dc0caf0061ba3:7e4311d458909d78c598',
                        }
                    }
                ).then((response) => {
                        console.log('uploadcare response', response);
                        response.json().then((data)=> {
                            console.log('uploadcare data', data);
                            this.setState({
                                avatarSource: "http://ucarecdn.com/" + data.file + "/"
                            });

                        });

                    })
                    .catch((error) => {
                        console.log(error);
                    })
                    .then((responseData) => {
                    }).done();
            }
        })
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
    first: {
        flex: 2,
        flexDirection: 'row',
        marginBottom: 8,
        alignItems: 'center',
        justifyContent: 'center',
    },
    imgInput: {
        width: 120,
        height: 120,
        borderRadius: 60,
        borderColor: '#ededed',
        borderWidth: 1,
    },
    second: {
        flex: 1,
        flexDirection: 'column',
        borderColor: '#e5e5e5',
        borderWidth: 1,
        borderRadius: 3,
        marginTop: 8,
        marginBottom: 8,
    },
    third: {
        flex: 1,
        flexDirection: 'column',
        borderColor: '#e5e5e5',
        borderWidth: 1,
        borderRadius: 3,
        marginTop: 8,
        marginBottom: 8,
    },
    fourth: {
        flex: 1,
        flexDirection: 'column',
        borderColor: '#e5e5e5',
        borderWidth: 1,
        borderRadius: 3,
        marginTop: 8,
        marginBottom: 8,
    },
    fifth: {
        flex: 1,
        flexDirection: 'column',
        borderColor: '#e5e5e5',
        borderWidth: 1,
        borderRadius: 3,
        marginTop: 8,
        marginBottom: 8,
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
        borderColor: '#328FE6',
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
    },
    btnContainer: {
        flex: 1,
        alignSelf: 'center',
        justifyContent: 'center',
    },
    plusBtn: {
        height: 30,
        width: 30,
    },
    radioBtn: {
        height: 20,
        fontSize: 16,
        marginRight: 16,
    },
});

module.exports = UserProfileSetup;