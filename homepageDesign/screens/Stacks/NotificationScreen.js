import React from 'react';
import { Text, View } from 'react-native';
import { Entypo } from '@expo/vector-icons';
import useCartStore from '../../src/store/cartStore';

const NotificationScreen = () => {
  const { cartItems } = useCartStore();

  // Calculate total count of items in the cart
  const cartItemCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <View style={{ flexDirection: 'row',marginTop:50 }}>
      <Entypo name="shopping-cart" size={24} color="black" />
      <Text>{cartItemCount}</Text> 
    </View>
  );
}

export default NotificationScreen;
