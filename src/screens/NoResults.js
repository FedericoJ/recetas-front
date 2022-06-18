import React from 'react';
import { ScrollView,StyleSheet,View, Text, SafeAreaView} from 'react-native';
import {Box, NativeBaseProvider, Center} from "native-base"
import Tabs from '../components/Tabs';
import Principal from './Principal';
import { ButtonFondoRosa } from '../components/ButtonsLogin';



const NoResults  = ({navigation}) => {


  return (<NativeBaseProvider>
          <View style={styles.container}>
              <Tabs style={{}}/>
              <SafeAreaView style={{height:"50%"}}>
              <Text  style={{textAlign:"center",fontSize:20,fontWeight:"bold",marginBottom:'2%'}}>No se encontraron Resultados </Text>
            </SafeAreaView>
            <Box safeArea marginLeft="15%" p="2"  w="100%" maxW="290" py="8">
              <Center>
              <ButtonFondoRosa text="Reestablecer" onPress={() => navigation.navigate("Principal")}/>
              </Center>
            </Box>
            
          </View>
          </NativeBaseProvider>
        );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor:'#D6B1B1'
    },

  });

export default NoResults;