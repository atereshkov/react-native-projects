'use strict';

import React, {Component} from 'react'
import {
    StyleSheet,
    Image,
    View,
    TouchableHighlight,
    ListView,
    Text
} from 'react-native';

var PropertyView = require('./PropertyView');

const styles = require('../styles/stylesSearchResults');

class SearchResults extends Component {

    constructor(props) {
        super(props);
        console.log('Well, we got result: ' + this.props.listings.length);
        var dataSource = new ListView.DataSource({rowHasChanged: (r1, r2) => r1.lister_url !== r2.lister_url});
        this.state = {
            dataSource: dataSource.cloneWithRows(this.props.listings)
        };
    }

    rowPressed(listerURL) {
        var property = this.props.listings.filter(prop => prop.lister_url === listerURL)[0];

        this.props.navigator.push({
            id: "Property",
            title: "Property",
            component: PropertyView,
            property: property
        });
    }

    renderRow(rowData, sectionID, rowID) {
        var price = rowData.price_formatted.split(' ')[0];

        return (
            <TouchableHighlight onPress={() => this.rowPressed(rowData.lister_url)}
                                underlayColor='#dddddd'>
                <View>
                    <View style={styles.rowContainer}>
                        <Image style={styles.thumb} source={{ uri: rowData.img_url }}/>
                        <View style={styles.textContainer}>
                            <Text style={styles.price}>{price}</Text>
                            <Text style={styles.title}
                                  numberOfLines={1}>{rowData.title}</Text>
                        </View>
                    </View>
                    <View style={styles.separator}/>
                </View>
            </TouchableHighlight>
        );
    }

    render() {
        return (
            <View>
                <TouchableHighlight style={styles.button}
                                    underlayColor='#99d9f4'
                                    onPress={this.goBack.bind(this)}>
                    <Text style={styles.buttonText}>Go back</Text>
                </TouchableHighlight>
                <ListView
                    dataSource={this.state.dataSource}
                    renderRow={this.renderRow.bind(this)}/>
            </View>
        );
    }

    goBack() {
        this.props.navigator.pop();
    }
}

module.exports = SearchResults;