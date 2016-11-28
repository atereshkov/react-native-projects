import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text, Navigator,
    View
} from 'react-native';

var SearchView = require('./src/view/searchView');
var ForecastView = require('./src/view/forecastView');
var TodayView = require('./src/view/todayView');

class WeatherApp extends React.Component {
    render() {
        return (
            <Navigator
                initialRoute={{id: 'SearchView', name: 'Index'}}
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
        if (routeId === 'SearchView') {
            return (
                <SearchView
                    navigator={navigator}/>
            );
        }
        if (routeId === 'ForecastView') {
            console.log('ForecastView from index called.')
            return (
                <ForecastView
                    navigator={navigator} data={route.data} />
            );
        }
        if (routeId === 'TodayView') {
            return (
                <TodayView
                    navigator={navigator} data={route.data} city={route.city} />
            );
        }
    }
}

AppRegistry.registerComponent('WeatherApp', () => WeatherApp);
