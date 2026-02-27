import React, { useRef, useEffect } from 'react';
import { Text, View, Linking, Image, Animated, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { globalStyles } from '../../../config/theme/Theme';
import styles from './styles';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const Plans = () => {
  const insets = useSafeAreaInsets();
  const handlePress = () => {
    Linking.openURL('https://drive.google.com/file/d/17MqhZd8pY9pn3_GyyW6Apx9aXKdxHDjH/view');
  };
  const scaleAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(scaleAnim, {
          toValue: 0.9,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, [scaleAnim])
  return (
    <View style={globalStyles.mainContainer}>
      <View style={[globalStyles.header2, { paddingTop: insets.top }]}>
        <Text maxFontSizeMultiplier={1} style={styles.title2}>Plan Ilimitado</Text>
      </View>

      <ScrollView style={styles.globalMargin} contentContainerStyle={styles.scrollContent}>
        <View style={styles.cardTop}>
          <View style={styles.overlay}>
            <Image style={styles.logo} source={require('../../assets/Logo1.png')} resizeMode="contain" />
          </View>
          <View style={styles.cardtextTop}>
            <Text maxFontSizeMultiplier={1} style={styles.description}>
              ¡Bienvenido al plan ilimitado! Este plan está diseñado para quienes desean sumergirse completamente en la práctica y disfrutar de una experiencia transformadora.
            </Text>
          </View>
        </View>
        <View style={styles.cardTop}>
          <View style={styles.cardtextTop}>

            <SectionTitle title="¿Qué incluye este plan?" />
            <ListItem text="Acceso ilimitado a todas las clases." />
            <ListItem text="Flexibilidad de horarios." />
            <ListItem text="Instrucción profesional y personalizada." />
            <SectionTitle title="¿Por qué elegir nuestro plan ilimitado?" />
            <ListItem text="Transformación integral." />
            <ListItem text="Experimenta los beneficios del yoga." />
            <ListItem text="Inversión en tu bienestar." />
          </View>
        </View>
        <View style={styles.cardbottom}>
          <View style={styles.cardtextPrice}>
            <Text maxFontSizeMultiplier={1} style={styles.price}>PAGO EN EFECTIVO</Text>
            <Text maxFontSizeMultiplier={1} style={styles.price}>$220.000</Text>
          </View>
        </View>
        <View style={styles.cardbottom}>
          <View style={styles.cardtextPrice}>
            <Text maxFontSizeMultiplier={1} style={styles.price}>TRANSFERENCIA</Text>
            <Text maxFontSizeMultiplier={1} style={styles.price}>$235.000</Text>
          </View>
        </View>
        <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
          <TouchableOpacity style={styles.paymentContainer} onPress={handlePress} activeOpacity={0.7}>
            <Text maxFontSizeMultiplier={1} style={styles.paymentText}>MEDIOS DE PAGO</Text>
          </TouchableOpacity>
        </Animated.View>
      </ScrollView>
    </View>
  );
};

// 🔹 Componente reutilizable para los títulos de sección
const SectionTitle = ({ title }: { title: string }) => (
  <Text maxFontSizeMultiplier={1} style={styles.subtitle}>{title}</Text>
);

// 🔹 Componente reutilizable para los elementos de la lista
const ListItem = ({ text }: { text: string }) => (
  <Text maxFontSizeMultiplier={1} style={styles.listItem}>• {text}</Text>
);



export default Plans;
