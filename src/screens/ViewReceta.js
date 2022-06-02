import React from 'react';
import { ScrollView,StyleSheet,Image,View,Text,TouchableOpacity,TextInput} from 'react-native';
import { FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons'; 
import Stars from 'react-native-stars';
import {NativeBaseProvider,TextArea,Input} from "native-base";
import Ingredients from "../components/Ingredients";



const tipoImage='https://d320djwtwnl5uo.cloudfront.net/recetas/cover/milan_SuLEW9PUrTwyi0npoGIKD5zNqHmcAb.png';

//select I.nombre, U.cantidad, UNI.descripcion, UNI.IdUnidad, R.idReceta

const arringredientes =[
    {nombre:"Pan rallado",cantidad: 100},
    {nombre: "Cuadrada", cantidad: 500},
    {nombre: "Huevos", cantidad:4}

]

const ViewReceta  = ({navigation}) => {

return (
    <ScrollView style={styles.container}>
    
        <Image style={{width: '100%',height: 200}}  source ={{uri:tipoImage}}>
                            
        </Image>

        <View style={{flexDirection:"row" , alignItems:"center", marginTop:'5%', marginBottom:'2%', marginHorizontal:'5%'}}>

            <Text style={{fontSize:20, width:'90%',fontWeight:"bold"}}> Milanga </Text>


            <Text style={{fontSize:20}}> 4.1 </Text>

            <FontAwesome name="star" color="#FFD700" />


        </View>

         <View style={{flexDirection:"row" , alignItems:"center", marginTop:'2%', marginBottom:'2%', marginHorizontal:'5%'}}>


            <FontAwesome name="user" size={30} color="gray" />

            <Text style={{fontSize:12, color:"gray"}}> @mamacora </Text>

        </View>

        <View style={{flexDirection:"row" , alignItems:"center", marginTop:'2%', marginBottom:'2%', marginHorizontal:'5%'}}>

            <TouchableOpacity style={{width:'90%',alignItems:'flex-start'}}>
                <Stars 
                    display={4.1}
                    spacing={4}
                    count={5}
                    starSize={30}
                    fullStar= {<FontAwesome size={30} name="star" color="blue" />}
                    emptyStar= {<FontAwesome size={30} name="star-o" color="blue" />}
                    halfStar={<FontAwesome size={30} name="star-half" color="blue" />} />

            </TouchableOpacity>

            <TouchableOpacity>

                <MaterialCommunityIcons name="heart-plus" size={30} color="gray" />

            </TouchableOpacity>

        </View>

        <NativeBaseProvider>

             <TextArea style={{backgroundColor:"#ffff"}} w ="90%" mx ="5" value={"Tengo una vaca lechera no es una vaca cualquiera, me da leche descremada"} 
             placeholder="Disabled TextArea" isDisabled />
        

            <View style={{flexDirection:"row" , alignItems:"center", marginTop:'2%', marginHorizontal:'5%'}}>
       
                <Text style={{fontSize:16, width:'90%'}}> Categoria </Text>

                 <Input style={{backgroundColor:'#ffff',textAlign:"center"}} mx="1" value={"Americana"} placeholder="Americana" />

            </View>


             <View style={{flexDirection:"row" , alignItems:"center", marginTop:'5%', marginHorizontal:'5%'}}>
       
                <Text style={{fontSize:16, width:'90%'}}> Porciones </Text>

                <Input style={{backgroundColor:'#ffff',textAlign:"center"}} value={2} mx="1" w="15%" placeholder="2" />

            </View>

            <View style={{flexDirection:"row" , alignItems:"center", marginTop:'5%', marginBottom:'2%', marginHorizontal:'5%'}}>
       
                <Text style={{fontSize:16, width:'90%'}}> Personas </Text>

                <Input style={{backgroundColor:'#ffff',textAlign:"center"}} value={1} mx="1" w="15%" placeholder="2" />

            </View>


        </NativeBaseProvider>

        <Text style={{ marginTop:'10%',marginHorizontal:'5%',fontSize:20,fontWeight:"bold"}}> Ingredientes </Text>


        <Ingredients ingredientes ={arringredientes} />


     </ScrollView>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor:'#D6B1B1'
    },


  });

export default ViewReceta;