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
  ScrollView, Modal
} from "native-base";
import config from "../config/default.json";
import axios from 'axios'
import { useNavigation } from '@react-navigation/native';
import { ButtonFondoBlanco, ButtonFondoRosa, ButtonModalUnico, ButtonModal } from '../components/ButtonsLogin';
import { validateEmail } from '../helpers/emailValidator';

// const ModalPoup = ({ visible, children }) => {
//   const [showModal, setShowModal] = React.useState(visible);
//   React.useEffect(() => {
//     toggleModal();
//   }, [visible]);
//   const toggleModal = () => {
//     if (visible) {
//       setShowModal(true);
//     } else {
//       setShowModal(false);
//     }
//   };

//   return (
//     <Modal transparent visible={showModal}>
//       <View style={styles.modalBackGround}>
//         <View style={[styles.modalContainer]}>{children}</View>
//       </View>
//     </Modal>
//   );
// };

const RegisterScreen = () => {

  const navigation = useNavigation();
  const [nickname, setUsuario] = useState("");
  const [mail, setEmail] = useState("");

  // const [visible, setVisible] = React.useState(false);
  // const [tipoErrorModal, setTipoErrorModal] = useState("");

  //Para validar mail y password
  const [errorEmail, setErrorEmail] = React.useState("")
  const [errorAlias, setErrorAlias] = React.useState("")
  const [errorPassword, setErrorPassword] = useState("")

  const RegisterUser= () => {
    if(!validateData()){
      console.log("EntreValidateData");
      return;
    }
    if(ValidateAlias()==true){
      console.log("Entre");
      return;
    }else{
      console.log(mail);
      console.log(nickname);
      Register();
    }
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

  const ValidateAlias = async () => {
    setErrorAlias("")
    let existeAlias=false;

    const setup = {
      headers: {
        'content-type': 'application/json'
      }
    }

    try {
      const res = await axios.get(`${baseUrl}/usuario/validarAlias?alias=${nickname}`, setup);
      console.log(res);
      console.log(res.status);
      console.log(res.status === 201);
      if(res.status === 201){
        console.log("Entre a 201");
        existeAlias = true;
        setErrorAlias("Alias ya utilizado")
        return existeAlias;
      }
      if(res.status === 202){
        console.log("Entre a 202");
        existeAlias = false;
        return existeAlias;
      }
    } catch (error) {
      alert("Ocurrio un error al momento de validar Alias.")
    }
  }

  const Register = async () => {

    const setup = {
      headers: {
        'content-type': 'application/json'
      }
    }
    const body = JSON.stringify({ nickname, mail })

    try {
      const res = await axios.post(`${baseUrl}/usuario/crearInvitado`, body, setup);
      if (res.status === 201) {
        alert("Te hemos enviado un correo para validar tu usuario")
        navigation.navigate('RegisterPassword',{email: mail})
      }
      if (res.status === 202) {
        alert("El correo electronico ya se encuentra registrado. Haz click en recuperar y te enviaremos un mail")
      }
    } catch (error) {
      alert("Ocurrio un error al momento de registrar su cuenta.")
    }
  }
    ;

  //  const ErrorModal =() =>{

  // if (tipoErrorModal==='200'){
  //  return (
  //       setVisible(true)
  //     )  
  //   }else if (tipoErrorModal==='202'){
  //     setVisible(true)
  //    }
  //    else if (tipoErrorModal==='error'){
  //      setVisible(true)
  //  }
  //  }

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
            <Text textAlign='center'>{errorAlias}</Text>
{/* 
            <ModalPoup visible={visible}>
            <View style={{ alignItems: "flex-start" }}>
              <Text style={{ fontSize: 20, color: "black" }}>
              La receta se cargará cuando estes conectado a una red WIFI
              </Text>
            </View>

            <View
              style={styles.botonesModal}>
              <ButtonModalUnico
                text="Aceptar"
                onPress={() => {
                  navigation.navigate("Principal");
                  setVisible(false);
                }}
              />
            </View>
          </ModalPoup> */}

            <ButtonFondoRosa text="Registrarse" onPress={RegisterUser}/>
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
  input: {
    height: "100%",
    borderColor: "gray",
    borderWidth: 1,
    width: "100%",
    justifyContent: "center",
    alignItems: "stretch",
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
        <RegisterScreen />
      </View>
    </NativeBaseProvider>
  );
};