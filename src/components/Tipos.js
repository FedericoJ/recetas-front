import * as React from 'react';
import {View,Text,Image,TouchableOpacity} from 'react-native';
import variables from '../config/variables';
import { useNavigation } from '@react-navigation/core';
import config from "../config/default.json";
import useSWR from 'swr'
import axios from 'axios'


const buscarImagen =(nombre) =>{

    if (nombre ==="Empanadas"){
       return require('../assets/Empanadas.jpg')
    }else{
       if (nombre ==="Pastas"){
        return require('../assets/Pastas.jpg')
       } else{
           if(nombre ==="Budines"){ //pissas , libritos
            return require('../assets/Budines.jpg')
           }else{
            return require('../assets/Tortas.jpg')
           }
       }

    }

}
const Tipos =({categorias})=> {

    var imagen =buscarImagen(categorias.descripcion);
    const navigation =useNavigation();
        
    const onPressHandler=(categorias)=>{

        variables.setBusqueda(categorias.idTipo);

        variables.setServicio("recetaPorTipo");

        variables.setTextoBusqueda("");

        const baseUrl =  config.baseUrl;
           
        axios.get(`${baseUrl}/receta/recetaPorTipo?nombre=${categorias.idTipo}&order=Abc`)
        .then(function(res){
            variables.setBusqueda(res.data);
            variables.setActivo("tipo");
            navigation.navigate('Results');
        })
        .catch(function(error){console.log(error)})


    }

        return (
             
                <TouchableOpacity style={{ justifyContent:"center", backgroundColor:'#ffff',width:'40%', alignItems:"center",marginHorizontal:'5%',marginVertical:'5%' ,margin:1 }}
                onPress={()=>onPressHandler(categorias)}>
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