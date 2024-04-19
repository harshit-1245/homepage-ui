import { Alert, Pressable,ToastAndroid, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useContext } from 'react'
import { useForm, Controller } from 'react-hook-form';
import { useNavigation } from '@react-navigation/native';
import { UserType } from '../../context/contextApi';
import AsyncStorage from "@react-native-async-storage/async-storage"; 
import * as Animatable from 'react-native-animatable';
import axios from "axios"

const AnimatedText = Animatable.createAnimatableComponent(Text);


const AddAddressScreen = () => {
    const navigation=useNavigation()
    const { userId} = useContext(UserType);
   

    const handleAddress = async(data) => {
         const token=Math.floor(1000 + Math.random()*9000)

       const addresses={
        name: data.name,
        mobileNo:data.mobileNo,
        houseNo: data.houseNo,
        street:data.street,
        landmark:data.landmark,
        postalCode:data. postalCode,
        token:token.toString()
       }
       try {
        const authToken = await AsyncStorage.getItem("authToken");
        const response = await axios.post(
          "http://192.168.14.201:4000/address",
          { userId, addresses },
          {
            headers: {
              Authorization: `Bearer ${authToken}`
            }
          }
          
        );
        
        ToastAndroid.showWithGravity(
            "SuccessFully added",
            ToastAndroid.SHORT,
            ToastAndroid.CENTER
          );
        
      setValue('name', '');
      setValue('mobileNo', '');
      setValue('houseNo', '');
      setValue('street', '');
      setValue('landmark', '');
      setValue('postalCode', '');

      setTimeout(() => {
        navigation.goBack();
      }, 500);
       } catch (error) {
        Alert.alert("Error", "Failed to add address");
        console.log("error", error);
       }
    };
    const {
        control,
        handleSubmit,
        setValue,
        formState: { errors },
      } = useForm();
     
  return (
    <ScrollView >
      <View />
      <View>
      <View style={styles.titleContainer}>
                <AnimatedText animation="fadeIn" duration={1500} style={styles.title}>Add a new Address</AnimatedText>
            </View>

        <Controller
                    control={control}
                    render={({ field }) => (
                        <TextInput
                            style={styles.input}
                            placeholder="India"
                            placeholderTextColor="black"
                            editable={false} // Make it uneditable
                            {...field}
                        />
                    )}
                    name="country"
                    defaultValue="India" // Set default value to "India"
                />

<Controller
                    control={control}
                    render={({ field }) => (
                        <View>
                            <Text style={{fontWeight:"bold"}}>Enter your name</Text>
                            <TextInput
                                style={styles.input}
                                value={field.value}
                                onChangeText={field.onChange}
                                placeholder="John Doe"
                                placeholderTextColor="gray"
                            />
                        </View>
                    )}
                    name="name"
                    rules={{ required: 'Name is required' }}
                />
                {errors.name && <Text style={styles.error}>{errors.name.message}</Text>}

                <Controller
    control={control}
    render={({ field }) => (
         <View>
                            <Text style={styles.label}>Enter your Mobile Number</Text>
                            <TextInput
                                style={styles.input}
                                value={field.value}
                                onChangeText={field.onChange}
                                placeholder="Mobile Number"
                                placeholderTextColor="gray"
                            />
                        </View>
    )}
    name="mobileNo"
    rules={{ required: 'Mobile No. is required' }}
/>
{errors.mobileNo && <Text style={{ color: 'red' }}>{errors.mobileNo.message}</Text>}

{/* Add other address fields similarly */}
<Controller
    control={control}
    render={({ field }) => (
        <View>
            <Text>Flat Number</Text>
        <TextInput
            value={field.value}
            style={styles.input}
            onChangeText={field.onChange}
            placeholderTextColor={'black'}
            placeholder="Flat,House No,Building,Company"
        />
        </View>
    )}
    name="houseNo"
    rules={{ required: 'House No. is required' }}
/>
{errors.houseNo && <Text style={{ color: 'red' }}>{errors.houseNo.message}</Text>}

<Controller
    control={control}
    render={({ field }) => (
       <View>
        <Text>Area</Text>
        <TextInput
            value={field.value}
            style={styles.input}
            onChangeText={field.onChange}
            placeholderTextColor={'black'}
            placeholder="Area,Street,sector,village"
        />
        </View>
    )}
    name="street"
    rules={{ required: 'Street is required' }}
/>
{errors.street && <Text style={{ color: 'red' }}>{errors.street.message}</Text>}

<Controller
    control={control}
    render={({ field }) => (
        <View>
            <Text>LandMark</Text>
        <TextInput
        style={styles.input}
            value={field.value}
            onChangeText={field.onChange}
            placeholderTextColor={'black'}
            placeholder="Landmark (Eg near bhubneswar)"
        />
        </View>
    )}
    name="landmark"
    rules={{ required: 'Landmark is required' }}
/>
{errors.landmark && <Text style={{ color: 'red' }}>{errors.landmark.message}</Text>}

<Controller
    control={control}
    render={({ field }) => (
        <View>
            <Text>Pincode</Text>
        <TextInput
            value={field.value}
            style={styles.input}
            onChangeText={field.onChange}
            placeholderTextColor={'black'}
            placeholder="Pincode"
        />
        </View>
    )}
    name="postalCode"
    rules={{ required: 'Pincode is required' }}
/>
{errors.postalCode && <Text style={{ color: 'red' }}>{errors.postalCode.message}</Text>}
        <Pressable style={styles.button} onPress={handleSubmit(handleAddress)}>
                    <Text style={styles.buttonText}>Add Address</Text>
                </Pressable>
      </View>
    </ScrollView>
  )
}

export default AddAddressScreen

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        justifyContent: 'center',
        padding: 20,
    },
    formContainer: {
        alignItems: 'center',
    },
    titleContainer: {
        alignItems: 'center',
        marginBottom: 20,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#333',
        textTransform: 'uppercase',
        letterSpacing: 1,
        textDecorationLine: 'underline',
    },
    input: {
        height: 40,
        width: '100%',
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        marginBottom: 10,
    },
    button: {
        backgroundColor: '#007bff',
        padding: 10,
        borderRadius: 5,
        marginTop: 20,
    },
    buttonText: {
        color: 'white',
        textAlign: 'center',
        fontSize: 16,
    },
    error: {
        color: 'red',
        marginBottom: 10,
    },
})