import React, { useContext, useEffect } from 'react';
import { Pressable, SafeAreaView, ScrollView, StyleSheet, Text, View, ViewPropTypes } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Import AsyncStorage
import { useNavigation } from "@react-navigation/native";
import { UserType } from '../../context/contextApi';
import TopContainer from '../../component/topcontainer/TopContainer';
import TrandingList from '../../component/trandingList/TrandingList';
import ImageScrolling from '../../component/imageScrolling/ImageScrolling';
import Category from '../../component/category-home/Category';
import Suggetion from '../../component/suggetionBox/suggetion';
import CartItem from '../../component/cartItem/CartItem';
import Products from '../../component/products/products';

const HomeScreen = () => {
  
  

  const navigation = useNavigation();

  return (
    <>
      <SafeAreaView></SafeAreaView>
      
      <ScrollView style={{ marginTop: 30 }}>
        <TopContainer />
        <ImageScrolling style={styles.customImageScrolling} />
        <Category />
        {/* suggetion for you */}
        <Suggetion />
        {/* cart item in home page */}
        <CartItem />
        {/* products */}
        <Products />
      </ScrollView>
    </>
  );
};
// Use ViewPropTypes for the style prop
HomeScreen.propTypes = {
  style: ViewPropTypes.style,
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  customImageScrolling: {
    marginHorizontal: -18,
    marginBottom: 0,
  },
});

export default HomeScreen;
