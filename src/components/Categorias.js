import * as React from 'react';
import {
  Text, 
  View,
  SafeAreaView,
FlatList } from 'react-native';

import Tipos from './Tipos';

  const imagesrc="https://resizer.glanacion.com/resizer/DX1-dyjtqe3efPEahil_dwkYeuQ=/768x0/filters:format(webp):quality(80)/cloudfront-us-east-1.images.arcpublishing.com/lanacionar/VLWFAANIWBGPFO4CSUHS7RYVVQ.jpg";


 const tipos =[

     {tipo:"Pasta",tipoImage:imagesrc},
     {tipo:"Comida china",tipoImage:imagesrc},
     {tipo:"Milanesas",tipoImage:imagesrc},
     {tipo:"Hamburguesas",tipoImage:imagesrc},
     {tipo:"Helados",tipoImage:imagesrc},
     {tipo:"Postres",tipoImage:imagesrc},
];


const Categorias =()=>{

    return (
        <SafeAreaView style={{ marginVertical:'5%'}}>
        <Text  style={{textAlign:"center", marginVertical:'1%' , fontSize:20,fontWeight:"bold"}}> Categorias </Text>
            <FlatList style={{marginHorizontal:'1%'}} data ={tipos}
            numColumns={2}
            renderItem={({item}) =>    (<Tipos tipos ={item}/>)}>
                
             </FlatList>

        </SafeAreaView>
      


    )

}

export default Categorias;