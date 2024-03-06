import React, { useState } from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

const DeliveryOptionSelection = ({ onSelectOption, onNextStep }) => {
  const [option, setOption] = useState(false);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Choose Your delivery option</Text>

      <View style={styles.optionContainer}>
        <Pressable
          onPress={() => setOption(!option)}
          style={styles.optionButton}
        >
          {option ? (
            <FontAwesome name="dot-circle-o" size={24} color="black" />
          ) : (
            <FontAwesome name="circle" size={24} color="gray" />
          )}
          <Text style={styles.optionText}>
            <Text style={styles.greenText}>Tomorrow any time</Text> - Free delivery with premium membership
          </Text>
        </Pressable>
      </View>

      <Pressable onPress={() => onNextStep()} style={styles.continueButton}>
        <Text>Continue</Text>
      </Pressable>
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
  optionContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    padding: 8,
    borderWidth: 1,
    borderColor: "#D0D0D0",
    marginTop: 10,
  },
  optionButton: {
    flexDirection: "row",
    alignItems: "center",
  },
  optionText: {
    flex: 1,
  },
  greenText: {
    color: "green",
    fontWeight: "500",
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

export default DeliveryOptionSelection;