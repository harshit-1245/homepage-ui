// HomeScreen.js
import { ScrollView, StyleSheet, View, ViewPropTypes } from 'react-native';
import React from 'react';
import TopContainer from '../../component/topcontainer/TopContainer';
import ImageScrolling from '../../component/imageScrolling/imageSrolling';
import TrandingList from '../../component/trandingList/TrandingList';

const HomeScreen = () => {
  return (
    <>
      <ScrollView style={{ marginTop: 30 }}>
        
          <TopContainer />
          <ImageScrolling style={styles.customImageScrolling} />
          <TrandingList />
      
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
