import React, { useState, useCallback, useContext } from 'react';
import { Image, FlatList, StyleSheet, Text, TouchableOpacity, View, Dimensions } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";
import { list } from '../../json/list';
import { UserType } from '../../context/contextApi';
import { productData } from '../../apis/products2Api';


const CategoryScreen = () => {
  const {products}=useContext(UserType)
  const navigation = useNavigation();
  const [selectedCategory, setSelectedCategory] = useState('Electronics');

  const handleCategoryPress = useCallback((category) => {
    setSelectedCategory(category);
  }, []);

 

  const chunkArray = (array, chunkSize) => {
    return Array.from({ length: Math.ceil(array.length / chunkSize) }, (_, index) => array.slice(index * chunkSize, (index + 1) * chunkSize));
  };

  const productRows = chunkArray(productData, 2);

  const navigationHandler = useCallback(() => {
    navigation.navigate("Search");
  }, [navigation]);

  const handleProductPress = useCallback((productId) => {
    console.log(`Product with ID ${productId} pressed`);
  }, []);

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
      onPress={() => handleProductPress(item.id)}
    >
      <View style={styles.productContainer}>
        <Image source={{uri:item.image}} style={styles.productImage} />
        <Text numberOfLines={1} style={styles.productTitle}>{item.title}</Text>
      </View>
    </TouchableOpacity>
  ), [handleProductPress]);

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
          data={list}
          renderItem={renderCategoryItem}
          keyExtractor={(item) => item.id.toString()}
          horizontal
          style={styles.categoryList}
        />

        <FlatList
          data={productRows}
          renderItem={({ item }) => (
            <FlatList
              data={item}
              renderItem={renderProductItem}
              keyExtractor={(product) => product.id.toString()}
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
