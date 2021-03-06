import React from 'react';
import { StyleSheet, Text, View, Alert } from 'react-native';
import {Header, Icon, Badge} from 'react-native-elements'
import db from '../config'
import firebase from 'firebase'

export default class MyHeader extends React.Component{
    constructor(props){
        super(props)
        this.state={
            userId:firebase.auth().currentUser.email,
            value:""
        }
    }

    getNumberOfUnreadNotifications(){
        db.collection("allNotifications").where("notificationStatus", "==", "unread").where("targetedUserId", "==", this.state.userId).onSnapshot((snapShot) => {
            var unreadNotifications = snapShot.docs.map((doc) => doc.data())
            this.setState({
                value:unreadNotifications.length
            })
        })
    }
    componentDidMount(){
        this.getNumberOfUnreadNotifications()
    }
    bellIconWIthBadge = () => {
        return(
            <View>
                <Icon name = "bell" type = "font-awesome" color = "#696969" size={25} onPress={() => {
                    this.props.navigation.navigate("Notifications")
                }}>
                </Icon>
                <Badge value={this.state.value} containerStyle={{position:"absolute", top:-4, right:-4}}>

                </Badge>
            </View>
        )
    }
    render(){
        return(
            <Header leftComponent={<Icon name = "bars" type = "font-awesome" color = "#696969" size={25} onPress={() => {
                this.props.navigation.toggleDrawer()
            }}>
            </Icon>} centerComponent={{text:this.props.title,style:{color:"#90a5a9", fontSize:20, fontWeight:"bold"}}} rightComponent = {<this.bellIconWIthBadge{...this.props}/>} backgroundColor="#eaf8fe">
                
            </Header>
        )
    }
}