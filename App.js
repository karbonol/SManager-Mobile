/**
 * Sample React Native App
 * https://github.com/facebook/react-native

 * @format
 * @flow
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import React, { Component } from 'react';
import { Platform,} from 'react-native';
import { createStackNavigator,createAppContainer,DrawerNavigator} from 'react-navigation';
import LoginScreen from './components/Screens/LoginScreen';
import MarkScreen from './components/Screens/MarkScreen';
import ChatScreen from './components/Screens/ChatScreen';
import SideBar from './components/SideBar/sideBar';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});
const AppNavigator = DrawerNavigator({
  Login: { screen: LoginScreen,
    navigationOptions:{drawerLockMode: 'locked-closed'}
  },
  Marks: { screen: MarkScreen },
  Chat: { screen: ChatScreen }
},
{
  initialRouteName: 'Login',
  drawerOpenRoute: 'DrawerOpen',
  drawerCloseRoute: 'DrawerClose',
  drawerToggleRoute: 'DrawerToggle',
  contentComponent:SideBar,
  drawerWidth: 300
});
class App extends Component{
  render(){
    return (<AppNavigator />)
  }
}
//const App = createAppContainer(AppNavigator);
//type Props = {};
export default App;

