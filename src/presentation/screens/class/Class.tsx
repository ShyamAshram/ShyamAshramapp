import React, { Component } from 'react'
import { Svg, Rect } from 'react-native-svg';
import { Text, View, SafeAreaView, StyleSheet, Image } from 'react-native'
import { globalStyles } from '../../../config/theme/Theme'
import ClassSchedule from '../../components/ui/Horario';
import { ScrollView } from 'react-native-gesture-handler';
import Footer from "../../components/ui/Foot";
import Logo from '../../assets/logo.svg';
import { useSafeAreaInsets } from 'react-native-safe-area-context';


export const Class = () => {
  const insets = useSafeAreaInsets()

  return (
    <View style={globalStyles.mainContainer}>

        <View style={{ borderWidth:0, height:120, alignItems: 'center', justifyContent: 'center', paddingTop:insets.top}}>
            <Logo width={150} height={100}/>
        </View>
        <View style={{borderWidth:0, height:'65%', width:'100%', alignItems: 'center', justifyContent: 'center', marginBottom: 20 }}>
          <ClassSchedule />
        </View>
        <View style={{ alignItems: 'center', justifyContent: 'center', paddingBottom: insets.bottom }}>
          <Footer />
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
