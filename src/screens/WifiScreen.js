import React from 'react';
import { Box, Text, Heading, VStack, CheckCircleIcon, Button, HStack, Center, NativeBaseProvider, Icon  } from "native-base";
import { StyleSheet, Image, View} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';
import { ButtonFondoRosa } from '../components/ButtonsLogin';

const WifiScreen = () => {

const navigation = useNavigation();

    return (
      <View >
          <Center>
      <View style={styles.centerContent}>
      <MaterialIcons name="wifi-off" size={100} color="black" />  
      </View>


        <ButtonFondoRosa text="Volver" onPress={() => navigation.navigate('Home')}/>
        </Center>
      </View>
      
)
};

const styles = StyleSheet.create({

  centerContent: {

  }
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
    