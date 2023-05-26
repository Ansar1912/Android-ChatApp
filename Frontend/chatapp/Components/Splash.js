import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import AppNavigator from "../Navigator/AppNavigator";
// import Storage from "../utils/Storage";
// import Cache from "../utils/Cache";
// import Key from "../utils/Key";
import AsyncStorage from "@react-native-async-storage/async-storage"
import Screen from '../utils/Screen';
import postRequest from '../utils/ApiRoute';

const Splash = ({navigation}) => {

    const [isShowSplash, setIsShowSplash] = useState(true)
    const [authToken,setAuthToken]=useState("")
    const [contacts,setContact]=useState([])
    async function getAuthToken(){
        const token = await AsyncStorage.getItem("authToken")
        setAuthToken(token) 
        if(authToken){
            const response = await postRequest('api/auth/getuser', authToken, {})
        const Response = await response.json()
        setContact(Response.contacts)
        console.log(Response)
        }
    } 
    useEffect(() => {
        getAuthToken()
        setTimeout(() => {
            setIsShowSplash(false)
        }, 3000)

    }, [authToken]);

    if (isShowSplash) {
        return (
                <View style={styles.container}>
                    <Text style={styles.label}>ChatApp</Text>
                </View>
            
        )
    }
    else if(authToken){
        navigation.navigate(Screen.HOMEPAGE, { authToken: Response.authToken,contacts:contacts })
            
    }
    else {
        return (
            navigation.navigate(Screen.LOGIN)
        );
    }

}

export default Splash;

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#fff', alignItems: 'center', justifyContent: 'center' },
    label: { fontSize: 40, color: '#923bcc', fontStyle: 'italic' },
    footer: { position: 'absolute', bottom: 0, fontSize: 20, color: '#d6a9b0', marginBottom: 20 }
});
