/**
 * Created by subi on 2016. 7. 26..
 */
import React, {
    Component,
} from 'react';
import {
    Linking,
    Platform,
    ActionSheetIOS,
    Dimensions,
    View,
    Text,
    Navigator,
} from 'react-native';

import { GiftedChat } from 'react-native-gifted-chat';

class ChatContainer extends Component {

    constructor(props) {
        super(props);
        this._messagesRef = firebase.database().ref("chat");
        this._messages = [];
        this.state = {messages: [], myUser: {}};
        this.onSend = this.onSend.bind(this);
    }

    componentWillMount() {

    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.chatLoad) {
            nextProps.joiners.forEach((joiner) => {
                console.log("joinerID", joiner._id);
                if (joiner._id == this.props.userUid) {
                    console.log("myUsers", joiner);
                    this.setState({
                        myUser: joiner
                    });
                }
            });

            this._messagesRef.child(this.props.route.passProps.activityID).on('child_added', (item) => {
                console.log(item.val());
                nextProps.joiners.forEach((joiner) => {
                    if (joiner._id == item.val().userID) {
                        this.handleReceive({
                            user: joiner,
                            createdAt: new Date(item.val().createdAt),
                            _id: item.key,
                            text: item.val().text,
                        });
                    }
                });


            });
        }
    }

    setMessages(messages) {
        this.setState((previousState) => {
            return {
                messages: GiftedChat.append(previousState.messages, messages),
            };
        });
    }


    handleReceive(message = {}) {
        this.setMessages(message);
    }
    onSend(messages = []) {
        console.log("onSend messages", messages)
        this._messagesRef.child(this.props.route.passProps.activityID).push({
            userID: this.state.myUser._id,
            text: messages[0].text,
            createdAt: new Date().getTime()
        });

    }

    render() {
        return (
            <View >
                <GiftedChat
                    messages={this.state.messages}
                    onSend={this.onSend}
                    user={this.state.myUser}
                />
            </View>
        );
    }
}


module.exports = ChatContainer;