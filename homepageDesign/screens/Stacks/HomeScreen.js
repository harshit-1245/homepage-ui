import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import TopContainer from '../../component/topcontainer/TopContainer'

const HomeScreen = () => {
  return (
    <ScrollView style={{marginTop:30}}>
    <View style={styles.mainContainer}>
     <TopContainer/>
    </View>
    </ScrollView>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
  mainContainer:{
    flex:1,
    backgroundColor:"#fff"
  }
})