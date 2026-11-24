
import React, { useState } from 'react';
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator
} from 'react-native';

import { Elements, PaymentElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRoute } from '@react-navigation/native';

import { globalStyles } from '../../../config/theme/Theme';
import styles from './styles';

import PaymentMethodsModal from './components/PaymentMethods';
import {
  copyTransferKey,
  openWhatsAppPayment,
  createPaymentIntent,
  stripePromise
} from './payments.web.ts';

import LogoUrl from '../../assets/logo.svg?url';
import BackButton from '../../components/ui/BackButton.web';

interface StripeFormProps {
  onSuccess: () => void;
}


const StripeForm = ({ onSuccess }: StripeFormProps) => {
  const stripe = useStripe();
  const elements = useElements();

  const [loading, setLoading] = useState(false);
  const [elementReady, setElementReady] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handlePayment = async () => {
    if (!stripe || !elements || !elementReady || loading) {
      setErrorMessage('El formulario de pago todavía no está disponible.');
      return;
    }

    setLoading(true);
    setErrorMessage('');

    try {
      const { error, paymentIntent } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: window.location.href
        },
        redirect: 'if_required'
      });

      if (error) {
        setErrorMessage(
          error.message || 'No se pudo procesar el pago.'
        );
        return;
      }

      if (paymentIntent?.status === 'succeeded') {
        onSuccess();
      } else if (paymentIntent?.status === 'processing') {
        setErrorMessage('Tu pago está siendo procesado.');
      } else {
        setErrorMessage('El pago todavía no ha sido confirmado.');
      }
    } catch (error: any) {
      setErrorMessage(error.message || 'Error inesperado al procesar el pago.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={{ backgroundColor: '#fff', padding: 20, borderRadius: 12, margin: 15 }}>
      <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 15 }}>
        Pago con tarjeta
      </Text>

      <PaymentElement
        onReady={() => {
          setElementReady(true);
          setErrorMessage('');
        }}
        onLoadError={(event) => {
          console.error('Stripe PaymentElement:', event.error);
          setElementReady(false);
          setErrorMessage(
            event.error?.message || 'No se pudo cargar el formulario de pago.'
          );
        }}
      />

      {errorMessage !== '' && (
        <Text style={{ color: '#c62828', marginTop: 12 }}>
          {errorMessage}
        </Text>
      )}

      <TouchableOpacity
        onPress={handlePayment}
        disabled={!stripe || !elementReady || loading}
        style={{
          backgroundColor: '#263c59',
          padding: 15,
          borderRadius: 8,
          marginTop: 20,
          alignItems: 'center',
          opacity: !elementReady || loading ? 0.5 : 1
        }}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={{ color: '#fff', fontWeight: 'bold' }}>
            Pagar ahora
          </Text>
        )}
      </TouchableOpacity>
    </View>
  );
};


