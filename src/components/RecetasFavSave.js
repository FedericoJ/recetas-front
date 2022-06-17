import * as React from 'react';
import {View,Text,Image,TouchableOpacity} from 'react-native';
import Stars from 'react-native-stars';
import { FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons'; 
import { useNavigation } from '@react-navigation/native';



class Recetas extends React.Component{

    render(
        
    ){
        const {id,tipo,usuario,calificacion,tipoImage} = this.props.tipos;
        const  navigation  = this.props.navegacion;
        return (
            

            <TouchableOpacity style={{backgroundColor:'#ffff',marginVertical:'2%'}} onPress = { () => navigation.navigate('Receta') }>
                
                <View style={{flexDirection:"row",width:'50%' ,margin:1 }}>

                        <Image style={{resizeMode: 'cover',width: '100%',height: 100}}  source ={{uri:tipoImage}}>
                        
                        </Image>

                        <View style={{width:'100%'}}>

                            <Text style={{textAlign:"left",fontWeight:'bold',marginLeft:'5%'}}>
                                {tipo}
                            </Text>

                            <Text style={{color:"#FFD700",textAlign:"left",fontWeight:'bold',marginLeft:'5%',marginVertical:'5%'}}>
                                {usuario}
                            </Text>

                            <View style={{marginRight:'10%',alignItems:"flex-end",flexDirection:"row-reverse",justifyContent:"flex-start"}} >

                                {/* <TouchableOpacity>

                                    <MaterialCommunityIcons name="heart-plus-outline" size={20} color="blue" />
                            
                                </TouchableOpacity> */}

                                <Stars 
                                    display={calificacion}
                                    spacing={4}
                                    count={5}
                                    starSize={16}
                                    fullStar= {<FontAwesome name="star" color="blue" />}
                                    emptyStar= {<FontAwesome name="star-o" color="blue" />}
                                    halfStar={<FontAwesome name="star-half" color="blue" />} />

                                 <Text style={{textAlign:"left",fontSize:12,marginRight:'1%'}}>
                                    {calificacion}
                                </Text>
                            
                            </View>

                           


                        </View>


                </View>

            </TouchableOpacity>    

        )
    }

}

export default Recetas;