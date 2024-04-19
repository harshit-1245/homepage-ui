import { Image, Pressable, ScrollView, StyleSheet, Text, View,ToastAndroid } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { useNavigation,useRoute } from '@react-navigation/native';
import useSWR from "swr"
import { UserType } from '../../context/contextApi';
import { Entypo,FontAwesome5,MaterialIcons } from '@expo/vector-icons';
import axios from "axios"
import {PaymentModal} from "../../Modals/paymentModal"


const OrderScreen = () => {
  const route = useRoute();
  const total = route.params.total;
  const cart=route.params.cart;
  const [currentStep, setCurrentStep] = useState(0);
  const [addresses,setAddresses]=useState({})
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [options, setOptions] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  

  
    const navigation=useNavigation()
    const { userId } = useContext(UserType);
    const {data,error}=useSWR(`http://192.168.29.163:4000/getAddress/${userId}`,async(url)=>{
      const response = await fetch(url);
      const data = await response.json();
      
      setAddresses(data.addresses)
    })
    

      // Array to define the steps in the confirmation process
      const steps = [
        { title: "Address", content: "Address Form" },
        { title: "Delivery", content: "Delivery Options" },
        { title: "Payment", content: "Payment Details" },
        { title: "Place Order", content: "Order Summary" },
      ];

      //delete address
      const handleRemove=async(item)=>{
        try {
          const response=await axios.post(`192.168.14.201:4000/removeAdd`,{
            userId:userId,
            addressId:selectedAddress._id
          })
          ToastAndroid.showWithGravity(
            "Successfully removed, refresh it",
            ToastAndroid.SHORT,
            ToastAndroid.BOTTOM
          );
        } catch (error) {
          console.error(error);
        }
      }


    
      //api to set 
      const handleOrder = async () => {
        try {
            const orderData = {
                userId: userId,
                cartItems: cart,
                totalPrice: total,
                shippingAddress: selectedAddress,
                paymentMethod: selectedOptions
            };
            const response = await axios.post('192.168.14.201:4000/order', orderData);
            
            if (response.status === 201) {
                setCurrentStep(4)
            }
        } catch (error) {
            if (error.response) {
                
                console.log("Backend response data:", error.response.data);
                console.log("Backend response status:", error.response.status);
                
            } else if (error.request) {
                // The request was made but no response was received
                console.log("No response received:", error.request);
            } else {
                // Something happened in setting up the request that triggered an Error
                console.log("Error:", error.message);
            }
        }
    };
    
    

      useEffect(() => {
        if (currentStep === 4) {
          moveToHome();
        }
      }, [currentStep]);
    
      // Function to navigate to the home screen after a delay
      const moveToHome = () => {
        setTimeout(() => {
          navigation.navigate("Home");
        }, 3000);
      };
  return (
    <ScrollView style={styles.container}>
    <View style={styles.indexing}>
      <View style={styles.check}>
         {steps?.map((step,index)=>(
          <View key={index} style={styles.mapping}>
            {
              index > 0 && (
                <View style={[styles.indexcheck,index<=currentStep && {backgroundColor:"green"}]}/>
              )
            }
            <View style={[styles.currentStep,index < currentStep && {backgroundColor:"green"}]}>
              {index < currentStep ?(
              <Text style={styles.currentStepText}>&#10003;</Text>
              ):(
                <Text style={styles.currentStepText}>{index+1}</Text>
              )}
            </View>
            <Text style={styles.title}>{step.title}</Text>
          </View>
         ))}
      </View>
    </View>
    {currentStep == 0 && (
      <View style={{marginHorizontal:20}}>
        <Text style={styles.selectDelivery}>Select Delivery Address</Text>
        <Pressable>
           {Object.values(addresses)?.map((item,index)=>(
            <Pressable style={styles.selectDOtCircle} key={index}>
              {/* great logic here */}
              {selectedAddress && selectedAddress._id === item._id ?(
           <FontAwesome5 name="dot-circle" size={24} color="black" />
              ):(
                <Entypo onPress={()=>setSelectedAddress(item)} name="circle" size={24} color="black" />
              
              )}
               
               <View style={{marginLeft:6}}>
               <View style={styles.itemName}>
                    <Text style={styles.itemNameText}>{item?.name}</Text>
                    <Entypo name="location-pin" size={24} color="redng bh h" />
                  </View>
                  <Text style={styles.details}>{item?.houseNo},{item?.landmark}</Text>
                  <Text style={styles.details}>{item?.street}</Text>
                  <Text style={styles.details}>India,Varanasi</Text>
                  <Text style={styles.details}>{item?.mobileNo}</Text>
                  <Text style={styles.details}>{item?.postalCode}</Text>

                  <View style={styles.manipulteText}>
                    <Pressable style={styles.manipulate}>
                           <Text>Edit</Text>
                    </Pressable>
                    <Pressable  onPress={()=>handleRemove(selectedAddress)} style={styles.manipulate}>
                           <Text>Remove</Text>
                    </Pressable>
                    <Pressable style={styles.manipulate}>
                           <Text>Set as default</Text>
                    </Pressable>
                    
                  </View>
                  <View>
                     {selectedAddress && selectedAddress?._id === item?._id && (
                      <Pressable 
                       onPress={()=>setCurrentStep(1)}
                      style={styles.selectAddress}>
                        <Text style={styles.deliveryText}>Deliver to this address</Text>
                      </Pressable>
                     )}
                  </View>
               </View>
            </Pressable>
           ))}
        </Pressable>
      </View>
    )}

{currentStep ==1 && (
  <View style={{marginHorizontal:20}}>
    <Text style={styles.chooseDelivery}>Choose the delivery options</Text>

    <View style={styles.options}>
      {options ? (
      <FontAwesome5 onPress={()=>setOptions(!options)} name="dot-circle" size={24} color="#008397" />
      ):(
        <Entypo onPress={()=>setOptions(!options)} name="circle" size={24} color="black" />
      )}
   

    <Text style={{flex:1}}>
      <Text style={styles.tommorow}>Tommorow by 10pm</Text>{" "}
      -Free delivery with your prime membership
    </Text>
    </View>
    <Pressable  
     onPress={()=>setCurrentStep(2)}
    style={styles.continue}>
      <Text style={styles.continueText}>Continue</Text>
    </Pressable>
  </View>
)}

{currentStep ==2 && (
  <View style={{marginHorizontal:20}}>
    <Text style={styles.chooseDelivery}>Select your payment method</Text>

    <View style={styles.cash}>

  {selectedOptions == "cash" ?(
     <FontAwesome5 name="dot-circle" size={24} color="black" />
  ):(
    <Entypo onPress={()=>setSelectedOptions("cash")}  name='circle' size={20} color="gray"/>
  )}

     

      <Text>Cash on delivery</Text>
    </View>

    <View style={styles.cash}>

      {selectedOptions == "card" ?(
        <FontAwesome5 name="dot-circle" size={24} color="black" />
      ):(
        <Entypo onPress={() => {
          setSelectedOptions("card");
        }} name='circle' size={20} color="gray"/>
      )}
      

      <Text>UPI / Credit or debit card</Text>
    </View>
    <Pressable  
     onPress={()=>setCurrentStep(3)}
    style={styles.continue}>
      <Text style={styles.continueText}>Continue</Text>
    </Pressable>
  </View>
)}

{currentStep == 3 && selectedOptions === "cash" &&(
    <View style={{marginHorizontal:20}}>
      <Text style={styles.chooseDelivery}>Order Now</Text>

    <View style={styles.cashOption}>
      <View>
        <Text style={styles.save}>Save 5% and never ran out</Text>
        <Text style={styles.turnOn}>Turn on auto deliveries</Text>
      </View>
      <MaterialIcons name='keyboard-arrow-right' size={24} color={"black"} />
    </View>
 
    <View style={styles.cashing}>
        <Text>Shipping to {selectedAddress?.name}</Text>
        <View style={styles.orderItem}>
          <Text style={{fontSize:16,fontWeight:"500",color:"gray"}}>Items</Text>
          <Text style={{color:"gray",fontSize:16}}>&#8377;{total}</Text>
        </View>

        <View style={styles.orderItem}>
          <Text style={styles.itemColor}>Delivery</Text>
          <Text style={styles.text0}>0</Text>
        </View>

        <View style={styles.orderItem}>
          <Text style={styles.continueText}>Order Total</Text>
          <Text style={{color:"#C60C30",fontSize:16}}>&#8377;{total}</Text>
        </View>
    </View>

    <View style={styles.cashing}>
      <Text style={styles.payWith}>Pay with</Text>
      <Text style={styles.payOn}>Pay on delivery Cash</Text>
    </View>
    <Pressable 
    onPress={handleOrder}
    style={styles.placeOrder}>
      <Text style={styles.placeYour}>Place your order</Text>
    </Pressable>
    </View>
)}

{currentStep == 3 && selectedOptions === "card" && (
   <View>
   
   <Text style={styles.totalText}>Total Amount: ${total}</Text>
   <View style={styles.content}>
   <Image
    
    source={require('../../assets/money.gif')}
    style={styles.image}
  />
   </View>
   <Pressable style={styles.button} onPress={()=>setModalVisible(true)}>
     <Text style={styles.buttonText}>Buy now</Text>
   </Pressable>
   <PaymentModal setCurrentStep={setCurrentStep} visible={modalVisible} onClose={() => setModalVisible(false)}/>
 </View>
)}

{currentStep == 4 && 
  <View style={styles.container}>
  <View>
    <Image style={styles.image1} source={require('../../assets/order.png')} />
  </View>
  <Text style={styles.thankYouText}>Thank You, Come Again</Text>
</View>
}
      
  </ScrollView>
)
}

  

