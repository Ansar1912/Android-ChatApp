import { StatusBar } from 'expo-status-bar';
import { useState, useEffect } from 'react';
import { SafeAreaView, Dimensions, StyleSheet, Text, View, FlatList, Image, TouchableOpacity, TextInput } from 'react-native';
import postRequest from '../utils/ApiRoute';
import Screen from '../utils/Screen'
import Icon from 'react-native-vector-icons/FontAwesome';
import env from '../utils/env'

const AddContacts = ({ navigation, route }) => {
    const ApiURL = env.LOCALHOST
    // const { reciever_id, authToken, username } = {
    //     "authToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQ2YjllNzdlM2MwZDRkNzk1NDJmMGNkIn0sImlhdCI6MTY4NTA0ODUwOX0.RqNzcXfkFHLPbJzXBmYjUoo1izaJEhx8G1CNa64JDns",
    //     "reciever_id": "646b9e82e3c0d4d79542f0cf",
    //     "username": "Ali"
    // }
    const { authToken } = route.params
    const [searchText, setSearchText] = useState("");
    const [data, setData] = useState([]);
    const handleInputTextChange = async (text) => {
        setSearchText(text)
    }
    const finalSearchList = []
    const handleSearchButton = async () => {
        const searchResult = await fetch(`${ApiURL}api/search/contact?contact=${searchText}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'authToken': authToken
            },
        })


        const Response = await searchResult.json()
        // setData(Response)
        const { searchList, contacts, _id } = Response

        searchList.map(element => {
            let ShouldAddToSearchList = true
            contacts.map(item => {
                if (item._id == element._id) {

                    ShouldAddToSearchList = false
                }
            })
            if (element._id == _id) {
                ShouldAddToSearchList = false;
            }
            if (ShouldAddToSearchList == true) {
                finalSearchList.push(element)

            }
        })
        setData(finalSearchList)
    }
    // Contact Card
    let userSelected = []

    const ContactCard = (props) => {

        const [isCheck, SetIsCheck] = useState('#7f8c8d')
        const handleLongPress = () => {
            console.log("test")
            SetIsCheck('#34495e');
            userSelected.push({ _id: props._id })
        }
        const handlePress = () => {
            SetIsCheck('#7f8c8d');
            const filteredList = userSelected.filter(item => item._id != props._id);
            userSelected = filteredList
        }
        useEffect(() => {

        }, [])

        return (
            <TouchableOpacity onLongPress={handleLongPress} onPress={handlePress} style={[styles.CardContainer, { backgroundColor: isCheck }]}>
                <Image
                    source={require('../assets/icon.png')}
                    style={{ width: "20%", aspectRatio: "1/1", borderRadius: 50, marginLeft: "2.5%", marginRight: "5%" }}
                />
                <View style={{ flex: 1, flexDirection: "row", justifyContent: "space-between" }}>
                    <Text>{props.name}</Text>
                </View>
            </TouchableOpacity>
        )
    }

    const handleSubmit = async () => {
        if (userSelected.length > 0) {
            console.log(userSelected)
            const AddContacts = await postRequest('api/search/addcontact', authToken, { contacts: userSelected })
            const Response = await AddContacts.json()
            console.log(Response)
            navigation.navigate(Screen.HOMEPAGE, { contacts: Response.contacts, authToken })
        }
    }




    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TextInput value={searchText} onChangeText={handleInputTextChange} style={styles.InputText} placeholder='Enter Your Search Contact Number' />
                <TouchableOpacity style={styles.ButtonArea} onPress={handleSearchButton} >
                    <Icon name="search" size={20} color="#2c3e50" />
                </TouchableOpacity>
            </View>


            <FlatList style={styles.flatList}
                data={data}
                renderItem={({ item }) => <ContactCard name={item.username} _id={item._id} />}
                keyExtractor={item => item._id}
            >

            </FlatList>
            <View style={styles.AddButton}>
                <TouchableOpacity onPress={handleSubmit} style={{ width: "40%", height: "50%", borderRadius: 10, backgroundColor: "#95a5a6", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "center" }} >
                    <Text>Add Contact</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}



const styles = StyleSheet.create({
    container: {
        width: "100%",
        height: "100%",
        position: "relative"
    },
    header: {
        width: "100%",
        height: "15%",
        backgroundColor: "#2c3e50",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-evenly",
        alignItems: "center",
        padding: "5%"
    },
    InputText: {
        width: "80%",
        height: "60%",
        borderWidth: 0,
        backgroundColor: "#95a5a6"

    },
    flatList: {
        width: "100%",
        height: "70%",
        backgroundColor: "#95a5a6",
    },
    CardContainer: {
        width: "100%",
        height: "100%",
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        padding: "3%"
    },
    AddButton: {
        width: "100%",
        height: "12.5%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#2c3e50"
    },
    ButtonArea: {
        width: "12.5%",
        aspectRatio: "1/1",
        backgroundColor: "blue",
        borderRadius: 50,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#95a5a6"
    }
})

export default AddContacts