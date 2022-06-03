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
  
  const RegisterScreen = () => {

    const navigation = useNavigation();
    const [ Usuario , setUsuario] = useState("");
    const [ email    , setEmail] = useState("");

    const baseUrl =  config.baseUrl;
    const Register = async () => {

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
     <View maxW="400" h="600" style={styles.scrollView} _contentContainerStyle={{
      px: "20px",
      mb: "4",
      minW: "72"
    }}>
      <Box safeArea p="2" py="8" w="100%" maxW="290"></Box>
       <Center>
       <View style={styles.centerContent}>
        <Image
          style={{ width: 150, height: 160, marginBottom: 0}}
          source = { require('../assets/logo.png') }
        />
        
    </View>
      </Center>
      <Box safeArea p="2"  w="100%" maxW="290" py="8">
        <Center>  
        <Heading size="lg" color="coolGray.800" _dark={{
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
            <FormControl.Label>Email</FormControl.Label>
            <Input 
              value={email}
              onChangeText={setEmail}/>
          </FormControl>
          <FormControl isRequired>
            <FormControl.Label>Usuario</FormControl.Label>
            <Input 
              value={Usuario}
              onChangeText={setUsuario}
            />
        </FormControl>
          <ButtonFondoRosa text="Registrarse" onPress={() => navigation.navigate('RegisterPassword')}/>
          <ButtonFondoBlanco text="Cancelar" onPress={() => navigation.navigate('Inicio')}/>
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
});

    export default () => {
        return (
          <NativeBaseProvider>
            <Center flex={1} px="3">
                <RegisterScreen />
            </Center>
          </NativeBaseProvider>
        );
    };
    