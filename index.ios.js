var React = require('react-native');
var firebaseApp = require('firebase/app');
var database = require('firebase/database');

var {
    AppRegistry
    } = React;
var config = {
    apiKey: "AIzaSyAKLZUsGPP0hH6Wpfbuk6-xUBQmJbPekZs",
    authDomain: "leisureassistant.firebaseapp.com",
    databaseURL: "https://leisureassistant.firebaseio.com",
    storageBucket: "firebase-leisureassistant.appspot.com",
};
firebaseApp.initializeApp(config);



var Intro = require('./src/components/ui/intro.ios')

AppRegistry.registerComponent('LeisureAssistant', () => Intro);
