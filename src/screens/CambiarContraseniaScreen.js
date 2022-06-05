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
  ScrollView} from "native-base";
  import config from "../config/default.json";
  import axios from 'axios'
  import { useNavigation } from '@react-navigation/native';
  import {  ButtonFondoBlanco, ButtonFondoRosa,ButtonModalUnico, ButtonFondoRosaModal } from '../components/ButtonsLogin';
  import Box from '@mui/material/Box';


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
     

  return <Center w="100%">
    <View style={{flexDirection:"row" , alignItems:"center", marginTop:'10%', marginBottom:'1%', marginHorizontal:'5%'}}>


                     
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
        <VStack space={3} mt="5">
        <FormControl isRequired>
            <Input 
              placeholder="Contraseña"
              value={Password}
              onChangeText={setPassword}/>
          </FormControl>
          <FormControl isRequired>
            <Input 
              placeholder="Repetir Contraseña"
              value={Password2}
              onChangeText={setPassword2}
            />
        </FormControl>
        <ButtonFondoRosa text="Guardar" onPress={() => setVisible(true)}/>
        <ButtonFondoBlanco text="Cancelar" onPress={() => navigation.navigate('Perfil')}/>

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

                <ButtonModalUnico text="Aceptar"onPress={() => { navigation.navigate('Perfil');setVisible(false); }}/>
                
                </View> 

                

            </ModalPoup>

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
                <CambiarContraseniaScreen />
          </NativeBaseProvider>
        );
    };
    