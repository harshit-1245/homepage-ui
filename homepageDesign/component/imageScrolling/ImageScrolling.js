import React from 'react';
import { SliderBox } from 'react-native-image-slider-box';
import { Image, View, ViewPropTypes } from 'react-native';
import PropTypes from 'prop-types';
import SliderBoxScrollView from './SliderBoxScrollView';

const ImageScrolling = ({ style }) => {
  // Images for the slider
  const images = [
    "https://www.thestiffcollar.com/cdn/shop/files/stiffcollar_linen_kurta_collar_shirts.webp?v=1706101057",
    "https://www.digitaltrends.com/wp-content/uploads/2023/09/The-Batman-TV.jpg?resize=1200%2C630&p=1",
    "https://images4.alphacoders.com/112/1121892.jpg",
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
