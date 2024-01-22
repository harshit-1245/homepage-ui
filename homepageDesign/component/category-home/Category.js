import React from 'react';
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { list } from '../../json/list';

const Category = () => {
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.container}>
      
      <View style={styles.categoryContainer}>
        {list.map((item) => (
          <Pressable key={item.id} style={styles.categoryItem}>
            <Image style={styles.categoryImage} source={{ uri: item.image }} />
            <Text style={styles.categoryText}>{item.name}</Text>
          </Pressable>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
  },
  heading: {
    fontSize: 18,
    fontWeight: 'bold',
    marginHorizontal: 10,
  },
  categoryContainer: {
    flexDirection: 'row',
    marginTop: 10,
  },
  categoryItem: {
    marginRight: 10,
    alignItems: 'center',
  },
  categoryImage: {
    width: 60,
    height: 60,
    borderRadius: 40,
    marginBottom: 5,
  },
  categoryText: {
    textAlign: 'center',
    fontSize: 12,
    fontWeight: '500',
  },
});

export default Category;
