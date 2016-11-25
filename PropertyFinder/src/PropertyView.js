'use strict';

import React, {Component} from 'react'
import {
    StyleSheet,
    Image,
    View, TouchableHighlight,
    Text
} from 'react-native';

const styles = require('../styles/stylesPropertyView');

class PropertyView extends Component {

    render() {
        var property = this.props.property;
        var stats = property.bedroom_number + ' bed ' + property.property_type;
        if (property.bathroom_number) {
            stats += ', ' + property.bathroom_number + ' ' + (property.bathroom_number > 1
                    ? 'bathrooms' : 'bathroom');
        }

        var price = property.price_formatted.split(' ')[0];

        return (
            <View style={styles.container}>
                <TouchableHighlight style={styles.button}
                                    underlayColor='#99d9f4'
                                    onPress={this.goBack.bind(this)}>
                    <Text style={styles.buttonText}>Go back</Text>
                </TouchableHighlight>
                <Image style={styles.image}
                       source={{uri: property.img_url}}/>
                <View style={styles.heading}>
                    <Text style={styles.price}>{price}</Text>
                    <Text style={styles.title}>{property.title}</Text>
                    <View style={styles.separator}/>
                </View>
                <Text style={styles.description}>{stats}</Text>
                <Text style={styles.description}>{property.summary}</Text>
            </View>
        );
    }

    goBack() {
        this.props.navigator.pop();
    }
}

module.exports = PropertyView;