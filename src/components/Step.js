import * as React from 'react';
import {View,Text,Image,TouchableOpacity,Button} from 'react-native';
import Stars from 'react-native-stars';
import { FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons'; 
import {NativeBaseProvider,TextArea,Input,Select,CheckIcon,HStack,Spinner} from "native-base";
import ImageView from 'react-native-image-view';
import axios from 'axios'
import config from "../config/default.json";
import useSWR from 'swr'
import { Video, AVPlaybackStatus } from 'expo-av'

    var images =[]

    const armarView=(imagenes,idPaso)=>{

        var auxSource=[];

        imagenes && imagenes.map((imagen,indice) => (

            imagen.idPaso ===idPaso ?
             imagen.extension !=="mp4"  ? 
                auxSource.push({source:{uri:imagen.urlContenido},width:806,height:720}) 
                : null
            :null
           
        ));    
        images = auxSource;

    }


const ViewImagesAndVideo = ({imagenesw,idPaso,indice}) => {

    const [galeriaSeleccionada, setgaleriaSeleccionada] = React.useState(false);
    const video = React.useRef(null);
    const [status, setStatus] = React.useState({});
    
    const imagenes = [{
        url: 'https://cdn.pixabay.com/photo/2017/08/17/10/47/paris-2650808_960_720.jpg',extension:"jpg"},
        {url: 'https://d320djwtwnl5uo.cloudfront.net/recetas/cover/milan_SuLEW9PUrTwyi0npoGIKD5zNqHmcAb.png',extension:"mp4"},
        {url: 'https://s3.amazonaws.com/arc-wordpress-client-uploads/infobae-wp/wp-content/uploads/2018/05/25115909/hamburguesa-destacada.jpg',extension:"jpg"}]

    const baseUrl =  config.baseUrl;

    armarView(imagenesw,idPaso);

    return(
        <View key={indice} style={{flexDirection:"row",marginLeft:'10%'}}>

            {imagenesw && imagenesw.map((imagen,indice) => (
                imagen.idPaso ===idPaso ?
                    imagen.extension !== "mp4" ?
                        <TouchableOpacity style={{marginLeft:'5%'}} key={indice} onPress ={() =>setgaleriaSeleccionada(true)}>
                    
                            <Image style={{  width:50,height:50}} source ={{uri:imagen.urlContenido}}>
                                
                            </Image>    
                    
                        </TouchableOpacity>
                      :<View style={{marginLeft:"5%"}} >
                            <Video
                            
                                    ref={video}
                                    style={{width: 150,
                                        height: 100,}}
                                    source={{
                                        uri:imagen.urlContenido,
                                        }}
                                    useNativeControls
                                    resizeMode="contain"
                                    isLooping
                                    onPlaybackStatusUpdate={status => setStatus(() => status)}
                                />
                        </View>
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

    const baseUrl =  config.baseUrl;

    var fetcher;

    fetcher = url => axios.get(`${baseUrl}/receta/getPasos?idReceta=${Receta}`).then(res => res.data)

    const pasito=useSWR(`${baseUrl}/receta/getPasos?idReceta=${Receta}`, fetcher);

    
    fetcher = url => axios.get(`${baseUrl}/ingredientes/getMultimedia?idReceta=${Receta}`).then(res => res.data)

    const imagenw=useSWR(`${baseUrl}/ingredientes/getMultimedia?idReceta=${Receta}`, fetcher);


        if (!pasito.data && !imagenw.data){
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

                                    <Text  style={{fontSize:20, fontWeight:"bold"}}> {element.nroPaso} </Text> 

                                    <NativeBaseProvider >

                                        <TextArea  style={{backgroundColor:"#ffff"}} w="90%" mr="5" ml ="2" value={element.texto} 
                                            placeholder="Disabled TextArea" isDisabled />
                                        
                                    </NativeBaseProvider>


                                </View>

                                <ViewImagesAndVideo imagenesw={imagenw.data} idPaso ={element.idPaso} indice={i}/>

                            </View>
                                
                        ))}
                    </View>    
        
                );
        }

    }


export default Steps;