import React, { useState } from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { Entypo, FontAwesome } from '@expo/vector-icons';

const PaymentMethodSelection = ({ onSelectPaymentMethod, onNextStep }) => {
  const [selectedOption, setSelectedOption] = useState("");

  const handleSelectPaymentMethod = (paymentMethod) => {
    setSelectedOption(paymentMethod);
    onSelectPaymentMethod(paymentMethod); // Call the prop to update the selected payment method
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select your payment method</Text>

      <View style={styles.paymentOption}>
        {selectedOption === "cash" ? (
          <FontAwesome name="dot-circle-o" size={24} color="black" />
        ) : (
          <Entypo onPress={() => handleSelectPaymentMethod("cash")} name='circle' size={20} color="gray" />
        )}
        <Text style={styles.optionText}>Cash on Delivery</Text>
      </View>

      {/* For payment integration */}
      {/* I'm not implementing payment method */}
      <View style={styles.paymentOption}>
        <Entypo onPress={() => handleSelectPaymentMethod("card")} name='circle' size={20} color="gray" />
        <Text style={styles.optionText}>Payment by card</Text>
      </View>

      {selectedOption !== "" && (
        <Pressable onPress={() => onNextStep()} style={styles.continueButton}>
          <Text>Continue</Text>
        </Pressable>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  paymentOption: {
    backgroundColor: "white",
    padding: 8,
    borderColor: "#D0D0D0",
    borderWidth: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: 7,
    marginTop: 12,
  },
  optionText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  continueButton: {
    backgroundColor: "#FFC72C",
    padding: 10,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 15,
  },
});

export default PaymentMethodSelection;