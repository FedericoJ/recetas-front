import React, { useState, useEffect } from 'react'
import { StyleSheet,Text, Image, View, Modal} from 'react-native';
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
  import { useNavigation, useRoute } from '@react-navigation/native';
import { ButtonFondoBlanco, ButtonFondoRosa, ButtonModalUnico } from '../components/ButtonsLogin';
  
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

  const EnterNewPassword = () => {

    const navigation = useNavigation();
    const [ Password , setPassword] = useState("");
    const [ RepPassword , setRepPassword] = useState("");
    const [errorPassword, setErrorPassword] = React.useState("")
    const [errorPasswordSN, setErrorPasswordSN] = React.useState(false)
    const [visible, setVisible] = React.useState(false);
    const route = useRoute();

    const baseUrl =  config.baseUrl;

    const ValidatePassword= () => {
      if(!validateData()){
        return(route.params.email,Password);
      }
      NewPassword(route.params.email);
    }

    const validateData = () => {
      setErrorPassword("")
      setErrorPasswordSN(false)
      let isValid = true
  
      if (Password != RepPassword) { 
        setErrorPassword("Formato de contraseña incorrecto o no son iguales")
        setErrorPasswordSN(true)
        isValid = false
      }
      return isValid
    }


    const NewPassword = async (mail) => {

      const setup = {
        headers:{
          'content-type' : 'application/json'
        }
      }
      const password = Password;
      const body = JSON.stringify({mail,password})

      try {
        const res = await axios.post(`${baseUrl}/usuario/modificarPass`,body,setup);
        if (res.status === 201) {
          setVisible(true);
        }
      }catch(error){
        alert(error);
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
        <Heading size="lg" color="coolGray.800" _dark={{
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
              autoFocus={true}
              onChangeText={setPassword}
              secureTextEntry={true}
              isInvalid={errorPasswordSN}/>
          </FormControl>
          <FormControl isRequired>
            <Input 
              backgroundColor="#FFFFFF"
              type="password"
              placeholder="Repetir Contraseña"
              value={RepPassword}
              onChangeText={setRepPassword}
              secureTextEntry={true}
              isInvalid={errorPasswordSN}
            />
        </FormControl>
        <Text textAlign='center'>{errorPassword}</Text>
        <ModalPoup visible={visible}>
              <View style={{ alignItems: 'flex-start' }}>
                <Text style={{ fontSize: 20, color: "black" }}>Contraseña modificada exitosamente, ya podes iniciar sesión </Text>
                <View style={{ flexDirection: "row", alignItems: "center", marginTop: '2%', marginBottom: '2%', marginHorizontal: '5%' }}>
                </View>
              </View>

              <View style={{ flexDirection: "row", alignItems: "center", marginTop: '1%', marginBottom: '1%', marginHorizontal: '1%' }}>

              <ButtonModalUnico
                text="Aceptar"
                onPress={() => {
                  navigation.navigate("Login");
                  setVisible(false);
                }}
              />

              </View>



            </ModalPoup>
          <ButtonFondoRosa text="Finalizar" onPress={() => ValidatePassword()} />
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
    