import { Image, StyleSheet, Text, View, ScrollView, Pressable } from 'react-native';
import React, { useCallback, useEffect, useState } from 'react';
import { productData } from '../../apis/productApi';
import { useNavigation } from "@react-navigation/native";

const RelatedProducts = ({ item }) => {
    const navigation=useNavigation()
    const [filterProduct, setFilteredProducts] = useState([]);

    // Use useEffect to call handleCategoryPress once when the component mounts
    useEffect(() => {
        handleCategoryPress(item.name);
    }, [item.name]); // Call it whenever the category name changes

    const handleCategoryPress = useCallback((category) => {
        // Filter products based on the selected category
        const filteredProducts = productData.filter(product => product.category && product.category.name === category);
        setFilteredProducts(filteredProducts);
    }, []);
   

    return (
        <View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {filterProduct.map((product, index) => (
                
                <Pressable onPress={()=>navigation.navigate("Product",{
                    item:product,
                })} key={index} style={styles.productContainer}>
                    
                    <Image source={{ uri: product.images[0] }} style={styles.productImage} />
                    <Text style={styles.productTitle}>{product.title}</Text>
                </Pressable>
            ))}
        </ScrollView>
        <View style={styles.line1}/>
        </View>
    )
}

export default RelatedProducts;

const styles = StyleSheet.create({
    productContainer: {
        marginRight: 20,
        
    },
    productTitle: {
        fontSize: 12,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    productImage: {
        width: 200,
        height: 200,
    },
    
});
