import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, Modal } from 'react-native';
import { 
  Heading,
  VStack, 
  FormControl, 
  Input, 
  Button, 
  Center, 
  NativeBaseProvider, 
  ScrollView,Box} from "native-base";
  import config from "../config/default.json";
  import axios from 'axios'
  import { useNavigation } from '@react-navigation/native';
  import {  ButtonFondoBlanco, ButtonFondoRosa,ButtonModalUnico, ButtonFondoRosaModal } from '../components/ButtonsLogin';
import variables from '../config/variables';


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
  
  const CambiarContraseniaScreen = () => {

    const navigation = useNavigation();
    const [visible, setVisible] = React.useState(false);
    const [ Password    , setPassword] = useState("");
    const [ Password2    , setPassword2] = useState("");
    const [errorPassword, setErrorPassword] = React.useState("");
    const [errorPasswordSN, setErrorPasswordSN] = React.useState(false);

    const baseUrl = config.baseUrl;
    
    const ValidatePassword= () => {
      if(!validateData()){
        return;
      }
      NewPassword(variables.getMail());
    }

    const validateData = () => {
      setErrorPassword("");
      setErrorPasswordSN(false);
      let isValid = true
  
      if (Password != Password2) { 
        setErrorPassword("Formato de contraseña incorrecto o no son iguales")
        setErrorPasswordSN(true)
        isValid = false
      }
      return isValid
    }

    const NewPassword = async (mail) => {
      console.log("Mail");
      console.log(variables.getMail());

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



  return (
    <View style={{flexDirection:"row" , alignItems:"center", marginTop:'1%', marginBottom:'1%', marginHorizontal:'5%'}}>
              
     <View maxW="600" h="600" style={styles.scrollView} _contentContainerStyle={{
      px: "20px",
      mb: "4",
      minW: "72"
    }}>
      <Box safeArea p="2"  w="100%" maxW="290" py="8">
        <Center>
        <Heading size="lg" color="coolGray.800" _dark={{
        color: "warmGray.50"
      }} fontWeight="semibold" fontSize="25">
          Cambiar Contraseña
        </Heading>
        </Center>
        <VStack space={3} mt="5" marginTop="20%">
        <FormControl isRequired>
            <Input 
              placeholder="Contraseña"
              value={Password}
              onChangeText={setPassword}
              backgroundColor= 'white'
              secureTextEntry={true}
              isInvalid={errorPasswordSN}
              />
          </FormControl>
          <FormControl isRequired>
            <Input 
              placeholder="Repetir Contraseña"
              value={Password2}
              onChangeText={setPassword2}
              backgroundColor= 'white'
              secureTextEntry={true}
              isInvalid={errorPasswordSN}
            />
        </FormControl>
        <Text textAlign='center'>{errorPassword}</Text>
        <View marginTop="120%">
        <ButtonFondoRosa text="Guardar" onPress={() => ValidatePassword()}/>
        <ButtonFondoBlanco text="Cancelar" onPress={() => navigation.navigate('PerfilScreen')}/>
        </View>
        </VStack>
      </Box>
      </View>
      <ModalPoup visible = {visible}>
                <View style = {{alignItems: 'flex-start'}}>
                    <Text style={{fontSize:20, color:"black"}}>Contraseña actualizada exitosamente </Text>
                    <View style={{flexDirection:"row" , alignItems:"center", marginTop:'2%', marginBottom:'2%', marginHorizontal:'5%'}}>
                    {/* asigno espacio */} 

                     </View>
                </View>
                
                <View style={{flexDirection:"row" , alignItems:"center", marginTop:'1%', marginBottom:'1%', marginHorizontal:'1%'}}>

                <ButtonModalUnico text="Aceptar"onPress={() => { navigation.navigate('PerfilScreen');setVisible(false); }}/>
                
                </View> 

                

            </ModalPoup>

            </View>

  )

    
};

const styles = StyleSheet.create({

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
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#D6B1B1',
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
header: {
    width: '100%',
    height: 40,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
});

    export default () => {
        return (
          <NativeBaseProvider>
            <View style={styles.container}>
                <CambiarContraseniaScreen />
                </View>
          </NativeBaseProvider>
        );
    };
    