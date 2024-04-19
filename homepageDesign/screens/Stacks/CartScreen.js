import React, { useContext, useEffect, useState } from 'react';
import { FlatList, Image, Pressable, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { AntDesign, EvilIcons, MaterialIcons, Entypo } from '@expo/vector-icons';
import { UserType } from "../../context/contextApi";
import useCartStore from '../../src/store/cartStore';
import { useNavigation } from "@react-navigation/native";



const CartScreen = () => {
 
  const {authenticated}=useContext(UserType)
  const navigation = useNavigation();

  const { cartItems, removeFromCart, handleCartProductQuantity } = useCartStore();
  const { randomNumbers} = useContext(UserType);
  const [stars, setStars] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    const numberOfStars = Math.floor(Math.random() * 5) + 1;
    const rating = [];
  
    for (let i = 0; i < numberOfStars; i++) {
      rating.push(<Entypo key={i} name="star" size={15} color="black" />);
    }
  
    setStars(rating);
  
    // Calculate total price if cartItems is defined and not empty
    if (cartItems && cartItems.length > 0) {
      let total = 0;
      cartItems.forEach(item => {
        total += item.price * item.quantity;
      });
      setTotalPrice(total);
    } else {
      setTotalPrice(0); // Set total price to 0 if cartItems is undefined or empty
    }
  }, [cartItems]);
  
  const handleChange=()=>{
    navigation.navigate("Address")
  }

  const handlePlaceOrder=()=>{

   navigation.navigate("Order",{
    total:totalPrice,
    cart:cartItems,
   })
  }

  const renderItem = ({ item }) => (
    <>
      <View style={styles.productContainer}>
        <Image source={{ uri: item.images[0] }} style={styles.productImage}/>
        <View style={styles.productDetails}>
          <Text style={styles.productTitle}>{item.title}</Text>
          <Text numberOfLines={4} style={styles.productSize}>Desc: {item.description}</Text>
          <Text style={styles.productRating}>Rating: will see soon</Text>
          <Text style={styles.price}> price: ${item.price}</Text>
          <Text style={styles.productStock}>Offers:<Text style={{color:"green"}}>23%</Text></Text>
          <View style={styles.actionContainer}>
            <Pressable style={styles.findSimilarButton}>
              <Text style={styles.findSimilarText}>Find Similar</Text>
              <MaterialIcons name="keyboard-arrow-right" size={24} color="black" />
            </Pressable>
            <View style={styles.quantityContainer}>
              <Text style={styles.quantityLabel}>Quantity:</Text>
              <Pressable style={styles.quantityButton} onPress={() => handleCartProductQuantity("dec", item)}>
                <Text style={styles.quantityButtonText}>-</Text>
              </Pressable>
              <Text style={styles.quantityText}>{item.quantity}</Text>
              <Pressable style={styles.quantityButton} onPress={() => handleCartProductQuantity("inc", item)}>
                <Text style={styles.quantityButtonText}>+</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </View>
      <View style={styles.actionsContainer}>
        <Pressable style={styles.actionButton} onPress={() => removeFromCart(item.id)}>
          <MaterialIcons name="delete" size={24} color="black" />
          <Text style={styles.actionButtonText}>Remove</Text>
        </Pressable>
        {/* Save button */}
        <Pressable style={styles.actionButton}>
          <AntDesign name="save" size={24} color="black" />
          <Text style={styles.actionButtonText}>Save</Text>
        </Pressable>
      </View>
    </>
  );

  return (
    <SafeAreaView style={styles.container}>
      {authenticated ? (
        <>
        <View>
        <View style={styles.header}>
          <AntDesign name="menu-fold" size={24} color="black" style={styles.icon} />
          <Text style={styles.headerText}>My Cart</Text>
        </View>
        <Pressable style={styles.addressContainer}>
          <EvilIcons name="location" size={24} color="black" style={styles.addressIcon} />
          <View style={styles.addressTextContainer}>
            <Text style={styles.addressText}>Deliver to:</Text>
            <Text style={styles.address}>Harshit - Varanasi 232103</Text>
          </View>
          <Pressable onPress={handleChange} style={styles.changeTextContainer}>
            <Text style={styles.changeText}>Change</Text>
          </Pressable>
        </Pressable>
      </View>
      <FlatList
        data={cartItems}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
      />
      {/* Total price and Place Order button */}
      <View style={styles.totalContainer}>
        <Text style={styles.totalText}>Total Price: ${totalPrice.toFixed(2)}</Text>
        <Pressable style={styles.placeOrderButton} onPress={handlePlaceOrder}>
          <Text style={styles.placeOrderText}>Place Order</Text>
        </Pressable>
      </View>
  
      </>
      ):(
        <View style={{ flex:1, justifyContent: 'center', alignItems: 'center' }}>
        <Image style={{ width: 500, height: 300 }} source={require("../../assets/empty-cart.gif")} />
        <Text style={{fontSize:18,fontWeight:"bold"}}>Please log in to see the excitment offers</Text>
      </View>
      
      )}
      
    </SafeAreaView>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    marginTop: 36
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  icon: {
    marginRight: 8,
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  addressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  addressIcon: {
    marginRight: 8,
  },
  addressTextContainer: {
    flex: 1,
    marginRight: 8,
  },
  addressText: {
    fontSize: 13,
    fontWeight: '500',
    color: '#333',
  },
  address: {
    fontSize: 13,
    fontWeight: '500',
    color: '#333',
  },
  changeTextContainer: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 8,
    backgroundColor: '#f0f0f0',
  },
  changeText: {
    fontSize: 12,
    color: '#666',
  },
  productContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    alignItems: 'center',
  },
  productImage: {
    width: 150,
    height: 250,
    resizeMode: 'cover',
    marginRight: 16,
  },
  productDetails: {
    flex: 1,
  },
  productTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  productSize: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  productRating: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  productStock: {
    fontSize: 17,
    color: 'black',
    paddingTop:20,
    marginBottom: 8,
    fontWeight:"900"
  },
  price:{
    fontWeight:"bold"
  },
  actionContainer: {
    marginTop: 8,
  },
  findSimilarButton: {
    flexDirection: 'row',
    alignItems: 'center',
    fontWeight:"bold",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 4,
    marginBottom: 8,
  },
  findSimilarText: {
    fontSize: 14,
    color: 'blue',
    marginRight: 8,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantityLabel: {
    fontSize: 14,
    color: '#666',
    marginRight: 12,
  },
  quantityButton: {
    backgroundColor: '#f0f0f0',
    padding: 8,
    borderRadius: 4,
  },
  quantityButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#666',
  },
  quantityText: {
    fontSize: 18,
    fontWeight:"bold",
    marginHorizontal: 12,
  },
  actionsContainer: {
    paddingHorizontal: 16,
    paddingBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  actionButton: {
    flexDirection:"row",
    backgroundColor: '#e7edd3',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 4,
    width: '48%',
    alignItems: 'center',
    marginTop:5,
  },
  actionButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
    marginLeft: 8,
  },
  totalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 8,
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
  totalText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
  },
  placeOrderButton: {
    backgroundColor: 'green',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  placeOrderText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
});

export default CartScreen;
