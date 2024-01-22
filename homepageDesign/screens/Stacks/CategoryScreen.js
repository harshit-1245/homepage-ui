import { ScrollView, StyleSheet, Text, View } from 'react-native';
import React from 'react';

const CategoryScreen = () => {
  return (
    <View style={styles.container}>
      {/* Search Bar */}
      <View style={styles.searchBar}>
        <Text>Search Bar</Text>
      </View>

      <View style={styles.contentContainer}>
        {/* Safe Area 1 */}
        <ScrollView style={styles.safeArea1}>
          <Text>Your Option 1</Text>
          <Text>Your Option 2</Text>
          {/* Add more options as needed */}
        </ScrollView>

        {/* Safe Area 2 */}
        <ScrollView style={styles.safeArea2}>
          <Text>Featured Offer 1</Text>
          <Text>Featured Offer 2</Text>
          {/* Add more featured offers as needed */}
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    
    marginTop: 50,
  },
  contentContainer: {
    flexDirection: 'row', // Horizontal layout
    justifyContent: 'space-between', // Space between Safe Area 1 and Safe Area 2
  },
  searchBar: {
    alignSelf: 'center', // Center the search bar horizontally
  },
  safeArea1: {
    flex: 1, // Take less space
    padding: 10, // Adjust padding as needed
  },
  safeArea2: {
    flex: 2, // Take maximum space
    padding: 10, // Adjust padding as needed
  },
});

export default CategoryScreen;
