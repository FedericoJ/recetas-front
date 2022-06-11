import React, { useState } from 'react';
import { Divider, Flex, Box, Heading, Center,NativeBaseProvider,Text,Button,Input,Icon,View,Modal } from "native-base";
import {StyleSheet,TouchableOpacity} from 'react-native';
import { MaterialIcons } from "@expo/vector-icons";
import {  ButtonConIconoFondoRosa, ButtonConIconoNegro, ButtonModal } from './ButtonsLogin';
import { useNavigation } from '@react-navigation/native';

// const ModalPoup = ({ visible, children }) => {
//     const [showModal, setShowModal] = React.useState(visible);
//     React.useEffect(() => {
//       toggleModal();
//     }, [visible]);
//     const toggleModal = () => {
//       if (visible) {
//         setShowModal(true);
//       } else {
//         setShowModal(false);
//       }
//     };
  
//     return (
//       <Modal transparent visible={showModal}>
//         <View style={styles.modalBackGround}>
//           <View style={[styles.modalContainer]}>{children}</View>
//         </View>
//       </Modal>
//     );
//   };
  
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
        const [visible, setVisible] = useState(false);
        
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

                        <Input style={{backgroundColor:'#ffff'}} mx="2" my="3" size="large" placeholder="Input" 
                        InputRightElement={
                                            <TouchableOpacity
                                                onPress = { () => navigation.navigate('Results') }
                                            >
                                                <Icon as={<MaterialIcons name="search" />} size={8} ml="2" color="muted.400" />
                                            </TouchableOpacity>
                                            } />
                    
                    <View style={styles.container}>
                        <ButtonConIconoFondoRosa text="Contiene" onPress={() => console.log("hola")}/>
                        <ButtonConIconoNegro text="Ordenar" onPress={() => setVisible(false)}/>
                        
                    </View>
                    </View>

                        <View style={styles.container} visible={visible}>

                        <Text>Pero que chupa pija</Text>

                            
                        {/* <ModalPoup visible={visible}>
                            <View style={{ alignItems: "flex-start" }}>
                                <Text style={{ fontSize: 20, color: "black" }}> Calificación </Text>
                                <Text style={{ fontSize: 20, color: "black" }}>
                                {" "}
                                Agrega tu comentario{" "}
                                </Text>
                            </View> 

                        <View
                            style={{
                            flexDirection: "row",
                            alignItems: "center",
                            marginTop: "1%",
                            marginBottom: "1%",
                            marginHorizontal: "1%",
                            }}
                        >
                            <ButtonModal
                            text="Atras"
                            onPress={() => {
                                navigation.navigate("Results");
                                setVisible(false);
                            }}
                            />
                            <ButtonModal
                            text="Guardar"
                            onPress={() => {
                                navigation.navigate("Results");
                                setVisible(false);
                            }}
                            />
                        </View>
                        </ModalPoup> */}


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
        modalBackGround: {
            flex: 1,
            backgroundColor: "rgba(0,0,0,0.5)",
            justifyContent: "center",
            alignItems: "center",
          },
          modalContainer: {
            width: "80%",
            backgroundColor: "#F7F4F4",
            paddingHorizontal: 20,
            paddingVertical: 30,
            borderRadius: 20,
            elevation: 20,
          },
          header: {
            width: "100%",
            height: 40,
            alignItems: "flex-end",
            justifyContent: "center",
          },

      });
    
        
export default Tabs