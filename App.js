/**
 * Sample React Native App
 * https://github.com/facebook/react-native

 * @format
 * @flow
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import React, { Component } from 'react';
import { Platform,} from 'react-native';
import { createStackNavigator,createAppContainer} from 'react-navigation';
import LoginScreen from './components/Screens/LoginScreen';
import MarkScreen from './components/Screens/MarkScreen';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});
const AppNavigator = createStackNavigator({
  Home: { screen: LoginScreen },
  Marks: {screen: MarkScreen}
});
const App = createAppContainer(AppNavigator);
type Props = {};
export default App;

