import React, { Component } from 'react';
import { TableColoumn } from './TableColoumn';
import { AsyncStorage, ScrollView, View } from 'react-native';
export class MarksTable extends Component {
    Name = [];
    Written = [];
    practical = [];
    assignment = [];
    total = [];
    baseID = "";
    getStudentBaseId() {
        fetch(config.serverUrl + '/marks/student/' + '975674321v',
            {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': authKey
                }
            }).then((response) => {
                response.json().then((JSONObj) => {
                    console.log(JSONObj);
                });
            });
    }
    loadData(authKey) {
        console.log('key ' + authKey);
        fetch(config.serverUrl + '/marks/student/' + this.baseID,
            {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': authKey
                }
            }).then((response) => {
                response.json().then((JSONObj) => {
                    for (let index = 0; index < JSONObj.length; index++) {
                        console.log(JSONObj[index]);
                        this.Name.push(JSONObj[index].subject_id.subject_name);
                        this.Written.push(JSONObj[index].result.paper);
                        this.practical.push(JSONObj[index].result.practical);
                        this.total.push(JSONObj[index].total);
                    }
                    this.forceUpdate();
                });
            });
    }
    componentWillMount = () => {
        console.log('loading...');
        AsyncStorage.getItem('token').then((token) => {
            this.loadData(token);
        })
    }
    render() {
        return (
            <ScrollView>
                <View style={{ flex: 1, flexDirection: 'row', alignSelf: 'flex-start' }} >
                    <TableColoumn data={this.Name} index={0} />
                    <TableColoumn data={this.Written} index={1} />
                    <TableColoumn data={this.practical} index={2} />
                    <TableColoumn data={this.assignment} index={3} />
                    <TableColoumn data={this.total} index={4} />
                </View>
            </ScrollView>
        );
    }
}