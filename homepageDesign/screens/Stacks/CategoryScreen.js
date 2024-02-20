import React, { useState, useCallback, useContext } from 'react';
import { Image, FlatList, StyleSheet, Text, TouchableOpacity, View, Dimensions, Pressable } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";
import { productData } from '../../apis/productApi';

const CategoryScreen = () => {
  
  const navigation = useNavigation();
  const [selectedCategory, setSelectedCategory] = useState('Electronics');
  const [filteredProducts, setFilteredProducts] = useState([]);

  const handleCategoryPress = useCallback((category) => {
    setSelectedCategory(category);
    // Filter products based on the selected category
    const filteredProducts = productData.filter(product => product.category && product.category.name === category);
    setFilteredProducts(filteredProducts);
  }, []);
  
  function getCategories(productData) {
    const categoriesMap = new Map(); // Using a Map to ensure uniqueness and preserve insertion order
    
    // Iterate over each product
    productData.forEach(product => {
      // Check if the category exists
      if (product.category && product.category.name && product.category.image) {
        // Add category name and image to the Map if it doesn't already exist
        if (!categoriesMap.has(product.category.name)) {
          categoriesMap.set(product.category.name, product.category.image);
        }
      }
    });
    
    // Convert Map to array of objects and return
    return Array.from(categoriesMap, ([name, image]) => ({ name, image }));
  }
  
  const categories = getCategories(productData);
  

  const chunkArray = (array, chunkSize) => {
    return Array.from({ length: Math.ceil(array.length / chunkSize) }, (_, index) => array.slice(index * chunkSize, (index + 1) * chunkSize));
  };

  const productRows = chunkArray(filteredProducts.length > 0 ? filteredProducts : productData, 2);

  const navigationHandler = useCallback(() => {
    navigation.navigate("Search");
  }, [navigation]);

  

  const renderCategoryItem = useCallback(({ item }) => (
    <TouchableOpacity
      style={[styles.categoryItem, { backgroundColor: selectedCategory === item.name ? '#FFD700' : '#FFFFFF' }]}
      onPress={() => handleCategoryPress(item.name)}
    >
      <Image style={styles.categoryImage} source={{ uri: item.image }} />
      <Text style={styles.categoryText}>{item.name}</Text>
    </TouchableOpacity>
  ), [handleCategoryPress, selectedCategory]);

  const renderProductItem = useCallback(({ item }) => (
    <TouchableOpacity
    
      style={styles.productItem}
      onPress={() => navigation.navigate("Product",{
        item:item,
      })}
    >
      <View style={styles.productContainer}>
        <Image source={{uri:item.images[0]}} style={styles.productImage} />
        <Text numberOfLines={1} style={styles.productTitle}>{item.title}</Text>
      </View>
    </TouchableOpacity>
  ), [navigation]);

  return (
    <View style={styles.container}>
      {/* Search Bar */}
      <TouchableOpacity onPress={navigationHandler} style={styles.searchBar}>
        <View style={styles.searchIcon}>
          <Feather name="search" size={25} color="#555" />
        </View>
        <View style={styles.searchText}>
          <Text style={styles.searchInput}>Search...</Text>
        </View>
      </TouchableOpacity>

      <View style={styles.contentContainer}>
      <FlatList
  data={categories}
  renderItem={renderCategoryItem}
  keyExtractor={(item) => item.name} // Use category name as the key
  horizontal
  style={styles.categoryList}
/>

<FlatList
  data={productRows}
  renderItem={({ item }) => (
    <FlatList
      data={item}
      renderItem={renderProductItem}
      keyExtractor={(product, index) => product.id.toString()} // Use product ID as the key
      numColumns={2}
      showsVerticalScrollIndicator={false}
      style={styles.productList}
    />
  )}
  keyExtractor={(item, index) => index.toString()}
/>
      </View>
    </View>
  );
};

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
    paddingHorizontal: 10,
    paddingTop: 20,
    backgroundColor: '#F5F5F5',
  },
  searchBar: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 25,
    alignItems: 'center',
    paddingHorizontal: 15,
    marginBottom: 10,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    marginBottom: 30,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchText: {
    flex: 1,
  },
  searchInput: {
    fontSize: 16,
    color: '#555',
    fontStyle: 'italic',
    margin: 10,
  },
  contentContainer: {
    flex: 1,
    flexDirection: 'column',
    padding: 10,
  },
  categoryList: {
    maxHeight: 60,
    marginBottom: 20,
  },
  categoryItem: {
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 15,
    borderWidth: 1,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  categoryImage: {
    width: 30,
    height: 30,
    marginBottom: 10,
    alignSelf: 'center',
  },
  categoryText: {
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  productItem: {
    flex: 1,
    margin: 10,
    borderRadius: 15,
    overflow: 'hidden',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 2,
   
  },
  productList: {
    flexGrow: 0,
  },
  productContainer: {
    padding: 15,
    borderRadius: 15,
    backgroundColor: '#FFFFFF',
  },
  productImage: {
    width: '100%',
    height: 120,
    borderRadius: 8,
    marginBottom: 10,
    alignSelf: 'center',
  },
  productTitle: {
    marginTop: 10,
    fontSize: 14,
    textAlign: 'center',
  },
});

export default CategoryScreen;
