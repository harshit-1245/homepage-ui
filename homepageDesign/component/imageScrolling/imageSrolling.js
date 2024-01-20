import React from 'react';
import { SliderBox } from 'react-native-image-slider-box';
import { Image, View, ViewPropTypes } from 'react-native';
import PropTypes from 'prop-types';

const ImageScrolling = ({ style }) => {
  // Images for the slider
  const images = [
    "https://img.etimg.com/thumb/msid-93051525,width-1070,height-580,imgsize-2243475,overlay-economictimes/photo.jpg",
    "https://images-eu.ssl-images-amazon.com/images/G/31/img22/Wireless/devjyoti/PD23/Launches/Updated_ingress1242x550_3.gif",
    "https://images-eu.ssl-images-amazon.com/images/G/31/img23/Books/BB/JULY/1242x550_Header-BB-Jul23.jpg",
  ];

  return (
    <View style={[styles.imageScrollingContainer, style]}>
      {/* Use SliderBox to display images */}
      <SliderBox
        images={images}
        sliderBoxHeight={200} // Adjust the height of the slider box as needed
        dotColor="#FFEE58"
        inactiveDotColor="#90A4AE"
        paginationBoxVerticalPadding={0}
        autoplay
        circleLoop
      />
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
