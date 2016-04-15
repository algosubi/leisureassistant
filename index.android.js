var React = require('react-native');
var {
    AppRegistry
    } = React;

var Intro = require('./src/components/ui/intro.ios')

AppRegistry.registerComponent('LeisureAssistant', () => Intro);
