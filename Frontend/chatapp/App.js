import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Login from './Components/Login/Login';
import Splash from './Components/Splash';
import AppNavigator from './Navigator/AppNavigator';

export default function App() {
  return (
    <AppNavigator />
  );
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//     backgroundColor:"white"
//   },
// });
