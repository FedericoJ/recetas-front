import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, Image, View } from 'react-native';
import {
  Box,
  Heading,
  VStack,
  FormControl,
  Input,
  Button,
  Center,
  NativeBaseProvider,
  ScrollView
} from "native-base";
import config from "../config/default.json";
import axios from 'axios'
import { useNavigation } from '@react-navigation/native';
import { ButtonFondoBlanco, ButtonFondoRosa } from '../components/ButtonsLogin';
import { validateEmail } from '../helpers/emailValidator';

const RegisterScreen = () => {

  const navigation = useNavigation();
  const [nickname, setUsuario] = useState("");
  const [mail, setEmail] = useState("");

  //Para validar mail y password
  const [errorEmail, setErrorEmail] = React.useState("")
  const [errorPassword, setErrorPassword] = useState("")

  const RegisterUser= () => {
    if(!validateData()){
      return;
    }
    Register();
  }

  const validateData = () => {
    setErrorEmail("")
    let isValid = true

    if (!validateEmail(mail)) { 
      setErrorEmail("Formato de mail invalido")
      isValid = false
    }
    return isValid
  }

  const baseUrl = config.baseUrl;

  const Register = async () => {

    const setup = {
      headers: {
        'content-type': 'application/json'
      }
    }
    const body = JSON.stringify({ nickname, mail })

    try {
      const res = await axios.post(`${baseUrl}/usuario/crearInvitado`, body, setup);
      localStorage.setItem('Mail', mail);
      if (res.status === 201) {
        alert("Te hemos enviado un correo para validar tu usuario")
        navigation.navigate('RegisterPassword')
        const cat = localStorage.getItem('Mail');
        console.log(cat);
      }
      if (res.status === 202) {
        alert("El correo electronico ya se encuentra registrado. Haz click en recuperar y te enviaremos un mail")
      }
    } catch (error) {
      alert("Ocurrio un error al momento de registrar su cuenta.")
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
            source={require('../assets/logo.png')}
          />

        </View>
      </Center>
      <View style={styles.centerContent}>
        <Box safeArea p="2" w="100%" maxW="290" py="8">
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
              <Input
                placeholder="Email"
                backgroundColor="#FFFF"
                value={mail}
                onChangeText={setEmail} />
            </FormControl>
            <Text textAlign='center'>{errorEmail}</Text>
            <FormControl isRequired>
              <Input
                placeholder="Usuario"
                backgroundColor="#FFFF"
                value={nickname}
                onChangeText={setUsuario}
              />
            </FormControl>
            <ButtonFondoRosa text="Registrarse" onPress={RegisterUser} />
            <ButtonFondoBlanco text="Cancelar" onPress={() => navigation.navigate('Inicio')} />
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
    justifyContent: 'center',
    alignItems: 'center'
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
      <View style={styles.container} >
        <RegisterScreen />
      </View>
    </NativeBaseProvider>
  );
};