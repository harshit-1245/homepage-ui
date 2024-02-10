import React, { useContext } from 'react';
import { View, Text, ScrollView, StyleSheet, ViewPropTypes } from 'react-native';
import { UserType } from '../../context/contextApi';
import TopContainer from '../../component/topcontainer/TopContainer';
import ImageScrolling from '../../component/imageScrolling/ImageScrolling';
import Category from '../../component/category-home/Category';
import Suggetion from '../../component/suggetionBox/suggetion';
import CartItem from '../../component/cartItem/CartItem';
import Products from '../../component/products/products';

const HomeScreen = () => {
  const { authenticated } = useContext(UserType);

  return (
    <ScrollView style={{ marginTop: 35 }} showsVerticalScrollIndicator={false}>
      <TopContainer />
      <ImageScrolling style={styles.customImageScrolling} />
      <Category />
      <Suggetion />
      {/* Conditional rendering of cart item based on authentication */}
      {authenticated ? (
        <CartItem />
      ) : (
        <View style={styles.loginPrompt}>
          <Text style={styles.loginPromptText}>Please login to view your cart</Text>
        </View>
      )}
      <Products />
    </ScrollView>
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
