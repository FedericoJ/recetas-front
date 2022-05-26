import React from 'react';
import { View,StyleSheet} from 'react-native';
import { Divider, Flex, Box, Heading, Center,NativeBaseProvider,Text,Button } from "native-base";
import Tabs from '../components/Tabs';
import Galeria from '../components/Carousel';


const Principal  = ({navigation}) => {

return (
    <View>
        <Tabs/>
        <Galeria/>
     </View>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1
    },
  });

export default Principal;