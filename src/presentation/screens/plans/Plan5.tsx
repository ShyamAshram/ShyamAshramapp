import React, { useEffect, useRef, useState } from 'react';
import { Text, View, Linking, Image, Animated,Alert,  TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { globalStyles } from '../../../config/theme/Theme';
import styles from './styles';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Logo from '../../assets/logo.svg';
import PaymentMethodsModal from './components/PaymentMethods';
import { stripePayment, copyTransferKey, openWhatsAppPayment } from "./payments";
import { useStripe } from '@stripe/stripe-react-native';
import { useRoute } from '@react-navigation/native';


const Plan5 = () => {
    const insets = useSafeAreaInsets();
    const { initPaymentSheet, presentPaymentSheet } = useStripe();
      
    const [paymentModal, setPaymentModal] = useState(false);
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
    return (
        <View style={globalStyles.mainContainer}>
            <View style={[globalStyles.header2, { paddingTop: insets.top }]}>
                <Text maxFontSizeMultiplier={1} style={styles.title2}>Plan 6 Meses</Text>
            </View>

            <ScrollView style={styles.globalMargin}  contentContainerStyle={styles.scrollContent}>
                <View style={styles.cardTop}>
                    <View style={styles.overlay}>
                        <Logo width={200} height={40}/>
                    </View>
                    <View style={styles.cardtextTop}>
                        <Text maxFontSizeMultiplier={1} style={styles.description}>
                            Con el plan de 6 meses, tendrás acceso a todas nuestras clases y actividades para fortalecer tu bienestar y crecimiento personal.
                        </Text>
                    </View>
                </View>
                <View style={styles.cardTop}>
                    <View style={styles.cardtextTop}>
                        <SectionTitle title="Beneficios del plan de 6 meses" />
                        <ListItem text="Acceso ilimitado durante medio año." />
                        <ListItem text="Flexibilidad para asistir en cualquier horario." />
                        <ListItem text="Clases impartidas por expertos." />
                        <ListItem text="Precio especial con descuento a largo plazo." />
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
                    <TouchableOpacity style={styles.paymentContainer}  onPress={() => setPaymentModal(true)} activeOpacity={0.7}>
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
                    plan:"6 meses"
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
const SectionTitle = ({ title }: { title: string }) => <Text maxFontSizeMultiplier={1} style={styles.subtitle}>{title}</Text>;
const ListItem = ({ text }: { text: string }) => <Text maxFontSizeMultiplier={1} style={styles.listItem}>• {text}</Text>;

export default Plan5;
