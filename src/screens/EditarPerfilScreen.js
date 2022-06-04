import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View } from 'react-native';
import { 
  Box,
  Heading,
  VStack, 
  FormControl, 
  Input, 
  Button, 
  Center, 
  NativeBaseProvider, 
  ScrollView} from "native-base";
  import config from "../config/default.json";
  import axios from 'axios'
  import { useNavigation } from '@react-navigation/native';
  import {  ButtonFondoBlanco, ButtonFondoRosa } from '../components/ButtonsLogin';
  import UploadImage from '../components/UploadImage';
  
  const EditarPerfilScreen = () => {

    const navigation = useNavigation();
     const [ nombre    , setNombre] = useState("");
     const [ usuario    , getUsuario] = useState("pepito");
     const [ mail    , getMail] = useState("pepito@gmail.com");
     

    const baseUrl =  config.baseUrl;
    const Register = async () => {

      const setup = {
        headers:{
          'content-type' : 'application/json'
        }
      }

    }
    ;

  return <Center w="100%">
     <View maxW="400" h="600" style={styles.scrollView} _contentContainerStyle={{
      px: "20px",
      mb: "4",
      minW: "72"
    }}>
      <Box safeArea p="2"  w="100%" maxW="290" py="8">
        <Center>  
        <Heading size="lg" color="coolGray.800" _dark={{
        color: "warmGray.50"
      }} fontWeight="semibold" fontSize="30">
          Editar Perfil
        </Heading>
        </Center>
        <VStack space={3} mt="5">
        <FormControl isRequired>
            <FormControl.Label>Nombre</FormControl.Label>
            <Input 
              value={nombre}
              onChangeText={setNombre}/>
          </FormControl>
          <FormControl >
            <FormControl.Label>Usuario</FormControl.Label>
            <Input 
              value={usuario}
              isDisabled
            />
        </FormControl>
        <FormControl >
            <FormControl.Label>Mail</FormControl.Label>
            <Input 
              value={mail}
              isDisabled
            />
        </FormControl>

        <View style={styles.container}>
        <UploadImage/>
        </View>

          <ButtonFondoRosa text="Guardar" onPress={() => navigation.navigate('Perfil')}/>
          <ButtonFondoBlanco text="Cancelar" onPress={() => navigation.navigate('Perfil')}/>
        </VStack>
      </Box>
      </View>
    </Center>;
};

const styles = StyleSheet.create({

  centerContent: {
    justifyContent:'center',
    alignItems:'center'
  },

  scrollView: {
    marginHorizontal: 1,
    marginVertical: 1,
  },
  text: {
    fontSize: 42,
  },
  container: {
    padding:50,
    alignItems: 'center',
    justifyContent: 'center',
  },

});

    export default () => {
        return (
          <NativeBaseProvider>
                <EditarPerfilScreen />
          </NativeBaseProvider>
        );
    };
    