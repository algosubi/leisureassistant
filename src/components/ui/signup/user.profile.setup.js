/**
 * Created by subi on 2016. 3. 28..
 */
/**
 * Created by subi on 2016. 3. 17..
 */
var React = require('react-native');
var RestKit = require('react-native-rest-kit');
var Icon = require('react-native-vector-icons/FontAwesome');
var ImagePickerManager = require('NativeModules').ImagePickerManager;

var {
    View,
    Text,
    TextInput,
    TouchableHighlight,
    StyleSheet
    } = React;


var UserProfileSetup = React.createClass({
    getInitialState: function () {
        console.log("유저 프로필 설정 화면");
        console.log(this.props.userUid);
        return {
            username: ''
        };
    },
    render: function () {
        return (
            <View style={styles.container}>
                <View style={styles.loginContainer}>
                    <View style={styles.first}>
                        <TouchableHighlight style={styles.imgInput} onPress={this.getImage}>
                            <View style={styles.btnContainer}>
                            <Icon.Button name="plus" color="#e5e5e5" backgroundColor="white" style={styles.plusBtn}></Icon.Button>
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
                            value={this.state.username}
                            onChangeText={(text) => this.setState({username: text})}
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
                            <Text style={styles.title}>
                                성별을 알려주세요
                            </Text>
                        </View>
                        <View style={styles.row}>
                            <Text style={styles.radioBtn}>
                                남성
                            </Text>
                            <Text style={styles.radioBtn}>
                                여성
                            </Text>
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
        this.props.navigator.push({name: 'userPersonalSetup'});
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
                console.log(source);

                //Set up request object
                var request = {
                    method: 'post',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        "UPLOADCARE_PUB_KEY": 'aa9f6e9fef92ce9e042b',
                        "file": source.uri,
                    })
                }

                var url = 'https://upload.uploadcare.com/base/';

                RestKit.send(url, request, function(error, json){
                    if(error)
                    console.log("encoutered error: ", error);
                    console.log(json);
                });
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