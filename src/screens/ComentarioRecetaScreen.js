import React from 'react';
import { ScrollView,StyleSheet,Image,View,Text,TouchableOpacity,TextInput} from 'react-native';
import { FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons'; 
import Stars from 'react-native-stars';
import {NativeBaseProvider,TextArea,Input} from "native-base";
import Comentarios from "../components/Comentarios";



const tipoImage='https://d320djwtwnl5uo.cloudfront.net/recetas/cover/milan_SuLEW9PUrTwyi0npoGIKD5zNqHmcAb.png';


const arrcomentarios =[
    {usuario:"Pan rallado",calificacion: 1, comentario:"hola bebe"},
    {usuario: "Cuadrada", calificacion: 2, comentario:"hola bebe2"},
    {usuario: "Huevos", calificacion:4, comentario:"hola bebe3"}

]

const ComentarioRecetaScreen  = ({navigation}) => {

return (
    <ScrollView style={styles.container}>

        <Text style={{ marginTop:'5%',marginHorizontal:'5%',fontSize:20,fontWeight:"bold"}}> Comentarios </Text>

        <View style={{flexDirection:"row" , alignItems:"center", marginTop:'2%', marginBottom:'2%', marginHorizontal:'5%'}}>
        {/* NO SE QUE HACE PERO LE DA UN ESPACIO */}

        </View>


        <Comentarios comentarios ={arrcomentarios} />


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