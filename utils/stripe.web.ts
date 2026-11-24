import { loadStripe } from '@stripe/stripe-js';
import { HOST_URL, secretKey } from '../utils/envconfig';


const stripeKey = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY;

if (!stripeKey) {
  console.error('Falta configurar VITE_STRIPE_PUBLISHABLE_KEY');
}

export const stripePromise = stripeKey
  ? loadStripe(stripeKey)
  : null;