const Plan3 = () => {
  const insets = useSafeAreaInsets();
  const route = useRoute<any>();

  const userId = route.params?.userId;
  const plan = route.params?.plan;

  const [message, setMessage] = useState('');
  const [paymentModal, setPaymentModal] = useState(false);
  const [clientSecret, setClientSecret] = useState('');
  const [creatingPayment, setCreatingPayment] = useState(false);

  const formatCOP = (value: number) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: plan?.currency || 'COP',
      minimumFractionDigits: 0
    }).format(value);
  };

  const handleCardPayment = async () => {
    if (!plan || !userId) {
      setMessage('No se encontró la información del usuario o del plan.');
      setPaymentModal(false);
      return;
    }

    if (!stripePromise) {
      setMessage('No está configurada la clave pública de Stripe.');
      setPaymentModal(false);
      return;
    }

    try {
      setCreatingPayment(true);
      setMessage('');

      const secret = await createPaymentIntent({
        amount: Math.round(Number(plan.price) * 100),
        userId,
        plan: '1 clase'
      });

      setClientSecret(secret);
      setPaymentModal(false);
    } catch (error: any) {
      setMessage(error.message || 'No se pudo iniciar el pago.');
      setPaymentModal(false);
    } finally {
      setCreatingPayment(false);
    }
  };

  const handlePaymentSuccess = () => {
    setClientSecret('');
    setMessage('¡Pago realizado correctamente! Tu plan se activará al confirmarse en el servidor.');
  };

  if (!plan) {
    return (
      <View style={globalStyles.mainContainer}>
        <Text>No se encontró la información del plan.</Text>
      </View>
    );
  }

  return (
    <View style={globalStyles.mainContainer}>
      <View
        style={[
          globalStyles.header2,
          {
            paddingTop: insets.top,
            justifyContent: 'flex-start',
            alignItems: 'center'
          }
        ]}
      >
        <BackButton fallback="Plans" color="#FFF" />
        <Text maxFontSizeMultiplier={1} style={styles.title2}>
          1 Clase de Yoga o Taiji
        </Text>
      </View>

      <ScrollView
        style={styles.globalMargin}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.cardTop}>
          <View style={styles.overlay}>
            <Image
              source={{ uri: LogoUrl }}
              style={{
                width: 50,
                height: 40,
                resizeMode: 'cover'
              }}
            />
          </View>

          <View style={styles.cardtextTop}>
            <Text maxFontSizeMultiplier={1} style={styles.description}>
              ¡Bienvenido al plan de 1 clase de yoga o taiji! Con esta opción,
              puedes experimentar una sesión de yoga relajante o una práctica
              de taiji revitalizante.
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
            <Text maxFontSizeMultiplier={1} style={styles.price}>
              PRIMERA CLASE
            </Text>
            <Text maxFontSizeMultiplier={1} style={styles.price}>
              {formatCOP(plan.price2)}
            </Text>
          </View>
        </View>

        <View style={styles.cardbottom}>
          <View style={styles.cardtextPrice}>
            <Text maxFontSizeMultiplier={1} style={styles.price}>
              TRANSFERENCIA
            </Text>
            <Text maxFontSizeMultiplier={1} style={styles.price}>
              {formatCOP(plan.price)}
            </Text>
          </View>
        </View>

        <View style={styles.contPayment}>
          <TouchableOpacity
            style={styles.paymentContainer}
            onPress={() => setPaymentModal(true)}
            activeOpacity={0.7}
            disabled={creatingPayment}
          >
            <Text maxFontSizeMultiplier={1} style={styles.paymentText}>
              MEDIOS DE PAGO
            </Text>
          </TouchableOpacity>
        </View>

        {creatingPayment && (
          <View style={{ padding: 20, alignItems: 'center' }}>
            <ActivityIndicator size="large" color="#263c59" />
            <Text style={{ marginTop: 10 }}>
              Preparando pago seguro...
            </Text>
          </View>
        )}

        {clientSecret !== '' && stripePromise && (
          <Elements
            stripe={stripePromise}
            options={{
              clientSecret,
              appearance: {
                theme: 'stripe'
              },
              locale: 'es'
            }}
          >
            <StripeForm onSuccess={handlePaymentSuccess} />
          </Elements>
        )}

        {clientSecret !== '' && (
          <TouchableOpacity
            onPress={() => setClientSecret('')}
            style={{ padding: 12, alignItems: 'center' }}
          >
            <Text style={{ color: '#c62828' }}>
              Cancelar pago
            </Text>
          </TouchableOpacity>
        )}

        <PaymentMethodsModal
          visible={paymentModal}
          onClose={() => setPaymentModal(false)}
          onCard={handleCardPayment}
          onTransfer={async () => {
            const copied = await copyTransferKey('@sheyna755');
            setMessage(
              copied
                ? 'Llave de transferencia copiada.'
                : 'No fue posible copiar la llave.'
            );
            setPaymentModal(false);
          }}
          onCash={() => {
            openWhatsAppPayment(
              '573176744519',
              'Hola, quiero pagar el plan ilimitado en efectivo'
            );
            setPaymentModal(false);
          }}
        />

        {/* {message !== '' && (
          <View
            style={{
              backgroundColor: '#e8f5e9',
              padding: 15,
              margin: 15,
              borderRadius: 10
            }}
          >
            <Text style={{ color: '#256b35', textAlign: 'center' }}>
              {message}
            </Text>
          </View>
        )} */}
      </ScrollView>
    </View>
  );
};

const SectionTitle = ({ title }: { title: string }) => (
  <Text maxFontSizeMultiplier={1} style={styles.subtitle}>
    {title}
  </Text>
);

const ListItem = ({ text }: { text: string }) => (
  <Text maxFontSizeMultiplier={1} style={styles.listItem}>
    • {text}
  </Text>
);

export default Plan3;
