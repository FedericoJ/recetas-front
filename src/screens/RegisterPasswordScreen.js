import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, Image, View, Modal } from 'react-native';
import {
  Box,
  Heading,
  VStack,
  FormControl,
  Input,
  Button,
  Center,
  NativeBaseProvider,
  ScrollView, HStack, Spinner,
} from "native-base";
import config from "../config/default.json";
import axios from 'axios'
import { useNavigation, useRoute } from '@react-navigation/native';
import { ButtonFondoBlanco, ButtonFondoRosa } from '../components/ButtonsLogin';

const ModalPoup2 = ({ visible, children}) => {
  const [showModal2, setShowModal2] = React.useState(visible);
  React.useEffect(() => {
    toggleModal2();
  }, [visible]);
  const toggleModal2 = () => {
    if (visible) {
      setShowModal2(true);
    } else {
      setShowModal2(false);
    }
  };

  return (
    <Modal transparent visible={showModal2}>
      <View style={styles.modalBackGround}>
        <View style={[styles.modalContainer2]}>{children}</View>
      </View>
    </Modal>
  );
};

const RegisterPasswordScreen = () => {

  const navigation = useNavigation();
  const [nombre, setNombre] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [errorPassword, setErrorPassword] = React.useState("")
  const [errorPasswordSN, setErrorPasswordSN] = React.useState(false)
  const route = useRoute();
  const[loading,setLoading]=useState(false);

  const baseUrl = config.baseUrl;

  const ValidatePassword= () => {
    if(!validateData()){
      return(route.params.email,nombre,password);
    }
    RegisterPassword(route.params.email, nombre, password);
  }

  const validateData = () => {
    setErrorPassword("")
    setErrorPasswordSN(false)
    let isValid = true

    if (password != password2) { 
      setErrorPassword("Formato de contraseña incorrecto o no son iguales")
      setErrorPasswordSN(true)
      isValid = false
    }
    return isValid
  }

  const RegisterPassword = async (mail, nombre, password) => {

    const setup = {
      headers: {
        'content-type': 'application/json'
      }
    }
    const body = JSON.stringify({ nombre, mail, password });
  
   try {
    setLoading(true);
      const res = await axios.post(`${baseUrl}/usuario/crearInvitadoUpdate`, body, setup);
      if (res.status === 201) {
        setLoading(false);
        navigation.navigate('RegisterSuccess')
      }
    } catch (error) {
      setLoading(false);
      alert(error)
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
                placeholder="Nombre"
                backgroundColor="#FFFF"
                value={nombre}
                onChangeText={setNombre}
                 />
            </FormControl>
            <FormControl isRequired>
              <Input
                placeholder="Contraseña"
                backgroundColor="#FFFF"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={true}
                isInvalid={errorPasswordSN}
              />
            </FormControl>
            <FormControl isRequired>
              <Input
                placeholder="Repetir Contraseña"
                backgroundColor="#FFFF"
                value={password2}
                onChangeText={setPassword2}
                secureTextEntry={true}
                isInvalid={errorPasswordSN}
              />
            </FormControl>
            <Text textAlign='center'>{errorPassword}</Text>

              {/* Modal de Carga para completar la busqueda*/}                      
                <ModalPoup2  visible={loading}>
                <View style={{height:50,width:150, justifyContent:"center"}}>
                 <NativeBaseProvider>
                    <HStack marginHorizontal="90%">
                     <Spinner size="lg" color="black"/>
                    </HStack>
                 </NativeBaseProvider>
                </View>
            </ModalPoup2>
            <ButtonFondoRosa text="Finalizar" onPress={() => ValidatePassword()} />
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
    alignItems: 'center',
  },

  scrollView: {
    marginHorizontal: 1,
    marginVertical: 1,
  },
  text: {
    fontSize: 42,
  },
  modalContainer2: {
    width: "80%",
    backgroundColor: "transparent",
    paddingHorizontal: 20,
    paddingVertical: 30,
    borderRadius: 20,
    elevation: 20,
  },
  modalBackGround: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
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
