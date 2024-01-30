import React, { useState, useEffect } from 'react';
import { FlatList, StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import axios from 'axios';

const Products = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const getApi = async () => {
      try {
        const response = await axios.get('https://api.escuelajs.co/api/v1/products');
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    getApi();
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
          <TouchableOpacity style={[styles.button, styles.buyNowButton]}>
            <Text style={styles.buttonText}>Buy Now</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.button, styles.addToCartButton]}>
            <Text style={styles.buttonText}>Add to Cart</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Products</Text>
      <FlatList
        data={products}
        renderItem={renderProductItem}
        keyExtractor={(item) => item.id.toString()}
        showsVerticalScrollIndicator={false}
      />
    </View>
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
  },
  productItemContainer: {
    marginBottom: 16,
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: '#f8f8f8',
    flexDirection: 'row',
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
    borderRadius: 4,
    alignItems: 'center',
  },
  buyNowButton: {
    backgroundColor: '#3498db',
    marginRight: 8,
  },
  addToCartButton: {
    backgroundColor: '#27ae60',
    marginLeft: 8,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default Products;
