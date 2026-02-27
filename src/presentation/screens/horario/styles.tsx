import { Dimensions, StyleSheet } from "react-native";

const {width, height} = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    marginTop: 50,
  },
  card: {
    height:150,
    width:'90%',
    marginBottom: 20,
    padding: 10,
  },
  header: {
    color: '#5a215e',
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  label: {
    color: '#1C495E',
    fontSize: 16,
    marginVertical: 5,
    fontWeight: 'bold',
  },
  info: {
    fontSize: 16,
    marginVertical: 5,
    fontWeight: 'bold',
    color: '#FFC71F',
  },
  buttonday: {
    width: '70%',
    borderRadius: 20,
    height: 50,
    backgroundColor: '#D9A404',
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    marginBottom: 30,
  },
  day: {
    fontWeight: 'bold',
    fontSize: 20,
    marginLeft: 10,
    color: '#FFFF',
  },
  noClassesContainer: {
    height:height,
    backgroundColor: '#fff',
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default styles;