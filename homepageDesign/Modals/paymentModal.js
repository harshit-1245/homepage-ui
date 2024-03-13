import React from 'react';
import { Modal, StyleSheet, Text, View, TouchableOpacity, TextInput } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { AntDesign } from '@expo/vector-icons';

export const PaymentModal = ({ visible, onClose,setCurrentStep }) => {
  const { control, handleSubmit, reset, formState: { errors } } = useForm({
    defaultValues: {
      cardNumber: '',
      expiryDate: '',
      cvv: '',
    }
  });

  const onSubmit = (data) => {
    console.log(data);
    setCurrentStep(4)
    // Handle form submission here
    reset(); // Reset the form values
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <View style={styles.header}>
            <TouchableOpacity onPress={onClose}>
              <AntDesign name="close" size={24} color="black" />
            </TouchableOpacity>
          </View>
          <Text style={styles.modalText}>Enter Card Details</Text>
          <View style={styles.inputContainer}>
            <Controller
              control={control}
              render={({ field }) => (
                <View>
                  <Text style={{ fontWeight: "bold" }}>Card Number</Text>
                  <TextInput
                    style={styles.input}
                    value={field.value}
                    onChangeText={field.onChange}
                    placeholder="1234 5678 9012"
                    placeholderTextColor="gray"
                    keyboardType="numeric"
                  />
                </View>
              )}
              name="cardNumber"
              rules={{ 
                required: 'Card number is required',
                validate: value => value.length === 12 || 'Card number must be 12 digits'
              }}
            />
            {errors.cardNumber && <Text style={styles.errorText}>{errors.cardNumber.message}</Text>}
          </View>
          <View style={styles.inputContainer}>
            <Controller
              control={control}
              render={({ field }) => (
                <View>
                  <Text style={{ fontWeight: "bold" }}>Expiry Date</Text>
                  <TextInput
                    style={styles.input}
                    value={field.value}
                    onChangeText={field.onChange}
                    placeholder="MM/YY"
                    placeholderTextColor="gray"
                  />
                </View>
              )}
              name="expiryDate"
              rules={{ 
                required: 'Expiry date is required',
                pattern: {
                  value: /^(0[1-9]|1[0-2])\/\d{2}$/,
                  message: 'Invalid expiry date format (MM/YY)'
                }
              }}
            />
            {errors.expiryDate && <Text style={styles.errorText}>{errors.expiryDate.message}</Text>}
          </View>
          <View style={styles.inputContainer}>
            <Controller
              control={control}
              render={({ field }) => (
                <View>
                  <Text style={{ fontWeight: "bold" }}>CVV</Text>
                  <TextInput
                    style={styles.input}
                    value={field.value}
                    onChangeText={field.onChange}
                    placeholder="123"
                    placeholderTextColor="gray"
                    keyboardType="numeric"
                  />
                </View>
              )}
              name="cvv"
              rules={{ 
                required: 'CVV is required',
                minLength: {
                  value: 3,
                  message: 'CVV must be at least 3 digits long'
                },
                maxLength: {
                  value: 4,
                  message: 'CVV cannot be more than 4 digits long'
                }
              }}
            />
            {errors.cvv && <Text style={styles.errorText}>{errors.cvv.message}</Text>}
          </View>
          <TouchableOpacity
            style={[styles.button, styles.modalButton]}
            onPress={handleSubmit(onSubmit)}
          >
            <Text style={styles.buttonText}>Submit</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 20,
    alignItems: 'center',
    elevation: 5,
    width: '80%', // Adjust width as needed
    maxWidth: 400, // Maximum width
    height: '100%', // Adjust height as needed
    maxHeight: 500, // Maximum height
  },
  header: {
    alignSelf: 'flex-start',
  },
  modalText: {
    fontSize: 18,
    marginBottom: 20,
  },
  inputContainer: {
    width: '100%',
    marginBottom: 15,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
    marginBottom: 5,
    width: '100%',
  },
  button: {
    backgroundColor: '#007bff',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    marginBottom: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  modalButton: {
    marginTop: 10,
  },
  errorText: {
    color: 'red',
    marginBottom: 5,
  },
});

export default PaymentModal;
