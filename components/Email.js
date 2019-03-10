import React, { Component } from 'react';
import { Image, TextInput, View } from 'react-native';

export class Email extends Component {
    onTextChange(text) {
        this.setState({ 'username': text });
        this.props.onChange('username', text)
    }
    reset() {
        this.username.clear();
    }
    render() {
        const styles = this.props.style;
        return (
            <View style={styles.inputContainer}>
                <Image style={styles.inputIcon} source={{ uri: 'https://png.icons8.com/message/ultraviolet/50/3498db' }} />
                <TextInput style={styles.inputs}
                    placeholder="Email"
                    keyboardType="email-address"
                    underlineColorAndroid='transparent'
                    ref={component => { this.username = component }}
                    /*intitalize username as base component*/
                    onChangeText={(text) => this.onTextChange(text)} />
            </View>
        )
    }

}