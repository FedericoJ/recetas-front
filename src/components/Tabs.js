import React, { useState } from 'react';
import { Divider, Flex, Box, Center,NativeBaseProvider,Text,Button,Input,Icon,View,Spinner,Heading,HStack } from "native-base";
import {StyleSheet,TouchableOpacity, Modal,KeyboardAvoidingView} from 'react-native';
import {  ButtonConIconoFondoRosa, ButtonConIconoNegro,ButtonFondoRosa, ButtonFondoBlanco,ButtonConIconoFondoBlanco,ButtonModalUnico, ButtonInvisible } from './ButtonsLogin';
import { useNavigation } from '@react-navigation/native';
import { FontAwesome } from '@expo/vector-icons'; 
import { MaterialIcons } from '@expo/vector-icons';
import variables from '../config/variables';
import config from "../config/default.json";
import useSWR from 'swr'
import axios from 'axios'



const ModalPoup = ({ visible, children}) => {
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

  const ModalPoup2 = ({ visible, children}) => {
    const [showModal2, setShowModal2] = React.useState(visible);
    React.useEffect(() => {
      toggleModal2();
    }, [visible]);
    const toggleModal2 = () => {
      if (visible) {
        setShowModal2(true);
      } else {
        setShowModal2(false);
      }
    };
  
    return (
      <Modal transparent visible={showModal2}>
        <View style={styles.modalBackGround}>
          <View style={[styles.modalContainer2]}>{children}</View>
        </View>
      </Modal>
    );
  };

  

    const Tabs  = ({setData,mostrar,activo,setActivo,busqueda,setBusqueda} ) => {

        const activeItemClass = {fontSize:15, color: '#AC6363',textDecorationLine: 'underline'};
        const inactiveItemClass = {fontSize:15, color: 'gray',textDecorationLine: 'underline'};

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
        
        const [visible, setVisible] = useState(false);
        const[contiene,setContiene]=useState(true);
        //const [activeElement, setActiveElement] = useState(activo);
        const[ordenar,setOrdenar]=useState("Date");
        const[loading,setLoading]=useState(false);
        
        var servicio = "recetaPorIngrediente";

        const onPressHandler = (item) => {
            setActivo(item.name)
            //console.log(item.name);
        };

        const _MostrarOrdenar=()=>{
            if (mostrar){
                return (<ButtonConIconoNegro text="Ordenar" onPress={() => setVisible(true)}/>)
            }else{
                return null;
            }
            
        }


        const onPressSearch =(ordenar) =>{

                if (activo ==="ingrediente"){
                    if (contiene) {
                        servicio="recetaPorIngrediente";
                    }else{
                        servicio="recetaSinIngrediente";
                    }
                }

                if(activo ==="usuario"){
                    servicio="recetaPorUsuario";
                }   
                if(activo ==="plato"){
                    servicio="RecetaPorNombre";
                }
                if(activo ==="tipo"){
                    servicio="recetaPorNombreTipo";
                }
            
            const baseUrl =  config.baseUrl;
           
                setLoading(true);
                axios.get(`${baseUrl}/receta/${servicio}?nombre=${busqueda}&order=${ordenar}`)
                .then(function(res){
                    variables.setBusqueda(res.data);
                    setData(res.data);
                    setLoading(false);
                    variables.setActivo(activo);
                    variables.setTextoBusqueda(busqueda);
                    navigation.navigate('Results');
                })
               .catch(function(error){console.log(error)})

        }

         // return (<ButtonConIconoFondoBlanco text="No Contiene" onPress={() => setContiene(true)}/>)

        const Boton =() =>{

            if (activo ==="ingrediente"){
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
                                <Text  style={activo===item.name ? activeItemClass : inactiveItemClass}> {item.label} </Text>
                            </TouchableOpacity>
                        ))}
                    </View>

                    <View style={{backgroundColor:'#ffff'}}>
                            <Input style={{backgroundColor:'#ffff'}} value={busqueda} onChangeText={setBusqueda} mx="2" my="3" size="large" placeholder="Input" 
                            InputRightElement={
                                                <TouchableOpacity
                                                    onPress = { () => onPressSearch("Date") }
                                                >
                                                {<FontAwesome name="search" size={24} color="black"/>}
                                                </TouchableOpacity>
                                                } />
                    
                        <View style={{flexDirection:"row",alignItems:"center",backgroundColor:'#ffff',}}>
                            <Boton> </Boton>

                        {/* Modal de Carga para completar la busqueda*/}                      
                        <ModalPoup2  visible={loading}>
                            <View style={{height:50,width:150, justifyContent:"center"}}>
                                <NativeBaseProvider>
                                    <HStack marginHorizontal="90%">
                                        <Spinner size="lg" color="black"/>
                                        {/* <Heading ml="2" color="#D6B1B1" >
                                        Cargando
                                        </Heading> */}
                                    </HStack>
                                </NativeBaseProvider>
                            </View>
                        </ModalPoup2>
                        
                        <ModalPoup visible={visible}>
                            <View style={{flexDirection:"row", alignItems:"flex-end", justifyContent: "center"}}>
                                <View marginLeft="20%">
                                <TouchableOpacity onPress={() => {onPressSearch("Abc");setVisible(false)}}>
                                <Center>
                                <MaterialIcons name="sort-by-alpha" size={40} color="black" />
                                <Text>Nombre</Text>
                                </Center>
                                </TouchableOpacity>
                                </View>
                                <View marginLeft="20%" marginRight="20%">
                                <TouchableOpacity onPress={() => {setVisible(false);onPressSearch("User")}}>
                                <Center>
                                <FontAwesome name="user" size={40} color="black" />
                                <Text>Usuario</Text>
                                </Center>
                                </TouchableOpacity>
                                </View>
                                <View marginRight="20%">
                                <TouchableOpacity onPress={() => {onPressSearch("Date"),setVisible(false); }}>
                                <Center>
                                <MaterialIcons name="date-range" size={40} color="black"/>
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
                            {_MostrarOrdenar()}
                        </View>
                </View>    

            </NativeBaseProvider>
                                
            );
            };
        

    const styles = StyleSheet.create({
        container: {
            height:"15%",
          flexDirection:"row",
          alignItems:"center",
          backgroundColor:'#FFFFFF',
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
          modalContainer2: {
            width: "80%",
            backgroundColor: "transparent",
            paddingHorizontal: 20,
            paddingVertical: 30,
            borderRadius: 20,
            elevation: 20,
          },
      });
    
        
export default Tabs