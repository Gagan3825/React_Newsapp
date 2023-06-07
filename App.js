import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Home from './Screens/Home';
import React,{useEffect,useState} from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as SplashScreen from 'expo-splash-screen';
import Login from './Screens/Login';
import Profile from './Screens/Profile';


export default function App() {
  const stack=createNativeStackNavigator()
  useEffect(() => {
    // Function to hide the splash screen after 3 seconds
    async function hideSplashScreen() {
      await new Promise(resolve => setTimeout(resolve, 2000)); 
      await SplashScreen.hideAsync();
    }

    hideSplashScreen();
  }, []);

  return (
    <NavigationContainer>
      <stack.Navigator >

        <stack.Screen name='Login' component={Login} options={{headerShown:false}}/>
        <stack.Screen name='Home' component={Home} options={{headerShown:false}}/>
        <stack.Screen name='Profile' component={Profile} options={{headerShown:false}}/>

       
      </stack.Navigator>
    </NavigationContainer>
    // <Home/>
    // <Profile/>
  );
}

