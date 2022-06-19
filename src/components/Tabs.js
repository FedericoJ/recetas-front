import React, { useState } from 'react';
import { Divider, Flex, Box, Heading, Center,NativeBaseProvider,Text,Button,Input,Icon,View } from "native-base";
import {StyleSheet,TouchableOpacity, Modal,} from 'react-native';
import {  ButtonConIconoFondoRosa, ButtonConIconoNegro,ButtonFondoRosa, ButtonFondoBlanco,ButtonConIconoFondoBlanco,ButtonModalUnico, ButtonInvisible } from './ButtonsLogin';
import { useNavigation } from '@react-navigation/native';
import { FontAwesome } from '@expo/vector-icons'; 
import { MaterialIcons } from '@expo/vector-icons';
import variables from '../config/variables';



const ModalPoup = ({ visible, children }) => {
    const [showModal, setShowModal] = React.useState(visible);
    React.useEffect(() => {
      toggleModal();
    }, [visible]);
    const toggleModal = () => {
      if (visible) {
        setShowModal(true);
      } else {
        setShowModal(false);
      }
    };
  
    return (
      <Modal transparent visible={showModal}>
        <View style={styles.modalBackGround}>
          <View style={[styles.modalContainer]}>{children}</View>
        </View>
      </Modal>
    );
  };

    const activeItemClass = {fontSize:15, color: '#AC6363',textDecorationLine: 'underline'};
    const inactiveItemClass = {fontSize:15, color: 'gray',textDecorationLine: 'underline'};

    const Tabs  = () => {

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

        const navigation = useNavigation();
        const [busqueda,setBusqueda] =useState("");
        const [visible, setVisible] = useState(false);
        const[contiene,setContiene]=useState(true);
        const [activeElement, setActiveElement] = useState("ingrediente");
        const[ordenar,setOrdenar]=useState("");
    
        
        var servicio = "recetaPorIngrediente";

        const onPressHandler = (item) => {
            setActiveElement(item.name)
            //console.log(item.name);
        };


        const onPressSearch =() =>{

          
                if (activeElement ==="ingrediente"){
                    if (contiene) {
                        servicio="recetaPorIngrediente";
                    }else{
                        servicio="recetaSinIngrediente";
                    }
                }

                if(activeElement ==="usuario"){
                    servicio="recetaPorUsuario";
                }   
                if(activeElement ==="plato"){
                    servicio="RecetaPorNombre";
                }
                if(activeElement ==="tipo"){
                    servicio="recetaPorNombreTipo";
                }
            
            variables.setBusqueda(busqueda);

            variables.setServicio(servicio);

            navigation.navigate('Results')

        }

         // return (<ButtonConIconoFondoBlanco text="No Contiene" onPress={() => setContiene(true)}/>)

        const Boton =() =>{

            if (activeElement ==="ingrediente"){
                if (contiene){
                    return (<ButtonConIconoFondoRosa text="Contiene" onPress={() => setContiene(false)}/>)
                }else{
                    return (<ButtonConIconoFondoBlanco text="No Contiene" onPress={() => setContiene(true)}/>)
                }
               
            }else{
                return (<ButtonInvisible/>)
            }
                  
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

                    <View style={{backgroundColor:'#ffff'}}>

                        <Input style={{backgroundColor:'#ffff'}} value={busqueda} onChangeText={setBusqueda} mx="2" my="3" size="large" placeholder="Input" 
                        InputRightElement={
                                            <TouchableOpacity
                                                onPress = { () => onPressSearch() }
                                            >
                                               {<FontAwesome name="search" size={24} color="black"/>}
                                            </TouchableOpacity>
                                            } />
                    
                        <View style={{flexDirection:"row",alignItems:"center",backgroundColor:'#ffff',}}>
                            <Boton> </Boton>
                        
                        <ModalPoup visible={visible}>
                            <View style={{flexDirection:"row", alignItems:"flex-end", justifyContent: "center"}}>
                                <View marginLeft="20%">
                                <TouchableOpacity onPress={() => {setOrdenar("Abc"); setVisible(false)}}>
                                <Center>
                                <MaterialIcons name="sort-by-alpha" size={40} color="black" />
                                <Text>Nombre</Text>
                                </Center>
                                </TouchableOpacity>
                                </View>
                                <View marginLeft="20%" marginRight="20%">
                                <TouchableOpacity onPress={() => {setOrdenar("User"); setVisible(false)}}>
                                <Center>
                                <FontAwesome name="user" size={40} color="black" />
                                <Text>Usuario</Text>
                                </Center>
                                </TouchableOpacity>
                                </View>
                                <View marginRight="20%">
                                <TouchableOpacity onPress={() => {setOrdenar("Date"); setVisible(false)}}>
                                <Center>
                                <MaterialIcons name="date-range" size={40} color="black" />
                                <Text>Fecha</Text>
                                </Center>
                                </TouchableOpacity>
                                </View>
                            </View>

                            <View
                                style={styles.botonesModal}>
                                <ButtonModalUnico
                                text="Volver"
                                onPress={() => {
                                    setVisible(false);
                                }}
                                />
                            </View>
                        </ModalPoup>

                            <ButtonConIconoNegro text="Ordenar" onPress={() => setVisible(true)}/>
                        </View>
                </View>    

            </NativeBaseProvider>
            );
            };
        

    const styles = StyleSheet.create({
        container: {
            height:"15%",
          flexDirection:"row",
          marginTop:"5%",
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
          botonesModal: {
            flexDirection: "row",
            alignItems: "center",
            marginTop: "10%",
            marginHorizontal: "1%",
          },
      });
    
        
export default Tabs