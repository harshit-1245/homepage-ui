import React from 'react';
import { Text, View } from 'react-native';
import { Entypo } from '@expo/vector-icons';
import useCartStore from '../../src/store/cartStore';
import Gemini from '../../AI/Gemini';
import GeminiChat from '../../AI/Gemini';

const NotificationScreen = () => {
  const { cartItems } = useCartStore();

  return (
    <View style={{ flexDirection: 'row',marginTop:50 }}>
      <GeminiChat/>
    </View>
  );
}

export default NotificationScreen;
