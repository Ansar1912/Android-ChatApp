import { Button, StyleSheet, Text, TouchableOpacity, View, TextInput } from 'react-native';
import InputField from './InputField';
import Screen from '../../utils/Screen';
import { useEffect, useState } from 'react';
import AsyncStorage from "@react-native-async-storage/async-storage"
// import { AsyncStorage } from 'react-native-local-storage';
import postRequest from '../../utils/ApiRoute'

export default function Login({ navigation }) {
    const [errorMsg, setErrorMsg] = useState("")
    const [ContactNo,setContactNo]=useState("")
    const [Password,setPassword]=useState("")

    const onLoginClick = async () => {
        const response = await postRequest('api/auth/login', '', { "contactNo": ContactNo, "password": Password })
            const Response = await response.json()
            if (response.status == 200) {
                console.log(Response)
                await AsyncStorage.setItem("authToken", Response.authToken)
                navigation.navigate(Screen.HOMEPAGE, { authToken: Response.authToken,contacts:Response.contacts })
            }
            setErrorMsg(Response.message)
        }
    
    const handleContactNoField=(text)=>{
        setContactNo(text)
    }
    const handlePasswordField=(text)=>{
        setPassword(text)
    }

    const handleSignUp=()=>{
        navigation.navigate(Screen.SIGNUP)
    }

    return (
        <View style={styles.container}>
            <View style={styles.LoginArea}>
                <Text style={styles.LoginTitle}>Login</Text>
                <Text style={{ color: "white" }}>{errorMsg}</Text>


                <View style={styles.InputArea}>
                    <Text style={styles.InputTextColor}>ContactNo</Text>
                    <TextInput onChangeText={handleContactNoField} style={styles.InputTextInput} placeholder="Enter Your Username" />
                </View>

                <View style={styles.InputArea}>
                    <Text style={styles.InputTextColor}>Password</Text>
                    <TextInput onChangeText={handlePasswordField} style={styles.InputTextInput} placeholder="Enter Your Password" />
                </View>

                <View style={{ width: "100%", height: "10%", display: "flex", flexDirection: "row", justifyContent: "space-evenly" }}>
                    <TouchableOpacity onPress={onLoginClick} style={styles.TouchAbleOpacityBtn}>
                        <Text style={styles.LoginText}>Login</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.TouchAbleOpacityBtn}>
                        <Text onPress={handleSignUp} style={styles.LoginText}>Sign Up</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: "100%",
        height: "100%",
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: "white"
    },
    LoginArea: {
        width: "85%",
        height: "50%",
        borderRadius: 10,
        backgroundColor: "#2c3e50",
        shadowColor: "black",
        shadowOffset: { width: 10, height: 10 },
        shadowOpacity: 0.4,
        shadowRadius: 3,
        padding: "5%",
    },
    LoginTitle: {
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
        marginTop: "10%",
        backgroundColor: "#95a5a6"
    },
    LoginText: {
        fontSize: 17.5,
        fontWeight: "bold",
        color: "white"
    },
    InputArea: {
        width: "100%",
        height: "15%",
        marginTop: "5%",
        marginBottom: "5%",
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
        height: "100%",
        padding: "5%",
        borderRadius: 10
    }
})