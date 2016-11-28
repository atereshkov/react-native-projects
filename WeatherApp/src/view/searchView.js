import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet, Image,
    Text, Navigator, TouchableHighlight, TextInput, ActivityIndicator,
    View
} from 'react-native';

var TodayView = require('./todayView');
var ForecastView = require('./forecastView');
var api = require('../api/api');

class SearchView extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            searchString: 'Bangalore',
            message: ''
        };
    }

    returnPreparedUrl(url, queryStringData) {
        //if api key is defined then add it to query string
        if(api.key && api.key.length > 0) {
            queryStringData["APPID"] = api.key
        }

        var querystring = Object.keys(queryStringData)
            .map(key => key + '=' + encodeURIComponent(queryStringData[key]))
            .join('&');

        return url + "?" + querystring;
    }

    prepareAPIUrlForForecast() {
        var url = api.getDailyForecastUrl();
        var queryStringData = {
            q: this.state.searchString,
            type: 'accurate'
            /*cnt: 10,*/
        };
        return this.returnPreparedUrl(url, queryStringData);
    }

    fetchApiDataForForecast(query, currentWeatherData) {
        //make an API call to the end point for 10 day Forecast
        fetch(query)
            .then(response => response.json())
            .then(responseData => this.handleResponseForForecast(responseData, currentWeatherData))
            .catch(error =>
                this.setState({
                    isLoading: false,
                    message: 'Something went wrong. Please try again. | Forecast'
                })).done();
    }

    handleResponseForForecast(forecastData, currentWeatherData) {
        this.setState({isLoading: false, message: ''});
        console.log('forecastData searchView: ' + forecastData.list.length);
        //once response from both API's come, navigate to TodayView
        this.props.navigator.push({
            title: "Current",
            id: "TodayView",
            component: TodayView,
            data: currentWeatherData,
            city: this.state.searchString,

            //navigate to Forecast View with prefetched data
            rightButtonTitle: 'Forecast',
            onRightButtonPress: () => {
                this.props.navigator.push({
                    title: "10 day Forecast",
                    id: "ForecastView",
                    component: ForecastView,
                    data: forecastData.list
                });
            }
        });
    }

    prepareAPIUrlForCurrentWeather() {
        //get the current weather api data
        var url = api.getCurrentWeatherUrl();
        var queryStringData = {
            q: this.state.searchString,
            type: 'accurate'
        };
        return this.returnPreparedUrl(url, queryStringData);
    }

    fetchApiDataForCurrentWeather(query) {
        //make an API call to the end point for CURRENT WEATHER
        fetch(query)
            .then(response => response.json())
            .then(responseData => this.handleResponseForCurrentWeather(responseData))
            .catch(error =>
                this.setState({
                    isLoading: false,
                    message: 'Something went wrong. Please try again. | Current'
                })).done();
    }

    //this.props.navigator.pop()
    handleResponseForCurrentWeather(currentWeatherData) {
        //make API call for 10 day Forecast
        this.setState({message: 'Gathering 10 day forecast data'});
        this.fetchApiDataForForecast(this.prepareAPIUrlForForecast(), currentWeatherData);
    }

    handleTextInputChange(event) {
        this.setState({searchString: event.nativeEvent.text});
    }

    handleSearchButtonPressed() {
        console.log('handleSearchButtonPressed');
        this.setState({isLoading: true, message: 'Gathering current weather data'});
        this.fetchApiDataForCurrentWeather(this.prepareAPIUrlForCurrentWeather());
    }

    render() {
        var spinner = this.state.isLoading ? ( <ActivityIndicator size='large'/> ) : ( <View/>);
        return (
            <View style={styles.searchContainer}>
                {/*<Image
                    style={styles.image}
                    source={require('image!background')}>*/}
                    <View style={styles.innerContainer}>
                        <Text style={styles.text}>Get your Weather dose!</Text>

                        <TextInput
                            placeholder='Enter your city name'
                            style={styles.textInput}
                            value={this.state.searchString}
                            onChange={this.handleTextInputChange.bind(this)} />

                        <TouchableHighlight style={styles.button}
                                            underlayColor="#5CBC85"
                                            onPress={this.handleSearchButtonPressed.bind(this)}>
                            <Text style={styles.buttonText}>Get current Weather</Text>
                        </TouchableHighlight>
                        {spinner}
                        <Text>{this.state.message}</Text>
                    </View>
                {/*</Image>*/}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    image: {
        flex:1
    },
    searchContainer: {
        flex: 1,
        //justifyContent: 'flex-start',
        marginTop: 65,
        alignItems: 'stretch',
        backgroundColor: 'transparent',
    },
    innerContainer: {
        alignItems: 'center',
        justifyContent: 'flex-start',
        //resizeMode: Image.resizeMode.cover,
        flexDirection:'column',
        padding: 20
    },
    text: {
        marginTop: 80,
        fontSize: 28,
        textAlign: 'center',
        color: 'white',
        backgroundColor: 'transparent'
    },
    textInput: {
        height: 36,
        marginTop: 20,
        marginBottom: 10,
        padding: 4,
        fontSize: 18,
        borderWidth: 1,
        borderColor: '#0ea378',
        backgroundColor: 'white',
        borderRadius: 3,
        color: '#48BBEC'
    },
    button: {
        height: 36,
        backgroundColor: '#6BBD6D',
        //borderColor: '#0ea378',
        //borderWidth: 1,
        borderRadius: 3,
        alignSelf: 'stretch',
        justifyContent: 'center',
        marginBottom: 10
    },
    buttonText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'white',
        alignSelf: 'center'
    }
});

module.exports = SearchView;