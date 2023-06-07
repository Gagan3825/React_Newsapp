import { StyleSheet, Text, View,FlatList,Image,TouchableOpacity,Linking,ActivityIndicator, Button } from 'react-native'
import React,{useEffect,useState} from 'react'
import Card from './Card'
import Ionicons from '@expo/vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/FontAwesome';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const Home = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const navigation=useNavigation();
  
    const newsdata = React.useCallback(async (category) => {
      setLoading(true);
      const apiUrl = `https://newsapi.org/v2/top-headlines?country=us${category ? `&category=${category}` : ''}&apiKey=1890306cb379437288c56d9a7fc1eafe`;
      const response = await fetch(apiUrl);
      const jso = await response.json();
      setData(jso.articles);
      setLoading(false);
    });
  
    const onRefresh = async () => {
      setRefreshing(true);
      await newsdata(selectedCategory);
      setRefreshing(false);
    };
    const handleCategorySelection = (category) => {
      setSelectedCategory(category);
      newsdata(category);
    };
  
    useEffect(() => {
      newsdata();
    }, [selectedCategory]);
  
    return (
      <View style={styles.container}>
       
       <Text style={styles.heading}>Top headlines</Text>
       <View style={{left:150,bottom:10}}>
       <AntDesign.Button
    name="user"
    backgroundColor="skyblue"
    // style={{borderRadius:25}}
    // onPress={this.loginWithFacebook}
    onPress={()=>{
      navigation.navigate("Profile")
    }}
  >
    Profile
  </AntDesign.Button>
       </View>

       <View style={styles.categoryContainer}>
    <TouchableOpacity
      style={[
        styles.categoryButton,
        selectedCategory === null && styles.selectedCategoryButton,
      ]}
      onPress={() => handleCategorySelection(null)}
    >
      <Text style={styles.categoryButtonText}>All</Text>
    </TouchableOpacity>
    <TouchableOpacity
      style={[
        styles.categoryButton,
        selectedCategory === "business" && styles.selectedCategoryButton,
      ]}
      onPress={() => handleCategorySelection("business")}
    >
      <Text style={styles.categoryButtonText}>Business</Text>
    </TouchableOpacity>
    <TouchableOpacity
      style={[
        styles.categoryButton,
        selectedCategory === "sports" && styles.selectedCategoryButton,
      ]}
      onPress={() => handleCategorySelection("sports")}
    >
      <Text style={styles.categoryButtonText}>Sports</Text>
    </TouchableOpacity>
  </View>
       
        {loading ? (
          <ActivityIndicator size="large" color="#0000ff" style={styles.loader} />
        ) : (
          <FlatList
            data={data}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => <Card item={item} />}
            onRefresh={onRefresh}
          refreshing={refreshing}
          />
        )}
      </View>
    );
  };
  

export default Home

const styles = StyleSheet.create({
    container:{
        
        
        backgroundColor:"#F0F0F0",
        justifyContent:'center',
        alignItems: 'center',    
       },
       heading: {
        marginTop: 50,
        fontWeight: 'bold',
        fontSize: 20,
      },
       loader: {
        marginTop: 50,
      },
        authorcontainer:{
      alignItems:"center",
      marginTop:20,
      textAlign:"center",
      color:"black",
      letterSpacing:3,
      marginLeft:5,
      fontWeight:"bold",
      fontSize:20,
      
      
    },
    titlecontainer:{
      alignItems:"center",
      letterSpacing:3,
      color:"purple",
      marginTop:5,
      marginLeft:5,
      justifyContent:"center",
      textAlign:"center",
      fontStyle:"italic"
    },
    about:{
        padding:5,
        textAlign:"center",
        marginTop:10,
        fontSize:25,
        // backgroundColor:"#f194ff",
        backgroundColor:"lightgreen",
        color:"white",
        borderRadius:25,

        
  
      },
      categoryContainer: {
        flexDirection: "row",
        marginVertical: 10,
      },
      categoryButton: {
        paddingHorizontal: 15,
        paddingVertical: 10,
        backgroundColor: "#F5F5F5",
        borderRadius: 15,
        marginRight: 10,
      },
      selectedCategoryButton: {
        backgroundColor: "skyblue",
      },
      categoryButtonText: {
        fontSize: 16,
        fontWeight: "bold",
      },
})