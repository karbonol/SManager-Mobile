import React from "react";
import {NavigationActions} from 'react-navigation';
import { AppRegistry, Image, StatusBar } from "react-native";
import { Container, Content, Text, List, ListItem } from "native-base";
const routes = ["Home", "Marks", "Chat","Login"];
const menuNames=["Homepage" , "My Marks" , "Text Conversation", "Logout"];
export default class SideBar extends React.Component {
navigateToScreen(route) {
  this.props.navigation.navigate(route);
  if(route=="Login"){
  const resetAction = NavigationActions.reset({
    index: 0,
    actions: [NavigationActions.navigate({routeName: 'List'})],
    key: null,
  });
  this.props.navigation.dispatch(resetAction);
  }
}
  render() {
    return (
      <Container>
        <Content>
          <Image
            source={{
              uri: "https://github.com/GeekyAnts/NativeBase-KitchenSink/raw/react-navigation/img/drawer-cover.png"
            }}
            style={{
              height: 120,
              alignSelf: "stretch",
              justifyContent: "center",
              alignItems: "center"
            }} />
            <Image
              square
              style={{ height: 80, width: 70 }}
              source={{
                uri: "https://github.com/GeekyAnts/NativeBase-KitchenSink/raw/react-navigation/img/logo.png"
              }}
            />
          <List
            dataArray={routes}
            renderRow={(data,sid,index) => {
              return (
                <ListItem
                  button
                  onPress={() => this.navigateToScreen(data)}>
                  <Text>{menuNames[index]}</Text>
                </ListItem>
              );
            }}
          />
        </Content>
      </Container>
    );
  }
}
