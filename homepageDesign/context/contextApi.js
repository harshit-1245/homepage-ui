import React, { createContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import base64 from 'base-64';
import axios from "axios"
import useCartStore from '../src/store/cartStore';
import { Alert } from 'react-native';

export const UserType = createContext();

const UserContext = ({ children }) => {
  const [randomNumbers, setRandomNumbers] = useState([]);
  const { cartItems,addToCart } = useCartStore();
  
  const [userId, setUserId] = useState('');
  const [authenticated, setAuthenticated] = useState(false); // New state to track authentication
  const [products,setProducts]=useState({})
  

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
        setAuthenticated(true); // Set authenticated to true if token is present
      } else {
          setUserId("")
        setAuthenticated(false); // Set authenticated to false if token is not present
        console.error('Token not found in AsyncStorage');
      }
    } catch (error) {
      console.error('Error decoding token:', error);
      // Handle error as needed
    }
  };
 
  


  
  useEffect(() => {
    decodeJwtToken();
    generateRandomNumbers();
    
  }, []);
  console.log(userId);

  const generateRandomNumbers = () => {
    let numbers = [];
    for (let i = 0; i < 1; i++) {
      let random = Math.floor(Math.random() * 100) + 1; // Random number between 1 and 100
      numbers.push(random);
    }
    setRandomNumbers(numbers);
  };


  return (
    <UserType.Provider value={{ userId, setUserId, authenticated,setAuthenticated,products,randomNumbers}}>
      {children}
    </UserType.Provider>
  );
};

export default UserContext;
