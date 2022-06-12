import React from 'react';
import { ScrollView,StyleSheet, View,SafeAreaView,FlatList,Button} from 'react-native';
import { Divider, Flex, Box, Heading, Center,NativeBaseProvider,Text } from "native-base";
import Tabs from '../components/Tabs';
import Galeria from '../components/cardResults';
import Categorias from '../components/Categorias'
import { FloatingAction } from "react-native-floating-action";
import { FAB } from 'react-native-paper';
import Guardada from '../components/cardGuardadas';



const Guardadas  = ({navigation}) => {



return (
    <ScrollView style={styles.container}>

        <Guardada/>

      
         <FAB style={styles.fab}
          extended
          icon="pencil"
          label ="Nueva"
          uppercase={false}
          onPress={() => console.log('Pressed')}
          />

     </ScrollView>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor:'#D6B1B1'
    },

    fab: {
      position: 'absolute',
      margin: 16,
      right: 0,
      bottom: 0,
      backgroundColor:"#FFD700"
      
    },
  });

export default Guardadas;