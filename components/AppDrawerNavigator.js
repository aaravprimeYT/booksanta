import React from 'react'
import { createDrawerNavigator } from 'react-navigation-drawer';
import {AppTabNavigator} from './AppTabNavigator'
import CustomSidebarMenu from './customSidebarMenu'
import Settings from '../screens/SettingScreen'
import MyDonations from '../screens/MyDonationScreen'
import NotificaitonScreen from '../screens/NotificationScreen'
import MyReceivedBooks from '../screens/MyReceivedBooksScreen'
import {Icon} from 'react-native-elements'

export const AppDrawerNavigator = createDrawerNavigator({
    Home:{screen:AppTabNavigator,
        navigationOptions:{
            drawerIcon:<Icon name="home" type="fontawesome5"/>
        }
    },
    Settings:{screen:Settings,
        navigationOptions:{
            drawerIcon:<Icon name="settings" type="fontawesome5"/>,
            drawerLabel:"Settings"
        }
    },
    MyDonations:{screen:MyDonations,
        navigationOptions:{
            drawerIcon:<Icon name="gift" type="font-awesome"/>,
            drawerLabel:"My Donations"}
        },
    Notifications:{screen:NotificaitonScreen,
        navigationOptions:{
            drawerIcon:<Icon name="bell" type="font-awesome"/>,
            drawerLabel:"Notifications"
        }
    },
    MyReceivedBooks:{screen:MyReceivedBooks,
        navigationOptions:{
            drawerIcon:<Icon name="gift" type="font-awesome"/>,
            drawerLabel:"My Requested Books"
        }
          }
},
{
contentComponent:CustomSidebarMenu
},
{
    initalRouteName:"Home"
})