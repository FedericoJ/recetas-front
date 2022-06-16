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
  ScrollView,
  Link,
  HStack
} from "native-base";
import config from "../config/default.json";
import axios from 'axios'
import { useNavigation, useRoute } from '@react-navigation/native';
import { ButtonFondoRosa, ButtonModalUnico } from '../components/ButtonsLogin';



  const RecoveryPassword = async (mail) => {

    const setup = {
      headers: {
        'content-type': 'application/json'
      }
    }
    const body = JSON.stringify({ mail })
    const baseUrl = config.baseUrl;

    try {
      console.log(mail);
      const res = await axios.post(`${baseUrl}/usuario/SendRecoveryPassword`, body, setup);
    } catch (error) {
      alert("Error");
    }
  }

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


const DigitVerify = () => {

  const navigation = useNavigation();
  const [Code1, setCode1] = useState("");
  const [Code2, setCode2] = useState("");
  const [Code3, setCode3] = useState("");
  const [Code4, setCode4] = useState("");
  const [Code5, setCode5] = useState("");
  const [Code6, setCode6] = useState("");
  const route = useRoute();

  const [visible, setVisible] = React.useState(false);

  const baseUrl = config.baseUrl;

  const functionCombined = () => {
    setVisible(true);
    RecoveryPassword(route.params.email);
}

const Verify = async (mail) => {
  const setup = {
    headers: {
      'content-type': 'application/json'
    }
  }

  try {
    const res = await axios.get(`${baseUrl}/usuario/validarCodigoRecuperacion?mail=${mail}&codigo=${Code1 + Code2 + Code3 + Code4 + Code5 + Code6}`, setup);
    if (res.status === 202) {
      alert("Ingresaste un código equivocado. Ingresalo nuevamente.");
    }
    if (res.status === 201) {
      navigation.navigate('EnterNewPassword', { email: mail })
    }
    console.log(res.data);
    console.log(res);
  } catch (error) {
    alert("Error");
  }
}
  ;

return <View style={styles.container}>
  <Center w="100%">
    <ScrollView maxW="400" h="600" style={styles.scrollView} _contentContainerStyle={{
      px: "20px",
      mb: "4",
      minW: "72"
    }}>
      <Box safeArea p="2" py="8" w="100%" maxW="290"></Box>
      <Center>
        <View style={styles.centerContent}>
          <Image
            style={{ width: 100, height: 100, marginBottom: 15 }}
            source={require('../assets/logo.png')}
          />

        </View>
      </Center>
      <Box safeArea p="2" w="100%" maxW="290" py="8">
        <Center>
          <Heading size="xlg" color="coolGray.800" _dark={{
            color: "warmGray.50"
          }} fontWeight="semibold" fontSize="30">
            RecetApp
          </Heading>
        </Center>
      </Box>
      <Box safeArea p="2" w="100%" maxW="290" py="2"></Box>
      <Center>
        <Heading mt="1" color="coolGray.800" _dark={{
          color: "warmGray.50"
        }} fontWeight="medium" fontSize="20">
          Ingresa el código de validación
        </Heading>
      </Center>
      <VStack space={3} mt="5">
        <Box alignitems="center" flexDirection="row" safeArea p="2" w="20%" maxW="290" py="8">
          <FormControl isRequired>
            <Input
              mx='1'
              maxLength={1}
              value={Code1}
              backgroundColor="#FFFFFF"
              onChangeText={setCode1} />
          </FormControl>
          <FormControl isRequired>
            <Input
              mx='1'
              maxLength={1}
              value={Code2}
              backgroundColor="#FFFFFF"
              onChangeText={setCode2} />
          </FormControl>
          <FormControl isRequired>
            <Input
              mx='1'
              maxLength={1}
              value={Code3}
              backgroundColor="#FFFFFF"
              onChangeText={setCode3} />
          </FormControl>
          <FormControl isRequired>
            <Input
              mx='1'
              maxLength={1}
              value={Code4}
              backgroundColor="#FFFFFF"
              onChangeText={setCode4} />
          </FormControl>
          <FormControl isRequired>
            <Input
              mx='1'
              maxLength={1}
              value={Code5}
              backgroundColor="#FFFFFF"
              onChangeText={setCode5} />
          </FormControl>
          <FormControl isRequired>
            <Input
              mx='1'
              maxLength={1}
              value={Code6}
              backgroundColor="#FFFFFF"
              onChangeText={setCode6} />
          </FormControl>
        </Box>
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
                navigation.navigate("DigitVerify");
                setVisible(false);
              }}
            />
          </View>
        </ModalPoup>
        <HStack mt="6" justifyContent="center" >
          <Link onPress={() => functionCombined()} _text={{
            color: "#AC6363",
            fontWeight: "medium",
            fontSize: "sm",
          }}>
            Enviar nuevamente
          </Link>
        </HStack>
        {/* <Button mx="1" size="xs" variant="link" colorScheme="muted"
            onPress={() => alert("Código enviado nuevamente")} >
            Enviar nuevamente
          </Button> */}
        <ButtonFondoRosa text="Continuar" onPress={() => Verify(route.params.email)} />
      </VStack>

    </ScrollView>
  </Center>
</View>
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
      <Center style={styles.container} flex={1} px="3">
        <DigitVerify />
      </Center>
    </NativeBaseProvider>
  );
};
