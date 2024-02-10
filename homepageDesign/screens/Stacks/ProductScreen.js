import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { useRoute } from '@react-navigation/native';

const ProductScreen = () => {
  const route = useRoute();
  const productId = route.params.productId; // Access productId from params object

  console.log('Product ID:', productId); // Console log productId

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Product Screen</Text>
      <Text style={styles.text}>Product ID: {productId}</Text> 
    </View>
  );
};

export default ProductScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});
