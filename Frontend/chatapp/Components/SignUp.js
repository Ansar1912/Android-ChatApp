import { StatusBar } from 'expo-status-bar';
import { React, useEffect, useState } from 'react'
import { SafeAreaView, StyleSheet, Button, Text, View, TextInput, FlatList, Image, TouchableOpacity } from 'react-native';
import Header from './Header'
import Screen from '../utils/Screen'
import AsyncStorage from "@react-native-async-storage/async-storage"
import postRequest from '../utils/ApiRoute';

export default function SignUp({navigation}) {
    const [username,setUsername]=useState("")
    const [contactNo,setContactNo]=useState("")
    const [password,setPassword]=useState("")

    const handleUsername=(text)=>{
        setUsername(text)
    }
    const handleContactNo=(text)=>{
        setContactNo(text)
    }
    const handlePassword=(text)=>{
        setPassword(text)
    }

    const handleSignUp=async ()=>{
        if(username&&contactNo&&password){
            const response=await postRequest("api/auth/createuser","",{ username, password, contactNo })
            console.log(response)
            const Response=await response.json()
            if(response.status==200){
                navigation.navigate(Screen.LOGIN)
            }
            console.log(Response)
        }
    }
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.RegisterArea}>
                <Text style={styles.RegisterTitle}>Register</Text>
                <View style={styles.InputArea}>
                    <Text style={styles.RegisterText}>Username</Text>
                    <TextInput onChangeText={handleUsername} style={styles.InputTextInput} />
                </View>
                <View style={styles.InputArea}>
                    <Text style={styles.RegisterText}>ContactNo</Text>
                    <TextInput onChangeText={handleContactNo} style={styles.InputTextInput} />
                </View>
                <View style={styles.InputArea}>
                    <Text style={styles.RegisterText}>Password</Text>
                    <TextInput onChangeText={handlePassword} style={styles.InputTextInput} />
                </View>

                <View style={{ width: "100%", height: "10%", display: "flex", flexDirection: "row", justifyContent: "space-evenly" }}>
                    <TouchableOpacity onPress={handleSignUp} style={styles.TouchAbleOpacityBtn}>
                        <Text style={styles.RegisterText}>Sign Up</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
        height: "100%",
        backgroundColor: "#34495e",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center"
    },
    RegisterArea: {
        width: "80%",
        minHeight: "50%",
        backgroundColor: "#2c3e50",
        padding: "5%"
    },
    RegisterTitle: {
        fontSize: 25,
        textAlign: "center",
        fontWeight: "bold",
        color: "white",
        textTransform: "uppercase",
        borderBottomColor: "white",
        borderBottomWidth: 5,
        margin: "2%"
    },
    TouchAbleOpacityBtn: {
        width: "45%",
        height: "100%",
        backgroundColor: "white",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 5,
        marginTop: "5%",
        backgroundColor: "#95a5a6"
    },
    RegisterText: {
        fontSize: 17.5,
        fontWeight: "bold",
        color: "white"
    },
    InputArea: {
        width: "100%",
        height: "15%",
        marginTop: "3%",
        marginBottom: "3%",
        padding: "2.5%"
    },
    InputTextColor: {
        color: "white",
        marginTop: "2%",
        marginBottom: "3%",
        paddingLeft: "5%",

    },
    InputTextInput: {
        backgroundColor: "white",
        minHeight: "20%",
        maxHeight: "80%",
        padding: "0%",
        borderRadius: 10
    }

})