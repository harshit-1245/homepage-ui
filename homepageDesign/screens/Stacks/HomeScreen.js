import React, { useContext, useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, ViewPropTypes } from 'react-native';
import { UserType } from '../../context/contextApi';
import TopContainer from '../../component/topcontainer/TopContainer';
import ImageScrolling from '../../component/imageScrolling/ImageScrolling';
import Category from '../../component/category-home/Category';
import Suggetion from '../../component/suggetionBox/suggetion';
import CartItem from '../../component/cartItem/CartItem';
import Products from '../../component/products/products';


const HomeScreen = () => {
  const { authenticated } = useContext(UserType);

 
  // Data for FlatList
  const data = [
    { type: 'topContainer' },
    { type: 'imageScrolling' },
    { type: 'category' },
    { type: 'suggestion' },
    { type: authenticated ? 'cartItem' : 'loginPrompt' },
    { type: 'products' },
  ];

  // Render item based on type
  const renderItem = ({ item }) => {
    switch (item.type) {
      case 'topContainer':
        return <TopContainer />;
      case 'imageScrolling':
        return <ImageScrolling style={styles.customImageScrolling} />;
      case 'category':
        return <Category />;
      case 'suggestion':
        return <Suggetion />;
      case 'cartItem':
        return <CartItem />;
      case 'loginPrompt':
        return (
          <View style={styles.loginPrompt}>
            <Text style={styles.loginPromptText}>Please login to view your cart</Text>
          </View>
        );
      case 'products':
        return <Products />;
      default:
        return null;
    }
  };

  return (
    <FlatList
      data={data}
      renderItem={renderItem}
      keyExtractor={(item, index) => index.toString()} // or provide unique keys if available
      style={{ marginTop: 35 }}
      showsVerticalScrollIndicator={false}
    />
  );
};

// Use ViewPropTypes for the style prop
HomeScreen.propTypes = {
  style: ViewPropTypes.style,
};

const styles = StyleSheet.create({
  customImageScrolling: {
    marginHorizontal: -18,
    marginBottom: 0,
  },
  loginPrompt: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  loginPromptText: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#555',
    paddingHorizontal: 20,
  },
});

export default HomeScreen;
