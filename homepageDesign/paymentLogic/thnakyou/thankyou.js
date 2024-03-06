import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const ThankYouScreen = () => {
  return (
    <View style={styles.container}>
      <View>
        <Image style={styles.image} source={require('../../assets/order.png')} />
      </View>
      <Text style={styles.thankYouText}>Thank You, Come Again</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    width: "100%",
    height: 200,
  },
  thankYouText: {
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
  },
});

export default ThankYouScreen;