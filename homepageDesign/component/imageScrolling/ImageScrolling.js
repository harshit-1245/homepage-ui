import React from 'react';
import { SliderBox } from 'react-native-image-slider-box';
import { Image, View, ViewPropTypes } from 'react-native';
import PropTypes from 'prop-types';
import SliderBoxScrollView from './SliderBoxScrollView';

const ImageScrolling = ({ style }) => {
  // Images for the slider
  const images = [
    "https://www.thestiffcollar.com/cdn/shop/files/stiffcollar_linen_kurta_collar_shirts.webp?v=1706101057",
    "https://images.squarespace-cdn.com/content/v1/55473fe6e4b079a47a7498d1/1593168684754-MZNSMB0IP4MG2M93EASE/Way4_merchant_acquiring_Peak-sales-2-2.gif",
    "https://static01.nyt.com/images/2019/07/24/business/24techfix/24techfix-articleLarge.gif?quality=75&auto=webp&disable=upscale",
  ];

  return (
    <View style={[styles.imageScrollingContainer, style]}>
      {/* Use SliderBox to display images */}
      <SliderBoxScrollView images={images} sliderBoxHeight={200} />
    </View>
  );
};

// PropTypes for your component
ImageScrolling.propTypes = {
  // Use Image.propTypes.style for the style prop
  style: Image.propTypes.style,
};

const styles = {
  imageScrollingContainer: {
    marginVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#ececec',
  },
  imageScrollingText: {
    // Add styles for the Text component if needed
  },
};

export default ImageScrolling;
