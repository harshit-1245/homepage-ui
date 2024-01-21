import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';

import { StyleSheet, Text, View } from 'react-native';


import AppNaviagtion from './navigation/index';



export default function App() {
  return (
    <>
     {/* <NavigationContainer> */}
  <AppNaviagtion/>
  {/* </NavigationContainer> */}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
