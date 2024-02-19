import React, { useEffect, useRef } from 'react';
import { Animated, Image, StyleSheet, View } from 'react-native';

const SplashScreen = () => {
  const backgroundColor = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    animateBackground();
  }, []);

  const animateBackground = () => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(backgroundColor, {
          toValue: 1,
          duration: 3000, // Duration for one transition
          useNativeDriver: false,
        }),
        Animated.timing(backgroundColor, {
          toValue: 0,
          duration: 3000, // Duration for one transition
          useNativeDriver: false,
        }),
      ]),
    ).start();
  };

  const interpolatedColor = backgroundColor.interpolate({
    inputRange: [0, 1],
    outputRange: ['#FFC0CB', '#FFFFCC'], 
  });

  return (
    <Animated.View style={[styles.container, { backgroundColor: interpolatedColor }]}>
       <View style={styles.container}>
      <Image source={require("../../assets/splashs.png")} style={{ width: 200, height: 200 }} />
    </View>
    </Animated.View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
