'use strict';

import React, {Component} from "react";
import {ListView, StyleSheet, Text, View, TouchableHighlight, Alert} from "react-native";
import Prompt from "react-native-prompt";
import firebase from "firebase";
import StatusBar from "./components/StatusBar";
import ActionButton from "./components/ActionButton";
import ListItem from "./components/ListItem";
import styles from "./styles.js";

// Initialize Firebase
// You should create new app on https://console.firebase.google.com/ add put your own configs
const firebaseConfig = {
    apiKey: "AIzaSyDTe8Jl5RnrN4F_wxo_h1npDGT6Tjl27ZQ",
    authDomain: "rntest-21ee1.firebaseapp.com",
    databaseURL: "https://rntest-21ee1.firebaseio.com",
    storageBucket: "rntest-21ee1.appspot.com",
    messagingSenderId: "277431460614"
};
const firebaseApp = firebase.initializeApp(firebaseConfig);

class FirebaseReactNativeSample extends Component {

    constructor(props) {
        super(props);
        this.state = {
            dataSource: new ListView.DataSource({
                rowHasChanged: (row1, row2) => row1 !== row2,
            }),
            promptVisible: false,
        };
        this.itemsRef = this.getRef().child('items');
    }

    getRef() {
        return firebaseApp.database().ref();
    }

    listenForItems(itemsRef) {
        itemsRef.on('value', (snap) => {

            // get children as an array
            var items = [];
            snap.forEach((child) => {
                items.push({
                    title: child.val().title,
                    _key: child.key
                });
            });

            this.setState({
                dataSource: this.state.dataSource.cloneWithRows(items)
            });

        });
    }

    componentDidMount() {
        this.listenForItems(this.itemsRef);
    }

    render() {
        return (
            <View style={styles.container}>

                <StatusBar title="Todo list"/>

                <ListView
                    dataSource={this.state.dataSource}
                    renderRow={this._renderItem.bind(this)}
                    enableEmptySections={true}
                    style={styles.listview}/>

                <ActionButton onPress={ () => {
                    this.setState({
                        promptVisible: true,
                    });
                }} title="Add"/>

                <Prompt
                    title="Add New Item"
                    submitText="Add"
                    visible={ this.state.promptVisible }
                    onCancel={ () => {
                        console.log('Cancel Pressed');
                        this.setState({
                            promptVisible: false,
                        });
                    }}
                    onSubmit={ (value) => {
                        this._addItem(value);
                        this.setState({
                            promptVisible: false,
                        });
                    }}
                />

            </View>
        )
    }

    _addItem(text) {
        console.log(`Add New Item: ${text}`);
        if (text) {
            this.itemsRef.push({title: text});
        }
    }

    _renderItem(item) {

        const onPress = () => {
            Alert.alert(
                'Complete',
                null,
                [
                    {text: 'Complete', onPress: (text) => this.itemsRef.child(item._key).remove()},
                    {text: 'Cancel', onPress: (text) => console.log('Cancelled')}
                ]
            );
        };

        return (
            <ListItem item={item} onPress={onPress}/>
        );
    }

}

module.exports = FirebaseReactNativeSample;