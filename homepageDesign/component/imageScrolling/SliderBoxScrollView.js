import React, { useRef, useState, useEffect } from 'react';
import { View, ScrollView, Image, StyleSheet, Dimensions } from 'react-native';



const SliderBoxScrollView = ({ images = [], sliderBoxHeight = 200 }) => {

 
  const scrollViewRef = useRef();
  const [currentPage, setCurrentPage] = useState(0);

  const handleScroll = (event) => {
    const offsetX = event.nativeEvent.contentOffset.x;
    const pageIndex = Math.floor(offsetX / Dimensions.get('window').width);
    setCurrentPage(pageIndex);
  };

  useEffect(() => {
    // Auto-scroll to the next page every 3 seconds (adjust the interval as needed)
    const interval = setInterval(() => {
      if (currentPage < images.length - 1) {
        scrollViewRef.current.scrollTo({
          animated: true,
          x: Dimensions.get('window').width * (currentPage + 1),
        });
      } else {
        scrollViewRef.current.scrollTo({ animated: true, x: 0 });
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [currentPage, images.length]);

  return (
    <View>
      <ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
      >
        {images.map((image, index) => (
          <Image
            key={index}
            source={{ uri: image }}
            style={{ width: Dimensions.get('window').width, height: sliderBoxHeight }}
          />
        ))}
      </ScrollView>
      {/* Pagination dots */}
      <View style={styles.paginationContainer}>
        {images.map((_, index) => (
          <View
            key={index}
            style={[
              styles.paginationDot,
              { backgroundColor: index === currentPage ? '#FFEE58' : '#90A4AE' },
            ]}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: -20, // Adjust as needed based on your design
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 5,
  },
});

export default SliderBoxScrollView;
