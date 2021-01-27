import React from 'react'
import BookDonate from '../screens/BookDonateScreen'
import ReceiverDetails from '../screens/RecieverDetailsScreen'
import {createStackNavigator} from 'react-navigation-stack'

export const AppStackNavigator = createStackNavigator({
    BookDonateList:{
        screen:BookDonate,
        navigationOptions:{
            headerShown:false
        }
    },
    ReceiverDetails:{
        screen:ReceiverDetails,
        navigationOptions:{
            headerShown:false
        }
    }
},
{
    initialRouteName:"BookDonateList"
})