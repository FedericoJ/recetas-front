import React, { useState, useEffect } from 'react'
import { StyleSheet,Text, Image, View} from 'react-native';
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
  
  const DigitVerify = () => {

    const navigation = useNavigation();
    const [ Code1 , setCode1] = useState("");
    const [ Code2 , setCode2] = useState("");
    const [ Code3 , setCode3] = useState("");
    const [ Code4 , setCode4] = useState("");
    const [ Code5 , setCode5] = useState("");
    const [ Code6 , setCode6] = useState("");

    const baseUrl =  config.baseUrl;
    const RegisterPassword = async () => {

      const setup = {
        headers:{
          'content-type' : 'application/json'
        }
      }
      const body = JSON.stringify({firstName,lastName,password,email, gender, condition})

      try {
        const res = await axios.post(`${baseUrl}/users/`,body,setup);
        navigation.navigate('RegisterSuccess')
        console.log(res.data);
        console.log(res)
      }catch(error){
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
          source = {{ uri: "https://reactjs.org/logo-og.png" }}
        />
        
    </View>
        </Center>
        <Box safeArea p="2"  w="100%" maxW="290" py="8">
          <Center>  
        <Heading size="xlg" color="coolGray.800" _dark={{
        color: "warmGray.50"
      }} fontWeight="semibold" fontSize="18">
          Ingresa el código de validación
        </Heading>
        </Center>
        </Box>
        <VStack space={3} mt="5">
        <Box flexDirection="row" safeArea p="2"  w="20%" maxW="290" py="8">
        <FormControl isRequired>
            <Input 
              value={Code1}
              onChangeText={setCode1}/>
          </FormControl>
          <FormControl isRequired>
            <Input 
              value={Code2}
              onChangeText={setCode2}/>
          </FormControl>
          <FormControl isRequired>
            <Input 
              value={Code3}
              onChangeText={setCode3}/>
          </FormControl>
          <FormControl isRequired>
            <Input 
              value={Code4}
              onChangeText={setCode4}/>
          </FormControl>
          <FormControl isRequired>
            <Input 
              value={Code5}
              onChangeText={setCode5}/>
          </FormControl>
          <FormControl isRequired>
            <Input 
              value={Code6}
              onChangeText={setCode6}/>
          </FormControl>
          </Box>
          <Button mx="1" size="xs"  variant="link" colorScheme="muted"
            onPress={() => alert("Código enviado nuevamente")} >
            Enviar nuevamente
          </Button> 
          <Button mt="2" colorScheme="red" 
            onPress={() => navigation.navigate('EnterNewPassword')} >
            Continuar
          </Button>
        </VStack>
        
      </ScrollView>
    </Center>;
  </View>
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:"pink",
  },

  centerContent: {
    justifyContent:'center',
    alignItems:'center',
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
            <Center flex={1} px="3">
                <DigitVerify />
            </Center>
          </NativeBaseProvider>
        );
    };
    