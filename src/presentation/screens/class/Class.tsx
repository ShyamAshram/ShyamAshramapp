import React, { Component } from 'react'
import { Svg, Rect } from 'react-native-svg';
import { Text, View, SafeAreaView, StyleSheet, Image } from 'react-native'
import { globalStyles } from '../../../config/theme/Theme'
import ClassSchedule from '../../components/ui/Horario';
import { ScrollView } from 'react-native-gesture-handler';
import Footer from "../../components/ui/Foot";


export const Class = () => {

  return (
    <View style={globalStyles.mainContainer}>

      <View style={style.globalMargin}>
        <View style={{ alignItems: 'center', justifyContent: 'center', marginTop: 10, marginBottom: 10 }}>
          <Image style={style.imageBoton} source={require("../../assets/Top.png")} />
        </View>
        <View style={{borderWidth:0, height:'70%', width:'100%', alignItems: 'center', justifyContent: 'center', marginBottom: 20 }}>
          <ClassSchedule />
        </View>
        <View style={{ alignItems: 'center', justifyContent: 'center', marginBottom: 20 }}>
          <Footer />
        </View>
      </View>

    </View>
  )

}

const style = StyleSheet.create({
  globalMargin: {
    borderWidth:0,
    height: "100%",
    width: "100%",
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',

  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',

    marginBottom: 50,

  },
  imageBoton: {
    borderWidth:0,
    height: 100,
    width: 150
  }
})
