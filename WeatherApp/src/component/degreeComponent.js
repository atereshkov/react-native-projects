import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    View
} from 'react-native';

class DegreeComponent extends React.Component {
    render() {
        return (
            <View style={[styles.degree, this.props.style]}/>
        );
    }
}

const styles = StyleSheet.create({
    degree: {
        borderColor: 'black',
        backgroundColor: 'transparent',
        borderWidth: 1
    }
});

module.exports = DegreeComponent;