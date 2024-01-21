// Import necessary dependencies
import { StyleSheet, Text, TextInput, View } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import { Feather, AntDesign, SimpleLineIcons, Ionicons } from '@expo/vector-icons';
import {useNavigation} from "@react-navigation/native"
import SearchFilter from '../../component/searchRelatedTings/searchFilter/searchFilter';

const SearchScreen = () => {
  const navigation=useNavigation()
  // State for input and focus
  const [isFocused, setIsFocused] = useState(false);
  const [input, setInput] = useState('');

  // Ref for TextInput focus
  const searchInputRef = useRef(null);

  useEffect(() => {
    // Focus on the input when the component mounts
    searchInputRef.current.focus();
  }, []);

  // Functions to handle focus and blur
  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => setIsFocused(false);

  return (
    <>
      {/* Search input and icons */}
      <View style={styles.container}>
        <View style={styles.arrow}>
          <AntDesign onPress={()=>navigation.goBack()} name="arrowleft" size={24} color="black" />
        </View>
        <View style={styles.searchContainer}>
          <Feather name="search" size={24} color={isFocused ? 'black' : 'gray'} style={styles.searchIcon} />
          <TextInput
            ref={searchInputRef}
            style={[styles.searchInput, { color: isFocused ? 'black' : 'gray' }]}
            placeholder="Search for products"
            onFocus={handleFocus}
            onBlur={handleBlur}
            value={input}
            onChangeText={(text) => setInput(text)}
          />
          <SimpleLineIcons name="microphone" size={24} color="black" style={{ marginRight: '5%' }} />
          <Ionicons name="camera-outline" size={24} color="black" />
        </View>
      </View>

      {/* Display SearchFilter if focused */}
      <SearchFilter input={input} setInput={setInput} />
    </>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    marginTop: 55,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  searchContainer: {
    flexDirection: 'row',
    width: '80%',
    backgroundColor: '#d9dbda',
    borderRadius: 10,
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderColor: 'blue',
    borderWidth: 1,
  },
  arrow: {
    marginRight: 10,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
  },
});

export default SearchScreen;
