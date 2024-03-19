import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';

const InfiniteLoopWords = ({ words, loopDuration }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentWord, setCurrentWord] = useState(words[0]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % words.length);
    }, loopDuration);

    return () => clearInterval(interval);
  }, [currentIndex, loopDuration, words]);

  useEffect(() => {
    setCurrentWord(words[currentIndex]);
  }, [currentIndex, words]);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{currentWord}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
  },
  text: {
    fontSize: 16,
    marginLeft:12
    
  },
});

export default InfiniteLoopWords;
