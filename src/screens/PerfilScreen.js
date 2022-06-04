import React from 'react';
import { Box, Heading, VStack, CheckCircleIcon, Button, HStack, Center, NativeBaseProvider } from "native-base";
import { useNavigation } from '@react-navigation/native';
import Icon from '@mdi/react'
import {mdiKeyVariant, mdiAccountCircle} from '@mdi/js'
import { StyleSheet, Text, View } from 'react-native';


const PerfilScreen = () => {

const navigation = useNavigation();

    return( <View style={[styles.container, {
      flexDirection: "column"
    }]}>

      <View style={{flexDirection:"row", alignItems:"top", marginTop:'10%', marginBottom:'10%', marginHorizontal:'5%'}}>
      <Icon path={mdiAccountCircle}
        title="User Profile"
        size={1.5}
        horizontal
        vertical
        rotate={180}
        color="black"
        />
      <Text onPress={() => navigation.navigate('EditarPerfil')} style={{fontSize:20}}> Editar Pefil</Text>

      </View>
      <View style={{flexDirection:"row", alignItems:"top", marginTop:'5%', marginBottom:'10%', marginHorizontal:'5%'}}>
      <Icon path={mdiKeyVariant}
        title="User Profile"
        size={1.5}
        horizontal
        vertical
        rotate={90}
        color="black"
        />

      <Text onPress={() => navigation.navigate('CambiarContrasenia')} style={{fontSize:20}}> Cambiar contraseña </Text>

      </View>


      </View>
    )};

const styles = StyleSheet.create({

  centerContent: {
    flex: 1,
    padding: 20,
  },
 
});
    export default () => {
        return (
          <NativeBaseProvider>
            <PerfilScreen />
          </NativeBaseProvider>
        );
    };
    