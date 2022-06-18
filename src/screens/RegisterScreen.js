import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, Image, View, TouchableOpacity, Modal } from 'react-native';
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
import { ButtonFondoBlanco, ButtonFondoRosa, ButtonAliasRecomendado, ButtonModalUnico, ButtonModal } from '../components/ButtonsLogin';
import { validateEmail } from '../helpers/emailValidator';

const ModalPoup = ({visible, children}) => {
  const [showModal, setShowModal] = React.useState(visible);
  React.useEffect(() => {
      toggleModal();
  },[visible])
  const toggleModal = () =>{
      if(visible){
          setShowModal(true);
      }
      else {setShowModal(false)};
  }
  
  return <Modal transparent visible={showModal}>
      <View style={styles.modalBackGround}>
          <View style={[styles.modalContainer]}>
              {children}
          </View>
      </View>
  </Modal>;

};

const RegisterScreen = () => {

  const [visible, setVisible] = React.useState(false);
  const [visibleMailRegistrado, setVisibleMailRegistrado] = React.useState(false);
  const [visibleSoporte, setVisibleSoporte] = React.useState(false);

  const navigation = useNavigation();
  const [nickname, setUsuario] = useState("");
  const [mail, setEmail] = useState("");

  //Para validar mail y password
  const [errorEmail, setErrorEmail] = React.useState("");
  const [errorAlias, setErrorAlias] = React.useState("");
  const [visibleAlias, setVisibleAlias] = useState(false);
  const [aliasRecomendado1, setAliasRecomendado1] = React.useState("");
  const [aliasRecomendado2, setAliasRecomendado2] = React.useState("");
  const [aliasRecomendado3, setAliasRecomendado3] = React.useState("");

  const Alias = () => {
    if (visibleAlias){
      return(
        <View flexDirection ="row" alignitems="center" justifyContent='space-between' py="8">
      <ButtonAliasRecomendado text={aliasRecomendado1} onPress={() => setearUsuarioRecomendado(aliasRecomendado1)} />
      <ButtonAliasRecomendado text={aliasRecomendado2} onPress={() => setearUsuarioRecomendado(aliasRecomendado2)} />
      <ButtonAliasRecomendado text={aliasRecomendado3} onPress={() => setearUsuarioRecomendado(aliasRecomendado3)} />
      </View>
        )
    }
    else return(null)
  }

  const setearUsuarioRecomendado = (usuario) => {
    setUsuario(usuario);
  }

  const RegisterUser = () => {
    if (!validateData()) {
      return;
    }
    ValidateAlias();
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

    const setup = {
      headers: {
        'content-type': 'application/json'
      }
    }

    try {
      const res = await axios.get(`${baseUrl}/usuario/validarAlias?alias=${nickname}`, setup);
      if (res.status === 201) {
        setVisibleAlias(true)
        setErrorAlias("Username en uso, cambialo o elegí uno");
        setAliasRecomendado1(nickname + 1);
        setAliasRecomendado2(nickname + 2);
        setAliasRecomendado3(nickname + 3);
      }
      if (res.status === 202) {
        Register();
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
      console.log(res);
      if (res.status === 201) {
        setVisible(true);
      }
      if (res.status === 202) {
        setVisibleMailRegistrado(true);
      }
      if (res.status === 203) {
        setVisibleSoporte(true);
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

            <Text textAlign='center'>{errorAlias}</Text>
            
               <Alias></Alias>

            <ModalPoup visible = {visible}>
                <View style = {{alignItems: 'flex-start'}}>
                      <Text>Te hemos enviado un correo a dandote la bienvenida</Text>
                </View>
                <View style={{flexDirection:"row" , alignItems:"center", marginTop:'1%', marginBottom:'1%', marginHorizontal:'1%'}}>
                <ButtonModalUnico text="Aceptar"onPress={() => {navigation.navigate('RegisterPassword',{email:mail}); setVisible(false);}}/>             
                </View> 
         </ModalPoup>
         <ModalPoup visible={visibleMailRegistrado}>
                  <View style={{ alignItems: "flex-start" }}>
                    <Text style={{ fontSize: 20, color: "black" }}>
                      El correo electrónico ya se encuentra registrado. Haz click en recuperar y te enviaremos un mail.
                    </Text>
                  </View>

                  <View style={styles.botonesModal}>
                    <ButtonModal text="Recuperar"
                      onPress={() => {
                        navigation.navigate('RecoveryPassword');
                        setVisibleMailRegistrado(false);
                      }}
                    />
                    <ButtonModal text="Aceptar"
                      onPress={() => {
                        setVisibleMailRegistrado(false);
                      }}
                    />
                  </View>
                </ModalPoup>

                <ModalPoup visible = {visibleSoporte}>
                <View style = {{alignItems: 'flex-start'}}>
                      <Text>Ocurrió un error al momento de recuperar su cuenta. Contactarse con recetapp@gmail.com</Text>
                </View>
                <View style={{flexDirection:"row" , alignItems:"center", marginTop:'1%', marginBottom:'1%', marginHorizontal:'1%'}}>
                <ButtonModalUnico text="Aceptar"onPress={() => {setVisibleSoporte(false)}}/>             
                </View> 
         </ModalPoup>

            <ButtonFondoRosa text="Registrarse" onPress={() => RegisterUser()}/>
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