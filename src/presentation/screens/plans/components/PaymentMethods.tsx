import React from "react";
import { Modal, View, Text, TouchableOpacity } from "react-native";
import styles from "./styles";
import { Key, Cash, Card } from '../../../icons/Icons';


interface Props {
  visible: boolean;
  onClose: () => void;
  onCard: () => void;
  onTransfer: () => void;
  onCash: () => void;
}

const PaymentMethodsModal = ({
  visible,
  onClose,
  onCard,
  onTransfer,
  onCash,
}: Props) => {
  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Selecciona un medio de pago</Text>
        <View style={{gap:8, marginTop:10,}}>
          <TouchableOpacity style={styles.paymentOption} onPress={onCard}>
            <Card />
            <Text style={styles.textselection}>Tarjeta de crédito / débito</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.paymentOption} onPress={onTransfer}>
            <Key />
            <Text style={styles.textselection} >Copiar llave</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.paymentOption} onPress={onCash}>
            <Cash />
            <Text style={styles.textselection}>Efectivo</Text>
          </TouchableOpacity>
        </View>

          <TouchableOpacity onPress={onClose}>
            <Text style={{ color: "red", marginTop: 20, textAlign:'center', fontFamily:'Quicksand-Bold' }}>Cerrar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default PaymentMethodsModal;