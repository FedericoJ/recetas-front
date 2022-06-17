import React from 'react';
import { ScrollView,StyleSheet,View} from 'react-native';
import { Divider, Flex, Box, Heading, Center,NativeBaseProvider,Text,Button } from "native-base";
import Tabs from '../components/Tabs';
import Galeria from '../components/cardResults';
import Categorias from '../components/Categorias'
import { FloatingAction } from "react-native-floating-action";
import { FAB } from 'react-native-paper';
import {useRoute } from '@react-navigation/native';


const Results  = ({navigation}) => {

  const route=useRoute();

  const baseUrl =  config.baseUrl;

  const fetcher = url => axios.get(`${baseUrl}/receta/${route.params.service}`).then(res => res.data)

  const {data,error}=useSWR(`${baseUrl}/receta/${route.params.service}`, fetcher);

return (
    <View style={styles.container}>
        <Tabs style={{}}/>
        <Galeria/>
         <FAB style={styles.fab}
          extended
          icon="pencil"
          label ="Nueva"
          uppercase={false}
          onPress={() => navigation.navigate('CreateReceta')}
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

export default Results;