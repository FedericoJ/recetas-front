import React, {useState} from 'react';
import {Animated,
  Text, 
  View,
  SafeAreaView,
FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import RecetasCargadas from './RecetasCargadas';


  const imagesrc="https://resizer.glanacion.com/resizer/DX1-dyjtqe3efPEahil_dwkYeuQ=/768x0/filters:format(webp):quality(80)/cloudfront-us-east-1.images.arcpublishing.com/lanacionar/VLWFAANIWBGPFO4CSUHS7RYVVQ.jpg";


  const tipos =[
       
    {tipo:"Pasta",calificacion:3.5,usuario:"@mamacora",tipoImage:imagesrc,autorizada:'true'},
    {tipo:"Comida china",calificacion:3.5,usuario:"@mamacora",tipoImage:imagesrc,autorizada:'false'},
    {tipo:"Milanesas",calificacion:4.5,usuario:"@mamacora",tipoImage:imagesrc,autorizada:'true'},
    {tipo:"Hamburguesas estilo Campo",calificacion:3.5,usuario: "@mamacora",tipoImage:imagesrc,autorizada:'false'},
    {tipo:"Helados",calificacion:2,usuario:"@mamacora",tipoImage:imagesrc,autorizada:'true'},
    {tipo:"Postres",calificacion:1,usuario:"@mamacora",tipoImage:imagesrc,autorizada:'true'},
]; 


const MiReceta =()=>{
    const navigation = useNavigation();


    return (
      
        <SafeAreaView style={{ marginVertical:'5%'}}>
          
        <Text  style={{textAlign:"center",fontSize:20,fontWeight:"bold",marginBottom:'2%'}}> Mis Recetas </Text> 
            <FlatList style= {{marginHorizontal:'5%'}} data ={tipos}
                numColumns={1}
                renderItem={({item}) =>(
                 <RecetasCargadas navegacion={navigation} tipos ={item}/>)}>
             </FlatList>

        </SafeAreaView>
    )

}

export default MiReceta;