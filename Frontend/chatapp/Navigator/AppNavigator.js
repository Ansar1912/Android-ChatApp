import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LOGIN from '../Components/Login/Login'
import Homepage from '../Components/Homepage'
import Chat from '../Components/Chat'
import SignUp from '../Components/SignUp'
import Splash from '../Components/Splash'
import Screen from '../utils/Screen';
import AddContacts from '../Components/AddContacts';


const Stack = createNativeStackNavigator();

function AppNavigator() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName={Screen.LOGIN}>
                <Stack.Screen name={Screen.LOGIN} component={LOGIN} options={{ headerShown: false }} />
                <Stack.Screen name={Screen.HOMEPAGE} component={Homepage} options={{ headerShown: false }} />
                <Stack.Screen name={Screen.ADDCONTACTS} component={AddContacts} options={{ headerShown: false }} />
                <Stack.Screen name={Screen.CHAT} component={Chat} options={{ headerShown: false }} />
                <Stack.Screen name={Screen.SIGNUP} component={SignUp} options={{ headerShown: false }} />
                <Stack.Screen name={Screen.SPLASH} component={Splash} options={{ headerShown: false }} />
                
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default AppNavigator;
