import { StyleSheet, Text, TextInput, View } from 'react-native';

export default function InputField(props) {
    return(
        <View style={style.InputArea}>
            <Text style={style.InputTextColor}>{`${props.name}:`}</Text>
            <TextInput style={style.InputTextInput} placeholder={`Enter Your ${props.name}`} />
        </View>
    )
}

const style=StyleSheet.create({
    InputArea:{
        width:"100%",
        height:"25%",
        marginTop:"2%",
        marginBottom:"2%",
        padding:"2.5%"
    },
    InputTextColor:{
        color:"white",
        marginTop:"2%",
        marginBottom:"3%",
        paddingLeft:"5%",
        
    },
    InputTextInput:{
        backgroundColor:"white",
        height:"100%",
        padding:"5%",
        borderRadius:10
    }
})