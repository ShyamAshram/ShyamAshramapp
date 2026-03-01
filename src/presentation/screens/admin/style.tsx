import { StyleSheet } from "react-native";


const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: '#FFF',

  },

  row:{
    flexDirection:'row',
    width:'100%',
    height:'15%',
    justifyContent:'center',
    alignSelf:'center',
    alignItems:'center',
    marginBottom:10,
    gap:10,
  },
  button: {
    elevation:10,
    shadowColor:'#000',
    shadowOpacity:0.35,
    shadowOffset:{width:0, height:1},
    width: '45%',
    height:'100%',
    justifyContent:'center',
    alignItems:'center',
    borderWidth:4,
    borderColor: '#5a215e',
    backgroundColor:'#FFF',
    paddingVertical: 10,
    borderRadius: 15,
    opacity: 1,
  },

  button2: {
    elevation:10,
    shadowColor:'#000',
    shadowOpacity:0.35,
    shadowOffset:{width:0, height:1},
    width: '90%',
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: '#1D6F42',
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 15,
    marginBottom: 35,
    opacity: 1,
  },
  buttonText: {
    color: '#11688C',
    width:'auto',
    fontFamily:'Quicksand-Bold',
    fontSize: 16,
    textAlign: 'center',
  },
  buttonText2: {
    color: '#fff',
    width:'auto',
    fontFamily:'Quicksand-Bold',
    fontSize: 16,
    textAlign: 'center',
  },

  errorText: {
    color: 'red',
    fontFamily:'Quicksand-Bold',
    textAlign: 'center',
    marginTop: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title2: {
    fontSize: 23,
    color: 'white',
    fontFamily: 'Quicksand-Bold',
    
  },
  overlay: {

    justifyContent: 'center',
    alignItems: 'center',
    width: '90%',
    height: '40%'

  },
  logo: {
    width: 250,
    height: 250,
    marginBottom: 20,
  },
});

export default styles;