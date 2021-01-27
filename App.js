import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, } from 'react-native';
import Welcome from './screens/welcomeScreen';
import {AppTabNavigator} from './components/AppTabNavigator';
import {createAppContainer,createSwitchNavigator} from 'react-navigation';
import {AppDrawerNavigator} from './components/AppDrawerNavigator'

export default function App() {
  return (
      <AppContainer></AppContainer>
  );
}

const switchNavigator = createSwitchNavigator({
  Welcome:{
    screen:Welcome
  },
  Drawer:{
  screen:AppDrawerNavigator  
  }
})

const AppContainer = createAppContainer(switchNavigator)


