import React, { Component } from 'react'
import { Add } from '../../icons/Icons';
import { Linking, Text, View, Pressable, StyleSheet, SafeAreaView, Image, TouchableOpacity } from 'react-native'
import { globalStyles } from '../../../config/theme/Theme';
import { useNavigation } from '@react-navigation/native';
import { ScrollView } from 'react-native-gesture-handler';
import { SubTitle, Title } from '../../components/ui/Title';
import ImageSlider from '../../components/ui/Slide';
export const Plan2 = () => {
  const navigation = useNavigation<any>()
  const handlePress = () => {
    // URL del sitio web al que quieres redirigir
    const websiteUrl = 'https://www.instagram.com/shyam_ashram/?hl=es';

    // Abre el enlace web en el navegador predeterminado del dispositivo
    Linking.openURL(websiteUrl);
  };
  return (
    <SafeAreaView style={styles.mainContainer}>
      <View style={globalStyles.header2}>
        <Text style={styles.title2}>Plan 2: 4 Clases de Yoga o Taiji (Vigencia un mes)</Text>
      </View>
      <ScrollView style={styles.globalMargin}>
        <View style={styles.overlay}>
          <Image style={styles.logo} source={require('../../assets/Logo1.png')} />
        </View>
        <Text style={styles.description}>
          ¡Bienvenido al plan de 4 clases de yoga o taiji! Este plan te brinda la oportunidad de explorar y experimentar tanto el yoga como el taiji durante un mes completo, con la flexibilidad de elegir la combinación que más te convenga.
        </Text>
        <Text style={styles.subtitle}>¿Qué incluye este plan?</Text>
        <Text style={styles.listItem}>- Acceso ilimitado a todas las clases.</Text>
        <Text style={styles.listItem}>- Flexibilidad de horarios.</Text>
        <Text style={styles.listItem}>- Instrucción profesional y personalizada.</Text>
        <Text style={styles.subtitle}>¿Por qué elegir nuestro plan ilimitado de un mes?</Text>
        <Text style={styles.listItem}>- Transformación integral.</Text>
        <Text style={styles.listItem}>- Experimenta los beneficios del yoga.</Text>
        <Text style={styles.listItem}>- Inversión en tu bienestar.</Text>
        <TouchableOpacity style={styles.containerpago} onPress={handlePress}>
          <Image style={styles.qr} source={require('../../assets/QR.png')} />
          <Text>Link de pago</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  globalMargin: {
    paddingHorizontal: 10,
    flexDirection: 'column',
    marginBottom: 1,
  },

  title2: {
    fontSize: 24,
    fontWeight: "bold",
    color: 'white',
    fontFamily: 'Cochin',
    textAlign: 'center',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center'
  },
  overlay: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '30%'
  },
  logo: {
    width: 250,
    height: 250,
    marginBottom: 5,
  },
  mainContainer: {
    flex: 1,
    height: 'auto',
    backgroundColor: '#FFF'
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
    color: 'white'
  },
  subtitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 8,
    color: '#D9A404'
  },
  description: {
    fontSize: 20,
    marginBottom: 6,
    textAlign: 'justify',
    color: '#1C495E'
  },
  listItem: {
    fontSize: 18,
    marginBottom: 4,
    marginLeft: 16,
    textAlign: 'left',
    color: '#1C495E'
  },
  containerpago: {
    width: '100%',

    alignItems: 'center',


  },
  buttonsPago: {
    padding: 2,
    width: '1%',
  },
  qr: {
    position: 'relative',
    width: '30%',
    height: '40%'
  },
  textPago: {
    color: '#D9A404',
    fontSize: 18,
    fontFamily: 'Times New Roman',
    textAlign: 'left',
  },
})

export default Plan2;