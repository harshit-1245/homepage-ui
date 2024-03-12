import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

const AddressSelection = ({ addresses, selectedAddress, onSelectAddress, onNextStep }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select a Delivery Address</Text>

      {Object.values(addresses).map((address, index) => (
        <Pressable
          key={index}
          style={[
            styles.addressContainer,
            {
              borderColor: selectedAddress === index ? "green" : "#D0D0D0",
            },
          ]}
          onPress={() => onSelectAddress(index)}
        >
          <FontAwesome
            name={selectedAddress === index ? "dot-circle-o" : "circle"}
            size={24}
            color={selectedAddress === index ? "green" : "black"}
          />

          <View style={styles.addressDetails}>
            <Text style={styles.addressName}>{address.name}</Text>
            <Text style={styles.addressInfo}>{address.street}, {address.houseNo}</Text>
            <Text style={styles.addressInfo}>{address.landmark}, {address.city}</Text>
            <Text style={styles.addressInfo}>Postal Code: {address.postalCode}</Text>
            <Text style={styles.addressInfo}>Phone No: {address.mobileNo}</Text>

            {selectedAddress === index && (
              <Pressable
                onPress={() => onNextStep()}
                style={styles.deliveryButton}
              >
                <Text style={styles.buttonText}>Deliver to this address</Text>
              </Pressable>
            )}

          </View>
        </Pressable>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },
  addressContainer: {
    flexDirection: 'row',
    borderWidth: 1,
    padding: 10,
    gap: 5,
    paddingBottom: 17,
  },
  addressDetails: {
    marginLeft: 10,
    flex: 1,
  },
  addressName: {
    fontSize: 15,
    fontWeight: "bold",
  },
  addressInfo: {
    fontSize: 15,
    color: "#181818",
  },
  deliveryButton: {
    backgroundColor: "#008397",
    padding: 10,
    borderRadius: 20,
    justifyContent: "center",
    marginTop: 10,
  },
  buttonText: {
    textAlign: "center",
    color: "white",
  }
});

export default AddressSelection;
