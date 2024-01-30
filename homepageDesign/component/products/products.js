import React, { useEffect, useState, useCallback, useMemo } from 'react';
import { FlatList, StyleSheet, Text, View, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import useProductStore from '../../src/store/productStore';

const Products = () => {
  const { products, fetchProducts, loading } = useProductStore();
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10); // Set the number of products per page

  const loadProducts = useCallback(() => {
    fetchProducts(page, pageSize);
    setPage((prevPage) => prevPage + 1);
  }, [fetchProducts, page, pageSize]);

  const loadCachedProducts = useCallback(async () => {
    // You may add caching logic here if needed
    // Since Zustand already provides a local state, AsyncStorage-like caching may not be necessary
    loadProducts();
  }, [loadProducts]);

  useEffect(() => {
    loadCachedProducts();
  }, []);

  const renderProductItem = useCallback(({ item }) => (
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
  ), []);

  const renderFooter = useMemo(() => {
    return loading ? (
      <ActivityIndicator style={{ marginVertical: 20 }} size="large" color="#3498db" />
    ) : null;
  }, [loading]);

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Products</Text>
      <FlatList
        data={products}
        renderItem={renderProductItem}
        keyExtractor={(item) => item.id.toString()}
        showsVerticalScrollIndicator={false}
        onEndReached={loadProducts}
        onEndReachedThreshold={0.5}
        ListFooterComponent={renderFooter}
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
