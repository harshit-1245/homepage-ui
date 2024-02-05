import { StyleSheet, Text, View } from 'react-native';
import React, { createContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import base64 from 'base-64';

export const UserType = createContext();

const UserContext = ({ children }) => {
  const [userId, setUserId] = useState('');
 

  const decodeJwtToken = async () => {
    try {
      const jwtToken = await AsyncStorage.getItem("authToken");
     
      if (jwtToken) {
        const [headerEncoded, payloadEncoded, signatureEncoded] = jwtToken.split('.');
        const decodedToken = {
          header: JSON.parse(base64.decode(headerEncoded)),
          payload: JSON.parse(base64.decode(payloadEncoded)),
          signature: signatureEncoded, // This remains base64 encoded
        };

        // Access the decoded token's payload.userId
        const userId = decodedToken.payload._id;
        setUserId(userId);
      } else {
        console.error('Token not found in AsyncStorage');
      }
    } catch (error) {
      console.error('Error decoding token:', error);
      // Handle error as needed
    }
  };

  useEffect(() => {
    decodeJwtToken();
  }, []);
 

  return (
    <UserType.Provider value={{ userId, setUserId }}>
      {children}
    </UserType.Provider>
  );
};

export default UserContext;

const styles = StyleSheet.create({});
