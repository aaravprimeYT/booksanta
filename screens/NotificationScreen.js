import React, { Component } from 'react';
import { View, StyleSheet, Text, FlatList,TouchableOpacity } from 'react-native';
import { Icon, ListItem } from 'react-native-elements'
import firebase from 'firebase';
import db from '../config'
import MyHeader from '../components/MyHeader';
import BookRequest from './BookRequestScreen';
import SwipeableFlatList from '../components/swipeableFlatlist'

export default class NotificaitonScreen extends Component{
  constructor(props){
    super(props)
    this.state = {
      allNotifications : [],
      userId:firebase.auth().currentUser.email,
    }
  this.requestRef= null
  }



  getAllNotifications = () => {
    this.requestRef =  db.collection("allNotifications").where("notificationStatus", "==", "unread").where("targetedUserId", "==", this.state.userId)
    .onSnapshot((snapshot)=>{
      var allNotifications = []
      snapshot.docs.map((doc) => {
        var notification = doc.data()
        notification["docId"] = doc.id
        allNotifications.push(notification)
      })
      this.setState({
        allNotifications : allNotifications
      });
    })
  }




  componentDidMount(){
    this.getAllNotifications()
  }

  componentWillUnmount(){
    this.requestRef = null
  }

  keyExtractor = (item, index) => index.toString()

  renderItem = ( {item, i} ) =>{
    return (
      <ListItem
        key={i}
        title={item.bookName}
        subtitle={item.message}
        titleStyle={{ color: 'black', fontWeight: 'bold' }}
          leftElement={
              <Icon name={"book"} type = {"font-awesome"} color={"#696969"}></Icon>
          }
        bottomDivider
      />
    )
  }

  render(){
    return(
      <View style={{flex:1}}>
        <MyHeader title="Notifications" navigation ={this.props.navigation}/>
        <View style={{flex:1}}>
          {
            this.state.allNotifications.length === 0
            ?(
              <View style={styles.subContainer}>
                <Image source={("../assets/Notification.png")}/>
                <Text style={{ fontSize: 20}}>List Of All Notifications</Text>
              </View>
            )
            :(
              <SwipeableFlatList
                allNotifications = {this.state.allNotifications}
              />
            )
          }
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  subContainer:{
    flex:1,
    fontSize: 20,
    justifyContent:'center',
    alignItems:'center'
  },
  button:{
    width:100,
    height:30,
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:"#ff5722",
    shadowColor: "#000",
    shadowOffset: {
       width: 0,
       height: 8
     }
  }
})