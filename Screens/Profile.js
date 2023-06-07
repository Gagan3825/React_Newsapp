import { useNavigation } from '@react-navigation/core'
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TouchableOpacity, View,Image } from 'react-native'
import { auth } from '../firebase'
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Profile = () => {
    const navigation = useNavigation()
   

  const handleSignOut = () => {
    auth
      .signOut()
      .then(() => {
        navigation.replace("Login")
      })
      .catch(error => alert(error.message))
  }

  const [image, setImage] = useState(null)
  useEffect(() => {
    getImage();
  }, []);

  const getImage = async () => {
    try {
      const storedImage = await AsyncStorage.getItem('profileImage');
      if (storedImage !== null) {
        setImage(storedImage);
      }
    } catch (error) {
      console.log('Error retrieving image: ', error);
    }
  };
  const pickImage=async()=>{
    let result=await ImagePicker.launchImageLibraryAsync({
        mediaTypes:ImagePicker.MediaTypeOptions.Images,
        quality:1,
        allowsEditing:true
    });
    if(!result.canceled){
      setImage(result.uri);
      saveImage(result.uri)
    }
  };
  const saveImage = async (uri) => {
    try {
      await AsyncStorage.setItem('profileImage', uri);
      console.log('Image saved successfully!');
    } catch (error) {
      console.log('Error saving image: ', error);
    }
  };


  return (
    <View style={styles.container}>
       
       <TouchableOpacity onPress={pickImage} style={styles.imagePicker}>
        {image && <Image source={{ uri: image }} style={styles.image} resizeMode='cover' />}
        {!image && <Text style={styles.imagePickerText}>Choose Image</Text>}
      </TouchableOpacity>
       
    <Text>Email: {auth.currentUser?.email}</Text>
    <TouchableOpacity
      onPress={handleSignOut}
      style={styles.button}
    >
      <Text style={styles.buttonText}>Sign out</Text>
    </TouchableOpacity>
  

  </View>
  )
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
    },
     button: {
      backgroundColor: '#0782F9',
      width: '60%',
      padding: 15,
      borderRadius: 10,
      alignItems: 'center',
      marginTop: 40,
    },
    buttonText: {
      color: 'white',
      fontWeight: '700',
      fontSize: 16,
    },
    imagePicker: {
      width: 200,
      height: 200,
      borderRadius: 100,
      borderWidth: 2,
      borderColor: '#333',
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 20,
    },
    imagePickerText: {
      fontSize: 16,
      color: '#333',
    },
    image: {
      width: '100%',
      height: '100%',
      borderRadius: 100,
    },
  })

export default Profile