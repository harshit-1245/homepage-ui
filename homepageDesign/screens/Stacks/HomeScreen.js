// HomeScreen.js
import { Pressable, ScrollView, StyleSheet, Text, View, ViewPropTypes } from 'react-native';
import React from 'react';
import TopContainer from '../../component/topcontainer/TopContainer';

import TrandingList from '../../component/trandingList/TrandingList';
import ImageScrolling from '../../component/imageScrolling/ImageScrolling';
import Category from '../../component/category-home/Category';
import { useNavigation } from "@react-navigation/native";


const HomeScreen = () => {
  const navigation = useNavigation()
  return (
    <>
      <ScrollView style={{ marginTop: 30 }}>
        
          <TopContainer />
          <ImageScrolling style={styles.customImageScrolling} />
          <Category/>
           <Pressable onPress={()=>navigation.navigate("Register")}>
          <Text>Logout</Text>
          </Pressable>
      
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
