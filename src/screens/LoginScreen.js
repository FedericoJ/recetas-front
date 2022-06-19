import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, Image, View, Modal } from 'react-native';
import { Box, Heading, VStack, FormControl, Input, Button, Center, NativeBaseProvider, ScrollView, HStack, Link, } from "native-base";
import config from "../config/default.json";
import axios from 'axios'
import { useNavigation } from '@react-navigation/native';
import { ButtonFondoBlanco, ButtonFondoRosa, ButtonModal, ButtonModalUnico } from '../components/ButtonsLogin';
import {useNetInfo} from "@react-native-community/netinfo";
import variables from "../config/variables";


const ModalPoup = ({ visible, children }) => {
  const [showModal, setShowModal] = React.useState(visible);
  React.useEffect(() => {
    toggleModal();
  }, [visible])
  const toggleModal = () => {
    if (visible) {
      setShowModal(true);
    }
    else { setShowModal(false) };
  }

  return <Modal transparent visible={showModal}>
    <View style={styles.modalBackGround}>
      <View style={[styles.modalContainer]}>
        {children}
      </View>
    </View>
  </Modal>;

};


const LoginScreen = () => {

  const netInfo = useNetInfo();
  const navigation = useNavigation();
  const [mail, setUsuario] = useState("");
  const [password, setPassword] = useState("");
  const [visible, setVisible] = React.useState(false);
  const [noWifi, setNoWifi] = React.useState(false);

  const baseUrl = config.baseUrl;

  const wifi = () => {
    if(netInfo.type === "wifi"){
      {Login()}
    }
    else {
      setNoWifi(true)
    }
  };

  const Login = async () => {

    const setup = {
      headers: {
        'content-type': 'application/json'
      }
    }
    const body = JSON.stringify({ mail, password })

    try {
      const res = await axios.post(`${baseUrl}/usuario/login`, body, setup);
      if (res.status === 201) {
        variables.setUsuario(res.data.data[0].idUsuario);
        navigation.navigate('Principal');
      }
      if (res.status === 202 || res.status === 203) {
        setVisible(true);
        //alert("Invalid username or password")
      }
    } catch (error) {
      console.log(error)
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
            style={{ width: 150, height: 160, marginBottom: 0 }}
            source={require('../assets/logo.png')}
          />

        </View>
      </Center>
      <View style={styles.centerContent} >
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
              Ingresá tus credenciales
            </Heading>
          </Center>

          <VStack space={3} mt="5" >
            <FormControl isRequired>
              <Input
                placeholder="Usuario"
                backgroundColor="#FFFF"
                value={mail}
                onChangeText={setUsuario} />
            </FormControl>
            <FormControl isRequired>
              <Input
                placeholder="Password"
                backgroundColor="#FFFF"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={true}
              />
            </FormControl>

            <ModalPoup visible={visible}>
              <View style={{ alignItems: 'flex-start' }}>
                <Text style={{ fontSize: 20, color: "black" }}>Contraseña o usuario incorrecto. Ingrese nuevamente o haz click en recuperar </Text>
                <View style={{ flexDirection: "row", alignItems: "center", marginTop: '2%', marginBottom: '2%', marginHorizontal: '5%' }}>
                </View>
              </View>
              <View style={{ flexDirection: "row", alignItems: "center", marginTop: '1%', marginBottom: '1%', marginHorizontal: '1%' }}>
                <ButtonModal text="Recuperar" onPress={() => { navigation.navigate('RecoveryPassword'); setVisible(false); }} />
                <ButtonModal text="Aceptar" onPress={() => { setVisible(false); }} />
              </View>
            </ModalPoup>

            <ModalPoup visible={noWifi}>
              <View style={{ alignItems: 'flex-start' }}>
                <Text style={{ fontSize: 20, color: "black" }}>No se encuentra conectado a una red Wifi. ¿Desea continuar usando sus datos? </Text>
                <View style={{ flexDirection: "row", alignItems: "center", marginTop: '2%', marginBottom: '2%', marginHorizontal: '5%' }}>
                </View>
              </View>
              <View style={{ flexDirection: "row", alignItems: "center", marginTop: '1%', marginBottom: '1%', marginHorizontal: '1%' }}>
                <ButtonModal text="Cancelar" onPress={() => { navigation.navigate('Inicio'); setNoWifi(false); }} />
                <ButtonModal text="Aceptar" onPress={() => { {Login()};setNoWifi(false) }} />
              </View>
            </ModalPoup>

            <ButtonFondoRosa text="Ingresar" onPress={() => setNoWifi(wifi)} />
            <ButtonFondoBlanco text="Cancelar" onPress={() => navigation.navigate('Inicio')} />
            <HStack mt="6" justifyContent="center" >

              <Link onPress={() => navigation.navigate('RecoveryPassword')} _text={{
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


  modalBackGround: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '80%',
    backgroundColor: '#F7F4F4',
    paddingHorizontal: 20,
    paddingVertical: 30,
    borderRadius: 20,
    elevation: 20,
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
