import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { AntDesign, MaterialCommunityIcons,Feather } from '@expo/vector-icons';
import React from 'react';

const AccountScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      
      <View style={[styles.header]}>
        <Text style={styles.headerText}>+ Phone Number</Text>
        <Text style={[styles.headerText, styles.boldText]}>Explore + Premium</Text>
     
      </View>
      <View style={styles.line}></View>
      <View style={styles.menuContainer}>
        <View style={styles.menuItem}>
        <AntDesign name="CodeSandbox" size={24} color="black" />
          <Text style={styles.menuItemText}>Order</Text>
        </View>
        <View style={styles.menuItem}>
        <AntDesign name="hearto" size={20} color="black" />
          <Text style={styles.menuItemText}>Wishlist</Text>
        </View>
      </View>
      <View style={styles.menuContainer}>
        <View style={styles.menuItem}>
        <MaterialCommunityIcons name="offer" size={24} color="black" />
          <Text style={styles.menuItemText}>Coupons</Text>
        </View>
        <View style={styles.menuItem}>
        <Feather name="headphones" size={20} color="black" />
          <Text style={styles.menuItemText}>Help Center</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default AccountScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white', // Background color set to white
    paddingTop: 40,
    paddingHorizontal: 20,
  },
  header: {
    marginBottom: 20,
  },
  headerText: {
    fontSize: 16,
    marginBottom: 5,
    color: '#333', // Darker text color
  },
  boldText: {
    fontWeight: 'bold',
  },
  line: {
    height: 1,
    backgroundColor: '#ddd', // Lighter line color
    marginBottom: 20,
  },
  menuContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
  },
  menuItem: {
    width: '48%',
    paddingLeft:40,
    flexDirection:"row",
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc', // Lighter border color
    paddingVertical: 10,
    borderRadius: 10, // Rounded corners
    backgroundColor: '#fff', // White background color
    shadowColor: '#000', // Shadow color
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5, // Add elevation for shadow effect
    gap:5
  },
  menuItemText: {
    fontSize: 14,
    fontWeight:"bold",
    color: '#333', // Darker text color
  },
});
