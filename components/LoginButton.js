import React, { Component } from 'react';
import { Text, TouchableOpacity } from 'react-native';
import validate from '../validation/validations.js';
import config from '../config/settings.js';
import popToast from './Toast.js';
import { AsyncStorage } from 'react-native';
export class LoginButton extends Component {
  login(username, password) {
    fetch(config.serverUrl + '/users/authenticate', {
      method: 'POST',
      body: JSON.stringify({
        "username": username,
        "password": password
      }),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }).then((response) => {
      console.log(response);
      response.json().then((JSON_Obj) => {
        if (JSON_Obj.success) {
          popToast('You are authenticated!');
          console.log(JSON_Obj);
          this.keepCredentials(JSON_Obj.token, username,JSON_Obj.user.id);
        }
        else
          if (JSON_Obj.message == 'No user found ...') {
            popToast("you doesn't seems to exist in system ");
          }
          else if (JSON_Obj.message == 'Password doesn\'t match ...') {
            popToast("credentials doesn't match!");
          }
          else {
            console.log('unexpected result: ' + JSON_Obj.message);
          }
      });
    });
  }
  onClickListener() {
    const username = this.props.data.username;
    const password = this.props.data.password;
    if (!validate('username', username)) {
      console.log('invalid input format...');
      this.props.reset();
    } else {
      this.login(username, password);
    }

  }
  keepCredentials(token, username ,userID) {
    var isCredentialsAvailable;
    AsyncStorage.getItem('username', (error, result) => {
      if (result == username)
        isCredentialsAvailable = true;
      else
        isCredentialsAvailable = false;
    }).then(
      //execute after boolean is updated....
      () => {
       // if (!isCredentialsAvailable)//keep only if not exist or user changed
          AsyncStorage.multiSet([['token',token],['username',username],['userID',userID]]).then(()=>{
            console.log('successfully stored to storage')
          }).then(()=>{
            this.props.navigator.navigate('Marks');//move to next screen...s  
          });
      }
    )
  }
  render() {
    const styles = this.props.style;
    return (
      <TouchableOpacity style={[styles.buttonContainer, styles.loginButton]} onPress={() => this.onClickListener('login')}>
        <Text style={styles.loginText}>Login</Text>
      </TouchableOpacity>
    )
  }
}