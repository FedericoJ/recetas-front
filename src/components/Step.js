import * as React from 'react';
import {View,Text,Image,TouchableOpacity} from 'react-native';
import Stars from 'react-native-stars';
import { FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons'; 
import {NativeBaseProvider,TextArea,Input,Select,CheckIcon,HStack} from "native-base";
import ImageView from 'react-native-image-view';

    var images =[]

    const armarView=(imagenes)=>{

        var auxSource=[];

        imagenes && imagenes.map((imagen,indice) => (

           
             imagen.extension !=="mp4"  ? auxSource.push({source:{uri:imagen.url},width:806,height:720}) : null

           
        ));    
        images = auxSource;

    }


const ViewImagesAndVideo = ({imagenes},{indice}) => {

    const [galeriaSeleccionada, setgaleriaSeleccionada] = React.useState(false);
    
    
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


const Steps = ({ pasos }) => {

        const Imagenes = [{
            url: 'https://cdn.pixabay.com/photo/2017/08/17/10/47/paris-2650808_960_720.jpg',extension:"jpg"},
            {url: 'https://d320djwtwnl5uo.cloudfront.net/recetas/cover/milan_SuLEW9PUrTwyi0npoGIKD5zNqHmcAb.png',extension:"mp4"},
            {url: 'https://s3.amazonaws.com/arc-wordpress-client-uploads/infobae-wp/wp-content/uploads/2018/05/25115909/hamburguesa-destacada.jpg',extension:"jpg"}]

        return (
            <View>
               {pasos &&
                pasos.map((element, i) => (

                    <View key ={i}>

                        <View  style={{flexDirection:"row" ,alignItems:"flex-start", marginTop:'5%', marginBottom:'2%', marginLeft:'5%'}}>

                            <Text  style={{fontSize:20, fontWeight:"bold"}}> {element.idPaso} </Text> 

                            <NativeBaseProvider >

                                <TextArea  style={{backgroundColor:"#ffff"}} w="90%" mr="5" ml ="2" value={element.descripcion} 
                                    placeholder="Disabled TextArea" isDisabled />
                                
                            </NativeBaseProvider>


                        </View>

                        <ViewImagesAndVideo imagenes={Imagenes} indice={i}/>

                    </View>
                        
                ))}


              </View>    
            
        );

    }


export default Steps;