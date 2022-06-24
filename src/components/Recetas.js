import React, { useState, useEffect } from 'react'
import {View,Text,Image,TouchableOpacity, Modal,StyleSheet} from 'react-native';
import Stars from 'react-native-stars';
import { FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons'; 
import { useNavigation } from '@react-navigation/native';
import variables from '../config/variables';
import { ButtonFondoBlanco, ButtonFondoRosa, ButtonModal, ButtonModalUnico } from '../components/ButtonsLogin';
import {useNetInfo} from "@react-native-community/netinfo";

const ModalPoup = ({ visible, children }) => {
    const [showModal, setShowModal] = React.useState(visible);
    React.useEffect(() => {
      toggleModal();
    }, [visible])
    const toggleModal = () => {
      if (visible) {
        setShowModal(true);
      }
      else { setShowModal(false) };
    }
  
    return <Modal transparent visible={showModal}>
      <View style={styles.modalBackGround}>
        <View style={[styles.modalContainer]}>
          {children}
        </View>
      </View>
    </Modal>;
  
  };





const Recetas=({tipos}) =>{

        const {Descripcion,IdReceta,Nombre,alias,foto,CalificacionProm} = tipos;
        const  navigation  = useNavigation();
        const netInfo = useNetInfo();
        const [noWifi, setNoWifi] = React.useState(false);
        const recetasHandler=(tipos,navigation) =>{

            variables.setTipos(tipos); 
            navigation.navigate('Receta');
            
        }
    
        const wifi = () => {
          if(netInfo.type === "wifi"){
            recetasHandler(tipos,navigation)
          }
          else {
            setNoWifi(true)
          }
        };

        return (<View>

            <ModalPoup visible={noWifi}>
                <View style={{ alignItems: 'flex-start' }}>
                <Text style={{ fontSize: 20, color: "black" }}>No se encuentra conectado a una red Wifi. ¿Desea continuar usando sus datos? </Text>
                <View style={{ flexDirection: "row", alignItems: "center", marginTop: '2%', marginBottom: '2%', marginHorizontal: '5%' }}>
                </View>
                </View>
                <View style={{ flexDirection: "row", alignItems: "center", marginTop: '1%', marginBottom: '1%', marginHorizontal: '1%' }}>
                <ButtonModal text="Cancelar" onPress={() => { navigation.navigate('Principal'); setNoWifi(false); }} />
                <ButtonModal text="Aceptar" onPress={() => { recetasHandler(tipos,navigation);setNoWifi(false) }} />
                </View>
            </ModalPoup>

            <TouchableOpacity style={{backgroundColor:'#ffff',marginVertical:'2%',marginRight:"8%", borderRadius: 20,height: 150}} onPress = { () => setNoWifi(wifi)}>
                
                <View style={{flexDirection:"row",width:'50%' ,margin:1}}>

                        <Image style={{resizeMode: 'cover',width: '100%',height: 147,borderRadius: 20}}  source ={{uri:foto}}>
                        
                        </Image>

                        <View style={{width:'95%'}}>

                            <Text style={{textAlign:"left",fontWeight:'bold',marginLeft:'5%', fontSize:20}}>
                                {Nombre}
                            </Text>

                            <Text style={{color:"#b39024",textAlign:"left",fontWeight:'bold',marginLeft:'5%',marginVertical:'3%',fontSize:15}}>
                                {"@"}{alias}
                            </Text>

                            <View style={{marginTop:"15%",marginRight:'20%',alignItems:"flex-end",flexDirection:"row-reverse",justifyContent:"flex-start"}} >

 
                                <Stars
                                    value={CalificacionProm}
                                    spacing={4}
                                    count={5}
                                    starSize={15}
                                    fullStar= {<FontAwesome size={15} name="star" color="gold" />}
                                    emptyStar= {<FontAwesome size={15}  name="star-o" color="gold" />}
                                    halfStar={<FontAwesome size={15}  name="star-half" color="gold" />} />

                                 <Text style={{textAlign:"left",fontSize:15,marginRight:'2%'}}>
                                    {CalificacionProm}
                                </Text>
                            
                            </View>
                        </View>
                </View>
            </TouchableOpacity>  
            </View>
        )
    }

const styles = StyleSheet.create({
    modalBackGround: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center',
      },
      modalContainer: {
        width: '80%',
        backgroundColor: '#F7F4F4',
        paddingHorizontal: 20,
        paddingVertical: 30,
        borderRadius: 20,
        elevation: 20,
      },
    });

export default Recetas;