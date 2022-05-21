import React from 'react';
import { Box, Text, Heading, VStack, CheckCircleIcon, Button, HStack, Center, NativeBaseProvider, Icon  } from "native-base";
import  { BackHandler } from 'react-native';
import { Ionicons, FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const RegisterFailedScreen = () => {

    const navigation = useNavigation();

    return <Center w="100%">
      <Box safeArea p="2" py="8" w="90%" maxW="290">
          <Center>
      <Icon
        as={Ionicons}
        name="alert"
        size="40"
        color="red.400"
      />
      </Center>
        <Heading size="lg" fontWeight="600" color="coolGray.800" _dark={{
        color: "warmGray.50"
      }}>
          Ha Ocurrido un error a la hora de Registrarse, 
          Vuelva a intentarlo
        </Heading>
        <VStack space={3} mt="5">
          <Button mt="2" colorScheme="indigo" onPress={() => navigation.navigate('Register')}>
            Volver a Intentar
          </Button>
          <Button mt="2" colorScheme="indigo" onPress={() => BackHandler.exitApp()}>
            Salir
          </Button>
        </VStack>
      </Box>
    </Center>;
};

    export default () => {
        return (
          <NativeBaseProvider>
            <Center flex={1} px="3">
                <RegisterFailedScreen />
            </Center>
          </NativeBaseProvider>
        );
    };
    