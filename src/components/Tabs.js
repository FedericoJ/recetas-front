import React from 'react';
import { Divider, Flex, Box, Heading, Center,NativeBaseProvider,Text,Button,Input,Icon,View } from "native-base";
import {StyleSheet} from 'react-native';
import { MaterialIcons } from "@expo/vector-icons";

  
    const Tabs  = () => {

        return (
            <NativeBaseProvider>
               
                    <View style={styles.container}>
        
                        <Button  variant="link"  size="xs"  colorScheme="muted">
                            Ingredientes
                        </Button>
            
                        <Button mx="1" size="xs"  variant="link" colorScheme="muted">
                            Plato
                        </Button> 
            
                        <Button mx="1" size="xs"  variant="link" colorScheme="muted">
                            Tipo
                        </Button> 
            
                        <Button mx="1" size="xs"  variant="link" colorScheme="muted">
                            Usuario
                        </Button> 
            
    
                    </View>

                   <Input mx="2" my="2" size="xs" placeholder="Input" InputRightElement={<Icon as={<MaterialIcons name="search" />} size={8} ml="2" color="muted.400" />} />
            

            </NativeBaseProvider>
          );


         

    };
        

    const styles = StyleSheet.create({
        container: {
          flex: 1,
          backgroundColor:"#afbf",
          flexDirection:"row",
          justifyContent:"space-between"
        },
      });
    
        
export default Tabs