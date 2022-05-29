import React from 'react';
import { Box, Text, Heading, VStack, CheckCircleIcon, Button, HStack, Center, NativeBaseProvider, Icon  } from "native-base";
import { StyleSheet, Image, View} from 'react-native';
import { useNavigation } from '@react-navigation/native';

const SplashScreen = () => {

const navigation = useNavigation();

    return <Center w="100%">
      <Box safeArea p="1" py="1" w="100%" maxW="290" marginBottom= "30">
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
          style={{ width: 250, height: 250, marginBottom: 100 }}
          source = { require('../assets/logo.png') }
        />   
      </View>
      </Center>
        <VStack space={3} mt="5">
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
                <SplashScreen />
            </Center>
          </NativeBaseProvider>
        );
    };
    