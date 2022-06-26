import React, {useState} from 'react';
import {Animated,
  Text, 
  View,
  SafeAreaView,
FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import RecetasCargadas from './RecetasCargadas';
import { NativeBaseProvider,Skeleton,VStack,Center } from 'native-base';
import config from "../config/default.json";
import useSWR from 'swr';
import axios from 'axios';
import variables from '../config/variables';

const MiReceta =()=>{

    const navigation = useNavigation();
       
    const baseUrl =  config.baseUrl;

    const nombre = variables.getNick();

    const fetcher = url => axios.get(`${baseUrl}/receta/recetaPorUsuario?nombre=${nombre}&order=Date`).then(res => res.data)

    const {data,error}=useSWR(`${baseUrl}/receta/recetaPorUsuario?nombre=${nombre}`, fetcher);

    if (!data){
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
        </NativeBaseProvider>
        )
    }else{

        return (
            <SafeAreaView style={{ marginVertical:'5%'}}>
            
            <Text  style={{textAlign:"center",fontSize:20,fontWeight:"bold",marginBottom:'2%'}}> Mis Recetas </Text> 
                <FlatList style= {{marginHorizontal:'5%'}} data ={data}
                    numColumns={1}
                    renderItem={({item}) =>(
                    <RecetasCargadas navegacion={navigation} tipos ={item}/>)}>
                </FlatList>

            </SafeAreaView>
        )

    }


}

export default MiReceta;