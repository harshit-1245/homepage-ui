import React from 'react';
import { View, Image, TextInput } from 'react-native';
import { Header } from 'react-native-elements';

const AppHeader = () => {
  return (
    <>
    <Header
      containerStyle={{
        backgroundColor: '#fff',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
      leftComponent={
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Image
            source={{ uri: 'https://assets.stickpng.com/thumbs/6160562276000b00045a7d97.png' }}
            style={{ width: 100, height: 80 }}
          />
        </View>
      }
    />
   
    </>
  );
};

export default AppHeader;
