import { useState, useEffect } from 'react';
import { SafeAreaView, Dimensions, StyleSheet, Text, View, FlatList, Image, TouchableOpacity, TextInput, CheckBox } from 'react-native';
import postRequest from '../utils/ApiRoute';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function Chat({ navigation, route }) {
    const { reciever_id, authToken, username } = route.params
    // console.log(route.params)
    // const { reciever_id, authToken, username } = {
    //     "authToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQ2YjllNzdlM2MwZDRkNzk1NDJmMGNkIn0sImlhdCI6MTY4NTA0ODUwOX0.RqNzcXfkFHLPbJzXBmYjUoo1izaJEhx8G1CNa64JDns",
    //     "reciever_id": "646b9e82e3c0d4d79542f0cf",
    //     "username": "Ali"
    // }
    const [data, setData] = useState([])
    const [myID, setMyID] = useState("")
    const [textMsg, setTextMsg] = useState("")
    const [showBin, setShowBin] = useState(false)

    async function getMessageData() {
        const response = await postRequest("api/chat/getchat", authToken, { reciever_id })
        const Response = await response.json()
        setData(Response.mergedList)
    }

    async function getMyID() {
        const response = await postRequest("api/auth/getuser", authToken, {})
        const Response = await response.json()
        setMyID(Response._id)
    }

    const handleTextInput = (text) => {
        setTextMsg(text)

    }

    const handleAddMessage = async () => {
        const response = await postRequest('api/chat/addchat', authToken, { reciever_id, message: textMsg })
        const Response = await response.json()
        console.log(Response)
        setTextMsg("")
    }
    useEffect(() => {

        getMyID()
        getMessageData()
        // console.log(selectedItem)
        setInterval(() => {
            getMessageData()
        }, 5000)
        
    }, [selectedItem,myID, textMsg, showBin], [data])
    const [selectedItem,setSelectedItem]=useState([])
    const [selectedItemColor,setSelectedItemColor]=useState("#7f8c8d")
    const handleDeleteChat=async()=>{
        const response=await postRequest("api/chat/deletechat",authToken,{chats:selectedItem});
        setSelectedItem([])
        setShowBin(false)
    }
    
    const ChatItem = (props) => {
        const handleLongPress = () => {
            setShowBin(true)
            setSelectedItem([...selectedItem,{chatid:props.chatID}])
            // setSelectedItemColor("#2c3e50")
        }
        
        if (props.senderID === props.id) {
            return (
                <TouchableOpacity onLongPress={handleLongPress} style={{ marginTop: "5%", marginBottom: "5%", padding: "5%", position: "relative", left: "28%", backgroundColor: selectedItemColor, minWidth: "20%", maxWidth: "70%", borderRadius: 10 }}>
                    <Text style={{ color: "white", fontSize: 15, fontWeight: "600", textAlign: "center" }}>{props.message}</Text>
                </TouchableOpacity>
            )
        } else {
            return (
                <TouchableOpacity style={{ marginTop: "5%", marginBottom: "5%", padding: "5%", position: "relative", left: "2%", backgroundColor: "#7f8c8d", minWidth: "20%", maxWidth: "70%", borderRadius: 10 }}>
                    <Text style={{ color: "white", fontSize: 15, fontWeight: "600", textAlign: "center" }}>{props.message}</Text>
                </TouchableOpacity>

            )
        }
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={{ width: "100%", minHeight: "15%", backgroundColor: "#34495e", flex: 1, flexDirection: "row", alignItems: "center", padding: "0%" }}>
                <Image
                    source={require('../assets/icon.png')}
                    style={{ width: "15%", aspectRatio: "1/1", borderRadius: 50, marginLeft: "2.5%", marginRight: "5%" }}
                />
                <Text style={{ fontSize: 20, color: "white", }}>{username}</Text>
                {
                    (showBin === true) ?
                        <TouchableOpacity onPress={handleDeleteChat} style={{ width: "12.5%", aspectRatio: "1/1", borderRadius: 50, backgroundColor: "white", display: "flex", alignItems: "center", justifyContent: "center", position: "absolute", right: "5%" }}>
                            <Image
                                source={require('../assets/trash-solid.png')}
                                style={{ width: "40%", height: "70%", marginLeft: "2.5%", marginRight: "5%" }}
                            />
                        </TouchableOpacity> : ""
                }



            </View>
            <FlatList style={{ width: "100%", height: "70%", backgroundColor: "#2c3e50" }}
                data={data}
                inverted={true}
                renderItem={({ item }) => <ChatItem message={item.message} senderID={item.sender_id} id={myID} chatID={item._id}/>}
                keyExtractor={item => item._id}
            >

            </FlatList>
            <View style={{ width: "100%", height: "15%", backgroundColor: "#2c3e50", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-evenly", position: "relative" }}>
                <TextInput onChangeText={handleTextInput} style={{ width: "70%", height: "45%", backgroundColor: "white", borderRadius: 10 }} />
                <TouchableOpacity onPress={handleAddMessage} style={{ width: "10%", aspectRatio: "1/1", backgroundColor: "white", borderRadius: 50, display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-evenly" }}>
                    <Icon name="rocket" size={20} color="#2c3e50" />
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
})