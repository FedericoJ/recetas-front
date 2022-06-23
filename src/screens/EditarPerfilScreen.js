import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View } from 'react-native';
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
  import { useNavigation } from '@react-navigation/native';
  import {  ButtonFondoBlanco, ButtonFondoRosa } from '../components/ButtonsLogin';
  import UploadImage from '../components/UploadImage';
  import variables from '../config/variables';
  import GalleryComponenet from '../components/Gallery';
  
  const EditarPerfilScreen = () => {
    const imagen =variables.getAvatar()
    const navigation = useNavigation();
    const [ nombre, setNombre] = useState(variables.getNombre());
    const [ usuario, setUsuario] = useState("");
    const [ mail, setMail] = useState("");
    const [base64,setBase64] =React.useState("")
    const [image, setImage] = useState(imagen);
    const baseUrl =  config.baseUrl;

    const EditarPerfil = async () => {

      const setup = {
        headers:{
          'content-type' : 'application/json'
        }
      }
      const IdUsuario = variables.getUsuario();
      const cloudPreset = 'y02lecbn';
      const cloudUrl    = 'https://api.cloudinary.com/v1_1/dwghwqi4l/upload';

      const formData = new FormData();
      formData.append('upload_preset', cloudPreset );
      formData.append('file', 'data:image/jpg;base64,' + base64)

      try { 
          
          fetch( cloudUrl, {
              method: 'POST',
              body: formData
          })
          .then(response => response.json())
          .then(data => {
                if (data.secure_url !== '') {
                  try{
                    const avatar=data.secure_url.trim();
                    const body = JSON.stringify({nombre,avatar,IdUsuario})
                      axios.post(`${baseUrl}/usuario/modificarUsuario`,body,setup)
                      .then(function(res){
                          if (res.status === 201) {
                            variables.setNombre(nombre);
                            console.log("ejecucion ok perfil modificado");
                            navigation.navigate('PerfilScreen');
                          }
                      })
                      .catch(function(error){console.log(error)})
                    }catch(error){
                      alert(error.msg);
                    }
              }
          })
      } catch( err ) {
          console.log(err);
      }

    }
    ;

  return <Center w="100%">
     <View maxW="400" h="600" style={styles.scrollView} _contentContainerStyle={{
      px: "20px",
      mb: "4",
      minW: "72"
    }}>
      <Box safeArea p="2"  w="100%" maxW="290" py="8">
        <Center>  
        <Heading size="lg" color="coolGray.800" _dark={{
        color: "warmGray.50"
      }} fontWeight="semibold" fontSize="30">
          Editar Perfil
        </Heading>
        </Center>
        <VStack space={3} mt="5">
        <FormControl isRequired>
            <Input
              placeholder="Nombre" 
              value={nombre}
              onChangeText={setNombre}
              backgroundColor= 'white'/>
          </FormControl>
          <FormControl >
            <Input
              placeholder="Usuario" 
              value={variables.getNick()}
              isDisabled
              backgroundColor= 'white'
            />
        </FormControl>
        <FormControl >
            <Input
              placeholder="Mail" 
              value={variables.getMail()}
              isDisabled
              backgroundColor= 'white'
            />
        </FormControl>

        <View style={styles.container}>
        <GalleryComponenet image={image} setImage={setImage} setBase64={setBase64}/>
        </View>
          <ButtonFondoRosa text="Guardar" onPress={() => EditarPerfil()}/>
          <ButtonFondoBlanco text="Cancelar" onPress={() => navigation.navigate('PerfilScreen')}/>
        </VStack>
      </Box>
      </View>
    </Center>;
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
    padding:50,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#D6B1B1',
  },
  container1: {
    flex: 1,
    backgroundColor: '#D6B1B1',
    
  },

});

    export default () => {
        return (
          <NativeBaseProvider>
                <View style={styles.container1}>
                <EditarPerfilScreen />
                </View>
          </NativeBaseProvider>
        );
    };
    