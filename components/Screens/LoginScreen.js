import React, { Component } from 'react';
import { View,Text, TouchableOpacity } from 'react-native';
import { Email } from '../Email.js';
import { Password } from '../Password.js';
import { LoginButton } from "../LoginButton.js";
import styles from "../../styles/styles.js";
export default class LoginScreen extends Component {
    constructor(props) {
        super(props);
        this.handleTextChange = this.handleTextChange.bind(this);
        this.reset = this.reset.bind(this);
    }
    
    handleTextChange(fieldId, value) {
        this.setState({ [fieldId]: value });
    }
    reset() {
        console.log('clearing text...');
        this.refs.username.reset();
        this.refs.password.reset();
    }
    render() {
        return (
            <View style={styles.container} >
                <Email style={styles} onChange={this.handleTextChange} ref='username' />
                <Password style={styles} onChange={this.handleTextChange} ref='password' />
                <LoginButton style={styles} data={this.state} reset={this.reset} navigator={this.props.navigation}/>
            </View>
        );
    }
}