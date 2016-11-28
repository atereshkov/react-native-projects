'use strict';
import React, {Component} from 'react';
import ReactNative from 'react-native';

//const styles = require('/src/styles/statusBarStyles');
const { StyleSheet, Text, View} = ReactNative;

class StatusBar extends Component {
    render() {
        return (
            <View>
                <View style={styles.statusbar}/>
                <View style={styles.navbar}>
                    <Text style={styles.navbarTitle}>{this.props.title}</Text>
                </View>
            </View>
        );
    }
}

var styles = StyleSheet.create({
    navbar: {
        alignItems: 'center',
        backgroundColor: '#6BBD6D',
        borderBottomColor: '#eee',
        borderColor: 'transparent',
        borderWidth: 1,
        justifyContent: 'center',
        height: 44,
        flexDirection: 'row'
    },
    navbarTitle: {
        color: '#fff',
        fontSize: 16,
        fontWeight: "500"
    },
    statusbar: {
        backgroundColor: '#f2f2f2',
    }
});

module.exports = StatusBar;