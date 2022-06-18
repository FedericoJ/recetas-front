import React, {useState} from 'react';
import { Box, Text, Heading, VStack, CheckCircleIcon, Button, HStack, Center, NativeBaseProvider, Icon  } from "native-base";
import { StyleSheet, Image, View, Modal} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import {  ButtonFondoBlanco, ButtonFondoRosa , ButtonModal} from '../components/ButtonsLogin';
import {useNetInfo} from "@react-native-community/netinfo";


const InicioScreen = () => {

  const netInfo = useNetInfo();

  const wifiLogin = () => {
    if(!netInfo.isConnected){
      navigation.navigate("Wifi")
    }
    else {
      navigation.navigate("Login") 
    }
  };

  const wifiRegister = () => {
    if(!netInfo.isConnected){
      navigation.navigate("Wifi")
    }
    else {
      navigation.navigate("Register") 
    }
  };


const navigation = useNavigation();

    return <Center w="100%">
      <Box safeArea p="1" py="1" w="100%" maxW="290" marginBottom= "50">
      <Center>
        <Heading size="lg" color="coolGray.800" _dark={{
        color: "warmGray.50"
      }} fontWeight="semibold" fontSize="50">
          RecetApp
        </Heading>
        </Center> 
      </Box>
      <Box safeArea p="1" py="1" w="100%" maxW="290">
          <Center>
      <View style={styles.centerContent}>
        <Image
          style={{ width: 150, height: 160, marginBottom: 100 }}
          source = { require('../assets/logo.png') }
        />   
      </View>
      </Center>
        <VStack space={3} mt="5">
        <ButtonFondoRosa text="Iniciar Sesión" onPress={() => wifiLogin()}/>
        <ButtonFondoBlanco text="Registrate" onPress={() => wifiRegister()}/>
        </VStack>
      </Box>
    </Center>;
};

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#FBE192',
  },

  centerContent: {
    justifyContent:'center',
    alignItems:'center'
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
            <Center style={styles.container}  flex={1} px="3">
                <InicioScreen />
            </Center>
          </NativeBaseProvider>
        );
    };
    