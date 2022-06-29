import React, {useState} from 'react';
import { ScrollView,StyleSheet, View,SafeAreaView,FlatList,Button, Modal} from 'react-native';
import { NativeBaseProvider,Skeleton,VStack,Center, HStack, Spinner } from 'native-base';
import Tabs from '../components/Tabs';
import Galeria from '../components/cardResults';
import Categorias from '../components/Categorias'
import { FloatingAction } from "react-native-floating-action";
import { FAB } from 'react-native-paper';
import Favorito from '../components/cardFavoritos';
import config from "../config/default.json";
import useSWR from 'swr'
import axios from 'axios'
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

const Favoritos  = ({navigation}) => {
  const baseUrl =  config.baseUrl;
  const [favoritos,setFavoritos]=React.useState(null);
  var fav;
  const[loading,setLoading]=useState(false);
  
  React.useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
    const idUsuario =variables.getUsuario();
    try {
      setLoading(true);
      axios.get(`${baseUrl}/receta/getFavorito?idUsuario=${idUsuario}`)
      .then(function(res){
        console.log("pase");
          setLoading(false);
          setFavoritos(res.data);
      })
          
      } catch (error) {
        setLoading(false);
        alert(error)
      }
    });
    return unsubscribe;
  }, [navigation])


    return (
      <View style={styles.container}>
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
  
          <Favorito favoritos={favoritos} setFavoritos={setFavoritos}/>
        
       </View>
    );


};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor:'#D6B1B1'
    },

    fab: {
      position: 'absolute',
      margin: 16,
      right: 0,
      bottom: 0,
      backgroundColor:"#FFD700"
      
    },
    modalContainer2: {
      width: "80%",
      backgroundColor: "transparent",
      paddingHorizontal: 20,
      paddingVertical: 30,
      borderRadius: 20,
      elevation: 20,
    },
    modalBackGround: {
      flex: 1,
      backgroundColor: 'rgba(0,0,0,0.5)',
      justifyContent: 'center',
      alignItems: 'center',
    },
  });

export default Favoritos;

const deleteItem = (id) => {
  // alert ('item of ID: ${id} will be deleted')
  //return cargarDatos();
}
 