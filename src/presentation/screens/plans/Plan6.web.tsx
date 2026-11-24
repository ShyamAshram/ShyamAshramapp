
import React, { useState } from 'react';
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from 'react-native';

import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRoute } from '@react-navigation/native';

import { globalStyles } from '../../../config/theme/Theme';
import styles from './styles';

import PaymentMethodsModal from './components/PaymentMethods';
import { copyTransferKey, openWhatsAppPayment } from './payments';

import LogoUrl from '../../assets/logo.svg?url';
import BackButton from '../../components/ui/BackButton.web';

import {
  Elements,
  PaymentElement,
  useElements,
  useStripe,
} from '@stripe/react-stripe-js';

import { stripePromise } from './payments.web';

const PLAN_NAME = '3 meses';
const PLAN_DURATION = 93;

const Plan6 = () => {
  const insets = useSafeAreaInsets();

  const [message, setMessage] = useState('');
  const [paymentModal, setPaymentModal] = useState(false);
  const [clientSecret, setClientSecret] = useState('');
  const [loading, setLoading] = useState(false);
  const [showCardPayment, setShowCardPayment] = useState(false);

  const route = useRoute<any>();
  const userId = route.params?.userId;
  const plan = route.params?.plan;

  const formatCOP = (value: number) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: plan?.currency || 'COP',
      minimumFractionDigits: 0,
    }).format(value || 0);
  };

  const startCardPayment = async () => {
    try {
      if (!userId || !plan?.price) {
        setMessage('No se encontró la información necesaria para iniciar el pago.');
        return;
      }

      setLoading(true);
      setMessage('');

      const response = await fetch(
        `${import.meta.env.VITE_URL_DOMAIN_HOST}/api/subscriptions/create-payment-intent`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            amount: Math.round(Number(plan.price) * 100),
            userId,
            plan: PLAN_NAME,
            planDuration: PLAN_DURATION,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok || !data.clientSecret) {
        throw new Error(data.message || 'No se pudo iniciar el pago.');
      }

      setClientSecret(data.clientSecret);
      setShowCardPayment(true);
      setPaymentModal(false);
    } catch (error: any) {
      console.error('Error iniciando pago:', error);
      setMessage(error.message || 'No se pudo iniciar el pago.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={globalStyles.mainContainer}>
      <View
        style={[
          globalStyles.header2,
          {
            paddingTop: insets.top,
            justifyContent: 'flex-start',
            alignItems: 'center',
          },
        ]}
      >
        <BackButton fallback="Plans" color="#FFF" />
        <Text maxFontSizeMultiplier={1} style={styles.title2}>
          Plan 3 Meses
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
                resizeMode: 'cover',
              }}
            />
          </View>

          <View style={styles.cardtextTop}>
            <Text maxFontSizeMultiplier={1} style={styles.description}>
              Con el plan de 3 meses, podrás experimentar los beneficios del
              yoga y la meditación de manera continua, adaptándolo a tu rutina.
            </Text>
          </View>
        </View>

        <View style={styles.cardTop}>
          <View style={styles.cardtextTop}>
            <SectionTitle title="Beneficios del plan de 3 meses" />
            <ListItem text="Acceso ilimitado durante 3 meses." />
            <ListItem text="Opciones de horarios flexibles." />
            <ListItem text="Clases en grupos reducidos para mejor atención." />
            <ListItem text="Ideal para quienes buscan un compromiso a corto plazo." />
          </View>
        </View>

        <View style={styles.cardbottom}>
          <View style={styles.cardtextPrice}>
            <Text maxFontSizeMultiplier={1} style={styles.price}>
              PAGO EN EFECTIVO
            </Text>
            <Text maxFontSizeMultiplier={1} style={styles.price}>
              {formatCOP(plan?.price2)}
            </Text>
          </View>
        </View>

        <View style={styles.cardbottom}>
          <View style={styles.cardtextPrice}>
            <Text maxFontSizeMultiplier={1} style={styles.price}>
              TRANSFERENCIA / TARJETA
            </Text>
            <Text maxFontSizeMultiplier={1} style={styles.price}>
              {formatCOP(plan?.price)}
            </Text>
          </View>
        </View>

        {!showCardPayment && (
          <View style={styles.contPayment}>
            <TouchableOpacity
              style={styles.paymentContainer}
              onPress={() => setPaymentModal(true)}
              activeOpacity={0.7}
            >
              <Text maxFontSizeMultiplier={1} style={styles.paymentText}>
                MEDIOS DE PAGO
              </Text>
            </TouchableOpacity>
          </View>
        )}

        <PaymentMethodsModal
          visible={paymentModal}
          onClose={() => setPaymentModal(false)}
          onCard={startCardPayment}
          onTransfer={() => {
            copyTransferKey('@sheyna755');
            setPaymentModal(false);
          }}
          onCash={() => {
            openWhatsAppPayment(
              '573176744519',
              'Hola, quiero pagar el plan de 3 meses en efectivo'
            );
            setPaymentModal(false);
          }}
        />

        {loading && (
          <View style={{ padding: 20, alignItems: 'center' }}>
            <ActivityIndicator size="large" color="#256b35" />
            <Text>Preparando el pago...</Text>
          </View>
        )}

        {showCardPayment && clientSecret !== '' && (
          <View
            style={{
              backgroundColor: '#fff',
              padding: 20,
              margin: 15,
              borderRadius: 12,
            }}
          >
            <Text
              style={{
                fontSize: 18,
                fontWeight: 'bold',
                marginBottom: 15,
              }}
            >
              Pago seguro con tarjeta
            </Text>

            <Elements
              stripe={stripePromise}
              options={{
                clientSecret,
                appearance: { theme: 'stripe' },
                locale: 'es',
              }}
            >
              <StripeForm
                onCancel={() => {
                  setShowCardPayment(false);
                  setClientSecret('');
                }}
                onSuccess={() => {
                  setMessage(
                    '¡Pago realizado correctamente! Tu plan se activará automáticamente.'
                  );
                  setShowCardPayment(false);
                  setClientSecret('');
                }}
              />
            </Elements>
          </View>
        )}

        {message !== '' && (
          <View
            style={{
              backgroundColor: '#e8f5e9',
              padding: 15,
              margin: 15,
              borderRadius: 10,
            }}
          >
            <Text style={{ color: '#256b35', textAlign: 'center' }}>
              {message}
            </Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

const StripeForm = ({
  onCancel,
  onSuccess,
}: {
  onCancel: () => void;
  onSuccess: () => void;
}) => {
  const stripe = useStripe();
  const elements = useElements();

  const [processing, setProcessing] = useState(false);
  const [ready, setReady] = useState(false);
  const [error, setError] = useState('');

  const handlePayment = async () => {
    if (!stripe || !elements || !ready || processing) return;

    try {
      setProcessing(true);
      setError('');

      const result = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: window.location.href,
        },
        redirect: 'if_required',
      });

      if (result.error) {
        setError(result.error.message || 'No se pudo procesar el pago.');
        return;
      }

      if (result.paymentIntent?.status === 'succeeded') {
        onSuccess();
      } else {
        setError('El pago todavía no ha sido confirmado.');
      }
    } catch (error: any) {
      console.error('Error confirmando pago:', error);
      setError(error.message || 'Ocurrió un error al confirmar el pago.');
    } finally {
      setProcessing(false);
    }
  };

  return (
    <View>
      <PaymentElement
        onReady={() => setReady(true)}
        onLoadError={(event) => {
          console.error('Error cargando PaymentElement:', event.error);
          setError('No se pudo cargar el formulario de pago.');
        }}
      />

      {error !== '' && (
        <Text style={{ color: '#c62828', marginTop: 12 }}>
          {error}
        </Text>
      )}

      <TouchableOpacity
        onPress={handlePayment}
        disabled={!ready || !stripe || processing}
        style={{
          backgroundColor: '#256b35',
          padding: 15,
          borderRadius: 8,
          marginTop: 20,
          opacity: !ready || processing ? 0.6 : 1,
        }}
      >
        <Text
          style={{
            color: '#fff',
            textAlign: 'center',
            fontWeight: 'bold',
          }}
        >
          {processing ? 'Procesando pago...' : 'PAGAR AHORA'}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={onCancel}
        disabled={processing}
        style={{ padding: 12, marginTop: 8 }}
      >
        <Text style={{ textAlign: 'center', color: '#555' }}>
          Cancelar
        </Text>
      </TouchableOpacity>
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

export default Plan6;
