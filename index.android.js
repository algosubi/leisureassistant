var React = require('react-native');
var {
    AppRegistry
    } = React;

var Intro = require('./src/components/ui/intro')
OneSignal.idsAvailable((idsAvailable) => {
    console.log(idsAvailable.pushToken);
    console.log(idsAvailable.playerId);
});

AppRegistry.registerComponent('LeisureAssistant', () => Intro);
