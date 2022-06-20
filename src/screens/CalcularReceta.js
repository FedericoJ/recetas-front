import React, { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Image,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Modal,Box,
} from "react-native";
import { FontAwesome, MaterialCommunityIcons,AntDesign} from "@expo/vector-icons";
import Stars from "react-native-stars";
import { NativeBaseProvider, TextArea, Input, Divider,Spinner,HStack } from "native-base";
import Ingredients from "../components/Ingredients";
import { ButtonModal } from "../components/ButtonsLogin";
import { Rating, AirbnbRating } from 'react-native-ratings';
import Steps from "../components/Step";
import {ButtonFondoRosa, ButtonFondoBlanco} from '../components/ButtonsLogin';
import {useRoute } from '@react-navigation/native';
import config from "../config/default.json";
import useSWR from 'swr'
import axios from 'axios'
import variables from '../config/variables';
import { calculateInitialScale } from "react-native-image-view/src/utils";



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
  const [isFavorito,setIsFavorito]=React.useState(2);


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
  const [numero, setNumero ] =useState(1);

  const calculo = (numero) =>{
    if(numero != 1){
        setValorPorciones(values.Porciones*numero)
        setValorPersonas(values.CantidadPersonas*numero)
        setNumero(numero)
    }
    else if(numero === 1) {
      setValorPorciones(values.Porciones)
      setValorPersonas(values.CantidadPersonas)
      setNumero(numero)
    }
  };

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

        <Text style={{ fontSize: 16, color: "gray", marginLeft:'1%' }}>{values.alias} </Text>
      </View>

      <NativeBaseProvider>
        <TextArea
          style={{ backgroundColor: "#ffff" }}
          w="90%"
          mx="5"
          fontSize= "16"
          value={values.Descripcion}
          placeholder="Disabled TextArea"
          isDisabled
        />

        <View style={{marginTop:"2%",marginHorizontal:"5%",flexDirection:"row"}} > 
          <View marginLeft="7%" width="40%">
        <ButtonFondoRosa   text="Mitad" onPress={()=> calculo(0.5)}/>
        </View>
        <View marginLeft="5%" marginRight="10%" width="40%">
        <ButtonFondoRosa  text="Doble" onPress={()=> calculo(2)}/>
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
          <Text style={{ fontSize: 16,width:"85%"}}> Porciones </Text>

          <Input
            fontSize= "16"
            isDisabled
            w="15%"
            style={{ backgroundColor: "#ffff", textAlign: "center"}}
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
            fontSize= "16"
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
          
         <View style={{marginTop:"2%",marginHorizontal:"5%",marginBottom:"5%"}} > 
          <ButtonFondoBlanco  text="Reestablecer" onPress={()=> calculo(1)}/>
          <ButtonFondoRosa  text="Guardar" onPress={()=> console.log("hola")}/>

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
