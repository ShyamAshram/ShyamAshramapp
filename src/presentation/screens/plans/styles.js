import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    mainContainer: {
      flex: 1,
      
      backgroundColor: '#FFF',
    },
    globalMargin: {
      paddingHorizontal: 16,
    },
    scrollContent: {
      paddingBottom: 100,
    },
    title2: {
      fontSize: 20,
      fontWeight: 'bold',
      color: 'white',
      textAlign: 'center',
    },
    overlay: {
      backgroundColor:'#fff',
      shadowColor: "#000",
      shadowOffset: { width: 2, height: 2 },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
      alignItems: 'center',
      alignContent:'center',
      justifyContent:'center',
      borderRadius:100,
      marginVertical: 10,
      width:60,
      height:60,
    },
    logo: {
      width: 100,
      height: 100,
    },
    price: {
      fontSize: 16,
      fontWeight: 'bold',
      textAlign: 'center',
      color: '#fff'
    },
    description: {
      fontSize: 14,
      marginBottom: 10,
      textAlign: 'center',
      color: '#1C495E',
    },
    cardtextTop:{
      marginLeft: 10,
      width: '80%'
    },
    cardtextPrice:{
      marginLeft: 10,
      justifyContent:'space-around',
      alignContent:'center',
      alignItems:'center',
      flexDirection:'row',
      width: '80%'
    },
    cardTop:{
      marginTop:20,
      flexDirection: 'row', 
      width: '100%',
      padding:10,
      backgroundColor:'#fff',
      shadowColor: "#000",
      shadowOffset: { width: 2, height: 2 },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
    },
    cardbottom:{
      marginTop:20,
      flexDirection: 'row',
      borderRadius:50,
      width: '100%',
      height:'6%',
      backgroundColor:'#5a615e',
      shadowColor: "#000",
      shadowOffset: { width: 2, height: 2 },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
    },
    subtitle: {
      fontSize: 15,
      fontWeight: 'bold',
      marginVertical: 8,
      textAlign:'center',
      color: '#D9A404',
    },
    listItem: {
      fontSize: 16,
      marginBottom: 6,
      marginLeft: 16,
      color: '#1C495E',
    },
    paymentContainer: {
      height:60,
      alignContent:'center',
      justifyContent:'center',
      alignItems:'center',
      backgroundColor:'#5a215e',
      borderRadius:50,
      alignItems: 'center',
      marginTop: 20,
    },
    qr: {
      width: 120,
      height: 120,
    },
    paymentText: {
      fontSize: 18,
      textAlign:'center',
      color: '#fff',
      marginTop: 8,
      fontWeight: 'bold',
    },
  });

  export default styles;