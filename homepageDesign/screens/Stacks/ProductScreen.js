import React, { useLayoutEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Dimensions, ScrollView } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { FontAwesome5, Ionicons,FontAwesome6, AntDesign } from '@expo/vector-icons';
import SlidingImages from '../../component/productDetailScroll/SlidingImages';
import RelatedProducts from '../../component/RelatedProduct/RelatedProducts';


const ProductScreen = () => {
  const [wishList,setWishList]=useState(false)
  const navigation = useNavigation();
  const route = useRoute();
  const item = route.params.item; // Access productId from params object
  const [selectedSize, setSelectedSize] = useState(null);

  const handleWishList=()=>{
    setWishList(!wishList)
  }

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
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <SlidingImages images={item.images} sliderBoxHeight={300}/>
      <View style={styles.productDetailsContainer}>
        <Text style={styles.productTitle}>{item.title}</Text>
        <Text style={styles.productPrice}>${item.price}</Text>
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
        <View style={styles.line1}/>
        <View>
  <Text style={styles.descriptionLabel}>Description</Text>
  <Text style={styles.descriptionText}>{item.description}</Text>
</View>
<View style={styles.line1}/>
{/* related product section */}
<View style={styles.relatedProductContainer}>
  <Text style={styles.relatedProductTitle}>Related Products You Might Like</Text>
  <ScrollView horizontal showsHorizontalScrollIndicator={false}>
    <RelatedProducts item={item.category}/>
  </ScrollView>
</View>
        {/* icons for shopping */}
        <View style={styles.styleContainer}>
  {/* Shopping section */}
  <View style={styles.shoppingSection}>
    <TouchableOpacity style={styles.iconContainer}>
      <Ionicons name="cart-sharp" size={24} color="black" />
    </TouchableOpacity>
    <TouchableOpacity style={styles.iconContainer}>
      {wishList ? (
        <AntDesign name="heart" size={24} color="black" />
        
      ):(
<AntDesign onPress={handleWishList} name="hearto" size={24} color="black" />
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
  line1: {
    marginTop:20,
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
  descriptionLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  descriptionText: {
    fontSize: 16,
    color: '#555', // Adjust the color as needed
    lineHeight: 24, // Adjust the line height as needed
    marginTop: 10, // Add spacing above the description text
    textAlign: 'justify', // Align text to justify
    fontStyle: 'italic', // Apply italic style to the text
  },
  relatedProductContainer: {
    marginTop: 10,
    paddingHorizontal: 20,
    height:249
  },
  relatedProductTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  styleContainer: {
    paddingHorizontal: 20,
    marginTop: 20,
  },
  styleContainer: {
    paddingHorizontal: 20,
    marginTop: 20,
    marginBottom:10
  },
  shoppingSection: {
    flexDirection: 'row', // Display items in the same row
    justifyContent: 'space-between', // Adjust spacing between items
    alignItems: 'center', // Align items vertically in the center
  },
  iconContainer: {
    padding: 10,
    marginHorizontal: 10, // Add margin for gap
    borderWidth: 1, // Add border
    borderColor: 'black', // Border color
    borderRadius: 5, // Border radius
    
  },
  buyNowButton: {
    backgroundColor: '#e75480',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    width: '63%', // Set the width of the button
    
  },
  buyNowButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center', // Center the text horizontally
  },
});

export default ProductScreen;
