import React, { Component } from 'react';
import { View, StyleSheet, Text, FlatList,TouchableOpacity } from 'react-native';
import { Icon, ListItem } from 'react-native-elements'
import firebase from 'firebase';
import db from '../config'
import MyHeader from '../components/MyHeader';
import BookRequest from './BookRequestScreen';

export default class MyReceivedBooks extends Component{
  constructor(){
    super()
    this.state = {
      receivedBooksList : [],
      userId:firebase.auth().currentUser.email,
    }
  this.requestRef= null
  }


  getReceivedBooksList = () => {
    this.requestRef =  db.collection("RequestedBooks").where("userId", "==" ,this.state.userId).where("bookStatus", "==", "received")
    .onSnapshot((snapshot)=>{
      var receivedBooksList = snapshot.docs.map(document => {return document.data()});
      this.setState({
        receivedBooksList : receivedBooksList
      });
    })
    console.log(this.state.receivedBooksList)
  }

  componentDidMount(){
    this.getReceivedBooksList()
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
        subtitle={item.bookStatus}
        titleStyle={{ color: 'black', fontWeight: 'bold' }}
        bottomDivider
      />
    )
  }

  render(){
    return(
      <View style={{flex:1}}>
        <MyHeader title="Received Books" navigation ={this.props.navigation}/>
        <View style={{flex:1}}>
          {
            this.state.receivedBooksList.length === 0
            ?(
              <View style={styles.subContainer}>
                <Text style={{ fontSize: 20}}>List Of All Received Books</Text>
              </View>
            )
            :(
              <FlatList
                keyExtractor={this.keyExtractor}
                data={this.state.receivedBooksList}
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