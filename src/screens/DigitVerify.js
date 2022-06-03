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
  ScrollView
} from "native-base";
import config from "../config/default.json";
import axios from 'axios'
import { useNavigation } from '@react-navigation/native';
import { ButtonFondoRosa } from '../components/ButtonsLogin';

const DigitVerify = () => {

  const navigation = useNavigation();
  const [Code1, setCode1] = useState("");
  const [Code2, setCode2] = useState("");
  const [Code3, setCode3] = useState("");
  const [Code4, setCode4] = useState("");
  const [Code5, setCode5] = useState("");
  const [Code6, setCode6] = useState("");

  const baseUrl = config.baseUrl;
  const RegisterPassword = async () => {

    const setup = {
      headers: {
        'content-type': 'application/json'
      }
    }
    const body = JSON.stringify({ firstName, lastName, password, email, gender, condition })

    try {
      const res = await axios.post(`${baseUrl}/users/`, body, setup);
      navigation.navigate('RegisterSuccess')
      console.log(res.data);
      console.log(res)
    } catch (error) {
      console.log("Here")
      navigation.navigate('RegisterFailed')
    }
  }
    ;

  return <View style={styles.container}>
    <Center w="100%">
      <ScrollView maxW="400" h="600" style={styles.scrollView} _contentContainerStyle={{
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
            <Heading size="xlg" color="coolGray.800" _dark={{
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
            Ingresa el código de validación
          </Heading>
        </Center>
        <VStack space={3} mt="5">
          <Box alignitems = "center" flexDirection="row" safeArea p="2" w="20%" maxW="290" py="8">
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
          <Button mx="1" size="xs" variant="link" colorScheme="muted"
            onPress={() => alert("Código enviado nuevamente")} >
            Enviar nuevamente
          </Button>
          <ButtonFondoRosa text="Continuar" onPress={() => navigation.navigate('EnterNewPassword')} />
        </VStack>

      </ScrollView>
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
