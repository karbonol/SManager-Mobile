import React, { Component } from 'react';
import { View } from "react-native";
import { MarksTable } from '../MarksTable.js';
export default class MarkScreen extends Component {
    render() {
        return (
            <View>
                <MarksTable />
            </View>
        );
    }
}