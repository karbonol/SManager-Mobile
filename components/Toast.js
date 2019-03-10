import Toast from 'react-native-root-toast';
export default function popToast(message){
    Toast.show(message,{
      duration:Toast.durations.SHORT,
      backgroundColor:'#30353b',
      animation:true,
    });
  }