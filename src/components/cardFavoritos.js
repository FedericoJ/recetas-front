import * as React from 'react';
import {Animated,
  Text, 
  View,
  SafeAreaView,
FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import RecetasFavoritos from './RecetasFavoritos';
import { Swipeable } from 'react-native-gesture-handler';


  const imagesrc="https://resizer.glanacion.com/resizer/DX1-dyjtqe3efPEahil_dwkYeuQ=/768x0/filters:format(webp):quality(80)/cloudfront-us-east-1.images.arcpublishing.com/lanacionar/VLWFAANIWBGPFO4CSUHS7RYVVQ.jpg";


  const tipos =[
       
    {tipo:"Pasta",calificacion:3.5,usuario:"@mamacora",tipoImage:imagesrc},
    {tipo:"Comida china",calificacion:3.5,usuario:"@mamacora",tipoImage:imagesrc},
    {tipo:"Milanesas",calificacion:4.5,usuario:"@mamacora",tipoImage:imagesrc},
    {tipo:"Hamburguesas estilo Campo",calificacion:3.5,usuario: "@mamacora",tipoImage:imagesrc},
    {tipo:"Helados",calificacion:2,usuario:"@mamacora",tipoImage:imagesrc},
    {tipo:"Postres",calificacion:1,usuario:"@mamacora",tipoImage:imagesrc},
];

 const RenderRight = (progress,dragX) =>{
   const scale = dragX.interpolate({
     inputRange: [-50,0.5],
     outputRange:[1,0.1]
   })

   const Style={
     transform: [
       {
         scale
       }
     ]
   }
   return(
     <View style= {{width:140, backgroundColor:"red", alignItems:"center", justifyContent:'center'}}>
       <Animated.Text style= {[Style, {backgroundColor:'red',fontWeight:'600', color:'white'}]}>Eliminar</Animated.Text>
     </View>
   )
 }

const Favorito =()=>{

    const navigation = useNavigation();



    return (
        <SafeAreaView style={{ marginVertical:'5%'}}>
          
        <Text  style={{textAlign:"center",fontSize:20,fontWeight:"bold",marginBottom:'2%'}}> Favoritos </Text>
        <Swipeable overshootRight={false} renderRightActions={RenderRight}> 
            <FlatList style= {{marginHorizontal:'5%'}} data ={tipos}
                numColumns={1}
                renderItem={({item, index}) => (<RecetasFavoritos navegacion={navigation} tipos ={item} index={index} />)}>
             </FlatList>
             </Swipeable>


        </SafeAreaView>

      


    )

}

export default Favorito;