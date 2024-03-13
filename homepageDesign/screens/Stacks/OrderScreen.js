import { Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { useNavigation,useRoute } from '@react-navigation/native';
import useSWR from "swr"
import { UserType } from '../../context/contextApi';
import { Entypo,FontAwesome5,MaterialIcons } from '@expo/vector-icons';
import axios from "axios"

const OrderScreen = () => {
  const route = useRoute();
  const total = route.params.total;
  const cart=route.params.cart;
  const [currentStep, setCurrentStep] = useState(0);
  const [addresses,setAddresses]=useState({})
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [options, setOptions] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState("");
  

  
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
            const response = await axios.post('http://192.168.29.163:4000/order', orderData);
            
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
    <ScrollView style={{marginTop:55}}>
    <View style={{flex:1,paddingHorizontal:20,paddingTop:40}}>
      <View style={{flexDirection:"row",alignItems:"center",marginBottom:20,justifyContent:"space-between"}}>
         {steps?.map((step,index)=>(
          <View key={index} style={{justifyContent:"center",alignItems:"center"}}>
            {
              index > 0 && (
                <View style={[{flex:1,height:2,backgroundColor:"green"},index<=currentStep && {backgroundColor:"green"}]}/>
              )
            }
            <View style={[{width:30,height:30,borderRadius:15,backgroundColor:"#ccc",justifyContent:"center",alignItems:"center"},index < currentStep && {backgroundColor:"green"}]}>
              {index < currentStep ?(
              <Text style={{fontSize:16,fontWeight:"bold",color:"white"}}>&#10003;</Text>
              ):(
                <Text style={{fontSize:16,fontWeight:"bold",color:"white"}}>{index+1}</Text>
              )}
            </View>
            <Text style={{textAlign:"center",marginTop:8}}>{step.title}</Text>
          </View>
         ))}
      </View>
    </View>
    {currentStep == 0 && (
      <View style={{marginHorizontal:20}}>
        <Text style={{fontSize:16,fontWeight:"bold"}}>Select Delivery Address</Text>
        <Pressable>
           {Object.values(addresses)?.map((item,index)=>(
            <Pressable style={{borderWidth:1,borderColor:"#D0D0D0",padding:10,flexDirection:"row",alignItems:"center",gap:5,paddingBottom:17,marginVertical:7}} key={index}>
              {/* great logic here */}
              {selectedAddress && selectedAddress._id === item._id ?(
           <FontAwesome5 name="dot-circle" size={24} color="black" />
              ):(
                <Entypo onPress={()=>setSelectedAddress(item)} name="circle" size={24} color="black" />
              
              )}
               
               <View style={{marginLeft:6}}>
               <View style={{flexDirection:"row",alignItems:"center",gap:3}}>
                    <Text style={{fontSize:15,fontWeight:"bold"}}>{item?.name}</Text>
                    <Entypo name="location-pin" size={24} color="redng bh h" />
                  </View>
                  <Text style={{fontSize:15,color:"#181818"}}>{item?.houseNo},{item?.landmark}</Text>
                  <Text style={{fontSize:15,color:"#181818"}}>{item?.street}</Text>
                  <Text style={{fontSize:15,color:"#181818"}}>India,Varanasi</Text>
                  <Text style={{fontSize:15,color:"#181818"}}>{item?.mobileNo}</Text>
                  <Text style={{fontSize:15,color:"#181818"}}>{item?.postalCode}</Text>

                  <View style={{flexDirection:"row",alignItems:"center",gap:10,marginTop:7}}>
                    <Pressable style={{backgroundColor:"#F5F5F5",paddingHorizontal:10,paddingVertical:6,borderRadius:5,borderWidth:0.9,borderColor:"#D0D0D0",alignItems:"center"}}>
                           <Text>Edit</Text>
                    </Pressable>
                    <Pressable style={{backgroundColor:"#F5F5F5",paddingHorizontal:10,paddingVertical:6,borderRadius:5,borderWidth:0.9,borderColor:"#D0D0D0",alignItems:"center"}}>
                           <Text>Remove</Text>
                    </Pressable>
                    <Pressable style={{backgroundColor:"#F5F5F5",paddingHorizontal:10,paddingVertical:6,borderRadius:5,borderWidth:0.9,borderColor:"#D0D0D0",alignItems:"center"}}>
                           <Text>Set as default</Text>
                    </Pressable>
                    
                  </View>
                  <View>
                     {selectedAddress && selectedAddress?._id === item?._id && (
                      <Pressable 
                       onPress={()=>setCurrentStep(1)}
                      style={{
                        backgroundColor:"#008397",
                        padding:10,
                        borderRadius:20,
                        justifyContent:"center",
                        alignItems:"center",
                        marginTop:10
                      }}>
                        <Text style={{fontSize:15,fontWeight:"bold",color:"white"}}>Deliver to this address</Text>
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
    <Text style={{fontSize:20,fontWeight:"bold"}}>Choose the delivery options</Text>

    <View style={{flexDirection:"row",alignItems:"center",backgroundColor:"white",padding:8,gap:7,borderColor:"#D0D0D0",borderWidth:1,marginTop:10}}>
      {options ? (
      <FontAwesome5 onPress={()=>setOptions(!options)} name="dot-circle" size={24} color="#008397" />
      ):(
        <Entypo onPress={()=>setOptions(!options)} name="circle" size={24} color="black" />
      )}
   

    <Text style={{flex:1}}>
      <Text style={{color:"green",fontWeight:"500"}}>Tommorow by 10pm</Text>{" "}
      -Free delivery with your prime membership
    </Text>
    </View>
    <Pressable  
     onPress={()=>setCurrentStep(2)}
    style={{backgroundColor:"#FFC72C",padding:10,borderRadius:20,justifyContent:"center",alignItems:"center",marginTop:15}}>
      <Text style={{fontSize:18,fontWeight:"bold"}}>Continue</Text>
    </Pressable>
  </View>
)}

{currentStep ==2 && (
  <View style={{marginHorizontal:20}}>
    <Text style={{fontSize:20,fontWeight:"bold"}}>Select your payment method</Text>

    <View style={{backgroundColor:"white",padding:8,borderColor:"#D0D0D0",borderWidth:1,flexDirection:"row",alignItems:"center",gap:7,marginTop:12}}>

  {selectedOptions == "cash" ?(
     <FontAwesome5 name="dot-circle" size={24} color="black" />
  ):(
    <Entypo onPress={()=>setSelectedOptions("cash")}  name='circle' size={20} color="gray"/>
  )}

     

      <Text>Cash on delivery</Text>
    </View>

    <View style={{backgroundColor:"white",padding:8,borderColor:"#D0D0D0",borderWidth:1,flexDirection:"row",alignItems:"center",gap:7,marginTop:12}}>

      {selectedOptions == "card" ?(
        <FontAwesome5 name="dot-circle" size={24} color="black" />
      ):(
        <Entypo onPress={() => {
          setSelectedOptions("card");
          Alert.alert('UPI/Debit card, pay online', '', [
            {
              text: 'Cancel',
              onPress: () => console.log('Cancel is pressed'),
            },
            {
              text: 'OK',
              onPress: pay,
            },
          ]);
        }} name='circle' size={20} color="gray"/>
      )}
      

      <Text>UPI / Credit or debit card</Text>
    </View>
    <Pressable  
     onPress={()=>setCurrentStep(3)}
    style={{backgroundColor:"#FFC72C",padding:10,borderRadius:20,justifyContent:"center",alignItems:"center",marginTop:15}}>
      <Text style={{fontSize:18,fontWeight:"bold"}}>Continue</Text>
    </Pressable>
  </View>
)}

{currentStep == 3 && selectedOptions === "cash" &&(
    <View style={{marginHorizontal:20}}>
      <Text style={{fontSize:20,fontWeight:"bold"}}>Order Now</Text>

    <View style={{flexDirection:"row",alignItems:"center",justifyContent:"space-between",gap:8,backgroundColor:"white",padding:8,borderColor:"#D0D0D0",borderWidth:1,marginTop:10}}>
      <View>
        <Text style={{fontSize:17,fontWeight:"bold"}}>Save 5% and never ran out</Text>
        <Text style={{fontSize:15,color:"gray",marginTop:5}}>Turn on auto deliveries</Text>
      </View>
      <MaterialIcons name='keyboard-arrow-right' size={24} color={"black"} />
    </View>
 
    <View style={{backgroundColor:"white",padding:8,borderColor:"#D0D0D0",borderWidth:1,marginTop:10}}>
        <Text>Shipping to {selectedAddress?.name}</Text>
        <View style={{flexDirection:"row",alignItems:"center",justifyContent:"space-between"}}>
          <Text style={{fontSize:16,fontWeight:"500",color:"gray"}}>Items</Text>
          <Text style={{color:"gray",fontSize:16}}>&#8377;{total}</Text>
        </View>

        <View style={{flexDirection:"row",alignItems:"center",justifyContent:"space-between"}}>
          <Text style={{fontSize:16,fontWeight:"500",color:"gray"}}>Delivery</Text>
          <Text style={{color:"gray",fontSize:16}}>0</Text>
        </View>

        <View style={{flexDirection:"row",alignItems:"center",justifyContent:"space-between"}}>
          <Text style={{fontSize:18,fontWeight:"bold"}}>Order Total</Text>
          <Text style={{color:"#C60C30",fontSize:16}}>&#8377;{total}</Text>
        </View>
    </View>

    <View style={{backgroundColor:"white",padding:8,borderColor:"#D0D0D0",borderWidth:1,marginTop:10}}>
      <Text style={{fontSize:16,color:"gray"}}>Pay with</Text>
      <Text style={{fontSize:16,fontWeight:"600",marginTop:7}}>Pay on delivery Cash</Text>
    </View>
    <Pressable 
    onPress={handleOrder}
    style={{backgroundColor:"#FFC72C",padding:10,borderRadius:20,justifyContent:"center",alignItems:"center",marginTop:20}}>
      <Text style={{fontSize:16,fontWeight:"bold"}}>Place your order</Text>
    </Pressable>
    </View>
)}



{currentStep == 4 && 
  <View style={styles.container}>
  <View>
    <Image style={styles.image} source={require('../../assets/order.png')} />
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
  image: {
    width: "100%",
    height: 200,
  },
  thankYouText: {
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
  },
});