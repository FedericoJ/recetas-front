import React, { useState, useEffect } from 'react'
import {View,Text,Image,TouchableOpacity, Modal,StyleSheet} from 'react-native';
import Stars from 'react-native-stars';
import { FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons'; 
import { useNavigation } from '@react-navigation/native';
import variables from '../config/variables';
import { ButtonFondoBlanco, ButtonFondoRosa, ButtonModal, ButtonModalUnico } from '../components/ButtonsLogin';


const Recetas=({tipos}) =>{

        const {Descripcion,IdReceta,Nombre,alias,foto,CalificacionProm} = tipos;
        const  navigation  = useNavigation();
        const recetasHandler=(tipos,navigation) =>{

            variables.setTipos(tipos); 
            navigation.navigate('Receta');
            
        }
       
        return (<View>

            <TouchableOpacity style={{backgroundColor:'#ffff',marginVertical:'2%',marginRight:"8%", borderRadius: 20,height: 150}} onPress = { () => recetasHandler(tipos,navigation)}>
                
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
{/* 
                                <TouchableOpacity>

                                    <MaterialCommunityIcons name="heart-plus-outline" size={30} color="red" />
                            
                                </TouchableOpacity> */}
 
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