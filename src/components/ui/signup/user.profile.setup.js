/**
 * Created by subi on 2016. 3. 28..
 */
/**
 * Created by subi on 2016. 3. 17..
 */

import React from 'react';
import ReactNative from 'react-native';

import { ToggleContainer, ToggleItem } from 'deco-ride-share-demo'
var DeviceInfo = require('react-native-device-info');
var ImagePickerManager = require('NativeModules').ImagePickerManager;

var {
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
            avatarSource: ''

        };
    },
    render: function () {
        return (
            <View style={styles.container}>
                <View style={styles.loginContainer}>
                    <View style={styles.first}>
                        <TouchableHighlight style={styles.imgInput} onPress={this.getImage}>
                            <View style={styles.btnContainer}>
                                <Icon.Button name="plus" color="#e5e5e5" backgroundColor="white"
                                             style={styles.plusBtn} onPress={this.getImage}></Icon.Button>
                            </View>
                        </TouchableHighlight>
                    </View>
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
                                placeholder={'Enter User Nickname'}
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
                                placeholder={'Enter User Nickname'}
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
                                value={this.state.username}
                                onChangeText={(text) => this.setState({username: text})}
                                placeholder={'Enter User Nickname'}
                                maxLength={12}
                                multiline={false}
                            />
                        </View>
                    </View>
                    <View style={styles.fifth}>
                        <View style={styles.row}>
                            <ToggleContainer
                                value={(this.state && this.state.option) || '남성'}
                                options={['남성', '여성']}
                                style={{padding: 10}}
                                orientation={"horizontal"}
                                spacing={10}
                                renderItem={(option, active) => (
                              <ToggleItem
                                option={option}
                                active={active}
                                onPress={() => this.setState({option})}
                                color={"rgb(74,144,226)"}
                                backgroundColor={"rgb(255,255,255)"}
                                borderColor={"rgba(231,231,231,1)"}
                                activeColor={"rgba(255,255,255,1)"}
                                activeBackgroundColor={"rgb(74,144,226)"}
                                borderRadius={2}
                              />
                            )}
                            />

                        </View>
                    </View>
                </View>
                <TouchableHighlight
                    style={styles.button}
                    underlayColor={'#328FE6'}
                    onPress={this.onPress}
                >
                    <Text style={styles.label}>계속하기</Text>
                </TouchableHighlight>
            </View>)
    },
    onPress: function () {
        firebase.database().ref("users").child(DeviceInfo.getUniqueID()).update({
            "name": this.state.username,
            "introduction": this.state.introduction
        }, (error)=> {
            if (error) {
                console.error(error);
            } else {
                this.props.navigator.push({name: 'userPersonalSetup'});

            }
        });
    },
    options: {
        title: 'Select Avatar', // specify null or empty string to remove the title
        cancelButtonTitle: 'Cancel',
        takePhotoButtonTitle: 'Take Photo...', // specify null or empty string to remove this button
        chooseFromLibraryButtonTitle: 'Choose from Library...', // specify null or empty string to remove this button
        customButtons: {
            'Choose Photo from Facebook': 'fb', // [Button Text] : [String returned upon selection]
        },
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
                // You can display the image using either data:
                const source = {uri: 'data:image/jpeg;base64,' + response.data, isStatic: true};


                // uri (on iOS)
                //const source = {uri: response.uri.replace('file://', ''), isStatic: true};
                // uri (on android)
                //const source = {uri: response.uri, isStatic: true};
                // console.log(source);

                //Set up request object


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
                        console.log(response);
                        var file = JSON.parse(response._bodyText);
                        firebase.database().ref("users").child(DeviceInfo.getUniqueID()).update({
                            "avatarSource": file.file
                        }, (error) => {
                            if (error) {
                                console.error(error);
                            }
                        })
                    })
                    .catch((error) => {
                        console.log(error);
                    })
                    .then((responseData) => {
                    }).done();

                this.setState({
                    avatarSource: source
                });
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
    }
});

module.exports = UserProfileSetup;