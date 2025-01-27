import React, { Component } from 'react'
import { Svg, Rect } from 'react-native-svg';
import { Text, View, SafeAreaView, StyleSheet, Image } from 'react-native'
import { globalStyles } from '../../../config/theme/Theme'
import ClassSchedule from '../../components/ui/Horario';
import { ScrollView } from 'react-native-gesture-handler';
import Footer from "../../components/ui/Foot";


export const Class = () => {

  return (
    <SafeAreaView style={globalStyles.mainContainer}>

      <View style={style.globalMargin}>
        <Image style={style.imageBoton} source={require("../../assets/Top.png")} />

        <ScrollView>
          <ClassSchedule />
          <Footer />
        </ScrollView>

      </View>

    </SafeAreaView>
  )

}

const style = StyleSheet.create({
  globalMargin: {

    width: "100%",
    alignContent: 'flex-start',
    alignItems: 'center',
    justifyContent: 'flex-start',
    flex: 1,
    flexDirection: 'column',

  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',

    marginBottom: 10,

  },
  imageBoton: {
    height: 150,
    width: 150
  }
})
