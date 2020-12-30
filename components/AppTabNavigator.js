import React from 'react';
import {View,Text,StyleSheet,Image,TextInput,TouchableOpacity,Alert,KeyboardAvoidingView} from 'react-native';
import BookRequest from '../screens/BookRequestScreen'
import BookDonate from '../screens/BookDonateScreen'
import {createBottomNavigator} from 'react-navigation-tabs' 

export const AppTabNavigator = createBottomNavigator({
    BookDonate:{
        screen:BookDonate,
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