import React, {useState} from 'react';
import { Box, Text, Heading, VStack, CheckCircleIcon, Button, HStack, Center, NativeBaseProvider, Icon  } from "native-base";
import { StyleSheet, Image, View, Modal} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';
import { ButtonFondoRosa, ButtonModalUnico } from '../components/ButtonsLogin';
import {useNetInfo} from "@react-native-community/netinfo";



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


const WifiScreen = () => {

  const [visible, setVisible] = React.useState(false);

  const netInfo = useNetInfo();


const navigation = useNavigation();


    return (
      <View >
          <Center>
      <View style={styles.centerContent}>
      <MaterialIcons name="wifi-off" size={100} color="black" />  
      </View>


        <ButtonFondoRosa text="Volver" onPress={() => navigation.navigate('Home')}/>
        <ModalPoup visible = {visible}>
                <View style = {{alignItems: 'flex-start'}}>
                      <Text>Type: {netInfo.type}</Text>
                      <Text>Is Connected? {netInfo.isConnected?.toString()}</Text>
                </View>
                <View style={{flexDirection:"row" , alignItems:"center", marginTop:'1%', marginBottom:'1%', marginHorizontal:'1%'}}>
                <ButtonModalUnico text="Aceptar"onPress={() => { setVisible(false) }}/>             
                </View> 
         </ModalPoup>
        <ButtonFondoRosa text="Validar" onPress={() => setVisible(true)}/>
        </Center>
      </View>
      
)
};

const styles = StyleSheet.create({

  centerContent: {

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
            <Center flex={1}  backgroundColor= '#D6B1B1'>
                <WifiScreen />
            </Center>
          </NativeBaseProvider>
        );
    };
    