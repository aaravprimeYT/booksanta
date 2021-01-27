import React, { Component } from 'react';
import { View, StyleSheet, Text, FlatList,TouchableOpacity } from 'react-native';
import { Icon, ListItem } from 'react-native-elements'
import firebase from 'firebase';
import db from '../config'
import MyHeader from '../components/MyHeader';
import BookRequest from './BookRequestScreen';


export default class MyDonations extends Component{
  constructor(){
    super()
    this.state = {
      allDonations : [],
      userId:firebase.auth().currentUser.email,
      donorName:""
    }
  this.requestRef= null
  }

  getDonorDetails = (userId) => { 
    db.collection("users").where("emailId", "==", userId).get().then((snapShot) => {
        snapShot.forEach((doc) => {
            this.setState({
                donorName:doc.data().firstName + " " + doc.data().lastName
            })
        })
    })
}

  getAllDonations = () => {
    this.requestRef =  db.collection("AllDonation").where("donorId", "==" ,this.state.userId)
    .onSnapshot((snapshot)=>{
      var allDonations = snapshot.docs.map(document => {return document.data()});
      this.setState({
        allDonations : allDonations
      });
    })
    console.log(this.state.allDonations)
  }

  sendNotification = (bookDetails,requestStatus) => {
    var requestId = bookDetails.requestId;
    var donorId = bookDetails.donorId
    db.collection("allNotifications").where("requestId", "==" , requestId).where("donorId", "==", donorId).get().then((snapShot) => {
      snapShot.forEach((doc) => {
        var message = ""
        if (requestStatus === "bookSent") {
          message = this.state.donorName + "Sent You The Book"
        }
        else {
          message = this.state.donorName = "Has Shown Interest In giving the BooK"
        }
        db.collection("allNotifications").doc(doc.id).update({
          message:message,
          notificationStatus:"unread",
          date:firebase.firestore.FieldValue.serverTimestamp()
        })
      })
    })
  }

  sendBook = (bookDetails) => {
    if (bookDetails.requestStatus==="bookSent") {
      var requestStatus = "donorInterested"
      db.collection("allDonations").doc(bookDetails.doc_Id).update({requestStatus:"donorInterested"})
      this.sendNotification(bookDetails,requestStatus)
    }
    else { 
      var requestStatus = "bookSent"
      db.collection("allDonations").doc(bookDetails.doc_Id).update({requestStatus:"bookSent"})
      this.sendNotification(bookDetails,requestStatus)
    }
  }

  componentDidMount(){
    this.getAllDonations()
    this.getDonorDetails(this.state.userId)
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
        subtitle={item.reasonToRequest}
        titleStyle={{ color: 'black', fontWeight: 'bold' }}
        rightElement={
            <TouchableOpacity style={[styles.button,{backgroundColor:item.requestStatus = "bookSent" ? "green" : "orange"}]} onPress={() => {
              this.sendBook(item)
            }}>
              <Text style={{color:'#ffff'}}>{item.requestStatus==="bookSent" ? "bookSent":"Send Book"}</Text>
            </TouchableOpacity>
          }
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
        <MyHeader title="My Donations" navigation ={this.props.navigation}/>
        <View style={{flex:1}}>
          {
            this.state.allDonations.length === 0
            ?(
              <View style={styles.subContainer}>
                <Text style={{ fontSize: 20}}>List Of All Donations</Text>
              </View>
            )
            :(
              <FlatList
                keyExtractor={this.keyExtractor}
                data={this.state.allDonations}
                renderItem={this.renderItem}
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