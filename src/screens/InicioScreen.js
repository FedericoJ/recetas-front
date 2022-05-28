import React from 'react';
import { Box, Text, Heading, VStack, CheckCircleIcon, Button, HStack, Center, NativeBaseProvider, Icon  } from "native-base";
import { StyleSheet, Image, View} from 'react-native';
import { useNavigation } from '@react-navigation/native';

const InicioScreen = () => {

const navigation = useNavigation();

    return <Center w="100%">
      <Box safeArea p="1" py="1" w="100%" maxW="290" marginBottom= "100">
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
          style={{ width: 100, height: 100, marginBottom: 100 }}
          source = {{ uri: "https://reactjs.org/logo-og.png" }}
        />   
      </View>
      </Center>
        <VStack space={3} mt="5">
        <Button mt="2" colorScheme="red" onPress={InicioScreen}>
            Inicia Sesión
          </Button>
          <Button mt="2" colorScheme="dark" onPress={InicioScreen}>
            Registrate
          </Button>
        </VStack>
      </Box>
    </Center>;
};

const styles = StyleSheet.create({

  centerContent: {
    justifyContent:'center',
    alignItems:'center'
  }
});
    export default () => {
        return (
          <NativeBaseProvider>
            <Center flex={1} px="3">
                <InicioScreen />
            </Center>
          </NativeBaseProvider>
        );
    };
    