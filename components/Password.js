import React, { Component } from 'react';
import { Text, View, Image, TextInput } from 'react-native';

export class Password extends Component {
      reset() {
            this.password.clear();
      }
      render() {
            const styles = this.props.style;
            return (
                  <View style={styles.inputContainer}>
                        <Image style={styles.inputIcon} source={{ uri: 'https://png.icons8.com/key-2/ultraviolet/50/3498db' }} />
                        <TextInput style={styles.inputs}
                              placeholder="Password"
                              secureTextEntry={true}
                              underlineColorAndroid='transparent'
                              ref={component => { this.password = component }}
                              /*intitalize password as base component*/
                              onChangeText={(text) => this.props.onChange('password', text)} />
                  </View>
            )
      }

}