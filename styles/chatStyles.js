import {StyleSheet} from 'react-native';
const chatStyles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent: 'space-between',
      },
      list:{
        
        paddingHorizontal: 17,
        backgroundColor: '#FFFFFF'
      },
      footer:{
        flexDirection: 'row',
        height:60,
        backgroundColor: '#eeeeee',
        paddingHorizontal:10,
        padding:5,
      },
      btnSend:{
        backgroundColor:"#00BFFF",
        width:40,
        height:40,
        borderRadius:360,
        alignItems:'center',
        justifyContent:'center',
      },
      iconSend:{
        width:30,
        height:30,
        alignSelf:'center',
      },
      inputContainer: {
        borderBottomColor: '#F5FCFF',
        backgroundColor: '#FFFFFF',
        borderRadius:30,
        borderBottomWidth: 1,
        height:40,
        flexDirection: 'row',
        alignItems:'center',
        flex:1,
        marginRight:10,
      },
      inputs:{
        height:40,
        marginLeft:16,
        borderBottomColor: '#FFFFFF',
        flex:1,
      },
      balloon: {
        maxWidth: 250,
        padding: 15,
        borderRadius: 20,
      },
      itemIn: {
        backgroundColor:'#2e3359',
        color:'#FFFFFF',
        alignSelf: 'flex-start'
      },
      itemOut:{
        backgroundColor:"#eeeeee",
      },
      userStatus: {
        margin: 15,
        fontSize:12,
        color:"#808080",
      },
      item: {
        marginVertical: 14,
        flex: 0,
        flexDirection: 'row',
        borderRadius:300,
        padding:5,
      }
});
export default chatStyles;