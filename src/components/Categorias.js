import * as React from 'react';
import {
  Text, 
  View,
  SafeAreaView,
FlatList } from 'react-native';
import axios from 'axios'

import Tipos from './Tipos';
import config from "../config/default.json";
import useSWR from 'swr'
import { NativeBaseProvider,Skeleton,VStack,Center } from 'native-base';


  const imagesrc="https://resizer.glanacion.com/resizer/DX1-dyjtqe3efPEahil_dwkYeuQ=/768x0/filters:format(webp):quality(80)/cloudfront-us-east-1.images.arcpublishing.com/lanacionar/VLWFAANIWBGPFO4CSUHS7RYVVQ.jpg";

  const baseUrl =  config.baseUrl;


const Categorias =()=>{

    
    const fetcher = url => axios.get(`${baseUrl}/ingredientes/getTiposreceta`).then(res => res.data)
  
    const {data,error}=useSWR(`${baseUrl}/ingredientes/getTiposreceta`, fetcher);

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
            <SafeAreaView style={{height: '55%'}}>
            <Text  style={{textAlign:"center",marginVertical:'1%' , fontSize:20,fontWeight:"bold"}}> Categorias </Text>
                <FlatList style={{marginHorizontal:'1%'}} data ={data}
                numColumns={2}
                renderItem={({item}) => (<Tipos categorias ={item}/>)}>
                    
                </FlatList>

            </SafeAreaView>
        
        )
    }
}

export default Categorias;