import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, } from 'react-native';
import Welcome from './screens/welcomeScreen';
//import {AppTabNavigator} from './components/AppTabNavigator';
//import {createAppContainer,createSwitchNavigator} from 'react-navigation';

export default function App() {
  return (
    <View>
      <Welcome></Welcome>
    </View>
  );
}
/*
const switchNavigator = createSwitchNavigator({
  Welcome:{
    screen:Welcome
  },
  BottomTab:{
  screen:AppTabNavigator  
  }
})

const AppContainer = createAppContainer(switchNavigator)
*/

