import React, { useLayoutEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { FontAwesome5, Ionicons, AntDesign } from '@expo/vector-icons';
import SlidingImages from '../../component/productDetailScroll/SlidingImages';
import RelatedProducts from '../../component/RelatedProduct/RelatedProducts';

const ProductScreen = () => {
  const [wishList, setWishList] = useState(false);
  const [cartItemsCount, setCartItemsCount] = useState(3); // Example number of items in the cart
  const navigation = useNavigation();
  const route = useRoute();
  const item = route.params.item; // Access productId from params object
  const [selectedSize, setSelectedSize] = useState(null);

  const handleWishList = () => {
    setWishList(!wishList);
  };

  // Set header options
  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "ρяσ∂υ¢т ∂єтαιℓѕ",
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
          {cartItemsCount > 0 && (
            <View style={styles.cartItemCountContainer}>
              <Text style={styles.cartItemCount}>{cartItemsCount}</Text>
            </View>
          )}
        </TouchableOpacity>
      )
    });
  }, [cartItemsCount, navigation]);

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <SlidingImages images={item.images} sliderBoxHeight={300} />
      <View style={styles.productDetailsContainer}>
        <Text style={styles.productTitle}>{item.title}</Text>
        <Text style={styles.productPrice}>${item.price}</Text>
        {/* Additional product details can be added here */}
      </View>
      <View style={styles.line} />
      <View style={styles.sizeContainer}>
        <Text style={styles.sizeLabel}>Size</Text>
        <View style={styles.sizeOptionsContainer}>
          {/* Size options */}
          <View style={styles.sizeOptionsContainer}>
  <TouchableOpacity
    onPress={() => setSelectedSize('S')}
    style={selectedSize === 'S' ? [styles.sizeOption, styles.selectedSizeOption] : styles.sizeOption}>
    <Text style={selectedSize === 'S' ? [styles.sizeText, styles.selectedSizeText] : styles.sizeText}>S</Text>
  </TouchableOpacity>
  <TouchableOpacity
    onPress={() => setSelectedSize('M')}
    style={selectedSize === 'M' ? [styles.sizeOption, styles.selectedSizeOption] : styles.sizeOption}>
    <Text style={selectedSize === 'M' ? [styles.sizeText, styles.selectedSizeText] : styles.sizeText}>M</Text>
  </TouchableOpacity>
  <TouchableOpacity
    onPress={() => setSelectedSize('L')}
    style={selectedSize === 'L' ? [styles.sizeOption, styles.selectedSizeOption] : styles.sizeOption}>
    <Text style={selectedSize === 'L' ? [styles.sizeText, styles.selectedSizeText] : styles.sizeText}>L</Text>
  </TouchableOpacity>
  <TouchableOpacity
    onPress={() => setSelectedSize('XL')}
    style={selectedSize === 'XL' ? [styles.sizeOption, styles.selectedSizeOption] : styles.sizeOption}>
    <Text style={selectedSize === 'XL' ? [styles.sizeText, styles.selectedSizeText] : styles.sizeText}>XL</Text>
  </TouchableOpacity>
</View>
        </View>
        <View style={styles.line1} />
        <View>
          <Text style={styles.descriptionLabel}>Description</Text>
          <Text style={styles.descriptionText}>{item.description}</Text>
        </View>
        <View style={styles.line1} />
        {/* Related product section */}
        <View style={styles.relatedProductContainer}>
          <Text style={styles.relatedProductTitle}>Related Products You Might Like</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <RelatedProducts item={item.category} />
          </ScrollView>
        </View>
        {/* Icons for shopping */}
        <View style={styles.styleContainer}>
          {/* Shopping section */}
          <View style={styles.shoppingSection}>
            <TouchableOpacity style={styles.iconContainer}>
              <Ionicons name="cart-sharp" size={24} color="black" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconContainer} onPress={handleWishList}>
              {wishList ? (
                <AntDesign name="heart" size={24} color="black" />
              ) : (
                <AntDesign name="hearto" size={24} color="black" />
              )}
            </TouchableOpacity>
            {/* Buy Now button */}
            <TouchableOpacity style={styles.buyNowButton}>
              <Text style={styles.buyNowButtonText}>Buy Now</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

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
    width: '100%',
  },
  line1: {
    marginTop: 20,
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    width: '100%',
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
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  sizeOption: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 5,
  },
  selectedSizeOption: {
    backgroundColor: 'orange',
  },
  sizeText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  selectedSizeText: {
    color: 'white',
  },
  descriptionLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  descriptionText: {
    fontSize: 16,
    color: '#555',
    lineHeight: 24,
    marginTop: 10,
    textAlign: 'justify',
    fontStyle: 'italic',
  },
  relatedProductContainer: {
    marginTop: 10,
    paddingHorizontal: 20,
    height: 249,
  },
  relatedProductTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  styleContainer: {
    paddingHorizontal: 20,
    marginTop: 20,
    marginBottom: 10,
  },
  shoppingSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  iconContainer: {
    padding: 10,
    marginHorizontal: 10,
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 5,
  },
  buyNowButton: {
    backgroundColor: '#e75480',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    width: '63%',
  },
  buyNowButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
  },
  cartItemCountContainer: {
    position: 'absolute',
    top: -3, // Adjust the position according to your design
    right: -6, // Adjust the position according to your design
    backgroundColor: 'red',
    borderRadius: 50,
    paddingHorizontal: 8,
    paddingVertical: 4,
},
  cartItemCount: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 12,
  },
});

export default ProductScreen;
