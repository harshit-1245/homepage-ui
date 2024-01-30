import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Dimensions, FlatList, Image } from 'react-native';

const { width } = Dimensions.get('window');

const CartItem = () => {
  const cartItems = [
    { id: 1, title: "TedheMedhe", image: "https://dookan.com/cdn/shop/products/Kurkure-Naughty-Tomato-90-g_a6f3f8ab-7022-41e6-9523-0ba92fed706a.png?v=1701352858", offer: "83%" },
    { id: 2, title: "Java Book", image: "https://5.imimg.com/data5/UH/FC/MY-28838716/java-3a-the-complete-reference-seventh-edition.png", offer: "75%" },
    { id: 3, title: "iPhone 15 pro", image: "https://www.imagineonline.store/cdn/shop/files/iPhone_15_Pink_PDP_Image_Position-1__en-IN_823x.jpg?v=1694605258", offer: "66%" }
  ];

  const renderCartItem = ({ item }) => {
    return (
      <View style={styles.cartItemContainer}>
        <Image source={{ uri: item.image }} style={styles.cartItemImage} />
        <View style={styles.cartItemDetails}>
          <Text style={styles.cartItemTitle}>{item.title}</Text>
          <Text style={styles.cartItemOffer}>{item.offer} off</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.cartText}>Your Shopping Cart</Text>
      <FlatList
        data={cartItems}
        renderItem={renderCartItem}
        keyExtractor={(item) => item.id.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.cartItemsList}
      />
      <TouchableOpacity
        style={styles.cartButton}
        onPress={() => console.log("Navigate to Cart")}
      >
        <Text style={styles.buttonText}>Go to Cart</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#fff",
    borderRadius: 12,
    marginBottom: 16,
    elevation: 3, // Add elevation for a subtle shadow on Android
  },
  cartText: {
    fontWeight: "bold",
    fontSize: 20,
    color: "#333",
    marginBottom: 12,
  },
  cartItemsList: {
    marginBottom: 12,
  },
  cartItemContainer: {
    flexDirection: "column",
    marginRight: 16,
    backgroundColor: "#f8f8f8",
    borderRadius: 8,
    padding: 8,
    width: 120,
  },
  cartItemImage: {
    width: '100%',
    height: 80,
    borderRadius: 8,
    marginBottom: 8,
  },
  cartItemDetails: {
    marginTop: 4,
  },
  cartItemTitle: {
    fontWeight: "bold",
    fontSize: 14,
    color: "#333",
  },
  cartItemOffer: {
    color: "#e44d26",
  },
  cartButton: {
    backgroundColor: "#e44d26",
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 24,
  },
  buttonText: {
    fontWeight: "bold",
    fontSize: 16,
    color: "#fff",
  },
});

export default CartItem;
