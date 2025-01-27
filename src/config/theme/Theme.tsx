import { StyleSheet, } from "react-native";

export interface ThemeColors {
  primary: string;
  text: string;
  background: string;
  cardBackground: string;
  buttonTextColor: string;
}

export const colors: ThemeColors = {
  primary: "#5856D6",
  text: "#FFF",

  background: "#FFFF", //*5A215E"//
  cardBackground: "white",
  buttonTextColor: "white",
};

export const globalStyles = StyleSheet.create({
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: colors.text,
    fontFamily: 'Cochin',
  },

  subTitle: {
    fontSize: 30,
    fontWeight: "bold",
    color: colors.text,
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center'

  },

  mainContainer: {
    flex: 1,

    backgroundColor: colors.background,
  },

  mainContainer2: {
    flex: 1,

    backgroundColor: colors.background,
  },
  globalMargin: {
    paddingHorizontal: 10,
    flex: 1,
    flexDirection: 'column',
    marginBottom: 1,
  },

  btnPrimary: {
    backgroundColor: colors.primary,
    borderRadius: 10,
    padding: 10,
    alignItems: "center",
  },
  btnPrimaryText: {
    color: colors.text,
    fontSize: 16,
  },
  container: {
    flex: 1,
    backgroundColor: '#5a215e',
    position: 'relative',
  },

  header: {
    flexDirection: 'row',
    alignItems: 'baseline',
    height: 90,
    justifyContent: 'space-between',
    backgroundColor: '#5a215e'


  },
  header2: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 60,
    justifyContent: 'center',
    backgroundColor: '#5a215e'
  },
  profileImageContainer: {
    width: 50,
    height: 50,



  },
  profileImage: {
    width: '100%',
    height: '100%',
    marginTop: 30,
    marginLeft: 2

  },
  SetProfileImageContainer: {
    flexDirection: 'column',
    marginBottom: 40,
    width: "100%",
    justifyContent: "flex-start",
    alignItems: "center"

  },
  SetProfile: {
    width: "40%",
    height: "50%",
    borderRadius: 100,
    marginTop: 50
  },
  setText: {
    marginTop: 20,
    fontWeight: 'bold',
    color: '#11688C',
    fontSize: 40,
  },
  setContienerMid: {
    width: "100%",

    flexDirection: 'column',

  },
  progText: {
    width: '100%',
    flexDirection: 'row'
  },
  SetButtons: {
    width: "100%",
    height: "10%",
    flexDirection: "row",
    marginTop: 20,

    justifyContent: 'flex-start'



  },
  SetcontainerIcon: {
    width: '20%',
    height: '100%',
    padding: 5,
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',

  },
  SetTextPlan: {
    textAlign: 'center',
    color: '#2c1d1d',
    fontSize: 20,
    fontWeight: 'bold',

    position: 'relative',
  },
  greeting: {
    position: 'relative',
    fontSize: 40,
    color: '#FFF',
    right: 40,
    fontFamily: 'Arial',
  },
  buttonOver: {
    marginTop: 10,
    width: 90,
    padding: 6,
    borderRadius: 20,
    backgroundColor: '#1e90ff',
    marginBottom: 10,
    alignContent: 'space-between',
    position: 'relative',
  },

  progressContainer: {
    width: '100%',
    flex: 1,
    padding: 25,
    justifyContent: 'flex-start',
    borderRadius: 15,
    backgroundColor: '#333',
    marginBottom: 10,
    alignContent: 'flex-start',
  },
  shadowProp: {
    shadowColor: 'black',
    shadowOffset: { width: 2, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 5,
  },
  progressText: {
    color: '#FFF',
    fontSize: 16,
    padding: 5
  },
  progressBar: {
    width: 200,
    height: 10,
    backgroundColor: '#FFF',
  },

  containerEnd: {
    flexDirection: 'row',
    width: '90%',
    justifyContent: 'space-around',
    left: 20,
    marginTop: 10,
  },
  intoEnd: {
    flexDirection: 'row',
    width: '100%',
    height: '100%',
    flex: 1,

  },

  containerIcons: {
    width: '45%',
    height: '100%',
    padding: 5,
    margin: '2%',
    alignItems: 'center',
    position: 'relative',
    borderRadius: 10,
    backgroundColor: '#1e90ff',


  },
  containerIconsA: {
    width: '45%',
    height: '100%',
    padding: 5,
    position: 'relative',
    alignItems: 'center',
    margin: '2%',
    borderRadius: 10,
    backgroundColor: '#7fff62',
    flex: 1,
  },
  containerText: {
    width: 100,
  },
  optionText: {
    color: '#FFF',
    fontSize: 15,
    fontFamily: 'Times New Roman',
    textAlign: 'left',
  },
  planText: {
    color: '#FFF',
    fontSize: 14,
    fontFamily: 'Times New Roman',
    textAlign: 'center',
  },
  notification: {
    backgroundColor: 'purple',
    padding: 8,
    borderRadius: 8,
    marginTop: 16,
  },
  notificationText: {
    color: 'white',
    textAlign: 'center',
  },

  containermid: {
    width: '98%',

    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    alignContent: 'center',


  },
  wave: {
    width: '100%',
    height: '100%',
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center'

  },

  logo: {
    width: 500,
    height: 390,
    position: 'relative',

    justifyContent: 'center',
    alignItems: 'center',
  },

  bottomButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',

  },
  button: {
    backgroundColor: '#5A215E',
    width: '80%',
    height: '100%',
    padding: 10,
    borderRadius: 10,
    position: 'relative'
  },

  buttonText: {
    color: '#FFFF',
    fontSize: 18,
    textAlign: 'center',

  },
  containerbotonesmid: {
    width: '50%',
    margin: 5,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 70,
    alignContent: 'center',
    borderRadius: 20,
  },
  imageBoton: {
    width: '100%',
    height: '100%',
    borderRadius: 20,
    opacity: 0.9,



  },
  buttonsPlans: {
    flexDirection: 'column',
    direction: 'inherit',
    width: '100%',
    justifyContent: 'flex-start',
    alignItems: 'center',
    position: 'relative',



  },
  textPlan: {
    color: '#FFF',
    fontSize: 30,
    fontWeight: 'bold',
    fontFamily: 'Times New Roman',
    textAlign: 'center',
    justifyContent: 'center',
    position: 'absolute',

  },
  containerplans: {
    width: '100%',
    height: 80,
    marginBottom: 10,
    borderRadius: 20,
    flex: 1,
    position: 'relative',


  },


  menu: {
    flexDirection: 'column',
    position: 'relative',




  },
});