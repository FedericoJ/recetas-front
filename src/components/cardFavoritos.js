import React, {useState} from 'react';
import {Animated,
  Text, 
  View,
  SafeAreaView,
FlatList, 
TouchableOpacity} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import RecetasFavoritos from './RecetasFavSave';
import { Swipeable,GestureHandlerRootView } from 'react-native-gesture-handler';
import config from "../config/default.json";
import useSWR from 'swr'
import axios from 'axios'
import { NativeBaseProvider,Skeleton,VStack,Center } from 'native-base';
import variables from '../config/variables';

 const RenderRight = (progress,dragX) =>{
   const scale = dragX.interpolate({
     inputRange: [-50,0.5],
     outputRange:[1,0.1]
   })

   const Style={
     transform: [
       {
         scale
       }
     ]
   }

   return(
    
     <View style= {{marginTop:"2%",marginBottom:"2%", width:140, backgroundColor:"#DC143C", borderRadius: 20,alignItems:"center", justifyContent:'center'}}>
       <Animated.Text style= {[Style, {fontWeight:'600', color:'white'}]}>Eliminar</Animated.Text>
     </View>
    
   )
 }
const Favorito =({favoritos,setFavoritos})=>{
    const navigation = useNavigation();
       
      
      const deleteItem = (idReceta) => {
        const baseUrl =  config.baseUrl;
        const idUsuario =1454;//variables.getUsuario();
        const setup = {
          headers: {
            'content-type': 'application/json'
          }
        }
        const body = JSON.stringify({idUsuario, idReceta})
        console.log(`${baseUrl}/receta/eliminarFavorito`);
        
        axios.post(`${baseUrl}/receta/eliminarFavorito`, body, setup)
        .then(function(res){
          console.log(res.status);
          if(res.status==200){
            axios.get(`${baseUrl}/receta/getFavorito?idUsuario=${idUsuario}`)
            .then(function(res){
                setFavoritos(res.data);
            })
            .catch(function(error){console.log(error)})
          }
        })
        .catch(function(error){console.log(error)})
      }

      return (<SafeAreaView style={{ marginVertical:'5%'}}>
      <Text  style={{textAlign:"center",fontSize:20,fontWeight:"bold",marginBottom:'2%'}}> Favoritos </Text> 
      <FlatList style= {{marginHorizontal:'5%'}} data ={favoritos}
            numColumns={1}
            renderItem={({item, index}) =>(
              <GestureHandlerRootView>
                <Swipeable overshootRight={false} onSwipeableRightOpen={()=>deleteItem(item.IdReceta)} renderRightActions={RenderRight}> 
                  <RecetasFavoritos navegacion={navigation} tipos ={item}/>
                  </Swipeable>
              </GestureHandlerRootView>)}>
      </FlatList>
    </SafeAreaView>
    )
               

    }
    

  

export default Favorito;