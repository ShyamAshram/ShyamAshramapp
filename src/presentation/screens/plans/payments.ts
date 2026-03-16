import Clipboard from "@react-native-clipboard/clipboard";
import { Linking, Alert } from "react-native";
import { HOST_URL } from "../../../../utils/envconfig";

const planesConDuracion: Record<string, number> = {
  "Anualidad": 365,
  "6 meses": 186,
  "3 meses": 93,
  "Ilimitado": 30,
  "4 clases": 4,
  "1 clase": 1
};

export const stripePayment = async ({
  initPaymentSheet,
  presentPaymentSheet,
  amount,
  userId,
  plan,
}: any) => {
  try {
    const planDuration = planesConDuracion[plan] || 0;
    
    const response = await fetch(`${HOST_URL}/api/subscriptions/create-payment-intent`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ 
        amount, 
        userId,
        plan,
        planDuration 
      }),
    });

    const data = await response.json();

    const { error } = await initPaymentSheet({
      paymentIntentClientSecret: data.clientSecret,
      merchantDisplayName: "Yapp",
    });

    if (error) {
      console.log(error);
      return false;
    }

    const { error: paymentError } = await presentPaymentSheet();

    if (paymentError) {
      console.log(paymentError);
      return false;
    }

    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};

// TRANSFERENCIA
export const copyTransferKey = (transferKey: string) => {
  Clipboard.setString(transferKey);

  Alert.alert(
    "Llave copiada",
    "La llave de transferencia se copió al portapapeles."
  );
};

// WHATSAPP
export const openWhatsAppPayment = (phone: string, message: string) => {
  const url = `whatsapp://send?phone=${phone}&text=${encodeURIComponent(message)}`;

  Linking.openURL(url).catch(() => {
    Alert.alert("Asegúrate de tener WhatsApp instalado");
  });
};