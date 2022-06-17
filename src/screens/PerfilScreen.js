import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { FontAwesome5 } from '@expo/vector-icons'; 
import { FontAwesome } from '@expo/vector-icons'; 
//import Icon from '@mdi/react'
//import {mdiKeyVariant, mdiAccountCircle} from '@mdi/js'
import { StyleSheet, Text, View,TouchableOpacity } from 'react-native';


const PerfilScreen = () => {

const navigation = useNavigation();

    return( 
    
    <View>
      <View style={{flexDirection:"row", marginTop:'10%', marginBottom:'10%', marginHorizontal:'5%'}}>
      <FontAwesome name="user" size={24} color="black" />
      <Text>{"     "}</Text>
      <TouchableOpacity onPress={() => navigation.navigate('EditarPerfil')} > 
      <Text style={{fontSize:20}}> Editar Perfil </Text>
      </TouchableOpacity>

      </View>

      <View style={{flexDirection:"row", marginTop:'5%', marginBottom:'10%', marginHorizontal:'5%'}}>
      <FontAwesome5 name="key" size={24} color="black"/>
          <Text>{"    "}</Text>
          <TouchableOpacity onPress={() => navigation.navigate('CambiarContrasenia')} >
            <Text style={{fontSize:20}}> Cambiar Contraseña </Text>
          </TouchableOpacity>

      </View>


      </View>
    )};

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#D6B1B1',
    
  },
 
});
    

export default () => {
        return (
          <View style={styles.container}>
            <PerfilScreen />
            </View>
        );
    };
    