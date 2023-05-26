import { StatusBar } from 'expo-status-bar';
import { React, useEffect, useState } from 'react'
import { SafeAreaView, StyleSheet, Text, View, FlatList, Image, TouchableOpacity } from 'react-native';
import Header from './Header'
import Screen from '../utils/Screen'
import AsyncStorage from "@react-native-async-storage/async-storage"
import postRequest from '../utils/ApiRoute';

export default function Homepage({ navigation, route }) {
    // const { contacts,authToken } ={
    //     authToken:"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQ2YjllNzdlM2MwZDRkNzk1NDJmMGNkIn0sImlhdCI6MTY4NTA0NjY1Mn0.vASkyCxfxVI8SxMq5L_xwHaskIWuL9SV9bwcVdXUrJM",
    //     contacts:[
    //     {_id:"646b9e82e3c0d4d79542f0cf"},
    //     {_id:"646b9e8ce3c0d4d79542f0d1"},
    //     {_id:"646bb0c755b612472e8997a2"}
    //     ]
    //     }
    const { contacts, authToken } = route.params

    const [ContactsData, setContactData] = useState([])


    async function getContactsData() {
        const contactDataTemp = []
        if(contacts){
            for (let index = 0; index < contacts.length; index++) {
                const response = await postRequest('api/auth/getuserbyid', authToken, contacts[index])
                const Response = await response.json()
                contactDataTemp.push(Response)
    
            }
        }
        setContactData(contactDataTemp)
    }

    useEffect(() => {
        getContactsData()
    }, [contacts])

    const handleSearchNewContact = () => {
        navigation.navigate(Screen.ADDCONTACTS, { authToken: authToken })
    }

    const ChatItem = (props) => {
        const handleChatItemClick = () => {
            navigation.navigate(Screen.CHAT, { authToken: authToken,reciever_id:props.id,username:props.name })
        }
        return (
            <TouchableOpacity onPress={handleChatItemClick} style={styles.ChatBox} >
                <Image
                    source={require('../assets/icon.png')}
                    style={{ width: "15%", aspectRatio: "1/1", marginLeft: "2.5%", marginRight: "5%" }}
                />
                <View>
                    <Text>{props.name}</Text>

                </View>
            </TouchableOpacity>
        )
    }

    return (
        <SafeAreaView style={styles.container}>
            <Header />
            <FlatList style={styles.List}
                data={ContactsData}
                renderItem={({ item }) => <ChatItem name={item.username} id={item._id} />}
                keyExtractor={item => item._id}
            />
            <TouchableOpacity onPress={handleSearchNewContact} style={{ position: "absolute", width: "15%", aspectRatio: "1/1", backgroundColor: "white", bottom: "5%", right: "5%" }}>
                <Text>+</Text>
            </TouchableOpacity>
        </SafeAreaView>
    )
}




const styles = StyleSheet.create({
    container: {
        width: "100%",
        height: "100%",
        position: "relative"
    },
    List: {
        width: "100%",
        height: "85%",

        backgroundColor: "#2c3e50"
    },
    ChatBox: {
        width: "100%",
        height: 75,
        borderLeftWidth: 0,
        borderRightWidth: 0,
        borderTopWidth: 0,
        borderBottomColor: "white",
        borderWidth: 2.5,
        display: "flex",
        flexDirection: "row",
        // justifyContent:"center",
        alignItems: "center"
    },
})