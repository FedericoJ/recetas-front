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
import { ButtonFondoBlanco, ButtonFondoRosa } from '../components/ButtonsLogin';
  
  const EnterNewPassword = () => {

    const navigation = useNavigation();
    const [ Password , setPassword] = useState("");
    const [ RepPassword , setRepPassword] = useState("");

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

  return(
        <View maxW="400" h="600" style={styles.scrollView} _contentContainerStyle={{
          px: "20px",
          mb: "4",
          minW: "72"
        }}>
      <Box safeArea p="2" py="8" w="100%" maxW="290"></Box>
       <Center>
       <View style={styles.centerContent}>
        <Image
          style={{ width: 100, height: 100, marginBottom: 15 }}
          source = { require('../assets/logo.png') }
        />
        
    </View>
        </Center>
        <View style={styles.centerContent} >
        <Box safeArea p="2"  w="100%" maxW="290" py="8">
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
          Ingresa nueva contraseña
        </Heading>
        </Center>
        <VStack space={3} mt="5">
        <FormControl isRequired>
            <Input 
              backgroundColor="#FFFFFF"
              type="password"
              placeholder="Contraseña"
              value={Password}
              onChangeText={setPassword}/>
          </FormControl>
          <FormControl isRequired>
            <Input 
              backgroundColor="#FFFFFF"
              type="password"
              placeholder="Repetir Contraseña"
              value={RepPassword}
              onChangeText={setRepPassword}
            />
        </FormControl>
          <ButtonFondoRosa text="Finalizar" onPress={() => navigation.navigate('Login')} />
          <ButtonFondoBlanco text="Cancelar" onPress={() => navigation.navigate('Inicio')} />
        </VStack>
      </Box>
      </View>
    </View>

)};

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
                <EnterNewPassword />
            </View>
          </NativeBaseProvider>
        );
    };
    