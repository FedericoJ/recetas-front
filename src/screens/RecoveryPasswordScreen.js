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
  
  const RecoveryPasswordScreen = () => {

    const navigation = useNavigation();
    const [ Usuario , setUsuario] = useState("");
    const [ Mail , setMail] = useState("");

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

  return <View style={styles.container}>
    <Center style={styles.container} >
     <View  style={styles.container} >
      <Box safeArea p="2" w="100%" maxW="290"></Box>
       <Center>
       <View style={styles.centerContent}>
        <Image
          style={{ width: 150, height: 150, marginBottom: 15 }}
          source = { require('../assets/logo.png') }
        />
        
    </View>
        </Center>
        <Box safeArea p="2"  w="100%"  py="8">
          <Center>  
        <Heading size="xlg" color="coolGray.800" _dark={{
        color: "warmGray.50"
      }} fontWeight="semibold" fontSize="30">
          RecetApp
        </Heading>
        </Center>
        <Box safeArea p="2"  w="100%" maxW="290" py="2"></Box>
        <Center>
        <Heading mt="1" color="coolGray.800" _dark={{
        color: "warmGray.50"
      }} fontWeight="medium" fontSize="20">
          Olvidaste tu contraseña
        </Heading>
        </Center>
        <VStack space={3} mt="5">
        <FormControl isRequired>
            <Input 
              placeholder="Usuario"
              value={Usuario}
              backgroundColor="#FFFF"
              onChangeText={setUsuario}/>
          </FormControl>
          <FormControl isRequired>
            <Input 
              placeholder="Mail"
              value={Mail}
              backgroundColor="#FFFF"
              onChangeText={setMail}
            />
        </FormControl>
          <ButtonFondoRosa text="Recuperar" onPress={() => navigation.navigate('DigitVerify')}/>
          <ButtonFondoBlanco text="Cancelar" onPress={() => navigation.navigate('Home')}/>
        </VStack>
      </Box>
      </View>
    </Center>
    </View>
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

    marginVertical: 1,
  },
  text: {
    fontSize: 42,
  },
});

    export default () => {
        return (
          <NativeBaseProvider>
            <Center style={styles.container} >
                <RecoveryPasswordScreen />
            </Center>
          </NativeBaseProvider>
        );
    };
    