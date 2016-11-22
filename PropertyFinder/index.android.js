/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text, Navigator,
    View
} from 'react-native';

var SearchPage = require('./src/SearchPage');
var SearchResults = require('./src/SearchResults');
var PropertyView = require('./src/PropertyView');

class PropertyFinder extends React.Component {
    render() {
        return (
            <Navigator
                initialRoute={{id: 'SearchPage', name: 'Index'}}
                renderScene={this.renderScene.bind(this)}
                configureScene={(route) => {
                        if (route.sceneConfig) {
                            return route.sceneConfig;
                        }
                        return Navigator.SceneConfigs.FloatFromRight;
                 }}/>
        );
    }

    renderScene(route, navigator) {
        var routeId = route.id;
        if (routeId === 'SearchPage') {
            return (
                <SearchPage
                    navigator={navigator}/>
            );
        }
        if (routeId === 'Results') {
            console.log('Show SearchResults');
            return (
                <SearchResults
                    navigator={navigator} listings={route.listings}/>
            );
        }
        if (routeId === 'Property') {
            console.log('Show PropertyView');
            return (
                <PropertyView
                    navigator={navigator} property={route.property}/>
            );
        }
    }
}

var styles = StyleSheet.create({
    text: {
        color: 'black',
        backgroundColor: 'white',
        fontSize: 30,
        margin: 80
    },
    container: {
        flex: 1
    }
});

AppRegistry.registerComponent('PropertyFinder', () => PropertyFinder);
