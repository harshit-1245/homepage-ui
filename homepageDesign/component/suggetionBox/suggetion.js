import React from 'react';
import { Image, StyleSheet, Text, View, Dimensions, FlatList } from 'react-native';

const { width } = Dimensions.get('window');

const LaptopSuggestion = ({ item }) => (
  <View style={styles.suggestionContainer}>
    <Image style={styles.image} source={{ uri: item.image }} />
    <Text style={styles.title}>{item.title}</Text>
    <Text style={styles.price}>{item.price}</Text>
  </View>
);

const Suggestion = () => {
  const laptops = [
    { id: 1, title: "Asus TUF Gaming", price: "50,999", image: "https://dlcdnwebimgs.asus.com/gain/479f891b-3bb6-4c7f-b8e1-c6bfa51f3f25/" },
    { id: 2, title: "Dell Inspiron", price: "45,999", image: "https://images-cdn.ubuy.co.in/651693e215c3e746d84fe81a-dell-inspiron-15-laptop-core-i5-8250u.jpg" },
    { id: 3, title: "HP Pavilion", price: "55,999", image: "https://images-cdn.ubuy.co.in/634ec351f51fe667ca6faa08-hp-pavilion-i5-gtx-1650-8gb-256gb-gaming.jpg" },
  ];

  const renderSuggestion = ({ item }) => (
    <LaptopSuggestion item={item} />
  );

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Suggestions for You</Text>
      <FlatList
        data={laptops}
        renderItem={renderSuggestion}
        keyExtractor={(item) => item.id.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.suggestionsWrapper}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  suggestionsWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    gap:10
  },
  suggestionContainer: {
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 8,
    overflow: 'hidden',
    width: width * 0.4, // Responsive width
    marginBottom: 10,
  },
  image: {
    width: '100%',
    height: 150,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  title: {
    marginTop: 5,
    fontSize: 16,
    fontWeight: 'bold',
    paddingHorizontal: 5,
  },
  price: {
    marginTop: 2,
    fontSize: 14,
    color: 'gray',
    paddingHorizontal: 5,
    marginBottom: 5,
  },
});

export default Suggestion;
