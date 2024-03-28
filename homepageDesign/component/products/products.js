import React, { useEffect, useState, useCallback, useLayoutEffect, useContext } from 'react';
import { FlatList, StyleSheet, Text, Image, TouchableOpacity, ActivityIndicator, View, Pressable, Alert,ToastAndroid } from 'react-native';
import useProductStore from '../../src/store/productStore';
import { useNavigation, useRoute } from "@react-navigation/native"; // Import useNavigation hook
import { productData } from '../../apis/productApi';
import useCartStore from '../../src/store/cartStore';
import { Ionicons, FontAwesome5, Entypo } from '@expo/vector-icons'; // Import icons from expo

import { UserType } from '../../context/contextApi';

const Products = () => {
  const {userId}=useContext(UserType)
  const navigation = useNavigation(); // Initialize useNavigation hook
  const { cartItems,addToCart } = useCartStore();

  const { products, fetchProducts, loading } = useProductStore(); //used zustand
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

   const handleCart=(item)=>{
    addToCart(item)
    ToastAndroid.showWithGravity(
      "Item added successfully",
      ToastAndroid.SHORT,
      ToastAndroid.BOTTOM
    );
   }

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

          <TouchableOpacity onPress={()=>handleCart(item)} style={[styles.button, styles.addToCartButton]}>
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
