import React, { lazy, Suspense, useEffect, useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { Image, Text, View } from 'react-native';
import SplashScreen from '../screens/Stacks/SplashScreen';
import AddressScreen from '../screens/Stacks/AddressScreen';

const HomeScreen = lazy(() => import('../screens/Stacks/HomeScreen'));
const CategoryScreen = lazy(() => import('../screens/Stacks/CategoryScreen'));
const NotificationScreen = lazy(() => import('../screens/Stacks/NotificationScreen'));
const AccountScreen = lazy(() => import('../screens/Stacks/AccountScreen'));
const CartScreen = lazy(() => import('../screens/Stacks/CartScreen'));
const SearchScreen = lazy(() => import('../screens/Stacks/SearchScreen'));
const LoginScreen = lazy(() => import('../screens/Stacks/LoginScreen'));
const RegisterScreen = lazy(() => import('../screens/Stacks/RegisterScreen'));
const MobileLoginSceen = lazy(() => import('../screens/Stacks/MobileLoginSceen'));
const ProductScreen = lazy(() => import('../screens/Stacks/ProductScreen'));

const Stack = createNativeStackNavigator();
const MaterialBottomTab = createMaterialBottomTabNavigator();

export default function AppNavigation() {
  const [splashVisible, setSplashVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setSplashVisible(false);
    }, 2000); // Adjust the duration of the splash screen as needed

    return () => clearTimeout(timer);
  }, []);

  if (splashVisible) {
    return <SplashScreen />;
  }

  const BottomTabs = () => {
    return (
      <Suspense fallback={<LoadingIndicator />}>
        <MaterialBottomTab.Navigator
          shifting={true}
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;
              let label;

              if (route.name === 'Home') {
                iconName = focused ? 'home' : 'home-outline';
              } else if (route.name === 'Category') {
                iconName = focused ? 'category' : 'category';
                return <MaterialIcons name={iconName} size={30} color={color} />;
              } else if (route.name === 'Notification') {
                iconName = focused ? 'notifications-circle' : 'notifications-circle-outline';
              } else if (route.name === 'Account') {
                iconName = focused ? 'person-circle' : 'person-circle-outline';
              } else if (route.name === 'Cart') {
                iconName = focused ? 'cart' : 'cart-outline';
              }

              return (
                <>
                  <Ionicons name={iconName} size={30} color={color} />
                  <Text style={{ color, fontSize: 10 }}>{focused ? label : null}</Text>
                </>
              );
            },
          })}
          barStyle={{
            backgroundColor: '#FFFFFF',
            borderTopColor: '#CCCCCC',
            borderTopWidth: 1,
          }}
          activeColor="black"
          inactiveColor="black"
        >
          <MaterialBottomTab.Screen name='Home' component={HomeScreen} />
          <MaterialBottomTab.Screen name='Category' component={CategoryScreen} />
          <MaterialBottomTab.Screen name='Notification' component={NotificationScreen} />
          <MaterialBottomTab.Screen name='Account' component={AccountScreen} />
          <MaterialBottomTab.Screen name='Cart' component={CartScreen}/>
        </MaterialBottomTab.Navigator>
      </Suspense>
    );
  };

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={splashVisible ? 'Splash' : 'Main'} screenOptions={{ headerShown: false }}>
        <Stack.Screen name='Main' component={BottomTabs} />
        <Stack.Screen name='Search' component={SearchScreen} />
        <Stack.Screen name='Login' component={LoginScreen} />
        <Stack.Screen name='Register' component={RegisterScreen} />
        <Stack.Screen name='Mobile' component={MobileLoginSceen} />
        <Stack.Screen name='Address' component={AddressScreen} />
        <Stack.Screen name='Product' component={ProductScreen} options={{headerShown:true}} />
        {splashVisible && <Stack.Screen name='Splash' component={SplashScreen} />}
      </Stack.Navigator>
    </NavigationContainer>
  );
}



const LoadingIndicator = () => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <Image source={require("../assets/3.gif")} />
  </View>
);
