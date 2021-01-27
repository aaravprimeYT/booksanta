import React from 'react';
import {View,Text,StyleSheet,Image,TextInput,TouchableOpacity,Alert,KeyboardAvoidingView} from 'react-native';
import BookRequest from '../screens/BookRequestScreen'
import BookDonate from '../screens/BookDonateScreen'
import {createBottomNavigator} from 'react-navigation-tabs'
import firebase from 'firebase'
import db from '../config'
import { DrawerItems } from 'react-navigation-drawer';
import {Avatar, Icon} from 'react-native-elements'
import * as Permissions from 'expo-permissions'
import * as ImagePicker from 'expo-image-picker'
import {RFValue} from 'react-native-responsive-fontsize'

export default class CustomSidebarMenu extends React.Component{
    constructor(){
        super()
        this.state={
            userId:firebase.auth().currentUser.email,
            image:"#",
            name:"",
            docId:"",
        }
    }

    fetchImage = (imageName) => {
        var ref = firebase.storage().ref().child("userProfiles/" + imageName)
        ref.getDownloadURL().then((URL) => {
            this.setState({
                image:URL
            })
        }).catch((error) => {
            this.setState({
                image:"#"
            })
        })
    }

    getUserProfile(){
        db.collection("users").where("emailId", "==", this.state.userId).onSnapshot((snapShot) => {
            snapShot.forEach((doc) => {
                this.setState({
                    name:doc.data().firstName,
                    docId:doc.id,
                    image:doc.data.image
                })
            })
        })
    }

    componentDidMount(){
        this.getUserProfile()
        this.fetchImage(this.state.userId)
    }

    uploadImage = async (uri,imageName) => {
        var response = await fetch(uri)
        var blob = await response.blob()
        var ref = firebase.storage().ref().child("userProfiles/" + imageName)
        return ref.put(blob).then((response) => {
            this.fetchImage(imageName)
        })
    }

    selectPicture = async () => {
        const {cancelled,uri} = await ImagePicker.launchImageLibraryAsync({
            mediaTypes:ImagePicker.MediaTypeOptions.All,
            allowsEditing:true,
            aspect:[4,3],
            quality:1
        })
        if (!cancelled) {
            this.uploadImage(uri,this.state.userId)
        }
    }

    render(){
        return(
            <View style={{flex:1}}>
                <View style={{flex:0.5, alignItems:"center", backgroundColor:"#32867d"}}>
                    <Avatar rounded source={{uri:this.state.image}} size={"xlarge"} onPress={() => this.selectPicture()} containerStyle={styles.imageContainer} ShowEditButton>
                    </Avatar>
                    <Text style={{fontWeight:"bold", fontSize:RFValue(20), paddingTop:10, color:"#fff"}}>{this.state.name}</Text>
                </View>
                <View style={{flex:0.8,marginTop:100}}>
                    <DrawerItems {...this.props}></DrawerItems>
                </View>
                <View style={{flex:0.2,justifyContent:"flex-end",padding:30}}>
                    <TouchableOpacity style={{height:50,width:"100%",justifyContent:"center",padding:10, marginBottom:50, backgroundColor:"#32867d", borderRadius:10}} onPress={()=>{
                        this.props.navigation.navigate("Welcome")
                        firebase.auth().signOut()
                    }}>
                        <Icon name="logout" type="antdesign" size={RFValue(20)} iconStyle={{paddingLeft:RFValue(10)}}/>
                        <Text style={{fontSize:RFValue(15),fontWeight:"bold", marginLeft:RFValue(30)}}>Log Out</Text></TouchableOpacity>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    imageContainer:{
        flex:0.75,
        width:"40%",
        height:"20%",
        marginLeft:20,
        marginTop:30,
        borderRadius:40
    }
})