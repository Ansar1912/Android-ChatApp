import { StyleSheet, Text, View } from 'react-native';

export default function Header({navigation}){
    return(
        <View style={styles.container}>
            <Text style={styles.title}>ChatApp</Text>
        </View>
    )
}

const styles=StyleSheet.create({
    container:{
        width:"100%",
        height:"15%",
        backgroundColor:"#34495e",
        display:"flex",
        flexDirection:"row",
        alignItems:"center",
    },
    title:{
        color:"white",
        fontWeight:"bold",
        marginStart:"5%",
        
    }
})