import React, { Component } from 'react';
import { View,Text,FlatList,TextInput,Image,TouchableOpacity,Linking,AsyncStorage } from 'react-native';
import chatStyles from "../../styles/chatStyles.js";
import SocketIOClient from 'socket.io-client';
import Dialog,{ DialogButton,SlideAnimation,DialogFooter,DialogContent,DialogTitle } from "react-native-popup-dialog";
export default class ChatScreen extends Component {

        messageStack=[];
        connectionLink="";
        selfID;
        setUpConnectionLink(mode){
            if(this.socket!=undefined)
                this.socket.emit('disconnect');
            if(mode)
                this.connectionLink="https://s-manager.herokuapp.com/lecChat";
            else
                this.connectionLink='https://s-manager.herokuapp.com';
            this.setState({dialogVisible:false});
            this.initializeSocket();
        }
        componentWillUnmount(){
            this.socket.emit('disconnect')
        }
        initializeSocket(){
            console.log(this.connectionLink);
            this.socket=new SocketIOClient(this.connectionLink);
            //this.socket.emit('set username', 'Nishain');
            this.socket.on('join',(selfDetails)=>{
               // this.selfID = selfDetails.socket_id;
               console.log(selfDetails);
                AsyncStorage.getItem('username').then((name)=>{
                    console.log(name);
                    this.socket.emit('set username',{username:name});
                });
            });
            
            this.socket.on('chat',(response)=>{
                this.messageStack.push({message:response.message,isSelf:response.id==this.socket.id});
                this.setState({ 
                    'messages':this.messageStack
                 });
            });
            this.socket.on('typing',(who)=>{
                if(!this.state.isTyping)
                this.setState({ 
                    'isTyping':true
                 });
            });
            /* this.socket.on('user connected',(data)=>{
                console.log('someone joined');
                console.log(data);
            }); */
            this.socket.on('typingFinished',(stranger)=>{
                if(this.state.isTyping)
                this.setState({ 
                    'who':stranger.username,
                    'isTyping':false
                 });
            });
    }    
    constructor(props){
        super(props);
        this.state={
            'messages':[],
            'dialogVisible':false
        }
    }
    componentWillMount=()=>{
        this.setState({dialogVisible:true})
    }
    HandleURL(messageWithLink){
        if(messageWithLink==null)
        return null;
        return messageWithLink.split(' ').map((word) => {
                if(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/.test(word))
                    return <><Text onPress={()=>{Linking.openURL(word)}} style={{textDecorationLine:'underline',textDecorationColor:'red'}}>{word}</Text> </>;
                else
                    return <>{word} </>;
        });
    }
    sendMessage(){
        this.socket.emit('chat',this.chatInput);
    }
    render(){
        return (
        <View style={chatStyles.container}>
         <Dialog   
            width={0.9}
            dialogTitle={<DialogTitle title='Choose conversation mode'/>}
            onHardwareBackPress={()=>{this.setState({dialogVisible:false})}}
            visible={this.state.dialogVisible} 
            dialogAnimation={new SlideAnimation({
                slideFrom:'top'
            })}
            footer={
                <DialogFooter>
                    <DialogButton  text="Common Chat Room" textStyle={{color:'black',textAlign:'center'}} onPress={()=>{this.setUpConnectionLink(false);}}/>
                    <DialogButton text="Attend Lecture" textStyle={{color:'black'}} onPress={()=>{this.setUpConnectionLink(true);}}/>
                </DialogFooter>
            }
            >
               <DialogContent><Text style={{textAlign:'justify'}}>Select an option - either join chat with other students or attend Q and A with a scolar! in a lecture session.</Text></DialogContent> 
            </Dialog>
        <FlatList style={chatStyles.list} data={this.state.messages}
        extraData={this.state}
        keyExtractor={(item, index) => index.toString()}    
        renderItem={({item,index})=>{
            return (<View style={ [item.isSelf?{alignSelf:"flex-end"}:{alignSelf:"flex-start"},{flexDirection:"row"}]}>
            {this.state.isTyping && item.isSelf && index==(this.messageStack.length-1)?<Text style={chatStyles.userStatus}>{this.state.who} Typing</Text>:null}
            <View style={[chatStyles.item,item.isSelf?chatStyles.itemIn:chatStyles.itemOut]} key={index}>
                <View style={[chatStyles.balloon]}>
                    <Text style={item.isSelf?{color:'#FFFFFF'}:{color:'#000000'}}>{this.HandleURL(item.message)}</Text>
                </View>
            </View>
            {this.state.isTyping && !item.isSelf && index==(this.messageStack.length-1)?<Text style={chatStyles.userStatus}>{this.state.who} Typing</Text>:null}
            </View>)
        }} />
            <View style={chatStyles.footer}>
          <View style={chatStyles.inputContainer}>
            <TextInput style={chatStyles.inputs}
                onChangeText={(text)=>{this.chatInput=text}}
                placeholder="Write a message..."
                underlineColorAndroid='transparent'/>
          </View>
            <TouchableOpacity style={chatStyles.btnSend} onPress={this.sendMessage.bind(this)}>
              <Image source={{uri:"https://png.icons8.com/small/75/ffffff/filled-sent.png"}} style={chatStyles.iconSend}  />
            </TouchableOpacity>
        </View>
        </View>
        );
    }
}