import * as React from 'react';
import {View,Text,Image,TouchableOpacity} from 'react-native';
import Stars from 'react-native-stars';
import { FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons'; 
import {NativeBaseProvider,TextArea,Input,Select,CheckIcon,HStack,Spinner} from "native-base";
import ImageView from 'react-native-image-view';
import axios from 'axios'
import config from "../config/default.json";
import useSWR from 'swr'

    var images =[]

    const armarView=(imagenes)=>{

        var auxSource=[];

        imagenes && imagenes.map((imagen,indice) => (

           
             imagen.extension !=="mp4"  ? auxSource.push({source:{uri:imagen.url},width:806,height:720}) : null

           
        ));    
        images = auxSource;

    }


const ViewImagesAndVideo = ({idPaso},{indice}) => {

    const [galeriaSeleccionada, setgaleriaSeleccionada] = React.useState(false);
    
    const imagenes = [{
        url: 'https://cdn.pixabay.com/photo/2017/08/17/10/47/paris-2650808_960_720.jpg',extension:"jpg"},
        {url: 'https://d320djwtwnl5uo.cloudfront.net/recetas/cover/milan_SuLEW9PUrTwyi0npoGIKD5zNqHmcAb.png',extension:"mp4"},
        {url: 'https://s3.amazonaws.com/arc-wordpress-client-uploads/infobae-wp/wp-content/uploads/2018/05/25115909/hamburguesa-destacada.jpg',extension:"jpg"}]


    
    armarView(imagenes);
  
    return(
        <View key={indice} style={{flexDirection:"row",marginLeft:'10%'}}>

            {imagenes && imagenes.map((imagen,indice) => (

                imagen.extension !== "mp4" ?
                    <TouchableOpacity style={{marginLeft:'5%'}} key={indice} onPress ={() =>setgaleriaSeleccionada(true)}>
                
                        <Image style={{  width:50,height:50}} source ={{uri:imagen.url}}>
                            
                        </Image>    
                
                    </TouchableOpacity>
                :null

            ))}

             <ImageView
                    glideAlways
                    images={images}
                    imageIndex={0}
                    animationType="fade"
                    isVisible={galeriaSeleccionada}
                    onClose={() => setgaleriaSeleccionada(false)}
                    
                />

        </View>

      )
  }


const Steps = ({Receta}) => {


    const pasos = [
        { idPaso: 1, descripcion: "Aca cortamos la cebolla en juliana" },
        {
          idPaso: 2,
          descripcion: "Abrimos la  pechuga al medio como le gusta a godios",
        },
        { idPaso: 3, descripcion: "Agregamos sal a piacere" },
      ];

    const baseUrl =  config.baseUrl;

    const fetcher = url => axios.get(`${baseUrl}/receta/getPasos?idReceta=${Receta}`).then(res => res.data)

    const pasito=useSWR(`${baseUrl}/receta/getPasos?idReceta=${Receta}`, fetcher);

    if(pasito.data) console.log(pasito.data);


        if (!pasito.data){
            return( <NativeBaseProvider>
                    <HStack space={8} justifyContent="center">
                      <Spinner color="warning.500" />
                    </HStack>
                    </NativeBaseProvider>)
          }else{    

                return (
                    <View>
                        {pasito.data &&
                        pasito.data.map((element, i) => (

                            <View key ={i}>

                                <View  style={{flexDirection:"row" ,alignItems:"flex-start", marginTop:'5%', marginBottom:'2%', marginLeft:'5%'}}>

                                    <Text  style={{fontSize:20, fontWeight:"bold"}}> {element.idPaso} </Text> 

                                    <NativeBaseProvider >

                                        <TextArea  style={{backgroundColor:"#ffff"}} w="90%" mr="5" ml ="2" value={element.texto} 
                                            placeholder="Disabled TextArea" isDisabled />
                                        
                                    </NativeBaseProvider>


                                </View>

                                <ViewImagesAndVideo imagenes={element.idPaso} indice={i}/>

                            </View>
                                
                        ))}
                    </View>    
        
                );
        }

    }


export default Steps;