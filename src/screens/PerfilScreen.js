import React from 'react';
import { useNavigation } from '@react-navigation/native';
//import Icon from '@mdi/react'
//import {mdiKeyVariant, mdiAccountCircle} from '@mdi/js'
import { StyleSheet, Text, View,TouchableOpacity } from 'react-native';


const PerfilScreen = () => {

const navigation = useNavigation();

    return( 
    
    <View>
      <View style={{flexDirection:"row", marginTop:'10%', marginBottom:'10%', marginHorizontal:'5%'}}>

      {/*  <Icon path={mdiAccountCircle}
              title="User Profile"
              size={1.5}
              horizontal
              vertical
              rotate={180}
              color="black"
        />*/}
        
      <TouchableOpacity onPress={() => navigation.navigate('EditarPerfil')} > 
      <Text style={{fontSize:20}}> Editar Perfil </Text>
      </TouchableOpacity>

      </View>

      <View style={{flexDirection:"row", marginTop:'5%', marginBottom:'10%', marginHorizontal:'5%'}}>
      {/*<Icon path={mdiKeyVariant}
        title="User Profile"
        size={1.5}
        horizontal
        vertical
        rotate={90}
        color="black"
        />*/}

          <TouchableOpacity onPress={() => navigation.navigate('CambiarContrasenia')} >
            <Text style={{fontSize:20}}> Cambiar Contrasenia </Text>
          </TouchableOpacity>

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
            <PerfilScreen />
        );
    };
    