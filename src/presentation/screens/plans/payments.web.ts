
import { loadStripe } from '@stripe/stripe-js';
import { HOST_URL } from '../../../../utils/envconfig';

const stripeKey = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY;

export const stripePromise = stripeKey
  ? loadStripe(stripeKey)
  : null;

const planesConDuracion: Record<string, number> = {
  "Anualidad": 365,
  "6 meses": 186,
  "3 meses": 93,
  "Ilimitado": 30,
  "4 clases": 4,
  "1 clase": 1
};

interface PaymentIntentParams {
  amount: number;
  userId: string;
  plan: string;
}

export const createPaymentIntent = async ({
  amount,
  userId,
  plan
}: PaymentIntentParams): Promise<string> => {
  const planDuration = planesConDuracion[plan] || 0;

  const response = await fetch(
    `${HOST_URL}/api/subscriptions/create-payment-intent`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        amount,
        userId,
        plan,
        planDuration
      })
    }
  );

  const data = await response.json();

  if (!response.ok || !data.clientSecret) {
    throw new Error(data.error || 'No se pudo iniciar el pago.');
  }

  return data.clientSecret;
};

// TRANSFERENCIA
export const copyTransferKey = async (transferKey: string) => {
  try {
    await navigator.clipboard.writeText(transferKey);
    return true;
  } catch (error) {
    console.error('Error copiando llave:', error);
    return false;
  }
};

// WHATSAPP
export const openWhatsAppPayment = (
  phone: string,
  message: string
) => {
  const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
  window.open(url, '_blank', 'noopener,noreferrer');
};
