// Import necessary dependencies
import { Button, Modal, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import { Feather, AntDesign, SimpleLineIcons, Ionicons } from '@expo/vector-icons';
import {useNavigation} from "@react-navigation/native"
import * as ImagePicker from 'expo-image-picker'
import SearchFilter from '../../component/searchRelatedTings/searchFilter/searchFilter';

const SearchScreen = () => {
  const navigation=useNavigation()
  const [isModalVisible, setModalVisible] = useState(false);

  // Function to toggle modal visibility
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  // State for input and focus
  const [isFocused, setIsFocused] = useState(false);
  const [input, setInput] = useState('');

  // Ref for TextInput focus
  const searchInputRef = useRef(null);
  const modalRef = useRef(null);

  useEffect(() => {
    // Focus on the input when the component mounts
    searchInputRef.current.focus();
  }, []);

  // Functions to handle focus and blur
  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => setIsFocused(false);
  
    // Function to handle image picking
    const pickImageOrTakePicture = async (option) => {
      toggleModal(); // Close the modal
  
      let result;
      if (option === 'camera') {
        result = await ImagePicker.launchCameraAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
        });
      } else {
        result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
        });
      }
  
      if (!result.cancelled) {
        setImage(result.uri);
      }
    };

  return (
    <>
      {/* Search input and icons */}
      <View style={styles.container}>
        <View style={styles.arrow}>
          <AntDesign onPress={()=>navigation.goBack()} name="arrowleft" size={24} color="black" />
        </View>
        <View style={styles.searchContainer}>
          <Feather  name="search" size={24} color={isFocused ? 'black' : 'gray'} style={styles.searchIcon} />
          <TextInput
            ref={searchInputRef}
            style={[styles.searchInput, { color: isFocused ? 'black' : 'gray' }]}
            placeholder="Search for products"
            onFocus={handleFocus}
            onBlur={handleBlur}
            value={input}
            onChangeText={(text) => setInput(text)}
          />
          <SimpleLineIcons onPress={toggleModal} name="microphone" size={24} color="black" style={{ marginRight: '5%' }} />
          <Ionicons onPress={toggleModal} name="camera-outline" size={24} color="black" />
        </View>
      </View>

      {/* Display SearchFilter if focused */}
      <SearchFilter input={input} setInput={setInput} />
  {/* camera modal */}
  <Modal
        visible={isModalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={toggleModal}
      >
        <View style={styles.modalContainer} ref={modalRef}>
          <View style={styles.modalContent}>
            <TouchableOpacity
              style={styles.optionButton}
              onPress={() => pickImageOrTakePicture('camera')}
            >
              <Ionicons name="camera-outline" size={24} color="black" />
              <Text style={styles.optionText}>Take a Picture</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.optionButton}
              onPress={() => pickImageOrTakePicture('album')}
            >
              <Ionicons name="images-outline" size={24} color="black" />
              <Text style={styles.optionText}>Choose from Album</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.cancelButton} onPress={toggleModal}>
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      
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
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
  },
  modalText: {
    fontSize: 18,
    color: 'white',
    marginBottom: 20,
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
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    width: '100%',
    alignItems: 'center',
  },
  optionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
  },
  optionText: {
    marginLeft: 15,
    fontSize: 18,
  },
  cancelButton: {
    marginTop: 10,
  },
  cancelButtonText: {
    color: 'red',
    fontSize: 18,
  },
});

export default SearchScreen;
