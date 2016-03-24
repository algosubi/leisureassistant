var React = require('react-native');
var {
    AppRegistry
    } = React;

var Intro = require('./src/components/ui/intro')

AppRegistry.registerComponent('LeisureAssistant', () => Intro);
