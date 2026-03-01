import React, { useRef, useEffect } from 'react';
import { Text, View, Linking, Image, Animated,TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { globalStyles } from '../../../config/theme/Theme';
import styles from './styles';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Logo from '../../assets/logo.svg';


const Plan3 = () => {
  
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
        <Text maxFontSizeMultiplier={1} style={styles.title2}>1 Clase de Yoga o Taiji</Text>
      </View>

      <ScrollView style={styles.globalMargin} contentContainerStyle={styles.scrollContent}>
        <View style={styles.cardTop}>
          <View style={styles.overlay}>
            <Logo width={200} height={40}/>
          </View>
          <View style={styles.cardtextTop}>
            <Text maxFontSizeMultiplier={1} style={styles.description}>
              ¡Bienvenido al plan de 1 clase de yoga o taiji! Con esta opción, puedes experimentar una sesión de yoga relajante o una práctica de taiji revitalizante.
            </Text>
          </View>
        </View>
        <View style={styles.cardTop}>
          <View style={styles.cardtextTop}>

            <SectionTitle title="¿Qué incluye este plan?" />
            <ListItem text="1 clase de yoga o taiji." />
            <ListItem text="Flexibilidad para elegir entre yoga o taiji según tu preferencia y disponibilidad." />
            <ListItem text="Clases impartidas por instructores profesionales y experimentados." />
            <ListItem text="Inversión en tu bienestar." />
          </View>
        </View>
        <View style={styles.cardbottom}>
          <View style={styles.cardtextPrice}>
            <Text maxFontSizeMultiplier={1} style={styles.price}>PRECIO</Text>
            <Text maxFontSizeMultiplier={1} style={styles.price}>$50.000</Text>
          </View>
        </View>
        <View style={styles.cardbottom}>
          <View style={styles.cardtextPrice}>
            <Text maxFontSizeMultiplier={1} style={styles.price}>PRIMERA CLASE</Text>
            <Text maxFontSizeMultiplier={1} style={styles.price}>$25.000</Text>
          </View>
        </View>
        <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
          <TouchableOpacity style={styles.paymentContainer} onPress={handlePress} activeOpacity={0.7}>
            <Text maxFontSizeMultiplier={1} style={styles.paymentText}>MEDIOS DE PAGO</Text>
          </TouchableOpacity>
        </Animated.View>
      </ScrollView>
    </View >
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
export default Plan3;
