import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import HomeScreen from '../screens/Stacks/HomeScreen';
import CategoryScreen from '../screens/Stacks/CategoryScreen';
import NotificationScreen from '../screens/Stacks/NotificationScreen';
import AccountScreen from '../screens/Stacks/AccountScreen';
import CartScreen from '../screens/Stacks/CartScreen';
import { Text } from 'react-native';

const Stack = createNativeStackNavigator();
const MaterialBottomTab = createMaterialBottomTabNavigator();

export default function AppNavigation() {
  const BottomTabs = () => {
    return (
      <>
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
           
              return <MaterialIcons name={iconName} size={24} color={color} />;
            } else if (route.name === 'Notification') {
              iconName = focused ? 'notifications-circle' : 'notifications-circle-outline';
            
            } else if (route.name === 'Account') {
              iconName = focused ? 'person-circle' : 'person-circle-outline';
             
            } else if (route.name === 'Cart') {
              iconName = focused ? 'cart' : 'cart-outline';
              
            }

            return (
              <>
                <Ionicons name={iconName} size={24} color={color} />
                <Text style={{ color, fontSize: 10 }}>{focused ? label : null}</Text>
              </>
            );
          },
        })}
        barStyle={{ backgroundColor: '#fff' }}
      >
        <MaterialBottomTab.Screen name='Home' component={HomeScreen} />
        <MaterialBottomTab.Screen name='Category' component={CategoryScreen} />
        <MaterialBottomTab.Screen name='Notification' component={NotificationScreen} />
        <MaterialBottomTab.Screen name='Account' component={AccountScreen} />
        <MaterialBottomTab.Screen name='Cart' component={CartScreen} />
      </MaterialBottomTab.Navigator>
      </>
    );
  };

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Main'>
        <Stack.Screen name='Main' component={BottomTabs} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
