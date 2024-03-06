import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

const renderDetailRow = (label, value, bold = false) => (
  <View style={styles.detailRow}>
    <Text style={[styles.detailLabel, bold && styles.boldLabel]}>{label}</Text>
    <Text style={[styles.detailValue, bold && styles.boldValue]}>{value}</Text>
  </View>
);

const AddressSelection = ({ addresses, selectedAddress, onSelectAddress, onNextStep }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select a Delivery Address</Text>

      {addresses.map((address, index) => (
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
            <Text style={styles.addressInfo}>{address.location}</Text>
            <Text style={styles.addressInfo}>{address.street}</Text>
            <Text style={styles.addressInfo}>{address.city}</Text>
            <Text style={styles.addressInfo}>Phone No: {address.phoneNumber}</Text>

            {selectedAddress === index && (
              <Pressable
                onPress={() => onNextStep()}
                style={styles.deliveryButton}
              >
                <Text style={styles.buttonText}>Deliver to this address</Text>
              </Pressable>
            )}

            
            {/* Add more detail rows as needed */}
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
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
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
    fontWeight: 'bold',
  },
});

export default AddressSelection;