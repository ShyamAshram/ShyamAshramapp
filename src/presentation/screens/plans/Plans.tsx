import React, { Component } from 'react'
import { Add } from '../../icons/Icons';
import { Linking, Text, View, SafeAreaView, Pressable, StyleSheet, Image, TouchableOpacity } from 'react-native'
import { globalStyles } from '../../../config/theme/Theme';
import { useNavigation } from '@react-navigation/native';
import { ScrollView } from 'react-native-gesture-handler';
import { SubTitle, Title } from '../../components/ui/Title';
import ImageSlider from '../../components/ui/Slide';



export const Plans = () => {
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
        <Text style={styles.title2}>Plan Ilimitado</Text>
      </View>
      <ScrollView style={globalStyles.globalMargin}>
        <View style={styles.overlay}>
          <Image style={styles.logo} source={require('../../assets/Logo1.png')} />
        </View>

        <Text style={styles.description}>
          ¡Bienvenido al plan ilimitado! Este plan está diseñado para aquellos que desean sumergirse completamente y disfrutar de una experiencia ilimitada y transformadora.
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

  ini: {
    width: '100%',
    height: '10%',
    backgroundColor: '#5A215E',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    alignContent: 'center'
  },
  title2: {
    fontSize: 28,
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
    marginTop: 16,
    marginBottom: 8,
    color: '#D9A404'
  },
  description: {
    fontSize: 20,
    marginBottom: 8,
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

export default Plans;


