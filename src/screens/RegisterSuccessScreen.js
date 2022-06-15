import React from 'react';
import { Box, Text, Heading, VStack, CheckCircleIcon, Button, HStack, Center, NativeBaseProvider, Icon  } from "native-base";
import { StyleSheet, Image, View} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import {  ButtonFondoBlanco, ButtonFondoRosa } from '../components/ButtonsLogin';

const RegisterSuccessScreen = () => {

const navigation = useNavigation();

    return <Center w="100%">
      <Box safeArea p="1" py="1" w="100%" maxW="290">
          <Center>
      <View style={styles.centerContent}>
        <Image
          style={{ width: 150, height: 160, marginBottom: 0 }}
          source = { require('../assets/logo.png') }
        /> 
      <Box safeArea p="1" py="1" w="100%" maxW="290" marginBottom= "50">
      <Center>
        <Heading size="lg" color="coolGray.800" _dark={{
        color: "warmGray.50"
      }} fontWeight="semibold" fontSize="35">
          RecetApp
        </Heading>
        </Center> 
      </Box> 
      <Box safeArea p="1" py="1" w="100%" maxW="290" marginBottom= "50">
      <Center>
        <Heading size="lg" color="coolGray.800" _dark={{
        color: "warmGray.50"
      }} fontWeight="semibold" fontSize="50">
          Bienvenido!
        </Heading>
        </Center> 
      </Box>
      </View>
      </Center>
        <VStack space={3} mt="5">
        <ButtonFondoRosa text="Ingresar" onPress={() => navigation.navigate('Login')}/>
        </VStack>
      </Box>
    </Center>;
};

const styles = StyleSheet.create({

  centerContent: {
    justifyContent:'center',
    alignItems:'center'
  },
  container: {
    flex: 1,
    backgroundColor: '#D6B1B1',
  },
});
    export default () => {
        return (
          <NativeBaseProvider>
            <Center style={styles.container}>
                <RegisterSuccessScreen />
            </Center>
          </NativeBaseProvider>
        );
    };
    