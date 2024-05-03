import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Modal, Pressable, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Button from '../../buttons/Buttons'; // Assuming you have a Button component
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from "axios"


const MobileLoginScreen = () => {
  const navigation = useNavigation();
  const [countryCode, setCountryCode] = useState('+91');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isOtpModalVisible, setIsOtpModalVisible] = useState(false);
  const [otp, setOtp] = useState('');

  //function for generating OTP
 

  const handleSendOtp = async () => {
   try {
    const sendOTP=await axios.post("http://192.168.14.201:4000/generate",{
     phoneNumber:phoneNumber})
     const {otp}=sendOTP.data
     setOtp(otp)
    setIsOtpModalVisible(true)
   } catch (error) {
    console.error('Error sending OTP:', error);
      setError('Failed to send OTP');
      setOtp('');
   }
  };
  

  const handleVerifyOtp = async() => {
    try {
      const response = await axios.post("http://192.168.204.201:4000/verify", {
        phoneNumber: phoneNumber,
        otp: otp
      });
      const { verified } = response.data;
      if (verified) {
        setIsOtpModalVisible(false);
        // Navigate to the next screen upon successful OTP verification
        navigation.navigate("Main");
      } else {
        setError('Invalid OTP');
      }
    } catch (error) {
      console.error('Error verifying OTP:', error);
      setError('Failed to verify OTP');
    }
  };

  const handleNavigation = () => {
    navigation.navigate("Login");
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.loginTitle}>Login</Text>

      <View style={{ marginBottom: 12 }}>
        <Text style={styles.labelText}>Phone Number</Text>
        <View style={styles.phoneInputContainer}>
          <TextInput
            placeholder="+91"
            placeholderTextColor={'black'}
            keyboardType="numeric"
            style={styles.countryCodeInput}
            value={countryCode}
            onChangeText={(text) => setCountryCode(text)}
          />
          <TextInput
            placeholder="Enter your phone number"
            placeholderTextColor={'black'}
            keyboardType="numeric"
            style={styles.phoneNumberInput}
            value={phoneNumber}
            onChangeText={(text) => setPhoneNumber(text)}
          />
        </View>
      </View>

      <Pressable onPress={handleNavigation}>
        <Text style={styles.loginWithEmailText}>Login with email</Text>
      </Pressable>

      <Button
        title="Send OTP"
        filled
        onPress={handleSendOtp}
        style={styles.sendOtpButton}
      />

<Modal
  animationType="slide"
  transparent={true}
  visible={isOtpModalVisible}
  onRequestClose={() => setIsOtpModalVisible(false)}
>
  <View style={styles.modalContainer}>
    <View style={styles.modalContent}>
      <Text style={styles.modalTitle}>Enter OTP</Text>
      <View style={styles.otpContainer}>
        <TextInput
          style={styles.otpInput}
          maxLength={1}
          keyboardType="numeric"
          value={otp[0]}
          onChangeText={(text) => setOtp((prevOtp) => text + prevOtp.slice(1))}
        />
        <TextInput
          style={styles.otpInput}
          maxLength={1}
          keyboardType="numeric"
          value={otp[1]}
          onChangeText={(text) => setOtp((prevOtp) => prevOtp.slice(0, 1) + text + prevOtp.slice(2))}
        />
        <TextInput
          style={styles.otpInput}
          maxLength={1}
          keyboardType="numeric"
          value={otp[2]}
          onChangeText={(text) => setOtp((prevOtp) => prevOtp.slice(0, 2) + text + prevOtp.slice(3))}
        />
        <TextInput
          style={styles.otpInput}
          maxLength={1}
          keyboardType="numeric"
          value={otp[3]}
          onChangeText={(text) => setOtp((prevOtp) => prevOtp.slice(0, 3) + text + prevOtp.slice(4))}
        />
        <TextInput
          style={styles.otpInput}
          maxLength={1}
          keyboardType="numeric"
          value={otp[4]}
          onChangeText={(text) => setOtp((prevOtp) => prevOtp.slice(0, 4) + text)}
        />
        <TextInput
          style={styles.otpInput}
          maxLength={1}
          keyboardType="numeric"
          value={otp[5]}
          onChangeText={(text) => setOtp((prevOtp) => prevOtp.slice(0, 5) + text)}
        />
      </View>
      <Button
        title="Verify OTP"
        filled
        onPress={handleVerifyOtp}
        style={styles.verifyOtpButton}
      />
      <Pressable
        style={styles.cancelButton}
        onPress={() => setIsOtpModalVisible(false)}
      >
        <Text style={styles.cancelButtonText}>Cancel</Text>
      </Pressable>
    </View>
  </View>
</Modal>

    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 16,
    marginTop: 50,
  },
  loginTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 12,
    color: 'black',
  },
  labelText: {
    fontSize: 16,
    fontWeight: '400',
    marginVertical: 8,
  },
  inputField: {
    width: '100%',
    height: 48,
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 8,
    paddingLeft: 22,
    marginBottom: 0,
  },
  phoneInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  countryCodeInput: {
    width: '20%',
    height: 48,
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 8,
    paddingLeft: 10,
    marginRight: 5,
  },
  phoneNumberInput: {
    flex: 1,
    height: 48,
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 8,
    paddingLeft: 10,
  },
  loginWithEmailText: {
    fontSize: 16,
    color: 'blue',
    alignSelf: 'flex-end',
    marginBottom: 0,
  },
  sendOtpButton: {
    marginTop: 18,
    marginBottom: 4,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 8,
  },
  modalTitle: {
    fontSize: 18,
    marginBottom: 10,
  },
  verifyOtpButton: {
    marginTop: 18,
    marginBottom: 4,
  },
  cancelButton: {
    marginTop: 10,
    alignItems: 'center',
  },
  cancelButtonText: {
    color: 'blue',
    fontSize: 16,
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  otpInput: {
    width: '15%',
    height: 48,
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 8,
    textAlign: 'center',
  },
});


export default MobileLoginScreen;
