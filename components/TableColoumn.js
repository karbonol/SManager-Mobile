import React, { Component } from 'react';
import { View, Text } from "react-native";
var cellStyle = { backgroundColor: 'white', alignSelf: 'flex-start',width:100}
export class TableColoumn extends Component {
    render() {
        const fontcolor = (this.props.index % 2 == 0 ? 'black' : 'whiadbte');
        const bg = (this.props.index % 2 == 0 ? '#f1f1f1' : '#393939');
        const bg2 = (this.props.index % 2 == 0 ? 'white' : '#222');
        var coloumn=[];
        let x=0;
        let label='Name';
        switch (this.props.index) {
            case 1:label='written'
                break;
            case 2:label='practrical'
                break;
            case 3:label='assignment'
                break;
            case 4:label='Total'
                break;
        }
        coloumn.push(
            <View style={[cellStyle, { backgroundColor: (x%2==0)?bg:bg2}]} >
                <Text style={{ color: fontcolor }}>{label}</Text>
            </View>
        );
        this.props.data.forEach(cell => {
            coloumn.push(
                <View key={x} style={[cellStyle, { backgroundColor: (x%2==0)?bg:bg2,width:150 }]} >
                    <Text key={x} style={{ color: fontcolor }}>{cell}</Text>
                </View>
            );
            x++;
        });
        return (
            <View style={{ flex: 1, flexDirection: 'column' }} >
                {coloumn}
            </View>
        );
    }
}