var React = require('react');
var ReactNative = require('react-native');
var firebaseApp = require('firebase/app');
var database = require('firebase/database');
import OneSignal from 'react-native-onesignal'; // Import package from node modules

var {
    AppRegistry
    } = ReactNative;

var config = {
    apiKey: "AIzaSyAKLZUsGPP0hH6Wpfbuk6-xUBQmJbPekZs",
    authDomain: "leisureassistant.firebaseapp.com",
    databaseURL: "https://leisureassistant.firebaseio.com",
    storageBucket: "firebase-leisureassistant.appspot.com",
};
firebaseApp.initializeApp(config);


var Intro = require('./src/components/ui/intro')
OneSignal.idsAvailable((idsAvailable) => {
    console.log(idsAvailable.pushToken);
    console.log(idsAvailable.playerId);
});

AppRegistry.registerComponent('LeisureAssistant', () => Intro);
