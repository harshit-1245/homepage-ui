import React, { useLayoutEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Dimensions, ScrollView } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { FontAwesome5, Ionicons } from '@expo/vector-icons';
import SlidingImages from '../../component/productDetailScroll/SlidingImages';

const ProductScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const productId = route.params.productId; // Access productId from params object
  const images = route.params.images; // Access productId from params object
  const title = route.params.title;
  const price = route.params.price;
  console.log(price)

  const [selectedSize, setSelectedSize] = useState(null);

  // Set header options
  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle:"ρяσ∂υ¢т ∂єтαιℓѕ",
      headerLeft: () => (
        <TouchableOpacity
          style={styles.headerButton}
          onPress={() => navigation.goBack()}>
          <FontAwesome5 name="chevron-left" size={20} color="black" />
        </TouchableOpacity>
      ),
      headerRight: () => (
        <TouchableOpacity
          style={styles.headerButton}
          onPress={() => {/* Handle cart action */}}>
          <Ionicons name="cart-outline" size={24} color="black" />
        </TouchableOpacity>
      )
    });
  }, [navigation]);

  return (
    <ScrollView style={styles.container}>
      <SlidingImages images={images} sliderBoxHeight={300}/>
      <View style={styles.productDetailsContainer}>
        <Text style={styles.productTitle}>{title}</Text>
        <Text style={styles.productPrice}>${price}</Text>
        {/* Additional product details can be added here */}
      </View>
      <View style={styles.line}/>
      <View style={styles.sizeContainer}>
        <Text style={styles.sizeLabel}>Size</Text>
        <View style={styles.sizeOptionsContainer}>
          <TouchableOpacity
            style={[styles.sizeOption, selectedSize === 'S' && styles.selectedSizeOption]}
            onPress={() => setSelectedSize('S')}>
            <Text style={[styles.sizeText, selectedSize === 'S' && styles.selectedSizeText]}>S</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.sizeOption, selectedSize === 'M' && styles.selectedSizeOption]}
            onPress={() => setSelectedSize('M')}>
            <Text style={[styles.sizeText, selectedSize === 'M' && styles.selectedSizeText]}>M</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.sizeOption, selectedSize === 'L' && styles.selectedSizeOption]}
            onPress={() => setSelectedSize('L')}>
            <Text style={[styles.sizeText, selectedSize === 'L' && styles.selectedSizeText]}>L</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.sizeOption, selectedSize === 'XL' && styles.selectedSizeOption]}
            onPress={() => setSelectedSize('XL')}>
            <Text style={[styles.sizeText, selectedSize === 'XL' && styles.selectedSizeText]}>XL</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.sizeOption, selectedSize === 'XXL' && styles.selectedSizeOption]}
            onPress={() => setSelectedSize('XXL')}>
            <Text style={[styles.sizeText, selectedSize === 'XXL' && styles.selectedSizeText]}>XXL</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const windowWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  headerButton: {
    padding: 10,
  },
  productDetailsContainer: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 10,
  },
  productTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  productPrice: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#e44d26',
    marginBottom: 20,
  },
  line: {
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    width: '100%', // Adjust width as needed
  },
  sizeContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  sizeLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  sizeOptionsContainer: {
    width:"100%",
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  sizeOption: {
    width: 40,
    height: 40,
    borderRadius: 20, // Half of the width and height to make it circular
    borderWidth: 1,
    borderColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 5, // Adjust spacing between options
  },
  selectedSizeOption: {
    backgroundColor: 'orange', // Change background color when selected
  },
  sizeText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  selectedSizeText: {
    color: 'white', // Change text color when selected
  },
});

export default ProductScreen;
