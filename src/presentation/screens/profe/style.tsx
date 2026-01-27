import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    height:'100%',
    borderWidth:1,
    marginLeft:1,
    width:'100%',
    padding: 20,
    backgroundColor: '#ffffffff',
  },
  containerHeader: {
    height:'10%',
    width:'100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems:'center',
  },
  TxtBtn: {
    color: 'white'
  },
  ButtonClear: {
    backgroundColor: '#ee4444',
    width: '50%',
    marginRight: 15,
    borderRadius: 25,
    alignContent: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center'

  },
  ButtonSave: {
    backgroundColor: '#31b673',
    width: '50%',
    marginRight: 15,
    borderRadius: 25,
    alignContent: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center'

  },
  ContainerBtnFoot: {
    borderWidth:0, 
    flexDirection: 'row',
    justifyContent: 'center',
    height: 40,
    marginTop: 10,
    marginHorizontal: 10,
    paddingHorizontal: 20
  },
  header: {

    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#1C495E',
  },
  searchInput: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 2,
    borderRadius: 8,
    paddingLeft: 10,
    marginBottom: 15,
    backgroundColor: '#FFF',
    color: '#333',
    fontFamily:'Quicksand-Bold',
  },
  daySelector: {
    flexDirection: 'row',
    height: 50,
    justifyContent: 'center',
  },
  dayButton: {
    height: 30,
    width: 90,
    textAlign: 'center',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    borderWidth:1,
    borderColor: '#c2bf15ff',
    borderRadius: 8,
    marginHorizontal: 5,
  },
  selectedDayButton: {
    backgroundColor: '#5a215e',
    height: 30,
    width: 90,
  },
  dayText: {
    color: '#c2bf15ff',
    fontFamily:'Quicksand-Bold',
    fontSize: 15,
  },
  selectedDayText: {
    fontFamily:'Quicksand-Bold',
    fontSize: 15,
    color: '#FFF',
  },
  card: {
    justifyContent: 'flex-start',
    alignContent: 'flex-start',
    backgroundColor: '#fff',
    borderRadius: 20,
    elevation: 3,
    shadowColor: '#000', 
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    marginBottom: 10,
    padding: 10,
  },
  studentName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333'
  },
  studentEmail: {
    fontSize: 14,
    color: 'gray',
  },
  attendanceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  attendanceText: {
    fontSize: 16,
    marginRight: 10,
    color: '#5a215e',
  },
  noStudentsText: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 10,
    color: 'gray',
  },
});

export default styles