import React, { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Image,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Modal, Box,
} from "react-native";
import { FontAwesome, MaterialCommunityIcons, AntDesign } from "@expo/vector-icons";
import Stars from "react-native-stars";
import { NativeBaseProvider, TextArea, Input, Divider, Spinner, HStack, InputGroup } from "native-base";
import Ingredients from "../components/Ingredients";
import { ButtonModal, ButtonModalUnico } from "../components/ButtonsLogin";
import { Rating, AirbnbRating } from 'react-native-ratings';
import Steps from "../components/Step";
import { ButtonFondoRosa, ButtonFondoBlanco } from '../components/ButtonsLogin';
import { useRoute } from '@react-navigation/native';
import config from "../config/default.json";
import useSWR from 'swr'
import axios from 'axios'
import variables from '../config/variables';
import { calculateInitialScale } from "react-native-image-view/src/utils";
import AsyncStorage from '@react-native-async-storage/async-storage';


const ModalPoup = ({ visible, children }) => {
  const [showModal, setShowModal] = React.useState(visible);
  React.useEffect(() => {
    toggleModal();
  }, [visible]);
  const toggleModal = () => {
    if (visible) {
      setShowModal(true);
    } else {
      setShowModal(false);
    }
  };

  return (
    <Modal transparent visible={showModal}>
      <View style={styles.modalBackGround}>
        <View style={[styles.modalContainer]}>{children}</View>
      </View>
    </Modal>
  );
};

