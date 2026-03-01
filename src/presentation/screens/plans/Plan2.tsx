import React, { useRef, useEffect } from 'react';
import { Linking, Text, View, Animated, Image, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { globalStyles } from '../../../config/theme/Theme';
import styles from './styles';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Logo from '../../assets/logo.svg';


const Plan2 = () => {
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
      <View style={[globalStyles.header2, { paddingTop: insets.top, height: 100 }]}>
        <Text maxFontSizeMultiplier={1} style={styles.title2}>4 Clases de Yoga o Taiji (Vigencia un mes)</Text>
      </View>

      <ScrollView style={styles.globalMargin} contentContainerStyle={styles.scrollContent}>
        <View style={styles.cardTop}>
          <View style={styles.overlay}>
            <Logo width={200} height={40}/>
          </View>
          <View style={styles.cardtextTop}>
            <Text maxFontSizeMultiplier={1} style={styles.description}>
              ¡Bienvenido al plan de 4 clases de yoga o taiji! Este plan te permite explorar ambas disciplinas
              durante un mes, con la flexibilidad de elegir la combinación que más te convenga.
            </Text>
          </View>
        </View>
        <View style={styles.cardTop}>
          <View style={styles.cardtextTop}>
            <SectionTitle title="¿Qué incluye este plan?" />
            <ListItem text="Acceso a 4 clases de yoga o taiji." />
            <ListItem text="Flexibilidad de horarios." />
            <ListItem text="Instrucción profesional y personalizada." />

            <SectionTitle title="¿Por qué elegir este plan?" />
            <ListItem text="Transformación integral." />
            <ListItem text="Experimenta los beneficios del yoga." />
            <ListItem text="Inversión en tu bienestar." />
          </View>
        </View>
        <View style={styles.cardbottom}>
          <View style={styles.cardtextPrice}>
            <Text maxFontSizeMultiplier={1} style={styles.price}>PAGO EN EFECTIVO</Text>
            <Text maxFontSizeMultiplier={1} style={styles.price}>$155.000</Text>
          </View>
        </View>
        <View style={styles.cardbottom}>
          <View style={styles.cardtextPrice}>
            <Text maxFontSizeMultiplier={1} style={styles.price}>TRANSFERENCIA</Text>
            <Text maxFontSizeMultiplier={1} style={styles.price}>$165.000</Text>
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

// 🔹 Componente para los títulos de sección
const SectionTitle = ({ title }: { title: string }) => (
  <Text maxFontSizeMultiplier={1} style={styles.subtitle}>{title}</Text>
);

// 🔹 Componente para los elementos de la lista
const ListItem = ({ text }: { text: string }) => (
  <Text maxFontSizeMultiplier={1} style={styles.listItem}>• {text}</Text>
);



export default Plan2;
