var React = require('react-native');
import OneSignal from 'react-native-onesignal'; // Import package from node modules

var {
    AppRegistry
    } = React;

var firebaseApp = require('firebase/app');
var database = require('firebase/database');

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
