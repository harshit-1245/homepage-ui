import React, { useRef, useState, useEffect, useCallback, useMemo } from 'react';
import { View, FlatList, Image, StyleSheet, Dimensions } from 'react-native';
import PropTypes from 'prop-types';

const SliderBoxScrollView = ({ images = [], sliderBoxHeight = 200 }) => {
  const flatListRef = useRef();
  const [currentPage, setCurrentPage] = useState(0);

  const handleScrollEnd = useCallback(
    (event) => {
      const offsetX = event.nativeEvent.contentOffset.x;
      const pageIndex = Math.floor(offsetX / windowWidth);
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
    const interval = setInterval(handleInterval, INTERVAL_DURATION);

    return () => clearInterval(interval);
  }, [handleInterval]);

  const renderItem = useCallback(({ item }) => {
    const itemImageStyle = StyleSheet.create({
      image: {
        width: windowWidth,
        height: sliderBoxHeight,
      },
    });

    return (
      <Image
        source={{ uri: item }}
        style={itemImageStyle.image}
        resizeMode="cover"
      />
    );
  }, [sliderBoxHeight]);

  const paginationDots = useMemo(() => (
    images.map((_, index) => (
      <View
        key={index}
        style={[
          styles.paginationDot,
          { backgroundColor: index === currentPage ? DOT_ACTIVE_COLOR : DOT_INACTIVE_COLOR },
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

const { width: windowWidth } = Dimensions.get('window');

const INTERVAL_DURATION = 2000;
const DOT_SIZE = 8;
const DOT_MARGIN = 4;
const DOT_BORDER_RADIUS = DOT_SIZE / 2;
const DOT_ACTIVE_COLOR = '#FFEE58';
const DOT_INACTIVE_COLOR = '#90A4AE';

const styles = StyleSheet.create({
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: -20, // Adjust as needed based on your design
  },
  paginationDot: {
    width: DOT_SIZE,
    height: DOT_SIZE,
    borderRadius: DOT_BORDER_RADIUS,
    marginHorizontal: DOT_MARGIN, // Adjust as needed for spacing
  },
});

export default SliderBoxScrollView;
