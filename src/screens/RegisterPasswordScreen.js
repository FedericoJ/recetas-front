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
  
  const RegisterPasswordScreen = () => {

    const navigation = useNavigation();
    const [ Nombre , setNombre] = useState("");
    const [ Password    , setPassword] = useState("");
    const [ Password2    , setPassword2] = useState("");

    const baseUrl =  config.baseUrl;
    const RegisterPassword = async () => {

      const setup = {
        headers:{
          'content-type' : 'application/json'
        }
      }
      const body = JSON.stringify({firstName,lastName,password,email, gender, condition})

      try {
        const res = await axios.post(`${baseUrl}/users/`,body,setup);
        navigation.navigate('RegisterSuccess')
        console.log(res.data);
        console.log(res)
      }catch(error){
        console.log("Here")
        navigation.navigate('RegisterFailed')
      }
    }
    ;

  return <Center w="100%">
     <ScrollView maxW="400" h="600" style={styles.scrollView} _contentContainerStyle={{
      px: "20px",
      mb: "4",
      minW: "72"
    }}>
      <Box safeArea p="2" py="8" w="100%" maxW="290"></Box>
       <Center>
       <View style={styles.centerContent}>
        <Image
          style={{ width: 150, height: 150, marginBottom: 0 }}
          source = { require('../assets/logo.png') }
        />
        
    </View>
      </Center>
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
            <FormControl.Label>Nombre</FormControl.Label>
            <Input 
              value={Nombre}
              onChangeText={setNombre}/>
          </FormControl>
          <FormControl isRequired>
            <FormControl.Label>Contraseña</FormControl.Label>
            <Input 
              value={Password}
              onChangeText={setPassword}
            />
        </FormControl>
        <FormControl isRequired>
            <FormControl.Label>Repetir Contraseña</FormControl.Label>
            <Input 
              value={Password2}
              onChangeText={setPassword2}
            />
        </FormControl>
          <ButtonFondoRosa text="Finalizar" onPress={() => navigation.navigate('RegisterSuccess')}/>
          <ButtonFondoBlanco text="Cancelar" onPress={() => navigation.navigate('Inicio')}/>
        </VStack>
      </Box>
      </ScrollView>
    </Center>;

};

const styles = StyleSheet.create({

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
            <Center flex={1} px="3">
                <RegisterPasswordScreen />
            </Center>
          </NativeBaseProvider>
        );
    };
    