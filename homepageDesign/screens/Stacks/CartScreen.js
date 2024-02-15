import React from 'react';
import { Image, Pressable, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import { AntDesign, EvilIcons, MaterialIcons } from '@expo/vector-icons';

const CartScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsHorizontalScrollIndicator={false}>
      {/* Header */}
      <View style={styles.header}>
        <AntDesign name="menu-fold" size={24} color="black" style={styles.icon} />
        <Text style={styles.headerText}>My Cart</Text>
      </View>
      {/* Address Section */}
      <Pressable style={styles.addressContainer}>
        <EvilIcons name="location" size={24} color="black" style={styles.addressIcon} />
        <View style={styles.addressTextContainer}>
          <Text style={styles.addressText}>Deliver to:</Text>
          <Text style={styles.address}>Harshit - Varanasi 232103</Text>
        </View>
        <Pressable style={styles.changeTextContainer}>
          <Text style={styles.changeText}>Change</Text>
        </Pressable>
      </Pressable>
      {/* Product Section */}
      <View style={styles.productContainer}>
        <Image source={require("../../assets/facebook.png")} style={styles.productImage}/>
        <View style={styles.productDetails}>
          <Text style={styles.productTitle}>Mens Clothing</Text>
          <Text style={styles.productSize}>Size: S</Text>
          <Text style={styles.productRating}>Rating</Text>
          <Text style={styles.productStock}>In Stock</Text>
          <View style={styles.actionContainer}>
            <Pressable style={styles.findSimilarButton}>
              <Text style={styles.findSimilarText}>Find Similar</Text>
              <MaterialIcons name="keyboard-arrow-right" size={24} color="black" />
            </Pressable>
            <View style={styles.quantityContainer}>
              <Text style={styles.quantityLabel}>Quantity:</Text>
              <Pressable style={styles.quantityButton}>
                <Text style={styles.quantityButtonText}>-</Text>
              </Pressable>
              <Text style={styles.quantityText}>3</Text>
              <Pressable style={styles.quantityButton}>
                <Text style={styles.quantityButtonText}>+</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </View>
      <View style={styles.actionsContainer}>
        <Pressable style={styles.actionButton}>
          <MaterialIcons name="delete" size={24} color="black" />
          <Text style={styles.actionButtonText}>Remove</Text>
        </Pressable>
        <Pressable style={styles.actionButton}>
          <AntDesign name="save" size={24} color="black" />
          <Text style={styles.actionButtonText}>Save</Text>
        </Pressable>
      </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    marginTop: 36
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  icon: {
    marginRight: 8,
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  addressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  addressIcon: {
    marginRight: 8,
  },
  addressTextContainer: {
    flex: 1,
    marginRight: 8,
  },
  addressText: {
    fontSize: 13,
    fontWeight: '500',
    color: '#333',
  },
  address: {
    fontSize: 13,
    fontWeight: '500',
    color: '#333',
  },
  changeTextContainer: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 8,
    backgroundColor: '#f0f0f0',
  },
  changeText: {
    fontSize: 12,
    color: '#666',
  },
  productContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    alignItems: 'center',
  },
  productImage: {
    width: 80,
    height: 80,
    resizeMode: 'cover',
    marginRight: 16,
  },
  productDetails: {
    flex: 1,
  },
  productTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  productSize: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  productRating: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  productStock: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  actionContainer: {
    marginTop: 8,
  },
  findSimilarButton: {
    flexDirection: 'row',
    alignItems: 'center',
    
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 4,
    marginBottom: 8,
  },
  findSimilarText: {
    fontSize: 14,
    color: '#666',
    marginRight: 8,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantityLabel: {
    fontSize: 14,
    color: '#666',
    marginRight: 12,
  },
  quantityButton: {
    backgroundColor: '#f0f0f0',
    padding: 8,
    borderRadius: 4,
  },
  quantityButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#666',
  },
  quantityText: {
    fontSize: 18,
    marginHorizontal: 12,
  },
  actionsContainer: {
    paddingHorizontal: 16,
    paddingBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  actionButton: {
    flexDirection:"row",
    backgroundColor: '#e7edd3',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 4,
    width: '48%',
    alignItems: 'center',
    marginTop:5,
  },
  actionButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
    marginLeft: 8,
  },
});

export default CartScreen;
