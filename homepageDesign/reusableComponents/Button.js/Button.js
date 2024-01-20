// LinearGradientButton.js

import React from 'react';
import { Button } from '@rneui/themed';
import LinearGradient from 'react-native-linear-gradient';

const LinearGradientButton = ({ onPress, title }) => {
  return (
    <Button
      ViewComponent={LinearGradient}
      linearGradientProps={{
        colors: ["#FF9800", "#F44336"],
        start: { x: 0, y: 0.5 },
        end: { x: 1, y: 0.5 },
      }}
      onPress={onPress}
    >
      {title}
    </Button>
  );
};

export default LinearGradientButton;
