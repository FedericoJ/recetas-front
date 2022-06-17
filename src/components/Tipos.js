import * as React from 'react';
import {View,Text,Image,TouchableOpacity} from 'react-native';


const buscarImagen =(nombre) =>{

    if (nombre ==="Empanadas"){
       return require('../assets/Empanadas.jpg')
    }else{
       if (nombre ==="Pastas"){
        return require('../assets/Pastas.jpg')
       } else{
           if(nombre ==="Budines"){
            return require('../assets/Budines.jpg')
           }else{
            return require('../assets/Tortas.jpg')
           }
       }

    }

}
const Tipos =({categorias})=> {

    var imagen =buscarImagen(categorias.descripcion);
        

        return (
             
                <TouchableOpacity style={{ justifyContent:"center", backgroundColor:'#ffff',width:'40%', alignItems:"center",marginHorizontal:'5%',marginVertical:'5%' ,margin:1 }}>
                    <Image style={{resizeMode: 'cover',width: '100%',height: 100}} 
                    source={imagen}>
                    </Image>

                    <Text style={{textAlign:"left",fontWeight:'bold'}}>
                        {categorias.descripcion}
                    </Text>
                </TouchableOpacity>
        );  

        
    }

    export default Tipos;