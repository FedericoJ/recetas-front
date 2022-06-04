import * as React from 'react';
import {View,Text,Image,TouchableOpacity} from 'react-native';
import Stars from 'react-native-stars';
import { FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons'; 
import {NativeBaseProvider,TextArea,Input,Select,CheckIcon,HStack} from "native-base";
import RNPickerSelect from 'react-native-picker-select';




const images =[

    {
        source: {
            uri: 'https://cdn.pixabay.com/photo/2017/08/17/10/47/paris-2650808_960_720.jpg',
        },
        title: 'Prueba',
        width: 806,
        height: 720,
    },

]




const Steps = ({ pasos }) => {

        return (
            <View>
               {pasos &&
                pasos.map((element, i) => (

                    <View>

                        <View style={{flexDirection:"row" ,alignItems:"flex-start", marginTop:'5%', marginBottom:'2%', marginLeft:'5%'}}>

                            <Text style={{fontSize:20, fontWeight:"bold"}}> {element.idPaso} </Text> 

                            <NativeBaseProvider>

                                <TextArea style={{backgroundColor:"#ffff"}} w="90%" mr="5" ml ="2" value={element.descripcion} 
                                    placeholder="Disabled TextArea" isDisabled />
                                
                            </NativeBaseProvider>



                        </View>

                    </View>
                        
                ))}


              </View>    
            
        );

    }


export default Steps;