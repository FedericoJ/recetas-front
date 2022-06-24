import React, {useState} from 'react';
import {Animated,
  Text, 
  View,
  SafeAreaView,
FlatList, 
TouchableOpacity, Modal, StyleSheet} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import RecetasFavoritos from './RecetasFavSave';
import { Swipeable,GestureHandlerRootView } from 'react-native-gesture-handler';
import config from "../config/default.json";
import useSWR from 'swr'
import axios from 'axios'
import { NativeBaseProvider,Skeleton,VStack,Center, HStack,Spinner } from 'native-base';
import variables from '../config/variables';

const ModalPoup2 = ({ visible, children}) => {
  const [showModal2, setShowModal2] = React.useState(visible);
  React.useEffect(() => {
    toggleModal2();
  }, [visible]);
  const toggleModal2 = () => {
    if (visible) {
      setShowModal2(true);
    } else {
      setShowModal2(false);
    }
  };

  return (
    <Modal transparent visible={showModal2}>
      <View style={styles.modalBackGround}>
        <View style={[styles.modalContainer2]}>{children}</View>
      </View>
    </Modal>
  );
};

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
    
     <View style= {{marginTop:"2%",marginBottom:"2%", width:140, backgroundColor:"#DC143C", borderRadius: 20,alignItems:"center", justifyContent:'center'}}>
       <Animated.Text style= {[Style, {fontWeight:'600', color:'white'}]}>Eliminar</Animated.Text>
     </View>
    
   )
 }
const Favorito =({favoritos,setFavoritos})=>{
    const navigation = useNavigation();
    const[loading,setLoading]=useState(false);   
      
      const deleteItem = (idReceta) => {
        const baseUrl =  config.baseUrl;
        const idUsuario =1454;//variables.getUsuario();
        const setup = {
          headers: {
            'content-type': 'application/json'
          }
        }
        const body = JSON.stringify({idUsuario, idReceta})
        console.log(`${baseUrl}/receta/eliminarFavorito`);
       
        try {
          setLoading(true);
          axios.post(`${baseUrl}/receta/eliminarFavorito`, body, setup)
          .then(function(res){
          console.log(res.status);
            if(res.status==200){
              setLoading(false);
              axios.get(`${baseUrl}/receta/getFavorito?idUsuario=${idUsuario}`)
              .then(function(res){
                setFavoritos(res.data);
              })
              
            }})
          } catch (error) {
            setLoading(false);
            alert(error)
          }
        }
        ;

      //   axios.post(`${baseUrl}/receta/eliminarFavorito`, body, setup)
      //   .then(function(res){
      //     console.log(res.status);
      //     if(res.status==200){
      //       axios.get(`${baseUrl}/receta/getFavorito?idUsuario=${idUsuario}`)
      //       .then(function(res){
      //           setFavoritos(res.data);
      //       })
      //       .catch(function(error){console.log(error)})
      //     }
      //   })
      //   .catch(function(error){console.log(error)})
      // }

      return (<SafeAreaView style={{ marginVertical:'5%'}}>
      <Text  style={{textAlign:"center",fontSize:20,fontWeight:"bold",marginBottom:'2%'}}> Favoritos </Text> 
                    {/* Modal de Carga para completar la busqueda*/}                      
                    <ModalPoup2  visible={loading}>
                <View style={{height:50,width:150, justifyContent:"center"}}>
                 <NativeBaseProvider>
                    <HStack marginHorizontal="90%">
                     <Spinner size="lg" color="black"/>
                    </HStack>
                 </NativeBaseProvider>
                </View>
            </ModalPoup2>
      <FlatList style= {{marginHorizontal:'5%'}} data ={favoritos}
            numColumns={1}
            renderItem={({item, index}) =>(
              <GestureHandlerRootView>
                <Swipeable overshootRight={false} onSwipeableRightOpen={()=>deleteItem(item.IdReceta)} renderRightActions={RenderRight}> 
                  <RecetasFavoritos navegacion={navigation} tipos ={item}/>
                  </Swipeable>
              </GestureHandlerRootView>)}>
      </FlatList>
    </SafeAreaView>
    )
               

    }
    
    const styles = StyleSheet.create({
      modalBackGround: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center',
      },

      modalContainer2: {
        width: "80%",
        backgroundColor: "transparent",
        paddingHorizontal: 20,
        paddingVertical: 30,
        borderRadius: 20,
        elevation: 20,
      },
    });
  

export default Favorito;