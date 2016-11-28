import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet, Image, ListView,
    Text, Navigator,
    View
} from 'react-native';

var DegreeComponent = require('../component/degreeComponent');
var Utils = require('../util/utils');

class ForecastView extends Component {

    constructor(props) {
        super(props);
        var dataSource = new ListView.DataSource({rowHasChanged: (r1, r2) => r1.dt !== r2.dt});
        this.state = {
            dataSource: dataSource.cloneWithRows(this.props.data)
        };
    }

    formatDateTime(unixTimeStamp) {
        var jsTimeStamp = unixTimeStamp*1000,
            date = new Date(jsTimeStamp);

        return {
            day: Utils.days[date.getDay()].toUpperCase(),
            dateMonth: date.getDate() + " " + Utils.months[date.getMonth()]
        }
    }

    getMaxMinTemp(tempObj) {
        return {
            maxTemp: Utils.convertToCelcius(tempObj.max),
            minTemp: Utils.convertToCelcius(tempObj.min)
        }
    }

    renderRow(rowData, sectionId, rowId) {
        var formattedDate = this.formatDateTime(rowData.dt),
            maxMinTemp = this.getMaxMinTemp(rowData.temp);
        return (
            <View>
                <View style={styles.container}>
                    <View style={styles.dateContainer}>
                        <Text style={styles.darkText}>{formattedDate.day}</Text>
                        <Text style={styles.lightText}>{formattedDate.dateMonth}</Text>
                    </View>
                    <Image style={styles.icon} source={{ uri: Utils.getIconUrl(rowData.weather[0].icon)}}/>
                    <View>
                        <View style={styles.tempContainer}>
                            <Text style={styles.darkText}>{maxMinTemp.maxTemp}</Text>
                            <Text style={styles.darkText}>/</Text>
                            <Text style={[styles.darkText, styles.slightMargin]}>{maxMinTemp.minTemp}</Text>
                            <DegreeComponent style={{width: 6, height: 6, borderRadius: 3, marginTop: -10}}/>
                            <Text style={styles.darkText}>C</Text>
                        </View>
                        <Text style={styles.lightText}>Forecast: {rowData.weather[0].description}</Text>
                        <Text style={styles.lightText}>Humidity: {rowData.humidity}%</Text>
                    </View>
                </View>
                <View style={styles.separator}/>
            </View>
        );
    }

    render() {
        return (
            <ListView style={styles.listContainer} dataSource={this.state.dataSource} renderRow={this.renderRow}/>
        );
    }
}

const styles = StyleSheet.create({
    listContainer: {
        backgroundColor: '#f2f2f2'
    },
    container: {
        flex: 1,
        paddingLeft: 20,
        paddingRight: 20,
        paddingTop: 10,
        paddingBottom: 10,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center', //flex-start, flex-end, center, stretch
    },
    dateContainer: {
        alignItems: 'center',
        marginRight: 20
    },
    separator: {
        height: 1,
        backgroundColor: '#dddddd'
    },
    icon: {
        width: 75,
        height: 75,
        marginRight: 20
    },
    tempContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end'
    },
    darkText: {
        fontSize: 18
    },
    lightText: {
        color: "#9a9a9a"
    },
    slightMargin: {
        marginRight: 1
    }
});

module.exports = ForecastView;