const CalcularReceta = ({ navigation }) => {
  const [visible, setVisible] = React.useState(false);
  const [isFavorito, setIsFavorito] = React.useState(2);
  const [cantGuardadas, setCantGuardadas] = useState(2);
  const [errorGuardar, setErrorGuardar] = useState(false);


  React.useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      if (variables.getNumero()) {
        calculo(variables.getNumero())
      }

    });

    return unsubscribe;

  }, [navigation])

  const GuardarRecetaStorage = (idReceta, numero) => {
    guardarRecetasDispositivo(idReceta, numero);
    //setVisible(true);
  }


   const Guardar = () =>{
      const recetasGuardadas = AsyncStorage.getItem('recetasGuardadas');
      //const cantidadRecetas =JSON.parse(recetasGuardadas).length; //Object.keys(recetasGuardadas).length;
      //console.log("cantidad de recetas",cantidadRecetas);
     if((JSON.parse(recetasGuardadas).length) < 5){
       setVisible(true)
     }
     else{
       setErrorGuardar(true)
     }
   }


  // const guardarFavorito= async (idReceta,idUsuario)=>{
  //   const baseUrl =  config.baseUrl;

  //   const setup = {
  //     headers: {
  //       'content-type': 'application/json'
  //     }
  //   }

  //   const body = JSON.stringify({idUsuario,idReceta})
  //   try{
  //     const res = await axios.post(`${baseUrl}/receta/cargarFavorito`, body, setup)
  //     .then(function (res){
  //       console.log(res.status);
  //       if (res.status === 200) {
  //       console.log('favorito guardado correctamente');
  //       setIsFavorito(1);
  //     }})
  //     .catch(function(error){
  //       console.log(error);
  //     })
  //   }catch(error){
  //     console.log(error.msg);
  //   }
  // }

  const values = variables.getTipos();

  variables.setReceta(values.IdReceta)
  const [porciones, setValorPorciones] = useState(values.Porciones);
  const [personas, setValorPersonas] = useState(values.CantidadPersonas);
  const [numero, setNumero] = useState(1);
  const [nuevasPorciones, setNuevasPorciones] = React.useState(null);

  const calculo = (numero) => {
    if (numero != 1) {
      setValorPorciones(values.Porciones * numero)
      setValorPersonas(values.CantidadPersonas * numero)
      setNumero(numero)
    }
    else if (numero === 1) {
      setValorPorciones(values.Porciones)
      setValorPersonas(values.CantidadPersonas)
      setNumero(numero)
    }
  };



  const guardarRecetasDispositivo = async (id, num) => {
    const receta = { id, num };
    const recetasGuardadas = await AsyncStorage.getItem('recetasGuardadas');
    if (recetasGuardadas != null) {
      const nuevasRecetas = JSON.parse(recetasGuardadas).concat(receta);
      console.log('Recetas Guardadas: ', nuevasRecetas);
      console.log("pepito")
      console.log(JSON.parse(recetasGuardadas).length)
      if((JSON.parse(recetasGuardadas).length) < 5){
        await AsyncStorage.setItem('recetasGuardadas', JSON.stringify(nuevasRecetas));
        setVisible(true)
      }
      else{
        setErrorGuardar(true)
      }
    } else {
      await AsyncStorage.setItem('recetasGuardadas', JSON.stringify([receta]));
      setVisible(true);
    }
  }

  return (
    <ScrollView style={styles.container}>
      <Image
        style={{ width: "100%", height: 200 }}
        source={{ uri: values.foto }}
      ></Image>

      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginTop: "5%",
          marginBottom: "2%",
          marginHorizontal: "5%",
        }}
      >
        <Text style={{ fontSize: 20, width: "90%", fontWeight: "bold" }}>
          {" "}
          {values.Nombre}{" "}
        </Text>
      </View>

      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginTop: "2%",
          marginBottom: "2%",
          marginHorizontal: "5%",
        }}
      >
        <FontAwesome name="user" size={30} color="gray" />

        <Text style={{ fontSize: 16, color: "gray", marginLeft: '1%' }}>{values.alias} </Text>
      </View>

      <NativeBaseProvider>
        <TextArea
          style={{ backgroundColor: "#ffff" }}
          w="90%"
          mx="5"
          fontSize="16"
          value={values.Descripcion}
          placeholder="Disabled TextArea"
          isDisabled
        />

        <View style={{ marginTop: "2%", marginHorizontal: "5%", flexDirection: "row" }} >
          <View marginLeft="7%" width="40%">
            <ButtonFondoRosa text="Mitad" onPress={() => calculo(0.5)} />
          </View>
          <View marginLeft="5%" marginRight="10%" width="40%">
            <ButtonFondoRosa text="Doble" onPress={() => calculo(2)} />
          </View>
        </View>

        <View style={{ marginTop: "2%", marginHorizontal: "5%", flexDirection: "row" }} >
          <View marginLeft="7%" width="40%">
            <Input
              fontSize="12"
              style={{ backgroundColor: "#ffff", textAlign: "center" }}
              onChangeText={setNuevasPorciones}
              value={nuevasPorciones}
              placeholder="¿Cuantas Porciones?"
              keyboardType="numeric"
            />
          </View>
          <View marginLeft="5%" marginRight="10%" width="40%" marginTop="-2%">
            <ButtonFondoRosa text="Calcular X Porciones" onPress={() => calculo(nuevasPorciones / values.Porciones)} />
          </View>
        </View>

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginTop: "5%",
            marginHorizontal: "5%",
          }}
        >
          <Text style={{ fontSize: 16, width: "85%" }}> Porciones </Text>

          <Input
            fontSize="16"
            isDisabled
            w="15%"
            style={{ backgroundColor: "#ffff", textAlign: "center" }}
            value={porciones.toString()}
          />
        </View>

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginTop: "5%",
            marginBottom: "2%",
            marginHorizontal: "5%",
          }}
        >
          <Text style={{ fontSize: 16, width: "85%" }}> Personas </Text>

          <Input
            style={{ backgroundColor: "#ffff", textAlign: "center" }}
            value={personas.toString()}
            isDisabled
            w="15%"
            fontSize="16"
            placeholder="2"
          />
        </View>

        <Divider thickness="2" />

        <Text
          style={{
            marginTop: "5%",
            marginHorizontal: "5%",
            fontSize: 25,
            fontWeight: "bold",
          }}
        >
          Ingredientes{" "}
        </Text>

        <Ingredients Receta={values.IdReceta} numero={numero} />
        <View style={{ marginTop: "5%", marginHorizontal: "5%", marginBottom: "5%" }}>
          <ButtonFondoBlanco text="Reestablecer" onPress={() => calculo(1)} />
        </View>
        <Divider my="2" thickness="2" />

        <Text
          style={{
            marginTop: "5%",
            marginHorizontal: "5%",
            fontSize: 25,
            fontWeight: "bold",
          }}
        >
          {" "}
          Pasos{" "}
        </Text>

        <Steps Receta={values.IdReceta} />

        <View style={{ marginTop: "2%", marginHorizontal: "5%", marginBottom: "5%" }} >

        <ModalPoup visible={visible}>
           <View style={{ alignItems: 'flex-start' }}>
           <Text style={{ fontSize: 20, color: "black" }}>Las proporciones se guardaron correctamente </Text>
          <View style={{ flexDirection: "row", alignItems: "center", marginTop: '2%', marginBottom: '2%', marginHorizontal: '5%' }}>
           </View>
           </View>
           <View style={{ flexDirection: "row", alignItems: "center", marginTop: '1%', marginBottom: '1%', marginHorizontal: '1%' }}>
           <ButtonModalUnico text="Aceptar" onPress={() =>  {setVisible(false), navigation.navigate("Principal")} } />
           </View>
       </ModalPoup>

       <ModalPoup visible={errorGuardar}>
         <View style={{ alignItems: 'flex-start' }}>
         <Text style={{ fontSize: 20, color: "black" }}>Has superado la cantidad maxima de recetas guardadas (5), eliminá y volvé a intentarlo </Text>
         <View style={{ flexDirection: "row", alignItems: "center", marginTop: '2%', marginBottom: '2%', marginHorizontal: '5%' }}>
         </View>
         </View>
         <View style={{ flexDirection: "row", alignItems: "center", marginTop: '1%', marginBottom: '1%', marginHorizontal: '1%' }}>
         <ButtonModalUnico text="Aceptar" onPress={() => { setErrorGuardar(false) }} />
         </View>
     </ModalPoup>


        {/* <Guardar></Guardar> */}
        <ButtonFondoRosa  text="Guardar" onPress={()=> GuardarRecetaStorage(values.IdReceta, numero) }/>

          {/* <ButtonFondoRosa  text="Guardar" onPress={()=> setVisible(true)}/> */}
          

        </View>

      </NativeBaseProvider>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#D6B1B1",
  },
  modalBackGround: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    width: "80%",
    backgroundColor: "#F7F4F4",
    paddingHorizontal: 20,
    paddingVertical: 30,
    borderRadius: 20,
    elevation: 20,
  },
  input: {
    height: "20%",
    borderColor: "gray",
    borderWidth: 1,
    width: "100%",
    justifyContent: "center",
    alignItems: "stretch",
  },
});

export default CalcularReceta;
