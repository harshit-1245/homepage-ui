import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const OrderConfirmation = ({ selectedAddress, setCurrentStep }) => {
  return (
    <View style={styles.container}>
      <View style={styles.section}>
        <View>
          <Text style={styles.title}>Save 5% and never run out</Text>
          <Text style={styles.subtitle}>Turn on auto deliveries</Text>
        </View>
        <MaterialIcons name='keyboard-arrow-right' size={24} color={"black"} />
      </View>

      <View style={styles.section}>
        <Text style={styles.shippingText}>Shipping to {selectedAddress?.name}</Text>
        {renderDetailRow("Items", "$1234")}
        {renderDetailRow("Delivery", "0")}
        {renderDetailRow("Order Total", "$1234", true)}
      </View>

      <View style={styles.section}>
        <Text style={styles.paymentLabel}>Pay with</Text>
        <Text style={styles.paymentMethod}>Pay on delivery Cash</Text>
      </View>

      <Pressable onPress={() => setCurrentStep(4)} style={styles.placeOrderButton}>
        <Text style={styles.placeOrderButtonText}>Place your order</Text>
      </Pressable>
    </View>
  );
};

const renderDetailRow = (label, value, bold = false) => (
  <View style={styles.detailRow}>
    <Text style={[styles.detailLabel, bold && styles.boldLabel]}>{label}</Text>
    <Text style={[styles.detailValue, bold && styles.boldValue]}>{value}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 20,
  },
  section: {
    backgroundColor: 'white',
    padding: 16,
    borderColor: '#D0D0D0',
    borderWidth: 1,
    marginBottom: 16,
  },
  title: {
    fontSize: 17,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 15,
    color: 'gray',
    marginTop: 5,
  },
  shippingText: {
    fontSize: 16,
    marginBottom: 10,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  detailLabel: {
    fontSize: 16,
    fontWeight: '500',
    color: 'gray',
  },
  detailValue: {
    color: 'gray',
    fontSize: 16,
  },
  boldLabel: {
    fontWeight: 'bold',
  },
  boldValue: {
    color: '#C60C30',
    fontWeight: 'bold',
  },
  paymentLabel: {
    fontSize: 16,
    color: 'gray',
    marginBottom: 5,
  },
  paymentMethod: {
    fontSize: 16,
    fontWeight: '600',
  },
  placeOrderButton: {
    backgroundColor: '#FFC72C',
    padding: 16,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeOrderButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
});

export default OrderConfirmation;