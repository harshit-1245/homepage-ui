import React, { useEffect, useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View, ActivityIndicator } from 'react-native';

const CategoryScreen = () => {
  const [categories, setCategories] = useState([]);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('Electronics'); // Set a default category
  const [isLoadingCategories, setIsLoadingCategories] = useState(true);
  const [isLoadingProducts, setIsLoadingProducts] = useState(true);

  useEffect(() => {
    // Fetch products data
    fetch('https://fakestoreapi.com/products')
      .then(res => res.json())
      .then(json => {
        // Extract unique categories from the data
        const uniqueCategories = Array.from(new Set(json.map(product => product.category)));
        setCategories(uniqueCategories);

        // Set related products for the default category
        const defaultCategoryProducts = json.filter(product => product.category === selectedCategory);
        setRelatedProducts(defaultCategoryProducts);

        setIsLoadingCategories(false);
        setIsLoadingProducts(false);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setIsLoadingCategories(false);
        setIsLoadingProducts(false);
      });
  }, [selectedCategory]);

  const handleCategoryPress = (category) => {
    // Set the selected category
    setSelectedCategory(category);
    setIsLoadingProducts(true); // Show loading while fetching new data
  };

  return (
    <View style={styles.container}>
      {/* Logo */}
    

      {/* Search Bar */}
      <View style={styles.searchBar}>
        <Text style={styles.searchText}>Search Bar</Text>
      </View>

      <View style={styles.contentContainer}>
        {/* Safe Area 1 */}
        <ScrollView style={styles.safeArea1}>
          <View style={styles.logoCategoryContainer}>
            <View style={styles.logoContainer}>
              <Image source={require("../../assets/lelekart-assests.png")} style={styles.logoImage} />
              <Text style={styles.Text}>For You</Text>
            </View>
            <ScrollView style={styles.categoryContainer}>
              {isLoadingCategories ? (
                <ActivityIndicator size="large" color="#3498db" />
              ) : (
                categories.map((category, index) => (
                  <TouchableOpacity
                    key={index}
                    style={[
                      styles.optionContainer,
                      {
                        backgroundColor: category === selectedCategory ? '#3498db' : '#ecf0f1',
                      },
                    ]}
                    onPress={() => handleCategoryPress(category)}
                  >
                    <Text style={styles.optionText}>{category}</Text>
                    <View style={styles.dividerLine} />
                  </TouchableOpacity>
                ))
              )}
            </ScrollView>
          </View>
        </ScrollView>

        {/* Safe Area 2 */}
        <ScrollView style={styles.safeArea2}>
          {isLoadingProducts ? (
            <ActivityIndicator size="large" color="#3498db" />
          ) : (
            relatedProducts.map((product, index) => (
              <View key={index} style={styles.relatedProductContainer}>
                <Image source={{ uri: product.image }} style={styles.relatedProductImage} />
                <View style={styles.relatedProductInfo}>
                  <Text style={styles.relatedProductTitle}>{product.title}</Text>
                  <Text style={styles.relatedProductPrice}>{`$${product.price.toFixed(2)}`}</Text>
                </View>
              </View>
            ))
          )}
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 50,
  },
  contentContainer: {
    flexDirection: 'row', // Horizontal layout
    justifyContent: 'space-between', // Space between Safe Area 1 and Safe Area 2
  },
  logoCategoryContainer: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  logoContainer: {
    marginBottom: 20,
  },
  logoImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  searchBar: {
    alignSelf: 'center', // Center the search bar horizontally
    marginBottom: 10,
  },
  searchText: {
    fontSize: 18,
    color: '#333',
  },
  safeArea1: {
    flex: 1, // Take less space
    padding: 5, // Adjust padding as needed
  },
  safeArea2: {
    flex: 0, // Take maximum space
    padding: 10, // Adjust padding as needed
  },
  Text:{
  fontSize:16,
  textAlign:"center",
  fontWeight:"bold",
  },
  optionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
  },
  optionText: {
    fontSize: 16,
    color: '#333',
    fontWeight: 'bold',
  },
  dividerLine: {
    height: 1,
    backgroundColor: 'black',
    marginTop: 10,
  },
  categoryContainer: {
    flex: 1,
  },
  relatedProductContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    borderRadius: 8,
    backgroundColor: '#ecf0f1',
    padding: 10,
  },
  relatedProductImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  relatedProductInfo: {
    flex: 1,
  },
  relatedProductTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  relatedProductPrice: {
    fontSize: 14,
    color: 'green',
  },
});

export default CategoryScreen;
