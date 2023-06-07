import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet,Linking  } from 'react-native'
import React from 'react'

const Card = ({item}) => {
  return (
    <View style={styles.cardContainer}>
      <Text style={styles.authorContainer}>Author: {item.author}</Text>
      <Text style={styles.titleContainer}>Description: {item.title}</Text>

      <Image
        resizeMode='cover'
        style={styles.image}
        source={{ uri: item.urlToImage }}
      />

      <TouchableOpacity
        onPress={() => {
          Linking.openURL(item.url);
        }}
      >
        <Text style={styles.readMore}>Read more..</Text>
      </TouchableOpacity>
    </View>
  )
}

export default Card

const styles = StyleSheet.create({
    cardContainer: {
        backgroundColor: '#F5F5F5',
        borderRadius: 10,
        padding: 16,
        marginBottom: 16,
        elevation: 5,
      },
      authorContainer: {
        fontWeight: 'bold',
        marginBottom: 8,
      },
      titleContainer: {
        marginBottom: 16,
      },
      image: {
        width: '100%',
        height: 200,
        marginBottom: 16,
      },
      readMore: {
        color: 'blue',
        fontWeight: 'bold',
      },
})