export default OrderScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    
  },
  image1: {
    width: "100%",
    height: 200,
  },
  thankYouText: {
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
  },
  totalText: {
    fontSize: 20,
    marginBottom: 20,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  image: {
    width:400
  },
  description: {
    flex: 1,
  },
  productName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  productDescription: {
    fontSize: 14,
    color: '#666',
  },
 button: {
  width: 200,
  height: 50,
  backgroundColor: '#007bff',
  borderRadius: 25,
  justifyContent: 'center',
  alignItems: 'center',
  alignSelf: 'center', // Center the button horizontally
  marginTop: 50,
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.25,
  shadowRadius: 3.84,
  elevation: 5,
},
buttonText: {
  color: '#fff',
  fontSize: 18,
  fontWeight: 'bold',
},
indexing:{
  flex:1,paddingHorizontal:20,paddingTop:40,
},
check:{
  flexDirection:"row",alignItems:"center",marginBottom:20,justifyContent:"space-between",
},
mapping:{
  justifyContent:"center",alignItems:"center",
},
indexcheck:{
  flex:1,height:2,backgroundColor:"green"
},
currentStep:{
  width:30,height:30,borderRadius:15,backgroundColor:"#ccc",justifyContent:"center",alignItems:"center",
},
currentStepText:{
  fontSize:16,fontWeight:"bold",color:"white",
},
title:{
  textAlign:"center",marginTop:8,
},
selectDelivery:{
  fontSize:16,fontWeight:"bold",
},
selectDOtCircle:{
  borderWidth:1,borderColor:"#D0D0D0",padding:10,flexDirection:"row",alignItems:"center",gap:5,paddingBottom:17,marginVertical:7,
},
details:{
  fontSize:15,color:"#181818",
},
manipulate:{
  backgroundColor:"#F5F5F5",paddingHorizontal:10,paddingVertical:6,borderRadius:5,borderWidth:0.9,borderColor:"#D0D0D0",alignItems:"center",
},
selectAddress:{
  backgroundColor:"#008397",
  padding:10,
  borderRadius:20,
  justifyContent:"center",
  alignItems:"center",
  marginTop:10,
},
options:{
  flexDirection:"row",alignItems:"center",backgroundColor:"white",padding:8,gap:7,borderColor:"#D0D0D0",borderWidth:1,marginTop:10,
},
continue:{
  backgroundColor:"#FFC72C",padding:10,borderRadius:20,justifyContent:"center",alignItems:"center",marginTop:15,
},
cash:{
  backgroundColor:"white",padding:8,borderColor:"#D0D0D0",borderWidth:1,flexDirection:"row",alignItems:"center",gap:7,marginTop:12,
},
cashOption:{
  flexDirection:"row",alignItems:"center",justifyContent:"space-between",gap:8,backgroundColor:"white",padding:8,borderColor:"#D0D0D0",borderWidth:1,marginTop:10,
},
cashing:{
  backgroundColor:"white",padding:8,borderColor:"#D0D0D0",borderWidth:1,marginTop:10,
},
orderItem:{
  flexDirection:"row",alignItems:"center",justifyContent:"space-between",
},
itemColor:{
  fontSize:16,fontWeight:"500",color:"gray",
},
placeOrder:{
  backgroundColor:"#FFC72C",padding:10,borderRadius:20,justifyContent:"center",alignItems:"center",marginTop:20,
},
itemName:{
  flexDirection:"row",alignItems:"center",gap:3,
},
itemNameText:{
  fontSize:15,fontWeight:"bold",
},
manipulteText:{
  flexDirection:"row",alignItems:"center",gap:10,marginTop:7,
},
deliveryText:{
  fontSize:15,fontWeight:"bold",color:"white",
},
chooseDelivery:{
  fontSize:20,fontWeight:"bold",
},
tommorow:{
  color:"green",fontWeight:"500",
},
continueText:{
  fontSize:18,fontWeight:"bold",
},
save:{
  fontSize:17,fontWeight:"bold",
},
turnOn:{
  fontSize:15,color:"gray",marginTop:5,
},
text0:{
  color:"gray",fontSize:16,
},
payWith:{
  fontSize:16,color:"gray",
},
payOn:{
  fontSize:16,fontWeight:"600",marginTop:7,
},
placeYour:{
  fontSize:16,fontWeight:"bold",
}
});