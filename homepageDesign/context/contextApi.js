import React, { createContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import base64 from 'base-64';

export const UserType = createContext();

const UserContext = ({ children }) => {
  
  const [userId, setUserId] = useState('');
  const [authenticated, setAuthenticated] = useState(false); // New state to track authentication
  const [products,setProducts]=useState([])

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
  //fetching data for category screen just for testing
  const fetchData=async()=>{
    try {
      const response = await fetch('https://dummyjson.com/products');
      const data = await response.json();
      setProducts(data)
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  
  }

  useEffect(() => {
    decodeJwtToken();
    fetchData()
  }, []);

  

  return (
    <UserType.Provider value={{ userId, setUserId, authenticated,setAuthenticated,products}}>
      {children}
    </UserType.Provider>
  );
};

export default UserContext;
