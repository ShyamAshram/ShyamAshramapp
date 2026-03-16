import React, { useRef, useEffect, useState } from 'react';
import { Text, View, Linking, Image, Animated, TouchableOpacity, ScrollView, Alert, Modal } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { globalStyles } from '../../../config/theme/Theme';
import styles from './styles';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Logo from '../../assets/logo.svg';
import { HOST_URL } from '../../../../utils/envconfig';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useStripe } from '@stripe/stripe-react-native';
import Clipboard from '@react-native-clipboard/clipboard';
import PaymentMethodsModal from './components/PaymentMethods';

import { stripePayment, copyTransferKey, openWhatsAppPayment } from "./payments";


const Plans = () => {

  const { initPaymentSheet, presentPaymentSheet } = useStripe();
  const insets = useSafeAreaInsets();
  const route = useRoute<any>();
  const userId = route.params?.userId
  const plan = route.params?.plan

  const formatCOP = (value:any) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: plan.currency,
      minimumFractionDigits: 0
    }).format(value);
  };

  const [paymentModal, setPaymentModal] = useState(false);


  const [token, setToken] = useState('')
  const navigation = useNavigation()
  

  useEffect(()=>{
    const token = async()=>{
      const tokenAs = await AsyncStorage.getItem('token');
      setToken(tokenAs as string)
    }
    token()
  },[])
      
  return (
    <View style={globalStyles.mainContainer}>
      <View style={[globalStyles.header2, { paddingTop: insets.top }]}>
        <Text maxFontSizeMultiplier={1} style={styles.title2}>{plan?.name}</Text>
      </View>

      <ScrollView style={styles.globalMargin} contentContainerStyle={styles.scrollContent}>
        <View style={styles.cardTop}>
          <View style={styles.overlay}>
            <Logo width={200} height={40}/>
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
            <Text maxFontSizeMultiplier={1} style={styles.price}>{formatCOP(plan.price2)}</Text>
          </View>
        </View>
        <View style={styles.cardbottom}>
          <View style={styles.cardtextPrice}>
            <Text maxFontSizeMultiplier={1} style={styles.price}>TRANSFERENCIA</Text>
            <Text maxFontSizeMultiplier={1} style={styles.price}>{formatCOP(plan.price)}</Text>
          </View>
        </View>
        <View style={styles.contPayment}>
          <TouchableOpacity style={styles.paymentContainer} onPress={() => setPaymentModal(true)} activeOpacity={0.7}>
            <Text maxFontSizeMultiplier={1} style={styles.paymentText}>MEDIOS DE PAGO</Text>
          </TouchableOpacity>
        </View>
       <PaymentMethodsModal
        visible={paymentModal}
        onClose={() => setPaymentModal(false)}
       onCard={async () => {

        const success = await stripePayment({
          initPaymentSheet,
          presentPaymentSheet,
          amount: plan.price * 100,
          userId: userId,
          plan:'Ilimitado'
        });

        if(success){
          Alert.alert("Pago exitoso");
        }

        setPaymentModal(false);
      }}

      onTransfer={()=>{
        copyTransferKey("@sheyna755");
        setPaymentModal(false);
      }}

      onCash={()=>{
        openWhatsAppPayment(
          "573176744519",
          "Hola, quiero pagar el plan ilimitado en efectivo"
        );
        setPaymentModal(false);
      }}
      />
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
