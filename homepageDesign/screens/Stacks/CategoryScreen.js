import React, { useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";
import { list } from '../../json/list';

const CategoryScreen = () => {
  const navigation = useNavigation();
  const [selectedCategory, setSelectedCategory] = useState('Electronics');

  const handleCategoryPress = (category) => {
    setSelectedCategory(category);
  };

  const productData = [
    { id: 1, title: 'Title 1' },
    { id: 2, title: 'Title 2' },
    { id: 3, title: 'Title 3' },
    { id: 4, title: 'Title 4' },
    { id: 5, title: 'Title 5' },
    { id: 6, title: 'Title 6' },
    { id: 7, title: 'Title 7' },
    { id: 8, title: 'Title 8' },
    { id: 9, title: 'Title 9' },
    { id: 10, title: 'Title 10' },
    { id: 11, title: 'Title 11' },
    { id: 12, title: 'Title 12' },
    { id: 13, title: 'Title 13' },
    { id: 14, title: 'Title 14' },
    { id: 15, title: 'Title 15' },
    { id: 16, title: 'Title 16' },
  ];

  const chunkArray = (array, chunkSize) => {
    return Array.from({ length: Math.ceil(array.length / chunkSize) }, (_, index) => array.slice(index * chunkSize, (index + 1) * chunkSize));
  };

  const productRows = chunkArray(productData, 3);

  const navigationHandler = () => {
    navigation.navigate("Search");
  };

  const handleProductPress = (productId) => {
    console.log(`Product with ID ${productId} pressed`);
  };

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
        <ScrollView style={styles.safeArea1}>
          <View style={styles.logoContainer}>
            <Image source={require('../../assets/lelekart-assests.png')} style={styles.logoImage} />
            <Text style={styles.text}>For You</Text>
          </View>
          <ScrollView style={styles.categoryContainer} nestedScrollEnabled={false}>
            {list.map((item) => (
              <TouchableOpacity
                key={item.id}
                style={styles.categoryItem}
                onPress={() => handleCategoryPress(item.name)}
              >
                <Image style={styles.categoryImage} source={{ uri: item.image }} />
                <Text style={styles.categoryText}>{item.name}</Text>
              </TouchableOpacity>
            ))}
            <View style={styles.dividerLine} />
          </ScrollView>
        </ScrollView>

        <ScrollView style={styles.safeArea2} nestedScrollEnabled={false}>
          {productRows.map((row, rowIndex) => (
            <View key={rowIndex} style={styles.makingFit}>
              {row.map((product) => (
                <TouchableOpacity
                  key={product.id}
                  onPress={() => handleProductPress(product.id)}
                >
                  <View style={styles.relatedProductContainer}>
                    <Image source={require("../../assets/lelekart-assests.png")} style={styles.relatedProductImage} />
                    <Text style={styles.relatedProductTitle}>{product.title}</Text>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          ))}
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
    paddingHorizontal: 10,
    paddingTop: 20,
    marginBottom:100,
    backgroundColor: '#f5f5f5',
  },
  searchBar: {
    flexDirection: 'row',
    backgroundColor: '#e0e0e0',
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
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  categoryImage: {
    width: 40,
    height: 40,
    borderRadius: 8,
    marginBottom: 5,
    alignSelf: 'center',
    marginTop: 10,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  logoImage: {
    width: 80,
    height: 80,
    borderRadius: 50,
  },
  safeArea1: {
    flex: 1,
    maxWidth: 80, // Adjust the maximum width
    paddingHorizontal: 10,
    paddingTop: 0,
    backgroundColor: '#f5f5f5',
    borderRadius: 15,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    height: 580,
  },
  safeArea2: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 10,
    marginBottom: 20,
    
  },
  
  
  makingFit: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
  text: {
    fontSize: 16,
    textAlign: 'center',
    fontWeight: 'bold',
    marginTop: 10,
  },
  categoryItem: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    padding: 10,
    borderRadius: 10,
    backgroundColor: '#fff',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  categoryImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginBottom: 10,
  },
  categoryText: {
    marginTop: 5,
    fontSize: 10,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  relatedProductContainer: {
    padding:10,
    marginBottom:10,
    height:"auto"
  },
  relatedProductImage: {
    width: 60,
    height: 60,
    borderRadius: 40,
    marginBottom: 2,  // Adjust the marginBottom to reduce space
  },
  relatedProductTitle: {
    fontSize: 10,
    // fontWeight: 'bold',
    marginBottom: 1,
    color: '#333',
    textAlign: 'center', // Add this line
  },
  dividerLine: {
    height: 1,
    backgroundColor: 'rgba(0,0,0,0.1)',
    marginTop: 10,
  },
});

export default CategoryScreen;
