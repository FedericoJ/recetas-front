import * as React from 'react';
import {View,Text,Image,TouchableOpacity} from 'react-native';

const Tipos =({categorias})=> {

        return (
             
                <TouchableOpacity style={{ justifyContent:"center", backgroundColor:'#ffff',width:'40%', alignItems:"center",marginHorizontal:'5%',marginVertical:'5%' ,margin:1 }}>


                    <Image style={{resizeMode: 'cover',width: '100%',height: 100}}  source ={ require(`../assets/${categorias.descripcion}.jpg`) }>
                    
                    </Image>

                    <Text style={{textAlign:"left",fontWeight:'bold'}}>
                        {categorias.descripcion}
                    </Text>

                     </TouchableOpacity>
        );  

        
    }

    export default Tipos;