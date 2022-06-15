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
  ScrollView,
  HStack,
  Link} from "native-base";
  import config from "../config/default.json";
  import axios from 'axios'
  import { useNavigation } from '@react-navigation/native';
  import {  ButtonFondoBlanco, ButtonFondoRosa } from '../components/ButtonsLogin';
  
  const LoginScreen = () => {

    const navigation = useNavigation();
    const [ mail , setUsuario] = useState("");
    const [ password    , setPassword] = useState("");

    const baseUrl =  config.baseUrl;
    const Login = async () => {

      const setup = {
        headers:{
          'content-type' : 'application/json'
        }
      }
      const body = JSON.stringify({mail, password})

      try {
        const res = await axios.post(`${baseUrl}/usuario/login`,body,setup);
        if (res.status === 201) {
          navigation.navigate('Principal')
          console.log(res.data);
          console.log(res)
        }
        if (res.status === 202 || res.status === 203) {
          console.log("Error")
          console.log(res.data);
          console.log(res)
          alert("Invalid username or password")
        }
      }catch(error){
        console.log("Error")
        alert("Servicio no disponible")
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
          style={{ width: 150, height: 160, marginBottom: 0}}
          source = { require('../assets/logo.png') }
        />
        
      </View>
      </Center>
       <View style={styles.centerContent}>
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
          Ingresá tus credenciales
        </Heading>
        </Center>
        <VStack space={3} mt="5">
        <FormControl isRequired>
            <Input 
              placeholder="Usuario"
              backgroundColor="#FFFF"
              value={mail}
              onChangeText={setUsuario}/>
          </FormControl>
          <FormControl isRequired>
            <Input 
              placeholder="Password"
              backgroundColor="#FFFF"
              value={password}
              onChangeText={setPassword}
            />
        </FormControl>
          <ButtonFondoRosa text="Ingresar" onPress={Login}/>
          <ButtonFondoBlanco text="Cancelar" onPress={() => navigation.navigate('Inicio')}/>
          <HStack mt="6" justifyContent="center" >
            <Link  onPress={() => navigation.navigate('RecoveryPassword')} _text={{
            color: "#AC6363",
            fontWeight: "medium",
            fontSize: "sm",
          }}>
              ¿Olvidaste tu contraseña?
            </Link>
          </HStack>
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
            <View style={styles.container}>
                <LoginScreen />
            </View>
          </NativeBaseProvider>
        );
    };
    