import React from 'react';
import { ScrollView,StyleSheet, View,SafeAreaView,FlatList,Button} from 'react-native';
import { NativeBaseProvider,Skeleton,VStack,Center } from 'native-base';
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


const Favoritos  = ({navigation}) => {
  const baseUrl =  config.baseUrl;
  const [favoritos,setFavoritos]=React.useState(null);
  var fav;
  
  React.useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      const idUsuario =variables.getUsuario();
      axios.get(`${baseUrl}/receta/getFavorito?idUsuario=${idUsuario}`)
      .then(function(res){
        console.log("pase");
          setFavoritos(res.data);
      })

    });
    // Return the function to unsubscribe from the event so it gets removed on unmount
    return unsubscribe;
  }, [navigation])


    return (
      <View style={styles.container}>
  
          <Favorito favoritos={favoritos} setFavoritos={setFavoritos}/>
        
           <FAB style={styles.fab}
            extended
            icon="pencil"
            label ="Nueva"
            uppercase={false}
            onPress={() => console.log('Pressed')}
            />
  
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
  });

export default Favoritos;

const deleteItem = (id) => {
  // alert ('item of ID: ${id} will be deleted')
  //return cargarDatos();
}
 