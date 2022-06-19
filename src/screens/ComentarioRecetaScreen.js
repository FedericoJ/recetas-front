import React from 'react';
import { ScrollView,StyleSheet,Image,View,Text,TouchableOpacity,TextInput} from 'react-native';
import { FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons'; 
import Stars from 'react-native-stars';
import axios from 'axios'
import config from "../config/default.json";
import useSWR from 'swr';
import variables from '../config/variables';
import { NativeBaseProvider,Skeleton,VStack,Center,HStack,Spinner,TextArea} from 'native-base';
import Ingredients from "../components/Ingredients";

const Comentarios =({recetas}) =>{

  const baseUrl =  config.baseUrl;

  const fetcher = url => axios.get(`${baseUrl}/receta/getValoracionesByReceta?idReceta=${recetas}`).then(res => res.data)
  
  const ingredientes=useSWR(`${baseUrl}/receta/getValoracionesByReceta?idReceta=${recetas}`, fetcher);


  if (!ingredientes.data){
    return( <NativeBaseProvider>
            <HStack space={8} justifyContent="center">
              <Spinner color="warning.500" />
            </HStack>
            </NativeBaseProvider>)
  }else{
    return (
      <View style={{marginBottom:"5%"}}>
        {ingredientes.data &&
          ingredientes.data.map((element, i) => (
            <View key={i} style={{flexDirection:"column"}}>
              <View style={{flexDirection:"row",marginBottom:"2%",marginHorizontal:'5%'}}>
                  <FontAwesome name="user" size={30} color="black" />
                  <Text style={{fontSize:20, width:'50%', color:"black"}}> @{element.nickname} </Text>
                  <NativeBaseProvider>
                          <Stars 
                              display={element.calificacion}
                              spacing={4}
                              count={5}
                              starSize={30}
                              fullStar= {<FontAwesome size={20} name="star" color="blue" />}
                              emptyStar= {<FontAwesome size={20} name="star-o" color="blue" />}
                              halfStar={<FontAwesome size={20} name="star-half" color="blue" />} />
                  </NativeBaseProvider>
              </View>
              <View style={{marginBottom:"10%"}}>
                <NativeBaseProvider>
                    <TextArea style={{backgroundColor:"#ffff"}} 
                    w ="90%" 
                    mx ="5" 
                    fontSize="20" 
                    isDisabled 
                    value= {element.comentarios} 
                    />
                </NativeBaseProvider>
                </View>
              </View>
                 
          ))}
  
      </View>
    );
  }
    
  
  }
const ComentarioRecetaScreen= () => {

    return (
      <ScrollView style={styles.container}>
          <Text style={{ marginTop:'5%',marginBottom:"10%",marginHorizontal:'5%',fontSize:30,fontWeight:"bold"}}> Comentarios </Text>
          <Comentarios recetas={1} />
       </ScrollView>
    );
  } 


const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor:'#D6B1B1'
    },


  });

export default ComentarioRecetaScreen;