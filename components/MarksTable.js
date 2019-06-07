import React, { Component } from 'react';
import { TableRow } from './TableRow';
import { AsyncStorage, FlatList, View,Text } from 'react-native';
export class MarksTable extends Component {
    Name = [];
    Written = [];
    practical = [];
    assignment = [];
    total = [];
    userbaseID = "";
    studentBaseID=""
    constructor(props) {
        super(props);
        this.state={
            'marksInfo':[]
        }
    }
    getStudentBaseId(authKey) {
        fetch(config.serverUrl + '/manage/student/' + this.userbaseID,
            {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': authKey
                }
            }).then((response) => {
                console.log('actual input');
                console.log(response);
                response.json().then((JSONObj) => {
                    this.studentBaseID = JSONObj.base_no;
                    this.loadData(authKey);
                });
            });
    }
    loadData(authKey) {
        fetch(config.serverUrl + '/marks/student/' + this.studentBaseID,
            {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': authKey
                }
            }).then((response) => {
                console.log(response);
                response.json().then((JSONObj) => {
                    console.log('below');
                    console.log(JSONObj);
                    data=[{subject:'Subject',written:'written',practical:'practical',assignment:'assignment',total:'total'}];
                    for (let index = 0; index < JSONObj.length; index++) {
                        data.push({
                            subject:JSONObj[index].subject_id.subject_name,
                            written:JSONObj[index].result.paper,
                            practical:JSONObj[index].result.practical,
                            assignment:JSONObj[index].result.assignment,
                            total:JSONObj[index].total
                        });
                    }
                    this.setState({'marksInfo':data});
                });
            });
    }
    componentWillMount = () => {
        console.log('loading...');
        AsyncStorage.multiGet(['token','userID']).then((data) => {
            this.userbaseID=data[[data[0][0],data[1][0]].indexOf('userID')][1];
            this.getStudentBaseId(data[[data[0][0],data[1][0]].indexOf('token')][1]);
            /* this.getStudentBaseId(token);
            this.loadData(token); */
        });
    }
    render() {
        console.log('rendering..');
        
        return (
            <View>
            <Text adjustsFontSizeToFit={true}>The Marks Screen</Text>
            <FlatList extraData={this.state}
            keyExtractor={(item, index) => index.toString()}
            data={this.state.marksInfo} 
            renderItem={(item,index)=>
                    <TableRow info={item.item} isHeader={item.index==0}/>
            }  />
        </View>
        );
    }
}