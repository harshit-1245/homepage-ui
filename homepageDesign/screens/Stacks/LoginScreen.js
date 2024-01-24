import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Modal,
  Pressable,
  StyleSheet,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import Button from '../../buttons/Buttons'; // Assuming you have a Button component
import { useNavigation } from "@react-navigation/native";

const LoginScreen = () => {
  const [isPasswordShown, setIsPasswordShown] = useState(false);
  const [isEmailModalVisible, setIsEmailModalVisible] = useState(false);
  const [isForgotPasswordModalVisible, setIsForgotPasswordModalVisible] = useState(false);
  const [forgotPasswordEmail, setForgotPasswordEmail] = useState('');
  const navigation = useNavigation();

  const handleEmailLogin = (email, password) => {
    // Handle email login logic here
    console.log('Email Login:', email, password);
    // Close the modal after handling login logic
    setIsEmailModalVisible(false);
  };

  const handleNavigation = () => {
    navigation.navigate("Mobile");
  };

  const handleForgotPassword = () => {
    setIsForgotPasswordModalVisible(true);
  };

  const handleSendVerification = () => {
    // Handle send verification logic here
    console.log('Send verification email to:', forgotPasswordEmail);
    // Close the modal after handling verification logic
    setIsForgotPasswordModalVisible(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
      >
        <ScrollView contentContainerStyle={styles.scrollViewContainer}>
          <View style={styles.innerContainer}>
           

            <View style={styles.titleContainer}>
              <Text style={styles.titleText}>Login</Text>
            </View>

            {/* Email Login */}
            <View style={styles.inputContainer}>
              <Text style={styles.labelText}>Email address</Text>
              <TextInput
                placeholder="Enter your email address"
                placeholderTextColor={'black'}
                keyboardType="email-address"
                style={styles.inputField}
              />
            </View>

            {/* Password Login */}
            <View style={styles.inputContainer}>
              <Text style={styles.labelText}>Password</Text>
              <TextInput
                placeholder="Enter your password"
                placeholderTextColor={'black'}
                secureTextEntry={!isPasswordShown}
                style={styles.inputField}
              />
               <View style={styles.upperContainer}>
              {/* Login with Phone Number */}
              <TouchableOpacity
                onPress={handleNavigation}
                style={styles.phoneNumberContainer}
              >
                <Text style={styles.phoneNumberLinkText}>Login with Phone Number</Text>
              </TouchableOpacity>

              {/* Forgot Password */}
              <TouchableOpacity onPress={handleForgotPassword}>
                <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
              </TouchableOpacity>
            </View>
            </View>
               
            <Button
              title="Login with Email"
              filled
              onPress={() => setIsEmailModalVisible(true)}
              style={styles.loginButton}
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

      {/* Forgot Password Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={isForgotPasswordModalVisible}
        onRequestClose={() => setIsForgotPasswordModalVisible(false)}
      >
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
          }}
        >
          <View
            style={{
              width: '80%',
              backgroundColor: 'white',
              padding: 20,
              borderRadius: 8,
            }}
          >
            <Text style={{ fontSize: 18, marginBottom: 10 }}>Forgot Password</Text>
            <TextInput
              placeholder="Enter your email address"
              placeholderTextColor={'black'}
              keyboardType="email-address"
              style={{
                width: '100%',
                height: 48,
                borderColor: 'black',
                borderWidth: 1,
                borderRadius: 8,
                marginBottom: 10,
                paddingLeft: 22,
              }}
              value={forgotPasswordEmail}
              onChangeText={(text) => setForgotPasswordEmail(text)}
            />
            <Button
              title="Send Verification"
              filled
              onPress={handleSendVerification}
              style={{
                marginTop: 18,
                marginBottom: 4,
              }}
            />
            <Pressable
              style={{ marginTop: 10 }}
              onPress={() => setIsForgotPasswordModalVisible(false)}
            >
              <Text style={{ color: 'blue' }}>Cancel</Text>
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
  },
  scrollViewContainer: {
    flexGrow: 1,
  },
  innerContainer: {
    flex: 1,
    marginHorizontal: 22,
    justifyContent: 'center',
  },
  upperContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  titleContainer: {
    marginBottom: 22,
  },
  titleText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: 'black',
  },
  inputContainer: {
    marginBottom: 20,
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
  },
  phoneNumberContainer: {
    marginRight: 20,
  },
  phoneNumberLinkText: {
    color: 'blue',
    fontSize: 13,
  },
  forgotPasswordText: {
    color: 'blue',
    fontSize: 16,
  },
  loginButton: {
    marginBottom: 24,
  },
});

export default LoginScreen;
