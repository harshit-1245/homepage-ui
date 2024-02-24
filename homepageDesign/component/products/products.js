import React, { useEffect, useState, useCallback, useLayoutEffect } from 'react';
import { FlatList, StyleSheet, Text, Image, TouchableOpacity, ActivityIndicator, View, Pressable, Alert } from 'react-native';
import useProductStore from '../../src/store/productStore';
import { useNavigation, useRoute } from "@react-navigation/native"; // Import useNavigation hook
import { productData } from '../../apis/productApi';
import useCartStore from '../../src/store/cartStore';
import { Ionicons, FontAwesome5, Entypo } from '@expo/vector-icons'; // Import icons from expo
import axios from"axios"

const Products = () => {
  const navigation = useNavigation(); // Initialize useNavigation hook
  const { cartItems,addToCart } = useCartStore();

  const { products, fetchProducts, loading } = useProductStore(); //used zustand
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);


  const loadProducts = useCallback(() => {
    fetchProducts(page, pageSize);
    setPage((prevPage) => prevPage + 1);
  }, [fetchProducts, page, pageSize]);

  const loadCachedProducts = useCallback(async () => {
    loadProducts();
  }, [loadProducts]);

  useEffect(() => {
    loadCachedProducts();
  }, []);
  const handleCart = async (item) => {
    try {
      const itemInCart=cartItems.some(cartItem=>cartItem.id === item.id);
      if (itemInCart) {
        // Show an alert if the item is already in the cart
        Alert.alert('Item Already in Cart', 'This item is already in your cart.');
      } else{
        const response = await axios.post('http://192.168.29.163:4000/cart', {
          title: item.title,
          images: item.images[0],
          description:item.description,
          price:item.price
         
        });
        if(response.status === 201){
          
          addToCart(item)
        }
      }
      // Make an HTTP POST request to your backend API endpoint
      
       
     
    } catch (error) {
      console.error('Error while sending data to backend:', error);

      // Log the error response from the server if available
      if (error.response) {
        console.error('Error response from server:', error.response.data);
      }
    }
  };



  const renderProductItem = ({ item }) => (
    <View style={styles.productItemContainer}>
      <Image source={{ uri: item.images[0] }} style={styles.productItemImage} />
      <View style={styles.productItemDetails}>
        <Text style={styles.productItemTitle}>{item.title}</Text>
        <Text style={styles.productItemPrice}>${item.price}</Text>
        <Text style={styles.productItemDescription} numberOfLines={3}>
          {item.description}
        </Text>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.button, styles.buyNowButton]}
            onPress={() => navigation.navigate("Product", {
              item: item,
            })}
          >
            <View style={styles.buttonText}>
              <Image style={{ width: 20, height: 20 }} source={require("../../assets/production.png")} />
           
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => handleCart(item)} style={[styles.button, styles.addToCartButton]}>
            <View style={styles.buttonText}>
              <Entypo name="shopping-cart" size={24} color="#27ae60" />
             
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  const keyExtractor = (item) => item.id.toString();

  const renderFooter = () => (
    loading ? <ActivityIndicator style={{ marginVertical: 20 }} size="large" color="#3498db" /> : null
  );

  return (
    <>
      <FlatList
        style={styles.container}
        data={productData}
        renderItem={renderProductItem}
        keyExtractor={keyExtractor}
        onEndReached={loadProducts}
        onEndReachedThreshold={0.5}
        ListFooterComponent={renderFooter}
        ListHeaderComponent={<Text style={styles.headerText}>Products</Text>}

      />

    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  productItemContainer: {
    marginBottom: 16,
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: '#f8f8f8',
    flexDirection: 'row',
    alignItems: 'center',
  },
  productItemImage: {
    width: 150,
    height: 200,
    borderRadius: 8,
  },
  productItemDetails: {
    flex: 1,
    padding: 16,
  },
  productItemTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  productItemPrice: {
    fontSize: 16,
    color: '#e44d26',
    marginBottom: 8,
  },
  productItemDescription: {
    fontSize: 14,
    color: '#555',
    marginBottom: 8,
    lineHeight: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    marginTop: 8,
  },
  button: {
    flex: 1,
    padding: 12,
    borderRadius: 20,
    alignItems: 'center',
  },
  buyNowButton: {
    backgroundColor: '#fff',
    marginRight: 8,
    borderWidth: 2,
    borderColor: '#3498db',
  },
  addToCartButton: {
    backgroundColor: '#fff',
    marginLeft: 8,
    borderWidth: 2,
    borderColor: '#27ae60',
  },
  buttonText: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default Products;
