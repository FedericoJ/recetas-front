import React, {useState} from 'react';
import {Animated,
  Text, 
  View,
  SafeAreaView,
FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import RecetasFavoritos from './RecetasFavSave';
import { Swipeable } from 'react-native-gesture-handler';


  const imagesrc="https://resizer.glanacion.com/resizer/DX1-dyjtqe3efPEahil_dwkYeuQ=/768x0/filters:format(webp):quality(80)/cloudfront-us-east-1.images.arcpublishing.com/lanacionar/VLWFAANIWBGPFO4CSUHS7RYVVQ.jpg";


  const tipos =[
       
    {id:"1",tipo:"Pasta",calificacion:3.5,usuario:"@mamacora",tipoImage:imagesrc},
    {id:"2",tipo:"Comida china",calificacion:3.5,usuario:"@mamacora",tipoImage:imagesrc},
    {id:"3",tipo:"Milanesas",calificacion:4.5,usuario:"@mamacora",tipoImage:imagesrc},
    {id:"4",tipo:"Hamburguesas estilo Campo",calificacion:3.5,usuario: "@mamacora",tipoImage:imagesrc},
    {id:"5",tipo:"Helados",calificacion:2,usuario:"@mamacora",tipoImage:imagesrc},
    {id:"6",tipo:"Postres",calificacion:1,usuario:"@mamacora",tipoImage:imagesrc},
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
 


const Guardada =()=>{
    const navigation = useNavigation();
    const [item, setItem] = useState(tipos);
    const deleteItem = (id) => {
      // alert ('item of ID: ${id} will be deleted')
    }

    return (
      
        <SafeAreaView style={{ marginVertical:'5%'}}>
          
        <Text  style={{textAlign:"center",fontSize:20,fontWeight:"bold",marginBottom:'2%'}}> Guardadas </Text> 
            <FlatList style= {{marginHorizontal:'5%'}} data ={tipos}
                numColumns={1}
                renderItem={({item, index}) =>(
                <Swipeable overshootRight={false} onSwipeableRightOpen={deleteItem(item.id)} renderRightActions={RenderRight}> 
                 <RecetasFavoritos navegacion={navigation} tipos ={item} index={index} setItem={setItem}/>
                 </Swipeable>)}>
             </FlatList>

        </SafeAreaView>
    )

}

export default Guardada;