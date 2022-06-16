import React, { useState } from 'react'
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
  ScrollView
} from "native-base";
import config from "../config/default.json";
import axios from 'axios'
import { useNavigation } from '@react-navigation/native';
import { ButtonFondoBlanco, ButtonFondoRosa, ButtonModalUnico } from '../components/ButtonsLogin';


const ModalPoup = ({ visible, children }) => {
  const [showModal, setShowModal] = React.useState(visible);
  React.useEffect(() => {
    toggleModal();
  }, [visible]);
  const toggleModal = () => {
    if (visible) {
      setShowModal(true);
    } else {
      setShowModal(false);
    }
  };

  return (
    <Modal transparent visible={showModal}>
      <View style={styles.modalBackGround}>
        <View style={[styles.modalContainer]}>{children}</View>
      </View>
    </Modal>
  );
};

const RecoveryPasswordScreen = () => {

  const navigation = useNavigation();
  const [Usuario, setUsuario] = useState("");
  const [mail, setMail] = useState("");

  const [visible, setVisible] = React.useState(false);

  const baseUrl = config.baseUrl;

  const RecoveryPassword = async () => {

    const setup = {
      headers: {
        'content-type': 'application/json'
      }
    }
    const body = JSON.stringify({ mail })

    try {
      const res = await axios.post(`${baseUrl}/usuario/SendRecoveryPassword`, body, setup);
      if (res.status === 201) {
        setVisible(true);
      }
      console.log(res.data);
      console.log(res);
    } catch (error) {
      alert("Error");
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
            style={{ width: 150, height: 150, marginBottom: 15 }}
            source={require('../assets/logo.png')}
          />

        </View>
      </Center>
      <View style={styles.centerContent}>
        <Box safeArea p="2" w="100%" maxW="290" py="8">
          <Center>
            <Heading size="xlg" color="coolGray.800" _dark={{
              color: "warmGray.50"
            }} fontWeight="semibold" fontSize="30">
              RecetApp
            </Heading>
          </Center>
          {/* <Box safeArea p="2"  w="100%" maxW="290" py="8"> */}
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
                onChangeText={setUsuario} />
            </FormControl>
            <FormControl isRequired>
              <Input
                placeholder="Mail"
                value={mail}
                backgroundColor="#FFFF"
                onChangeText={setMail}
              />
            </FormControl>

            <ModalPoup visible={visible}>
              <View style={{ alignItems: "flex-start" }}>
                <Text style={{ fontSize: 20, color: "black" }}>
                  Te enviamos un correo para validar el usuario
                </Text>
              </View>

              <View
                style={styles.botonesModal}>
                <ButtonModalUnico
                  text="Aceptar"
                  onPress={() => {
                    setVisible(false);
                    navigation.navigate('DigitVerify',{email: mail})
                  }}
                />
              </View>
            </ModalPoup>


            <ButtonFondoRosa text="Recuperar" onPress={() => RecoveryPassword()} />
            <ButtonFondoBlanco text="Cancelar" onPress={() => navigation.navigate('Home')} />
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

    marginVertical: 1,
  },
  text: {
    fontSize: 42,
  },
  modalBackGround: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    width: "80%",
    backgroundColor: "#F7F4F4",
    paddingHorizontal: 20,
    paddingVertical: 30,
    borderRadius: 20,
    elevation: 20,
  },
  header: {
    width: "100%",
    height: 40,
    alignItems: "flex-end",
    justifyContent: "center",
  },
  botonesModal: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: "5%",
    marginBottom: "1%",
    marginHorizontal: "1%",
  },
});

export default () => {
  return (
    <NativeBaseProvider>
      <View style={styles.container} >
        <RecoveryPasswordScreen />
      </View>
    </NativeBaseProvider>
  );
};
