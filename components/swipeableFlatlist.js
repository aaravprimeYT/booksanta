import React, {Component} from 'react'
import {Animated, Dimensions, StyleSheet, Text, View, TouchableHighlight} from 'react-native'
import {ListItem, Icon} from 'react-native-elements'
import {SwipeListView, swipeListView} from 'react-native-swipe-list-view'
import db from '../config'

export default class SwipeableFlatList extends Component{
    constructor(props){
        super(props)
        this.state={
            allNotifications:this.props.allNotifications,
        }
    }
    updateMarkAsRead = (notification) => {
        db.collection("allNotificaitons").doc(notification.docId).update({
            notificationStatus:"read"
        })
    }
    onSwipeValueChange = swipeData => {
        var allNotifications = this.state.allNotifications
        const {key,value} = swipeData
        if (value < -Dimensions.get("window").width) {
            const newData = [...allNotifications]
            this.updateMarkAsRead(allNotifications[key])
            newData.splice(key,1)
            this.setState({
                allNotifications:newData,
            })
        }
    }
        renderItem = (data) => (
            <Animated.View>
                <ListItem leftElement = {
                    <Icon name={"book"} type="font-awesome" color="#696969" title = {data.item.bookName} titleStyle={{color:"black", fontWeight:"bold"}} subtitle = {data.item.message} bottomDivider></Icon>
                }></ListItem>
            </Animated.View>
        )
        renderHiddenItem = () => (
            <View style={{alignItems:"centre",backgroundColor:"#29b6f6", flex:1, flexDirection:"row", justifyContent:"space between", padding:15 }}>
                <View style={{alignItems:"centre", bottom:0, justifyContent:"center", position:"absolute", top:0, width:100, backgroundColor:"#29b6f6", right:0}}>
                    <Text style={{color:"#fff", fontWeight:"bold", fontSize:15, textAlign:"center", alignSelf:"flex-start"}}>Mark As Read</Text>                    
                </View>
            </View>
        )
        render(){
            return(
                <View style={{backgroundColor:"white", flex:1}}>
                    <SwipeListView disableRightSwipe data={this.state.allNotifications} renderItem = {this.renderItem} renderHiddenItem = {this.renderHiddenItem} rightOpenValue={-Dimensions.get("window").width } previewRowKey={0} previewOpenValue = {-40} previewOpenDelay = {3000} onSwipeValueChange={this.onSwipeValueChange} keyExtractor={(item,index)=>this.toString()}></SwipeListView>
                </View>
            )
        }
}