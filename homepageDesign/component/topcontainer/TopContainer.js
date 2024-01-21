import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text, Image, Dimensions, Pressable, TextInput, TouchableOpacity} from "react-native";
import { RFPercentage } from "react-native-responsive-fontsize";
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import {useNavigation} from "@react-navigation/native"


const Height = Dimensions.get('window').height;
const Width = Dimensions.get('window').width;

const TopContainer = () => {
  const navigation=useNavigation()


    //test case for login 
    const [login,setLogin]=useState(false)

    
    
    

  const testingFunction=()=>{
    setLogin(!login)
  }
  return (
    <View style={styles.topContainer}>
      <View style={styles.container}>
        <View style={styles.banner}>
          <View style={styles.horizontalBanner}>
            <Pressable style={styles.flipkart}>
              <Image style={styles.fkLogoImage} source={require('../../assets/lelekart-assests.png')} />
              <Text style={styles.flipkartName}>lelekart</Text>
            </Pressable>

            <Pressable onPress={testingFunction} style={login ? styles.LoginContainer : styles.Groceryflipkart}>
              {login ? (
                <Text style={styles.Login}>Login</Text>
              ) : (
                <>
                  <Image style={styles.groceryLogoImage} source={require('../../assets/grocery.png')} />
                  <Text style={styles.groceryName}>Grocery</Text>
                </>
              )}
            </Pressable>

          </View>
        </View>

        <View style={styles.searchBar}>
          <View style={styles.horizontalBanner}>
            <View style={styles.brandMail}>
              <View>
                <Text style={styles.brandMailText}>Brand Mail</Text>
                <Text style={styles.brandMailTextOff}>⚪  OFF</Text>
              </View>
            </View>
            
            <View style={styles.textInput}>
            <Pressable onPress={()=>navigation.navigate("Search")} style={styles.textInput}>
              
                <Text style={styles.searchIcon}>
                  <FontAwesome name="search" style={{ fontSize: RFPercentage(4), fontWeight: '500' }} />
                </Text>
            

              <View style={styles.textInputBox} /><Text>Search for products</Text>
              </Pressable>
              <Text style={styles.cameraIcon}>
                <AntDesign name="camera" style={{ fontSize: RFPercentage(4), fontWeight: '600' }} />
              </Text>
              <Text style={styles.micIcon}>
                <MaterialCommunityIcons name="microphone-outline" style={{ fontSize: RFPercentage(4) }} />
              </Text>

            </View>
          </View>

          <View></View>
        </View>
      </View>
    </View>
  )
}

export default TopContainer

const styles=StyleSheet.create({
  topContainer: {
    flex: 0.28,
    justifyContent: 'flex-start',
    paddingVertical: '0.6%',
  },
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  banner: {
    flex: 0.5,
    flexDirection: 'row',
  },
  horizontalBanner: {
    flex: 1,
    flexDirection: 'row',
  },

    flipkart: {
        flex: 0.5,
        flexDirection: 'row',
        paddingVertical: '3%',
        paddingHorizontal: '2%', // Adjusted marginHorizontal to 2%
        backgroundColor: '#4CAF50', // Updated background color to a green shade
        borderRadius: 12,
        marginVertical: '3%',
        marginLeft: 10, // Adjusted marginLeft to 10
        height: '60%',
        alignItems: 'center', // Centering content vertically
        shadowColor: '#000', // Added shadow for depth
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
      },
      
      fkLogoImage: {
        flex: 0.5,
        resizeMode: 'cover',
        marginRight: 10, // Adjusted marginRight for spacing
        height: Height * 0.045,
      },
      
      flipkartName: {
        flex: 0.7,
        color: '#ffffff',
        fontSize: RFPercentage(3),
        fontWeight: 'bold',
        fontStyle: 'italic',
        marginLeft: 10, // Adjusted marginLeft for spacing
      },
      Login: {
        fontWeight: 'bold',
        marginLeft:50,
        fontSize: 15,
        textAlign: 'center',
        alignItems: 'center', // Centering vertically
        justifyContent: 'center', // Centering horizontally
      },
      LoginContainer: {
        flex: 0.5,
        flexDirection: 'row',
        paddingVertical: '3%',
        paddingHorizontal: '2%', // Adjusted marginHorizontal to 2%
        backgroundColor: '#2196F3', // Beautiful blue background color when logged in
        borderRadius: 12,
        marginVertical: '3%',
        marginLeft: 10, // Adjusted marginLeft to 10
        height: '60%',
        alignItems: 'center', // Centering content vertically
        fontWeight: 'bold', // Making the text bold
        textAlign: 'center', // Centering text within the button
      },

      Groceryflipkart: {
        flex: 0.5,
        flexDirection: 'row',
        paddingVertical: '3%',
        paddingHorizontal: '2%', // Adjusted marginHorizontal to 2%
        backgroundColor: '#FFC107', // Updated background color to a yellow shade
        borderRadius: 12,
        marginVertical: '3%',
        marginLeft: 10, // Adjusted marginLeft to 10
        height: '60%',
        alignItems: 'center', // Centering content vertically
        shadowColor: '#000', // Added shadow for depth
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
      },
      
      groceryLogoImage: {
        flex: 0.5,
        height: Height * 0.045,
      },
      textInputContainer: {
        flex: 0.8,
        flexDirection: 'row',
        backgroundColor: '#d6d0d6',
        margin: '2%',
        borderRadius: 5,
        alignItems: 'center', // Centering the content vertically
      },
      
      groceryName: {
        flex: 0.7,
        color: '#000',
        fontSize: RFPercentage(3),
        fontWeight: 'bold',
        fontStyle: 'italic',
        marginLeft: 10, // Adjusted marginLeft for spacing
      },
      
  
    searchBar: {
        flex: 0.5,
        paddingTop: "2%",
        marginTop: -26, // Adjusted to bring the search bar closer to the top
      },
    
      brandMail: {
        flex: 0.2,
        padding: '0.4%',
        marginHorizontal: '-1%',
        marginTop: 10, // Adjusted to bring brand mail closer to the top
      },

      textInput: {
        flex: 0.8,
        flexDirection: 'row',
        backgroundColor: '#d6d0d6',
        margin: '2%',
        borderRadius: 5,
        alignItems: 'center', // Centering the content vertically
        
      },

    brandMailText:{
        textAlign:'center',
        fontWeight:'900',
        fontSize:RFPercentage(1.8)
    },

    brandMailTextOff:{
        textAlign:'center',
        fontWeight:'700',
        fontSize:RFPercentage(1.8),
        backgroundColor:'#d6d0d6',
        width:'70%',
        borderRadius:5,
        alignSelf:'center',
        marginVertical:'5%',
        color:'#000'
    },

    searchIcon:{
        padding:'3%'

    },

    cameraIcon:{
        paddingLeft:60,
        marginVertical:'2.5%',
        
    },

    micIcon:{
        marginVertical:'2.5%'
    },

    textInputBox:{
       
    }

})