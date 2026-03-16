import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    modalOverlay:{
      flex:1,
      backgroundColor:'rgba(0,0,0,0.5)',
      justifyContent:'center',
      alignItems:'center'
    },

    modalContent:{
      width:'85%',
      backgroundColor:'#fff',
      borderRadius:15,
      padding:20
    },

    modalTitle:{
      fontSize:14,
      textAlign:'center',
      fontFamily:'Quicksand-Bold',
      borderBottomWidth:1
    },

    paymentOption:{
      flexDirection:'row',
      gap:8,
      borderRadius:20,
      padding:10,
      borderWidth:1,
      borderColor:'#eee'
    },
    textselection:{
      fontSize:13,
      fontFamily:'Quicksand-Regular',
      fontWeight:'200',
      color:'#000'
    }
  });

  export default styles;