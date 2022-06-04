import React from 'react';
import { Divider, Flex, Box, Heading, Center,NativeBaseProvider,Text,Button,Input,Icon,View } from "native-base";
import {StyleSheet,TouchableOpacity} from 'react-native';
import { MaterialIcons } from "@expo/vector-icons";
import {  ButtonConIconoFondoRosa } from './ButtonsLogin';
import { useNavigation } from '@react-navigation/native';

  
    const ITEMS = [{
        name: "ingrediente",
        label: "Ingrediente",
    },
    {
        name: "plato",
        label: "Plato",
    },
    {
        name: "tipo",
        label: "Tipo",
    },
    {
        name: "usuario",
        label: "Usuario",
    }];

    const activeItemClass = {fontSize:15, color: '#AC6363',textDecorationLine: 'underline'};
    const inactiveItemClass = {fontSize:15, color: 'gray',textDecorationLine: 'underline'};

    const Tabs  = () => {

        const navigation = useNavigation();
        
        const [activeElement, setActiveElement] = React.useState('ingrediente');
    
        const onPressHandler = (item) => {
            setActiveElement(item.name);
        }

        return (
            <NativeBaseProvider style={{backgroundColor:'#ffff'}}>
               
                    <View style={styles.container}>
                        {ITEMS.map( (item, i) => (
                            <TouchableOpacity key={item.name} onPress={() => onPressHandler(item)}>

                                <Text  style={activeElement === item.name ? activeItemClass : inactiveItemClass}> {item.label} </Text>

                            </TouchableOpacity>
                        ))}
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