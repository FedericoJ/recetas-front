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
  HStack, Spinner,
} from "native-base";
import config from "../config/default.json";
import axios from 'axios'
import { useNavigation, useRoute } from '@react-navigation/native';
import { ButtonFondoRosa, ButtonModalUnico, ButtonModal } from '../components/ButtonsLogin';
import { mdiMailboxOpen } from '@mdi/js';


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


const DigitVerify = () => {

  const navigation = useNavigation();
  const [Code1, setCode1] = useState("");
  const [Code2, setCode2] = useState("");
  const [Code3, setCode3] = useState("");
  const [Code4, setCode4] = useState("");
  const [Code5, setCode5] = useState("");
  const [Code6, setCode6] = useState("");
  const route = useRoute();
  const[loading,setLoading]=useState(false);

  const [visible, setVisible] = React.useState(false);
  const [visibleError, setVisibleError] = React.useState(false);

  const baseUrl = config.baseUrl;

  const functionCombined = (mail) => {
    setVisible(true);
    RecoveryPassword(mail);
}

const RecoveryPassword = async (mail) => {

  const setup = {
    headers: {
      'content-type': 'application/json'
    }
  }
  const body = JSON.stringify({ mail })
  const baseUrl = config.baseUrl;

  try {
    setLoading(true);
    console.log(mail);
    const res = await axios.get(`${baseUrl}/usuario/SendRecoveryPassword?mail=${mail}`, body, setup);
    setLoading(false);
  } catch (error) {
    setLoading(false);
    alert("Error");
  }
}

const Verify = async (mail) => {
  const setup = {
    headers: {
      'content-type': 'application/json'
    }
  }

  try {
    setLoading(true);
    const res = await axios.get(`${baseUrl}/usuario/validarCodigoRecuperacion?mail=${mail}&codigo=${Code1 + Code2 + Code3 + Code4 + Code5 + Code6}`, setup);
    if (res.status === 202) {
      setLoading(false);
      setVisibleError(true);
    }
    if (res.status === 201) {
      setLoading(false);
      navigation.navigate('EnterNewPassword', { email: mail })
    }
  } catch (error) {
    setLoading(false);
    alert("Error");
  }
}
  ;

return <View style={styles.container}>
  <Center w="100%">
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
            source={require('../assets/logo.png')}
          />

        </View>
      </Center>
      <Box safeArea p="2" w="100%" maxW="290" py="8">
        <Center>
          <Heading size="lg" color="coolGray.800" _dark={{
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
          Ingresa el c??digo de validaci??n
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
                setVisible(false);
              }}
            />
          </View>
        </ModalPoup>

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

        <HStack mt="6" justifyContent="center" >
          <Link onPress={() => functionCombined(route.params.email)} _text={{
            color: "#AC6363",
            fontWeight: "medium",
            fontSize: "sm",
          }}>
            Enviar nuevamente
          </Link>
        </HStack>
        {/* <Button mx="1" size="xs" variant="link" colorScheme="muted"
            onPress={() => alert("C??digo enviado nuevamente")} >
            Enviar nuevamente
          </Button> */}
                <ModalPoup visible={visibleError}>
          <View style={{ alignItems: "flex-start" }}>
            <Text style={{ fontSize: 20, color: "black" }}>
              Ingresaste un c??digo equivocado. Ingr??salo nuevamente.
            </Text>
          </View>

          <View
            style={styles.botonesModal}>
                <ButtonModalUnico text="Aceptar" onPress={() => { setVisibleError(false); }} />
          </View>
        </ModalPoup>
        <ButtonFondoRosa text="Continuar" onPress={() => Verify(route.params.email)} />
      </VStack>

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
