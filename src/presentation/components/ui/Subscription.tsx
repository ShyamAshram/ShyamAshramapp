import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const SubscriptionSettingsScreen = () => {
  const [selectedPlan, setSelectedPlan] = useState(null);

  const subscriptionPlans = [
    { id: 1, name: 'Plan ilimitado', description: 'Acceso ilimitado a todas las clases' },
    { id: 2, name: 'Plan de 4 clases', description: 'Acceso a 4 clases por mes' },
    { id: 3, name: 'Plan de 1 clase', description: 'Acceso a 1 clase por mes' },
  ];

  const handlePlanSelection = ({ plan }: any) => {
    setSelectedPlan(plan);
    console.log(`Se seleccionó el plan: ${plan.name}`);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Configuración de la suscripción</Text>
      <View style={styles.planList}>
        {subscriptionPlans.map((plan) => (
          <TouchableOpacity
            key={plan.id}
            style={[styles.planItem, selectedPlan === plan && styles.selectedPlan]}
            onPress={() => handlePlanSelection(plan)}
          >
            <Text style={styles.planName}>{plan.name}</Text>
            <Text style={styles.planDescription}>{plan.description}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  planList: {
    flex: 1,
    width: '100%'
  },
  planItem: {
    width: '100%',
    paddingVertical: 15,
    paddingHorizontal: 20,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 20,
  },
  selectedPlan: {
    backgroundColor: '#007bff',
    borderColor: '#007bff',
  },
  planName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  planDescription: {
    fontSize: 14,
    color: '#666',
  },
});

export default SubscriptionSettingsScreen;