import * as React from 'react';
import {View,Text,Image,TouchableOpacity} from 'react-native';
import Stars from 'react-native-stars';
import { FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons'; 
import { useNavigation } from '@react-navigation/native';
import { mdiCheckDecagram } from '@mdi/js';
import { mdiMinusCircle } from '@mdi/js';
import Icon from '@mdi/react';





class Recetas extends React.Component{


   render(
        
    ){
        const  navigation  = this.props.navegacion;
        const {tipo,usuario,calificacion,tipoImage,autorizada} = this.props.tipos;

        return (
            
        

            <TouchableOpacity style={{backgroundColor:'#ffff',marginVertical:'2%'}} onPress = { () => navigation.navigate('Receta') }>
                
                <View style={{flexDirection:"row",width:'50%' ,margin:1 }}>

                        <Image style={{resizeMode: 'cover',width: '100%',height: 100}}  source ={{uri:tipoImage}}>
                        
                        </Image>

                        <View style={{width:'100%',alignItems:'left'}}>

                            <Text style={{textAlign:"left",fontWeight:'bold',marginLeft:'5%'}}>
                                {tipo}
                            </Text>

                            <Text style={{color:"#FFD700",textAlign:"left",fontWeight:'bold',marginLeft:'5%',marginVertical:'5%'}}>
                                {usuario}
                            </Text>

                            <View style={{marginRight:'10%',alignItems:"flex-end",flexDirection:"row-reverse",justifyContent:"flex-start"}} >
                           <section>
                            {(() =>{
                                switch (autorizada){
                                    case "true": return <Icon path={mdiCheckDecagram}
                                    title="User Profile"
                                    size={1}
                                    color="green"/>;
                                    case "false": return <Icon path={mdiMinusCircle}
                                    title="User Profile"
                                    size={1}
                                    color="red"/>;
                                }
                            })()}
                            </section>
                            
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