import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, View, SafeAreaView, FlatList, Button } from 'react-native';
import { Divider, Flex, Box, Heading, Center, NativeBaseProvider, Text } from "native-base";
import Tabs from '../components/Tabs';
import Galeria from '../components/cardResults';
import Categorias from '../components/Categorias'
import { FloatingAction } from "react-native-floating-action";
import { FAB } from 'react-native-paper';
import Guardada from '../components/cardGuardadas';
import axios from 'axios';
import config from "../config/default.json";
import useSWR from 'swr';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Guardadas = ({ navigation }) => {

  const [arRecGuardadas, setArRecGuardadas] = useState([]);

  const getRecetasGuardadas = async () => {
    const recetasGuardadas = await AsyncStorage.getItem('recetasGuardadas');
    const recetas = JSON.parse(recetasGuardadas);
    recetas.map((receta) => {
      // console.log('Receta id: ',receta.id, 'Receta num: ',receta.num);
      const baseUrl = config.baseUrl;
      // var fetcher = url => 
      axios.get(`${baseUrl}/receta/recetaPorId?idReceta=${receta.id}`).then(res => res.data)
      .then(function(res){
        // const nuevasRecetas = JSON.parse(recetasGuardadas).concat(receta);
        // console.log(JSON.parse(res))
        res[0].numero = receta.num;
        console.log(res);
        setArRecGuardadas((prevState) => [
          ...prevState,
            res[0],
          ]);
      })
      // const recetaGuardada = useSWR(`${baseUrl}/receta/recetaPorId?idReceta=${receta.id}`, fetcher);
      // if (recetaGuardada.data) console.log('Receta a guardar: ', recetaGuardada.data);
      
    });


  }
  
  useEffect(() => { getRecetasGuardadas(); },[])

  return (
    <View style={styles.container}>

      <Guardada datos={arRecGuardadas}/>


      <FAB style={styles.fab}
        extended
        icon="pencil"
        label="Nueva"
        uppercase={false}
        onPress={() => console.log('Pressed')}
      />

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#D6B1B1'
  },

  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
    backgroundColor: "#FFD700"

  },
});

export default Guardadas;