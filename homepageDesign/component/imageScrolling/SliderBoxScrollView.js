import React, { useRef, useState, useEffect, useCallback, useMemo } from 'react';
import { View, FlatList, Image, StyleSheet, Dimensions } from 'react-native';
import PropTypes from 'prop-types';

const SliderBoxScrollView = ({ images = [], sliderBoxHeight = 200 }) => {
  const flatListRef = useRef();
  const [currentPage, setCurrentPage] = useState(0);

  const handleScrollEnd = useCallback(
    (event) => {
      const offsetX = event.nativeEvent.contentOffset.x;
      const pageIndex = Math.floor(offsetX / Dimensions.get('window').width);
      setCurrentPage(pageIndex);
    },
    []
  );

  const handleInterval = useCallback(() => {
    const nextPage = currentPage < images.length - 1 ? currentPage + 1 : 0;
    flatListRef.current.scrollToIndex({
      animated: true,
      index: nextPage,
    });
    setCurrentPage(nextPage);
  }, [currentPage, images.length]);

  useEffect(() => {
    const interval = setInterval(handleInterval, 2000);

    return () => clearInterval(interval);
  }, [handleInterval]);

  const renderItem = useCallback(({ item }) => (
    <Image
      source={{ uri: item }}
      style={{ width: Dimensions.get('window').width, height: sliderBoxHeight }}
      resizeMode="cover"
    />
  ), [sliderBoxHeight]);

  const paginationDots = useMemo(() => (
    images.map((_, index) => (
      <View
        key={index}
        style={[
          styles.paginationDot,
          { backgroundColor: index === currentPage ? '#FFEE58' : '#90A4AE' },
        ]}
      />
    ))
  ), [images, currentPage]);

  return (
    <View>
      <FlatList
        ref={flatListRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={handleScrollEnd}
        scrollEventThrottle={16}
        data={images}
        renderItem={renderItem}
        keyExtractor={(_, index) => index.toString()}
      />
      {/* Pagination dots */}
      <View style={styles.paginationContainer}>{paginationDots}</View>
    </View>
  );
};

SliderBoxScrollView.propTypes = {
  images: PropTypes.arrayOf(PropTypes.string).isRequired,
  sliderBoxHeight: PropTypes.number,
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
    marginHorizontal: 4, // Adjust as needed for spacing
  },
});

export default SliderBoxScrollView;
