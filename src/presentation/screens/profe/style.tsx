import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f9f9f9',
  },
  containerHeader: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems:'center',
    alignContent: 'space-evenly'
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
    flexDirection: 'row',
    justifyContent: 'center',
    height: 40,
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
    borderWidth: 1,
    borderRadius: 8,
    paddingLeft: 10,
    marginBottom: 15,
    backgroundColor: '#333',
    color: '#5a215e'
  },
  daySelector: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 5,
    marginBottom: 15,
  },
  dayButton: {
    height: 50,
    width: 90,
    textAlign: 'center',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    backgroundColor: '#D9A404',
    borderRadius: 8,
    marginHorizontal: 5,
  },
  selectedDayButton: {
    backgroundColor: '#530460',
  },
  dayText: {
    color: '#FFF',
    fontSize: 15,
  },
  selectedDayText: {
    fontWeight: 'bold',
    color: '#FFF',
  },
  card: {
    justifyContent: 'flex-start',
    alignContent: 'flex-start',
    backgroundColor: '#fff',
    borderRadius: 8,
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
    marginTop: 0,
    color: 'gray',
  },
});

export default styles