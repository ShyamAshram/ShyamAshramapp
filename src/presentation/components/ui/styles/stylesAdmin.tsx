import { StyleSheet } from "react-native";


const stylesAdmin = StyleSheet.create({
  containerAsignacion: {
		flex: 1,
		position:'static',
		padding: 20,
		zIndex:1,
		backgroundColor: '#FFF',
  },
  container: {
    padding: 20,
    backgroundColor: '#FFF',
  },
  searchInput: {
    height: 40,
    padding:10,
    borderColor: 'gray',
    fontFamily:'Quicksand-Bold',
    borderWidth: 1,
    borderRadius: 25,
    paddingHorizontal: 10,
    marginBottom: 10,
    backgroundColor: '#FFF',
    color: '#000'
  },
	userContainerAsignacion: {
    flex:1,
    marginBottom: 20,
    zIndex:-1000000,
		gap:10,
    padding: 20,
    borderRadius: 10,
    backgroundColor: '#ffffff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  userContainer: {
		height:200,
    marginBottom: 20,
    borderRadius: 10,
		padding:10,
    backgroundColor: '#ffffff',
		justifyContent:'space-evenly',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 10,
  },
  header: {
    flexDirection: 'row',
		justifyContent:'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  statusDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 8,
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333333',
  },
  userText: {
    fontSize: 16,
		textAlign:'center',
		fontFamily:'Quicksand-Bold',
    color: '#333333',
    marginBottom: 5,
  },
	userTextEmail: {
    fontSize: 15,
		textAlign:'center',
		fontFamily:'Quicksand-Bold',
    color: '#333',
    marginBottom: 5,
  },
	userTextDias: {
    fontSize: 16,
		textAlign:'center',
		fontFamily:'Quicksand-Bold',
    color: '#333333',
    marginBottom: 5,
  },
  buttonsContainer: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  whatsappButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#25D366',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 15,
    marginRight: 10,
  },
  whatsappButton2: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#D44638',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 15,
    marginRight: 10,
  },
  buttonText: {
    color: '#ffffff',
    textAlign: 'center',
    marginLeft: 10,
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
	  button: {
    marginTop: 10,
    backgroundColor: '#5a215e',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 15,
  },
  button2: {
    marginTop: 10,
    backgroundColor: 'red',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 15,
  },
	    title: {
        fontSize: 24,
        fontFamily:'Quicksand-Bold',
        color: 'white',
        textAlign: 'center',
    },
    loadingText: {
        fontFamily:'Quicksand-Bold',
        color:'#333',
        textAlign: 'center',
        fontSize: 18,
        marginTop: 20,
    },
    sectionHeaderContainer: {
      width:'100%',
      backgroundColor: '#33AB91',
      paddingVertical: 6,
      paddingHorizontal: 15,
      borderRadius: 20,
      justifyContent:'center',
      alignItems:'center',
      alignSelf: 'center',
      marginVertical: 8,
      marginLeft: 10,
    },
    card: {
      backgroundColor: '#fff',
      marginHorizontal: 10,
      marginVertical: 6,
      padding: 15,
      borderRadius: 12,
      shadowColor: '#000',
      shadowOpacity: 0.1,
      shadowOffset: { width: 0, height: 2 },
      shadowRadius: 4,
      elevation: 3,
    },
    cardTitle: {
      fontSize: 16,
      fontWeight: 'bold',
      color: '#333',
      marginBottom: 5,
    },
    cardSubtitle: {
      fontSize: 14,
      fontFamily:'Quicksand-Bold',
      color: '#666',
      lineHeight: 20,
    },
    sectionHeaderText: {
      color: '#fff',
      fontFamily:'Quicksand-Bold',
      fontSize: 14,
    },
    sectionHeader: {
        fontSize: 20,
        fontWeight: 'bold',
        backgroundColor: '#ddd',
        padding: 10,
    },
    listItem: {
      borderWidth:1, 
      padding: 10,

    },
    listText: {
        fontSize: 16,
        color: '#333'
    },
		    exportButton: {
        backgroundColor: '#007bff',
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 25,
        alignSelf: 'center',
        marginBottom: 15,
    },
    exportButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
		badgeName:{ 
			borderWidth:1,
			borderColor:'#5a215e', 
			width:'auto', 
			maxWidth:'100%', 
			justifyContent:'center', 
			alignItems:'center', 
			padding:5, 
			borderRadius:10, 
			backgroundColor:'#f9f9f9'
		},
		badgeEmail:{
			borderWidth:0,
			borderColor:'#5a215e', 
			width:'auto', 
			maxWidth:'70%', 
			justifyContent:'center', 
			alignItems:'center', 
			padding:5, 
			borderRadius:10, 
			backgroundColor:'#f9f9f9'
		},
		badgeEmailActiveU:{
			borderWidth:0,
			borderColor:'#5a215e', 
			width:'auto', 
			maxWidth:'100%', 
			padding:5, 
			borderRadius:10, 
			backgroundColor:'#f9f9f9',
			flexDirection:'row', 
			justifyContent:'flex-start', 
			alignItems:'center', 
			gap:5
		},
		badgePlan:{
			borderWidth:0,
			borderColor:'#5a215e', 
			width:'auto', 
			maxWidth:'30%', 
			justifyContent:'center', 
			alignItems:'center', 
			padding:5, 
			borderRadius:10, 
			backgroundColor:'#f9f9f9'
		},
		badgePlanActiveU:{
			flexDirection:'row', 
			gap:5,
			borderWidth:0,
			borderColor:'#5a215e', 
			width:'auto', 
			justifyContent:'center', 
			alignItems:'center', 
			padding:5, 
			borderRadius:10, 
			backgroundColor:'#f9f9f9'
		},
		badgeDias:{ 
			flexDirection:'row', 
			gap:15, width:'auto', 
			maxWidth:'100%', 
			justifyContent:'center', 
			alignItems:'center', 
			padding:5, 
			borderRadius:10, 
			backgroundColor:'#f9f9f9'
		}

});

export default stylesAdmin;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f0f0f0',
    },
    searchInput: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 25,
        paddingHorizontal: 10,
        marginBottom: 10,
        backgroundColor: 'white',
        color: '#5a215e'
    },

    userContainer: {
        marginBottom: 20,
        padding: 20,
        borderRadius: 10,
        backgroundColor: '#ffffff',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    statusDot: {
        width: 10,
        height: 10,
        borderRadius: 5,
        marginRight: 8,
    },
    userName: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333333',
    },
    userText: {
        fontSize: 16,
        color: '#333333',
        marginBottom: 5,
    },





});
