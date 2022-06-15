import React, { useState, useEffect } from 'react'
import { StyleSheet,Text, Image, View} from 'react-native';
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
import { mdiAlertRemove } from '@mdi/js';
  
  const RegisterPasswordScreen = () => {

    const navigation = useNavigation();
    const [ nombre , setNombre] = useState("");
    const [ password    , setPassword] = useState("");
    const [ password2    , setPassword2] = useState("");

    const baseUrl =  config.baseUrl;
    const RegisterPasswordScreen = async () => {

      const setup = {
        headers:{
          'content-type' : 'application/json'
        }
      }
      const mail = localStorage.getItem('Mail');
      const body = JSON.stringify({nombre,mail,password})

      try {
        const res = await axios.post(`${baseUrl}/usuario/crearInvitadoUpdate`,body,setup);
        navigation.navigate('Inicio')
        console.log(res.data);
        console.log(res)
      }catch(error){
        alert("Error")
      }
    }
    ;

  return (
     <View maxW="400" h="600" style={styles.scrollView} _contentContainerStyle={{
      px: "20px",
      mb: "4",
      minW: "72"
    }}>
      <Box safeArea p="2" py="8" w="100%" maxW="290"></Box>
       <Center>
       <View style={styles.centerContent}>
        <Image
          style={{ width: 150, height: 160, marginBottom: 0 }}
          source = { require('../assets/logo.png') }
        />
        
    </View>
      </Center>
      <View style={styles.centerContent}>
      <Box safeArea p="2"  w="100%" maxW="290" py="8">
        <Center>  
        <Heading size="xlg" color="coolGray.800" _dark={{
        color: "warmGray.50"
      }} fontWeight="semibold" fontSize="30">
          RecetApp
        </Heading>
        </Center>
        <Center>
        <Heading mt="1" color="coolGray.600" _dark={{
        color: "warmGray.200"
      }} fontWeight="medium" size="xs">
          Ingresá tus datos
        </Heading>
        </Center>
        <VStack space={3} mt="5">
        <FormControl isRequired>
            <Input 
              placeholder="Nombre"
              backgroundColor="#FFFF"
              value={nombre}
              onChangeText={setNombre}/>
          </FormControl>
          <FormControl isRequired>
            <Input 
              placeholder="Contraseña"
              backgroundColor="#FFFF"
              value={password}
              onChangeText={setPassword}
            />
        </FormControl>
        <FormControl isRequired>
            <Input 
              placeholder="Repetir Contraseña"
              backgroundColor="#FFFF"
              value={password2}
              onChangeText={setPassword2}
            />
        </FormControl>
          <ButtonFondoRosa text="Finalizar" onPress={RegisterPasswordScreen}/>
          <ButtonFondoBlanco text="Cancelar" onPress={() => navigation.navigate('Inicio')}/>
        </VStack>
      </Box>
      </View>
      </View>
  )
};

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#D6B1B1',
  },


  centerContent: {
    justifyContent:'center',
    alignItems:'center',
  },

  scrollView: {
    marginHorizontal: 1,
    marginVertical: 1,
  },
  text: {
    fontSize: 42,
  },
});

    export default () => {
        return (
          <NativeBaseProvider>
            <View style={styles.container}>
                <RegisterPasswordScreen />
            </View>
          </NativeBaseProvider>
        );
    };
    