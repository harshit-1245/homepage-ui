import React, { useCallback } from 'react';
import { StyleSheet, Text, View, FlatList, Image, TouchableOpacity, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { productData } from "../../../apis/productApi";

const SearchFilter = ({ input }) => {
  const navigation = useNavigation();

  // Filter products based on the input text
  const filteredProducts = productData.filter(product => {
    const title = product.title?.toLowerCase() || '';
    const description = product.description?.toLowerCase() || '';
    const searchTerm = input.toLowerCase();

    return title.includes(searchTerm) || description.includes(searchTerm);
  });

  // Handle individual product click
  const handleProductClick = (productId) => {
    // Navigate to Home screen with the selected product ID (replace 'Home' with your actual screen name)
    navigation.navigate('Home', { productId });
  };

  // Render each product item
  const renderProductItem = useCallback(({ item }) => (
    <Pressable onPress={() => handleProductClick(item.id)} style={styles.pressableContainer}>
      <View style={styles.productItem}>
        <View style={styles.imageContainer}>
          <Image source={{ uri: item.images[0] }} style={styles.productImage} />
        </View>
        <View style={styles.productInfo}>
          <Text style={styles.productTitle}>{item.title}</Text>
          <Text numberOfLines={1} ellipsizeMode="tail" style={styles.productDescription}>
            {item.description}
          </Text>
          <Text style={styles.productCategory}>{item.category.name}</Text> 
        </View>
      </View>
    </Pressable>
  ), [handleProductClick]);

  return (
    <View style={styles.container}>
      <FlatList
        data={filteredProducts}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderProductItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 10,
  },
  productItem: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    padding: 10,
  },
  imageContainer: {
    marginRight: 10,
  },
  productImage: {
    width: 80,
    height: 80,
    borderRadius: 5,
  },
  productInfo: {
    flex: 1,
  },
  productTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  productDescription: {
    fontSize: 16,
    color: '#555',
  },
  productCategory: {
    marginTop: 5,
    fontSize: 14,
    color: '#777',
  },
  pressableContainer: {
    margin: 5,
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: '#f0f0f0',
  },
});

export default SearchFilter;
