import * as React from 'react';
import {View,Text,Image,TouchableOpacity} from 'react-native';
import Stars from 'react-native-stars';
import { FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons'; 
import {NativeBaseProvider,TextArea,Input} from "native-base";
import RNPickerSelect from 'react-native-picker-select';




class Comentarios extends React.Component{

    constructor(props){

        super(props);

    }

    render(
        
    ){

        var comentariosList=[];


        this.props.comentarios.forEach(element => {

            comentariosList.push(

                <View>   
                
                    <View style={{alignItems:"center", flexDirection:"row" ,marginTop:'2%', marginBottom:'2%', marginHorizontal:'5%'}}>
                    
                        <FontAwesome name="user" size={30} color="black" />
                        

                        <Text style={{fontSize:20, color:"black"}}> {element.usuario} </Text>
                        
                        <NativeBaseProvider>

                        <TouchableOpacity style={{width:'10%',alignItems:'flex-start'}}>
                            <Stars 
                                display={element.calificacion}
                                spacing={4}
                                count={5}
                                starSize={30}
                                fullStar= {<FontAwesome size={30} name="star" color="blue" />}
                                emptyStar= {<FontAwesome size={30} name="star-o" color="blue" />}
                                halfStar={<FontAwesome size={30} name="star-half" color="blue" />} />

                        </TouchableOpacity>
                    
                        </NativeBaseProvider>
                       
                    </View>

                    <View style={{flexDirection:"row" , alignItems:"center", marginTop:'2%', marginBottom:'2%', marginHorizontal:'5%'}}>
                    {/* asigno espacio */}

                     </View>

                     <NativeBaseProvider>
                    
                    <TextArea style={{backgroundColor:"#ffff"}} w ="90%" mx ="5" value= {element.comentario} placeholder="Disabled TextArea" />

                    </NativeBaseProvider>

                    <View style={{flexDirection:"row" , alignItems:"center", marginTop:'2%', marginBottom:'2%', marginHorizontal:'5%'}}>
                    {/* asigno espacio */}

                    </View>

                </View>

            )
            
        });
    
        return (

            
            <View>

                {comentariosList}

            </View>
        )
    }

}

export default Comentarios;