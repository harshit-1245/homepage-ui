import React from 'react';
import { SliderBox } from 'react-native-image-slider-box';
import { Image, View, ViewPropTypes } from 'react-native';
import PropTypes from 'prop-types';
import SliderBoxScrollView from './SliderBoxScrollView';

const ImageScrolling = ({ style }) => {
  // Images for the slider
  const images = [
    "https://images.tokopedia.net/img/cache/500-square/VqbcmM/2021/11/23/bb1a8bef-c1e8-4cfe-b1d5-e7a5f28b39ac.png",
    "https://i.pinimg.com/736x/e5/21/d8/e521d87377d6aa66b462f3dbd87639ae.jpg",
    "https://m.media-amazon.com/images/I/61cefoSfepS._AC_UF1000,1000_QL80_.jpg",
    
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
