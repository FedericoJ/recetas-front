import React from 'react';
import { Divider, Flex, Box, Heading, Center,NativeBaseProvider,Text,Button,Input,Icon,View } from "native-base";
import {StyleSheet,TouchableOpacity} from 'react-native';
import { MaterialIcons } from "@expo/vector-icons";
import {  ButtonConIconoFondoRosa } from './ButtonsLogin';
import { useNavigation } from '@react-navigation/native';

  
    const Tabs  = () => {

        const navigation = useNavigation();

        return (
            <NativeBaseProvider style={{backgroundColor:'#ffff'}}>
               
                    <View style={styles.container}>

                         <TouchableOpacity style={{marginLeft:'2%'}}>

                                <Text  style={{fontSize:15, color: '#AC6363',textDecorationLine: 'underline'}}> Ingrediente </Text>

                        </TouchableOpacity>

                        <TouchableOpacity style={{}}>

                            <Text  style={{fontSize:15, color: 'gray',textDecorationLine: 'underline'}}> Plato </Text>

                        </TouchableOpacity>

                        <TouchableOpacity style={{}}>

                            <Text  style={{fontSize:15, color: 'gray',textDecorationLine: 'underline'}}> Tipo </Text>

                        </TouchableOpacity>
        
                       
                        <TouchableOpacity style={{marginRight:'5%'}}>

                            <Text  style={{fontSize:15, color: 'gray',textDecorationLine: 'underline'}}> Usuario </Text>

                        </TouchableOpacity>
            
                       
            
    
                    </View>


                    <View style={{alignItems:"left",backgroundColor:'#ffff'}}>

                        <Input style={{backgroundColor:'#ffff'}} mx="2" my="3" size="xs" placeholder="Input" 
                        InputRightElement={
                                            <TouchableOpacity
                                                onPress = { () => navigation.navigate('Results') }
                                            >
                                                <Icon as={<MaterialIcons name="search" />} size={8} ml="2" color="muted.400" />
                                            </TouchableOpacity>
                                            } />
                    

                        <ButtonConIconoFondoRosa text="Contiene" onPress={() => console.log("hola")}/>


                    </View>

            </NativeBaseProvider>
          );


         

    };
        

    const styles = StyleSheet.create({
        container: {
          flex: 1,
          flexDirection:"row",
          alignItems:"center",
          backgroundColor:'#ffff',
          justifyContent:"space-between"
        },
      });
    
        
export default Tabs