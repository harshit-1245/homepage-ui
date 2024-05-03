import React, { useContext, useState } from 'react';
import { FlatList, Pressable, SafeAreaView, StyleSheet, Text, View,ToastAndroid } from 'react-native';
import { Feather, Entypo, MaterialIcons, FontAwesome5 } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import useSWR from 'swr';
import { UserType } from '../../context/contextApi';
import axios from "axios"

const AddressScreen = () => {
  
  const { userId } = useContext(UserType);
  const { data, error } = useSWR(`http://192.168.204.201:4000/getAddress/${userId}`, async (url) => {
    const response = await fetch(url);
    const data = await response.json();
    
    return data;
  });

  //for removing address
  const handleRemove = async (item) => {
    try {
      const response = await axios.post(`http://192.168.204.201:4000/removeAdd`, {
        userId: userId,
        addressId: item._id, // Pass the ID of the selected address
        
      });
      // Handle success
      ToastAndroid.showWithGravity(
        "Successfully removed, refresh it",
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM
      );
    } catch (error) {
      console.error(error);
      // Handle error
    }
  };

  const navigation = useNavigation();
  const [selectedAddress, setSelectedAddress] = useState(null);

  const handleSelect = (item) => {
    if (selectedAddress && selectedAddress._id === item._id) {
      setSelectedAddress(null); // Deselect if already selected
    } else {
      setSelectedAddress(item); // Select the address
    }
  };

  const renderAddressItem = ({ item }) => (
    <View style={styles.addressContainer}>
      <View style={styles.addressInfoContainer}>
        <View style={{ flexDirection: 'row' }}>
          <Text style={styles.addressName}>{item.name}</Text>
          <Entypo name="location-pin" size={24} color="red" style={styles.locationIcon} />
        </View>

        <View style={styles.addressDetails}>
          {selectedAddress && selectedAddress._id === item._id ? (
            <FontAwesome5 name="dot-circle" size={24} color="black" />
          ) : (
            <Entypo onPress={() => handleSelect(item)} name="circle" size={24} color="black" />
          )}

          <View style={{ marginLeft: 20, borderWidth: 1, borderColor: 'black', paddingRight: 100 }}>
            <View style={{ marginLeft: 10, margin: 10 }}>
              <Text style={styles.addressText}>{item.houseNo}</Text>
              <Text style={styles.addressText}>{item.street}</Text>
              <Text style={styles.addressText}>
                {item.landmark}, {item.state}
              </Text>
              <Text style={styles.addressText}>Mobile: {item.mobileNo}</Text>
              <Text style={styles.addressText}>Postal Code: {item.postalCode}</Text>
            </View>
          </View>
        </View>
      </View>
      <View style={styles.addressActionsContainer}>
        <Pressable style={styles.addressAction}>
          <Text style={styles.actionText}>Edit</Text>
        </Pressable>
        <Pressable style={styles.addressAction} onPress={() => handleRemove(item)}>
          <Text style={styles.actionText}>Remove</Text>
        </Pressable>
        <Pressable style={styles.addressAction}>
          <Text style={styles.actionText}>Set as Default</Text>
        </Pressable>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={{ marginTop: 37 }}>
      <FlatList
        data={data?.addresses || []}
        keyExtractor={(item) => item._id}
        renderItem={renderAddressItem}
        ListHeaderComponent={() => (
          <>
            <Pressable onPress={() => navigation.navigate('Search')} style={styles.searchContainer}>
              <Feather name="search" size={25} color="black" style={styles.searchIcon} />
              <View style={styles.searchInput}>
                <Text>Search For Product</Text>
              </View>
              <Feather name="mic" size={22} color="black" style={styles.micIcon} />
            </Pressable>

            <View style={styles.headerContainer}>
              <Text style={styles.headerText}>Your Address</Text>
              <Pressable onPress={() => navigation.navigate('AddAddress')} style={styles.addAddress}>
                <Text style={{ color: 'blue' }}>Add a new Address</Text>
                <MaterialIcons name="keyboard-arrow-right" size={24} color="black" />
              </Pressable>
            </View>
            <View style={styles.line} />
          </>
        )}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    backgroundColor: '#fff',
    paddingHorizontal: 10,
    borderRadius: 10,
    elevation: 3,
  },
  searchIcon: {
    marginLeft: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#333',
    padding:12
  },
  micIcon: {
    marginRight: 25,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  addAddress: {
    flexDirection: 'row',
    alignItems: 'center',
  },
 
  addressInfoContainer: {
    flex: 1,
  },
  addressActionsContainer: {
    marginLeft: 10,
  },
  addressName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  addressText: {
    fontSize: 15,
    color: '#181818',
    marginBottom: 3,
  },
  addressAction: {
    marginTop: 5,
  },
  line: {
    height: 1,
    width: '100%',
    backgroundColor: '#ccc',
  },
  addressContainer: {
    flexDirection: 'column',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    backgroundColor: '#f9f9f9',
  },
  addressInfoContainer: {
    marginBottom: 10,
  },
  addressName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#333',
  },
  addressDetails: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  locationIcon: {
    
    marginRight: 5,
  },
  addressText: {
    fontSize: 14,
    color: '#555',
  },
  addressActionsContainer: {
    flexDirection: 'row',
    justifyContent:"space-evenly"
  },
  addressAction: {
    backgroundColor: '#007bff',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 5,
    marginTop: 5,
    marginRight: 10,
  },
  actionText: {
    color: '#fff',
    fontSize: 14,
  }
});

export default AddressScreen;
