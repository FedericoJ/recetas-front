import React from 'react';
import { ScrollView,StyleSheet,View} from 'react-native';
import { NativeBaseProvider,Skeleton,VStack,Center } from 'native-base';
import Tabs from '../components/Tabs';
import Galeria from '../components/cardResults';
import Categorias from '../components/Categorias'
import { FloatingAction } from "react-native-floating-action";
import { FAB } from 'react-native-paper';
import {useRoute } from '@react-navigation/native';
import config from "../config/default.json";
import useSWR from 'swr'
import axios from 'axios'
import variables from '../config/variables';

const Results  = ({navigation}) => {

  const route=useRoute();

  const baseUrl =  config.baseUrl;

  const service =variables.getServicio();

  const nombre=variables.getBusqueda();


  const fetcher = url => axios.get(`${baseUrl}/receta/${service}?nombre=${nombre}`).then(res => res.data)

  const {data,error}=useSWR(`${baseUrl}/receta/${service}?nombre=${nombre}`, fetcher);

  //console.log(route.params.service);
  //console.log(route.params.nombre);
  

  
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
          <View style={styles.container}>
              <Tabs style={{}}/>
              <Galeria result={data}/>
              <FAB style={styles.fab}
                extended
                icon="pencil"
                label ="Nueva"
                uppercase={false}
                onPress={() => navigation.navigate('CreateReceta')}
                />
          </View>
        );
    }
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor:'#D6B1B1'
    },

    fab: {
      position: 'absolute',
      margin: 16,
      right: 0,
      bottom: 0,
      backgroundColor:"#FFD700"
      
    },

  });

export default Results;