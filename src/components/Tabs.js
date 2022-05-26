import React from 'react';
import { Divider, Flex, Box, Heading, Center,NativeBaseProvider,Text,Button,Input,Icon } from "native-base";
import { MaterialIcons } from "@expo/vector-icons";

  
    const Tabs  = () => {

        return (
            <NativeBaseProvider>
                <Box alignItems="left" backgroundColor ="#ffff">
                    <Flex  direction="row">
        
                    <Button  variant="link" colorScheme="muted">
                        Ingredientes
                    </Button>
        
                    <Button mx="2" variant="link" colorScheme="grey">
                        Plato
                    </Button> 
        
                    <Button mx="2" variant="link" colorScheme="grey">
                        Tipo
                    </Button> 
        
                     <Button mx="2" variant="link" colorScheme="grey">
                        Usuario
                    </Button> 
        
        
                    </Flex>

                   <Input mx="2" my="2" size="xs" placeholder="Input" InputRightElement={<Icon as={<MaterialIcons name="search" />} size={8} ml="2" color="muted.400" />} />
                
                </Box>

            

            </NativeBaseProvider>
          );
    };
        
        
export default Tabs