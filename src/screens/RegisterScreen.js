import React, { useState, useEffect } from 'react'
import { StyleSheet} from 'react-native';
import { 
  Box,
  Heading,
  VStack, 
  FormControl, 
  Input, 
  Button, 
  Center, 
  NativeBaseProvider, 
  ScrollView,
  CheckIcon,
  Select } from "native-base";
  import config from "../config/default.json";
  import axios from 'axios'
  import { useNavigation } from '@react-navigation/native';

  const RegisterScreen = () => {

    const navigation = useNavigation();
    const [ firstName, setFirstName] = useState("");
    const [ lastName , setLastName]  = useState("");
    const [ password , setPassword] = useState("");
    const [ email    , setEmail] = useState("");
    const [ gender   , setGender] = useState("");
    const [ condition, setCondition]= useState("");
    
    const [ genderList, setGenderList] = useState([]); 
    const [ conditionsList, setConditionList] = useState([]); 

    const baseUrl =  config.baseUrl;

    const getGenders = async () => {
      try{
        const response = await axios.get(`${baseUrl}/gender/GetGenders`)
        setGenderList(response.data)
      }catch(error){
        console.log(error)
      }    
    }
    const getConditions = async () => {
      try{
        const response = await axios.get(`${baseUrl}/condition/GetConditions`);
        setConditionList(response.data);
      }catch(error){
        console.log(error)
      } 
    }

    const Register = async () => {

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

    useEffect(() => {
      getGenders();
      getConditions();
    },[]);

  return <Center w="100%">
     <ScrollView maxW="400" h="600" style={styles.scrollView} _contentContainerStyle={{
      px: "20px",
      mb: "4",
      minW: "72"
    }}>
      <Box safeArea p="2" w="90%" maxW="290" py="8">
        <Heading size="lg" color="coolGray.800" _dark={{
        color: "warmGray.50"
      }} fontWeight="semibold">
          Bienvenido
        </Heading>
        <Heading mt="1" color="coolGray.600" _dark={{
        color: "warmGray.200"
      }} fontWeight="medium" size="xs">
          Registrate para continuar!
        </Heading>
        <VStack space={3} mt="5">
        <FormControl isRequired>
            <FormControl.Label>Nombre</FormControl.Label>
            <Input 
              value={firstName}
              onChangeText={setFirstName}
            />
        </FormControl>
        <FormControl isRequired>
            <FormControl.Label>Apellido</FormControl.Label>
            <Input 
              value={lastName}
              onChangeText={setLastName}/>
        </FormControl>
        <FormControl isRequired>
            <FormControl.Label>Email</FormControl.Label>
            <Input 
              value={email}
              onChangeText={setEmail}/>
          </FormControl>
          <FormControl isRequired>
            <FormControl.Label>Password</FormControl.Label>
            <Input 
              type="password" 
              value={password}
              onChangeText={setPassword}/>
          </FormControl>
          
          <FormControl w="3/4" maxW="300">
            <FormControl.Label>Genero</FormControl.Label>
              <Select 
                selectedValue={gender}
                minWidth="200" 
                _selectedItem={{
                bg: "indigo",
                endIcon: <CheckIcon size={5} />
                }} 
                mt="1"
                onValueChange={itemValue =>setGender(itemValue)}>
                  {genderList.map( (gender) => (
                    <Select.Item key={gender._id} label={gender.desc} value={gender.desc} />
                  ))}
              </Select>
          </FormControl>

          <FormControl w="3/4" maxW="300" isRequired>
            <FormControl.Label>Condicion</FormControl.Label>
              <Select 
                selectedValue={condition}
                minWidth="200" 
                _selectedItem={{
                bg: "indigo",
                endIcon: <CheckIcon size={5} />
                }} 
                mt="1"
                onValueChange={itemValue =>setCondition(itemValue)}>
                  {conditionsList.map( (condition) => (
                    <Select.Item key={condition._id} label={condition.desc} value={condition.desc} />
                  ))}          
              </Select>
      </FormControl>
          <Button mt="2" colorScheme="indigo" onPress={Register}>
            Registrarse
          </Button>
        </VStack>
      </Box>
      </ScrollView>
    </Center>;
};

const styles = StyleSheet.create({

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
                <RegisterScreen />
            </Center>
          </NativeBaseProvider>
        );
    };
    