import React, {useState} from 'react';
import {Animated,
  Text, 
  View,
  SafeAreaView,
FlatList } from 'react-native';
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
     <View style= {{width:140, backgroundColor:"#DC143C", borderRadius: 20,alignItems:"center", justifyContent:'center'}}>
       <Animated.Text style= {[Style, {fontWeight:'600', color:'white'}]}>Eliminar</Animated.Text>
     </View>
   )
 }
 

const Favorito =()=>{
    const navigation = useNavigation();
    const [datos,setDatos] =useState([]);

    const baseUrl =  config.baseUrl;
    const idUsuario =1284;//variables.getUsuario();

    const cargarDatos=()=>{

      const navigation = useNavigation();
       
      const baseUrl =  config.baseUrl;

      const fetcher = url => axios.get(`${baseUrl}/receta/getFavorito?idUsuario=${idUsuario}`).then(res => res.data)

      const {data,error}=useSWR(`${baseUrl}/receta/recetasSemana`, fetcher)

        if (data){
            return (<SafeAreaView style={{ marginVertical:'5%'}}>
            <Text  style={{textAlign:"center",fontSize:20,fontWeight:"bold",marginBottom:'2%'}}> Favoritos </Text> 
            <FlatList style= {{marginHorizontal:'5%'}} data ={data}
                  numColumns={1}
                  renderItem={({item, index}) =>(
                    <GestureHandlerRootView>
                      <Swipeable overshootRight={false} onSwipeableRightOpen={()=>deleteItem(item.id)} renderRightActions={RenderRight}> 
                        <RecetasFavoritos navegacion={navigation} tipos ={item}/>
                        </Swipeable>
                    </GestureHandlerRootView>)}>
            </FlatList>
          </SafeAreaView>
          )
        }else{
          return (
            <NativeBaseProvider>
                    <Center>
                    <VStack w="90%"  borderWidth="1" space={8} overflow="hidden" rounded="md" _dark={{
                    borderColor: "coolGray.500"
                        }} _light={{
                    borderColor: "coolGray.200"
                        }}>
                    <Skeleton h="40" />
                    <Skeleton.Text px="4" />
                    <Skeleton px="4" my="4" rounded="md" startColor="primary.100" />
                    </VStack>
                </Center>
            </NativeBaseProvider>)
        }
            

    }
    

    const deleteItem = (id) => {
      // alert ('item of ID: ${id} will be deleted')
      //return cargarDatos();
    }
     
  return cargarDatos();
      
      
}

export default Favorito;