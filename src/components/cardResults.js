import * as React from 'react';
import {
  Text, 
  View,
  SafeAreaView,
FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import Recetas from './Recetas';

  const imagesrc="https://resizer.glanacion.com/resizer/DX1-dyjtqe3efPEahil_dwkYeuQ=/768x0/filters:format(webp):quality(80)/cloudfront-us-east-1.images.arcpublishing.com/lanacionar/VLWFAANIWBGPFO4CSUHS7RYVVQ.jpg";


  const tipos =[
       
    {Nombre:"Pasta",IdReceta: 1,alias:"@mamacora",foto:imagesrc,CalificacionProm:3.5,},
    {Nombre:"Pasta",IdReceta: 1,alias:"@mamacora",foto:imagesrc,CalificacionProm:3.5,},
   
];

const Categorias =({result})=>{

    const navigation = useNavigation();


    return (
        <SafeAreaView style={{height:"70%"}}>
        <Text  style={{textAlign:"center",fontSize:20,fontWeight:"bold",marginBottom:'2%'}}> Resultados </Text>
            <FlatList style= {{marginHorizontal:'2%'}} data ={result}
                numColumns={1}
                renderItem={({item}) => (<Recetas navegacion={navigation} tipos ={item}/>)}>
                
             </FlatList>

        </SafeAreaView>
      


    )

}

export default Categorias;