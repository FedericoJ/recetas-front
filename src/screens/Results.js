import React from 'react';
import { ScrollView,StyleSheet,View} from 'react-native';
import { NativeBaseProvider,Skeleton,VStack,Center, useNativeBase } from 'native-base';
import Tabs from '../components/Tabs';
import Galeria from '../components/cardResults';
import Categorias from '../components/Categorias'
import { FloatingAction } from "react-native-floating-action";
import { FAB } from 'react-native-paper';
import {useRoute, useNavigation } from '@react-navigation/native';
import config from "../config/default.json";
import useSWR from 'swr'
import axios from 'axios'
import variables from '../config/variables';

const Results  = ({navigation}) => {
  const baseUrl =  config.baseUrl;
  const service =variables.getServicio();
  const nombre=variables.getBusqueda();
  const ordenar=variables.getOrder();
  const [activo,setActivo] = React.useState(variables.getActivo());
  const [data,setData]=React.useState(nombre);
  const [busqueda,setBusqueda] =React.useState(variables.getTexto());
  

    if (!nombre){
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
              <Tabs setData={setData} mostrar={true} activo ={activo} setActivo={setActivo}
              busqueda={busqueda} setBusqueda={setBusqueda}/>
              <Galeria result={nombre}/>
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