import React from 'react';
import { ScrollView,StyleSheet,Image,View,Text,TouchableOpacity,TextInput} from 'react-native';
import { FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons'; 
import Stars from 'react-native-stars';
import {NativeBaseProvider,TextArea,Input} from "native-base";
import Comentarios from "../components/Comentarios";



const tipoImage='https://d320djwtwnl5uo.cloudfront.net/recetas/cover/milan_SuLEW9PUrTwyi0npoGIKD5zNqHmcAb.png';


const arringredientes =[
    {usuario:"Pan rallado",calificacion: 1, comentario:"hola bebe"},
    {usuario: "Cuadrada", calificacion: 2, comentario:"hola bebe2"},
    {usuario: "Huevos", calificacion:4, comentario:"hola bebe3"}

]

const ComentarioRecetaScreen  = ({navigation}) => {

return (
    <ScrollView style={styles.container}>
    
        <View style={{flexDirection:"row" , alignItems:"center", marginTop:'5%', marginBottom:'2%', marginHorizontal:'5%'}}>

            <Text style={{fontSize:20, width:'90%',fontWeight:"bold"}}> Comentarios </Text>

        </View>

         <View style={{flexDirection:"row" , alignItems:"center", marginTop:'2%', marginBottom:'2%', marginHorizontal:'5%'}}>


            <FontAwesome name="user" size={30} color="black" />

            <Text style={{fontSize:20, color:"black"}}> @mamacora </Text>

            <TouchableOpacity style={{width:'10%',alignItems:'flex-start'}}>
                <Stars 
                    display={4.1}
                    spacing={4}
                    count={5}
                    starSize={30}
                    fullStar= {<FontAwesome size={30} name="star" color="blue" />}
                    emptyStar= {<FontAwesome size={30} name="star-o" color="blue" />}
                    halfStar={<FontAwesome size={30} name="star-half" color="blue" />} />

            </TouchableOpacity>

        </View>

        <View style={{flexDirection:"row" , alignItems:"center", marginTop:'2%', marginBottom:'2%', marginHorizontal:'5%'}}>
        {/* NO SE QUE HACE PERO LE DA UN ESPACIO */}

        </View>

        <NativeBaseProvider>

             <TextArea style={{backgroundColor:"#ffff"}} w ="90%" mx ="5" value={"Tengo una vaca lechera no es una vaca cualquiera, me da leche descremada"} 
             placeholder="Disabled TextArea" />
        
        </NativeBaseProvider>

        <Text style={{ marginTop:'10%',marginHorizontal:'5%',fontSize:20,fontWeight:"bold"}}> Comentarios </Text>


        <Comentarios comentarios ={arringredientes} />


     </ScrollView>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor:'#D6B1B1'
    },


  });

export default ComentarioRecetaScreen;