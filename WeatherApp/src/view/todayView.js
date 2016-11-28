import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Image,
    Text,
    View
} from 'react-native';

var ForecastView = require('./forecastView');
var DegreeComponent = require('../component/degreeComponent');
var api = require('../api/api');
var Utils = require('../util/utils');
import StatusBar from "../component/StatusBar";

class TodayView extends Component {

    constructor(props) {
        super(props);
        /*this.state = {

        };*/
    }

    formatDateTime(unixTimeStamp) {
        var jsTimeStamp = unixTimeStamp * 1000,
            date = new Date(jsTimeStamp);
        return Utils.days[date.getDay()].toUpperCase() + ", " + Utils.months[date.getMonth()] + " " + date.getDate();
    }

    formatData() {
        //extract out various information from the API response passed to this component.
        var responseData = this.props.data,
            temp,
            weather,
            dateString = this.formatDateTime(responseData.dt);

        //basic checks
        if(responseData.main) {
            temp = {
                maxTemp: Utils.convertToCelcius(responseData.main.temp_max),
                minTemp: Utils.convertToCelcius(responseData.main.temp_min),
                curTemp: Utils.convertToCelcius(responseData.main.temp),
                humidity: responseData.main.humidity
            }
        }
        //basic checks
        if(responseData.weather && responseData.weather.length > 0) {
            weather = {
                desc: responseData.weather[0].description,
                summary: responseData.weather[0].main,
                icon: responseData.weather[0].icon
            }
        }
        return [temp, weather, dateString];
    }

    render() {
        var pureData = this.formatData();
        return (
            <View style={styles.container}>
                <Text style={styles.cityName}>{this.props.city}</Text>
                <Text style={styles.dateTime}>{pureData[2]}</Text>
                <View style={styles.horContainer1}>
                    <Image style={styles.icon} source={{ uri: Utils.getIconUrl(pureData[1].icon) }}/>
                    <View style={styles.vertContainer}>
                        <View style={styles.horContainer2}>
                            <Text>Max: {pureData[0].maxTemp}</Text>
                            <DegreeComponent style={{width:4, height: 4, borderRadius: 2, marginTop: 0}}/>
                            <Text style={styles.celcius}>C</Text>
                        </View>
                        <View style={styles.horContainer2}>
                            <Text>Min: {pureData[0].minTemp}</Text>
                            <DegreeComponent style={{width:4, height: 4, borderRadius: 2, marginTop: 0}}/>
                            <Text style={styles.celcius}>C</Text>
                        </View>
                        <Text>Humidity: {pureData[0].humidity}%</Text>
                    </View>
                </View>
                <View style={styles.horContainer2}>
                    <Text style={styles.curTemp}>{pureData[0].curTemp}</Text>
                    <DegreeComponent style={{width:10, height: 10, borderRadius: 5, marginTop: 10}}/>
                    <Text style={[styles.curTemp, styles.celcius]}>C</Text>
                </View>
                <Text style={styles.desc}>{pureData[1].desc}</Text>
                {/*<TouchableHighlight style={styles.button}
                                    underlayColor="#5CBC85"
                                    onPress={this.handleForecastButtonPressed.bind(this)}>
                    <Text style={styles.buttonText}>Get Forecast</Text>
                </TouchableHighlight>*/}
            </View>
        );
    }
}

var styles = StyleSheet.create({
    image: {
        flex:1
    },
    button: {
        height: 30,
        backgroundColor: '#6BBD6D',
        borderRadius: 3,
        alignSelf: 'stretch',
        justifyContent: 'center',
        marginBottom: 10
    },
    container: {
        flex: 1,
        padding: 20,
        //marginTop: 65,
        //alignItems: 'center', //flex-start, flex-end, center, stretch
        backgroundColor: '#f2f2f2'
    },
    horContainer1: {
        flexDirection: 'row',
        marginBottom: 20
    },
    horContainer2: {
        flexDirection: 'row',
        alignItems: 'flex-start'
    },
    vertContainer: {
        flex: 1,
        marginBottom:10,
        marginTop: 10,
        backgroundColor: '#cccccc',
        padding: 15
    },
    dateTime: {
        fontSize: 14,
        textAlign: 'left',
        marginBottom: 20,
        color: '#9a9a9a'
    },
    cityName: {
        fontSize: 25,
        textAlign: 'left'
    },
    backButton: {
        fontSize: 20,
        textAlign: 'left'
    },
    curTemp: {
        fontSize: 60,
        fontWeight: 'bold'
    },
    celcius: {
        marginLeft: 2
    },
    desc: {
        fontSize: 20,
        color: 'blue'
    },
    icon: {
        width: 150,
        height: 150,
        marginRight: 15
    }
});

module.exports = TodayView;