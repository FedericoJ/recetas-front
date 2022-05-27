import React from 'react';
import { ScrollView,StyleSheet} from 'react-native';
import { Divider, Flex, Box, Heading, Center,NativeBaseProvider,Text,Button } from "native-base";
import Tabs from '../components/Tabs';
import Galeria from '../components/Carousel';
import Categorias from '../components/Categorias'


const Principal  = ({navigation}) => {

return (
    <ScrollView style={styles.container}>
        <Tabs/>
        <Galeria/>
        <Categorias/>
     </ScrollView>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1
    },
  });

export default Principal;