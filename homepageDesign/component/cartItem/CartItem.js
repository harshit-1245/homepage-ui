import React, { useEffect, useState, useCallback } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, FlatList, Image, Pressable } from 'react-native';
import axios from "axios";
import { useNavigation } from "@react-navigation/native"; // Import useNavigation hook
import useCartStore from '../../src/store/cartStore';

const RenderCartItem = React.memo(({ item }) => {
  
  return (
    <View style={styles.cartItemContainer}>
      <Image source={{ uri: item.images[0] }} style={styles.cartItemImage} />
      <View style={styles.cartItemDetails}>
        <Text style={styles.cartItemTitle}>{item.title}</Text>
        <Text style={styles.cartItemOffer}>{item.offer} off</Text>
      </View>
    </View>
  );
});

const CartItem = () => {
  const navigation = useNavigation(); // Get navigation object
  const [cartItem, setCartItem] = useState([]);
  const {addToCart}=useCartStore()

  const fetchData = useCallback(async () => {
    try {
      const response = await axios.get("http://192.168.29.163:4000/getCart");
      const fetchedItems = response.data.data.cartItem;
      setCartItem(fetchedItems);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);
  useEffect(() => {
    fetchData();
  }, [cartItem]);

  return (
    <View style={styles.container}>
      <Text style={styles.cartText}>Your Shopping Cart</Text>
      <FlatList
        data={cartItem}
        renderItem={({ item }) => <RenderCartItem item={item} />}
        keyExtractor={(item, index) => (item.id ? item.id.toString() : index.toString())}
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.cartItemsList}
      />
      <TouchableOpacity
        style={styles.cartButton}
        onPress={()=>navigation.navigate("Cart")}
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
    elevation: 3,
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
