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

    const recetasHandler=(tipos,navigation) =>{

        variables.setTipos(tipos); 
        navigation.navigate('Receta');
        
    }

    const {Descripcion,IdReceta,Nombre,alias,foto,CalificacionProm} = tipos;
    const  navigation  = useNavigation();
    const netInfo = useNetInfo();
    const [noWifi, setNoWifi] = React.useState(false);


        return (

            <TouchableOpacity style={{backgroundColor:'#ffff',marginVertical:'2%',marginRight:"8%"}} onPress = { () => recetasHandler(tipos,navigation)}>
                
                <View style={{flexDirection:"row",width:'50%' ,margin:1 }}>

                        <Image style={{resizeMode: 'cover',width: '100%',height: 100}}  source ={{uri:foto}}>
                        
                        </Image>

                        <View style={{width:'100%'}}>

                            <Text style={{textAlign:"left",fontWeight:'bold',marginLeft:'5%'}}>
                                {Nombre}
                            </Text>

                            <Text style={{color:"#FFD700",textAlign:"left",fontWeight:'bold',marginLeft:'5%',marginVertical:'5%'}}>
                                {alias}
                            </Text>

                            <View style={{marginRight:'20%',alignItems:"flex-end",flexDirection:"row-reverse",justifyContent:"flex-start"}} >

                                <TouchableOpacity>

                                    <MaterialCommunityIcons name="heart-plus-outline" size={20} color="blue" />
                            
                                </TouchableOpacity>

                                <Stars 
                                    value={CalificacionProm}
                                    spacing={4}
                                    count={5}
                                    starSize={16}
                                    fullStar= {<FontAwesome name="star" color="blue" />}
                                    emptyStar= {<FontAwesome name="star-o" color="blue" />}
                                    halfStar={<FontAwesome name="star-half" color="blue" />} />

                                 <Text style={{textAlign:"left",fontSize:12,marginRight:'1%'}}>
                                    {CalificacionProm}
                                </Text>
                            
                            </View>
                        </View>
                </View>
            </TouchableOpacity>  
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