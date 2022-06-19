import React from 'react';
import { ScrollView,StyleSheet,View} from 'react-native';
import { Divider, Flex, Box, Heading, Center,NativeBaseProvider,Text,Button } from "native-base";
// import Tabs from '../components/Tabs';
import Galeria from '../components/cardResults';
import MiReceta from '../components/cardMisRecetas';
import { FloatingAction } from "react-native-floating-action";
import { FAB } from 'react-native-paper';


const MisRecetas  = ({navigation}) => {

return (
    <View style={styles.container}>
        <MiReceta/>
      
         <FAB style={styles.fab}
          extended
          icon="pencil"
          label ="Nueva"
          uppercase={false}
          onPress={() => console.log('Pressed')}
          />

     </View>
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

export default MisRecetas;