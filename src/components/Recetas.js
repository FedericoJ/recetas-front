import * as React from 'react';
import {View,Text,Image,TouchableOpacity} from 'react-native';
import Stars from 'react-native-stars';
import { FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons'; 
import { useNavigation } from '@react-navigation/native';



/*CalificacionProm: "4.0000"
Descripcion: "Budin de naranja con semillas de amapola"
IdReceta: 1
Nombre: "Budin naranja"
alias: "mrv"
foto: "https://www.clarin.com/img/2019/07/23/bs56zWpBq_1256x620__2.jpg#1591385524188"*/

const Recetas=({tipos}) =>{

        const {Descripcion,IdReceta,Nombre,alias,foto,CalificacionProm} = tipos;
        const  navigation  = useNavigation();


        return (
            

            <TouchableOpacity style={{backgroundColor:'#ffff',marginVertical:'2%',marginRight:"8%"}} onPress = { () => navigation.navigate('Receta',{datos:tipos}) }>
                
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


export default Recetas;