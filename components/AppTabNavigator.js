import React from 'react';
import {View,Text,StyleSheet,Image,TextInput,TouchableOpacity,Alert,KeyboardAvoidingView} from 'react-native';
import BookRequest from '../screens/BookRequestScreen'
import BookDonate from '../screens/BookDonateScreen'
import {createBottomTabNavigator} from 'react-navigation-tabs'
import {AppStackNavigator} from './AppStackNavigator'


export const AppTabNavigator = createBottomTabNavigator({
    BookDonate:{
        screen:AppStackNavigator,
        navigationOptions:{
            tabBarIcon:<Image source={require("../assets/book.png")} style={{width:20,height:20}}></Image>,
            tabBarLabel:"Donate Books"
        }
    },
    BookRequest:{
        screen:BookRequest,
        navigationOptions:{
            tabBarIcon:<Image source={require("../assets/book2.png")} style={{width:20,height:20}}></Image>,
            tabBarLabel:"Request a Book"
        }
    }
})