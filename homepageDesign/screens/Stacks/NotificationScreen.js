import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import { Entypo } from '@expo/vector-icons';

const NotificationScreen = () => {
  const [stars, setStars] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
      const numberOfStars = Math.floor(Math.random() * 5) + 1;
      const newStars = [];

      for (let i = 0; i < numberOfStars; i++) {
        newStars.push(<Entypo key={i} name="star" size={24} color="black" />);
      }

      setStars(newStars);
    }, 1000); // Update every second

    return () => clearInterval(interval);
  }, []); // Empty dependency array ensures this effect runs only once

  return (
    <View style={{ flexDirection: 'row' }}>
      {stars}
    </View>
  );
}

export default NotificationScreen;
