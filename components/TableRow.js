import React, { Component } from 'react';
import { View, Text } from "react-native";
import { ScrollView } from 'react-native-gesture-handler';
var cellStyle = { backgroundColor: 'white', alignSelf: 'flex-start',width:100}
export class TableRow extends Component {
    constructor(props){
        super(props);
        
    }
    render() {
        var cellStyle={backgroundColor:'#dde4e7',paddingHorizontal:5,width:70};
        if(this.props.isHeader){
            cellStyle.backgroundColor='#222222';
            cellStyle['color']='white';
        }
        return (
            <ScrollView horizontal style={{ flex: 1, flexDirection: 'row',borderColor:'#222222',borderWidth:0,borderBottomWidth:1}} >
                <Text style={{width:200,paddingHorizontal:15,backgroundColor:'#37474f',color:'white'}}>{this.props.info.subject}</Text>
                <Text style={cellStyle}>{this.props.info.written}</Text>
                <Text style={cellStyle}>{this.props.info.practical}</Text>
                <Text style={cellStyle}>{this.props.info.assignment}</Text>
                <Text style={cellStyle}>{this.props.info.total}</Text>
            </ScrollView>
        );
    }
}